import platesDataAcess from "../dataAcess/plates.js" //importa o arquivo usersDataAcess.js responsavel pela conexão com o banco de dados
import {ok, serverError} from '../helpers/httpResponse.js' //importa o arquivo httpResponse.js responsavel pela resposta da requisição

export default class platesController{
    constructor(){
        this.dataAcess = new platesDataAcess() //instancia o objeto platesDataAcess
    }
    
    //obter lista de todos os pratos
    async getplates(req, res){
        try {
            const plates = await this.dataAcess.getPlates() //busca todos os pratos - através do método getPlates do objeto platesDataAcess
            return ok(plates) //retorna os pratos dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

    //método para buscar todos os pratos disponiveis
    async getAvaliblePlates(){
        try {
            const plates = await this.dataAcess.getAvaliblePlates() //busca todos os pratos disponiveis - através do método getAvaliblePlates do objeto platesDataAcess
            return ok(plates) //retorna os pratos dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

    //deletar prato
    async deletePlate(req, res){
        try{
            const plateId = req.params.id
            const plate = await this.dataAcess.deletePlate(plateId) //deleta um usuário - através do método deleteUser do objeto platesDataAcess
            return ok(plate) //retorna o usuário deletado dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

    //atualizar prato
    async updateplate(req, res){
        try {
            const plateId = req.params.id
            const plateData = req.body
            const plate = await this.dataAcess.updatePlate(plateId, plateData) //atualiza um usuário - através do método updateUser do objeto usersDataAcess
            return ok(plate) //retorna o usuário atualizado dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

    //inserir prato
    async insertPlate(req, res){
        try {
            const plateData = req.body
            const plate = await this.dataAcess.insertPlate(plateData) //insere um usuário - através do método insertUser do objeto usersDataAcess
            return ok(plate) //retorna o usuário inserido dentro do corpo da resposta do arquivo httpResponse.js
        } catch (error) {
            return serverError( error) //retorna um erro
        }
    }

}
