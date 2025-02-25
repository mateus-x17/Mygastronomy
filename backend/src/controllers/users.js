import UsersDataAcess from "../dataAcess/users.js"; //importa o arquivo users.js responsavel pela conexão com o banco de dados de usuários
import {ok, serverError} from '../helpers/httpResponse.js' //importa o arquivo httpResponse.js responsavel pela resposta da requisição

export default class UsersController{
    constructor(){
        this.dataAcess = new UsersDataAcess() //instancia o objeto usersDataAcess
    }
    //método para buscar todos os usuários
    async getUsers(req, res){
        try {
            const users = await this.dataAcess.getUsers() //busca todos os usuários - através do método getUsers do objeto usersDataAcess
            return ok(users) //retorna os usuários dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

    async deleteUser(req, res){
        try{
            const UserId = req.params.id
            const user = await this.dataAcess.deleteUser(UserId) //deleta um usuário - através do método deleteUser do objeto usersDataAcess
            return ok(user) //retorna o usuário deletado dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

    async updateUser(req, res){
        try {
            const userId = req.params.id
            const userData = req.body
            const user = await this.dataAcess.updateUser(userId, userData) //atualiza um usuário - através do método updateUser do objeto usersDataAcess
            return ok(user) //retorna o usuário atualizado dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }


}
