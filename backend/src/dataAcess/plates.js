import { Mongo } from "../database/mongo.js"; //importa o arquivo mongo.js responsavel pela conexão com o banco de dados
import { ObjectId } from "mongodb"; //importa o pacote ObjectId do mongodb para gerar o id do usuário

export default class PratosDataAcess{
    constructor(){
        this.collectionName = 'pratos' //nome da coleção de usuários
    }

    //OBTER LISTA DE PRATOS
    async getPlates(){
        const plates = await Mongo.db.collection(this.collectionName).find({}).toArray() //busca todos os usuários
        // console.log(users) //imprime os usuários
        return plates //retorna os pratos
    }

    //OBTER LISTA DE PRATOS DISPONIVEIS
    async getAvaliblePlates(){
        const plates = await Mongo.db.collection(this.collectionName).find({disponivel:true}).toArray() //busca todos os usuários
        // console.log(users) //imprime os usuários
        return plates //retorna os pratos
    }

    // INSERIR PRATO
    async insertPlate(plateData){
        const plate = await Mongo.db.collection(this.collectionName).insertOne(plateData) //insere um prato
        return plate //retorna o prato inserido
    }

    //DELETAR PRATO
    async deletePlate(id){
        const plate = await Mongo.db.collection(this.collectionName).findOneAndDelete({_id: new ObjectId(id)}) //deleta um usuário
        return plate //retorna o prato deletado
    }

    //ATUALIZAR PRATO
    async updatePlate(plateId, plateData){
        const user = await Mongo.db.collection(this.collectionName).findOneAndUpdate(
            {_id: new ObjectId(plateId)},
            {$set: plateData})} // atualiza as informaações do prato

}
