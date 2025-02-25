import { create } from "domain";
import { Mongo } from "../database/mongo.js"; //importa o arquivo mongo.js responsavel pela conexão com o banco de dados
import { ObjectId } from "mongodb"; //importa o pacote ObjectId do mongodb para gerar o id do usuário

export default class ordersDataAcess{
    constructor(){
        this.collectionName = 'pedidos' //nome da coleção de usuários
    }

    //OBTER LISTA DE PEDIDOS
    async getOrders(){
        const orders = await Mongo.db.collection(this.collectionName).aggregate([
            {
                $lookup: {
                    from: 'itensPedidos', //nome da coleção de itens do pedido
                    localField: '_id', //campo do pedido
                    foreignField: 'orderId', //campo do item do pedido
                    as: 'orderItems'//nome do array de itens do pedido
                }
            },
            {
                $lookup: {
                    from: 'usuarios', //nome da coleção de usuários
                    localField: 'userId', //campo do pedido
                    foreignField: '_id', //campo do usuário
                    as: 'userDetails'//nome do array de usuários
                }
            },
            {
                $project:{
                    "userDetails.password": 0,
                    "userDetails.salt": 0,
                }
            }, 
            {
                $unwind: {
                    path: '$orderItems', //cria um array de itens do pedido
                    preserveNullAndEmptyArrays: true
                }
            }, 
            {
                $lookup: {
                    from: 'pratos', //nome da coleção de pratos
                    localField: 'orderItems.plateId', //campo do item do pedido
                    foreignField: '_id', //campo do prato
                    as: 'orderItems.plateDetails'//nome do array de pratos
                }
            }, 
            {
                $group: {
                    _id: '$_id', //id do pedido
                    userDetails: { $first: '$userDetails' }, //dados do usuário que fez o pedido
                    status: { $first: '$status' }, //status do pedido
                    orderItems: { $push: '$orderItems' }, //array de itens do pedido
                    createdAt: { $first: '$createdAt' } //data de criação do pedido

                    }
            }
        ])
        .toArray() //busca todos os pedidos com informações dos itens do pedido e do usuário que fez o pedido
        return orders //retorna os pratos
    }


    //OBTER LISTA DE PEDIDOS POR ID DO USUÁRIO
    async getOrdersByUserId(id){
        const orders = await Mongo.db.collection(this.collectionName).aggregate([
            {
                $match: {
                    userId: new ObjectId(id) //busca todos os pedidos do usuário com o id passado como parâmetro
                }
            },
            {
                $lookup: {
                    from: 'itensPedidos', //nome da coleção de itens do pedido
                    localField: '_id', //campo do pedido
                    foreignField: 'orderId', //campo do item do pedido
                    as: 'orderItems'//nome do array de itens do pedido
                }
            },
            {
                $lookup: {
                    from: 'users', //nome da coleção de usuários
                    localField: 'userId', //campo do pedido
                    foreignField: '_id', //campo do usuário
                    as: 'userDetails'//nome do array de usuários
                }
            },
            {
                $project:{
                    "userDetails.password": 0,
                    "userDetails.salt": 0,
                }
            }, 
            {
                $unwind: {
                    path: '$orderItems', //cria um array de itens do pedido
                    preserveNullAndEmptyArrays: true
                }
            }, 
            {
                $lookup: {
                    from: 'pratos', //nome da coleção de pratos
                    localField: 'orderItems.plateId', //campo do item do pedido
                    foreignField: '_id', //campo do prato
                    as: 'orderItems.plateDetails'//nome do array de pratos
                }
            }, 
            {
                $group: {
                    _id: '$_id', //id do pedido
                    userDetails: { $first: '$userDetails' }, //dados do usuário que fez o pedido
                    status: { $first: '$status' }, //status do pedido
                    orderItems: { $push: '$orderItems' }, //array de itens do pedido
                    createdAt: { $first: '$createdAt' } //data de criação do pedido

                    }
            }
        ])
        .toArray() //busca todos os pedidos com informações dos itens do pedido e do usuário que fez o pedido
        return orders //retorna os pratos
    }


    // INSERIR PEDIDO
    async insertOrder(orderData){
        const {itens, ...orderDataRest} = orderData //separa os dados do pedido em dois objetos
        orderDataRest.createdAt = new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
          }); //adiciona a data de criação do pedido
        orderDataRest.status = 'pendente' //adiciona o status do pedido
        orderDataRest.userId = new ObjectId(orderDataRest.userId) //adiciona o id do usuário que fez o pedido

        const newOrder = await Mongo.db.collection(this.collectionName).insertOne(orderDataRest) //insere um pedido
        if (!newOrder.insertedId){
            throw new Error('Erro ao inserir prato')
        }//verifica se o prato foi inserido

        itens.map(async (item) => {
            item.plateId = new ObjectId(item.plateId) //adiciona o id do prato pedido
            item.orderId =  new ObjectId(newOrder.insertedId) //adiciona o id do pedido
        })
        const order = await Mongo.db.collection("itensPedidos").insertMany(itens) //insere os itens do pedido em uma coleção separada
        return order //retorna os itens inserido
    }


    //DELETAR PEDIDO
    async deleteOrder(id){

        const itensDelete = await Mongo.db.collection("itensPedidos").deleteMany({orderId: new ObjectId(id)}) //deleta os itens do pedido na tabela de itens
        const orderDelete = await Mongo.db.collection(this.collectionName).findOneAndDelete({_id: new ObjectId(id)}) //deleta o pedido na tabela de pedido
        
        const result = {
            itensDelete,
            orderDelete
        } //retorna os itens deletados e o prato deletado
        
        return result 
    }


    //ATUALIZAR PEDIDO
    async updateOrder(orderId, orderData){
        const user = await Mongo.db.collection(this.collectionName).findOneAndUpdate(
            {_id: new ObjectId(orderId)},
            {$set: orderData})} // atualiza as informaações do prato

}
