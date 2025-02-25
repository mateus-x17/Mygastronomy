import ordersDataAcess from '../dataAcess/orders.js'  //importa o arquivo orders.js responsavel pela conexão com o banco de dados
import {ok, serverError} from '../helpers/httpResponse.js' //importa o arquivo httpResponse.js responsavel pela resposta da requisição

export default class ordersController{
    constructor(){
        this.dataAcess = new ordersDataAcess() //instancia o objeto platesDataAcess
    }
    
    //obter lista de todos os pratos
    async getOrders(req, res){
        try {
            const Orders = await this.dataAcess.getOrders() //busca todos os pratos - através do método getPlates do objeto platesDataAcess
            return ok(Orders) //retorna os pratos dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

    //obter pedidos pelo id do usuario
    async getOrdersByUserId(userId){
        try {
            const Orders = await this.dataAcess.getOrdersByUserId(userId) //busca todos os pedidos do usuario - através do método do objeto ordersDataAcess
            return ok(Orders) //retorna os pratos dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

    //deletar prato
    async deleteOrder(req, res){
        try{
            const orderId = req.params.id
            const order = await this.dataAcess.deleteOrder(orderId) //deleta um usuário - através do método deleteUser do objeto ordersDataAcess
            return ok(order)
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

    //atualizar prato
    async updateOrder(req, res){
        try {
            const OrderId = req.params.id
            const orderData = req.body
            const order = await this.dataAcess.updatePlate(OrderId, orderData) //atualiza um usuário - através do método updateUser do objeto usersDataAcess
            return ok(order) //retorna o usuário atualizado dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

    //inserir prato
    async insertOrder(req, res){
        try {
            const orderData = req.body
            const order = await this.dataAcess.insertOrder(orderData) //insere um usuário - através do método insertUser do objeto usersDataAcess
            return ok(order) //retorna o usuário inserido dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

}
