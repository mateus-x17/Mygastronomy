import { Mongo } from "../database/mongo.js"; //importa o arquivo mongo.js responsavel pela conexão com o banco de dados
import { ObjectId } from "mongodb"; //importa o pacote ObjectId do mongodb para gerar o id do usuário
import bcryptjs from "bcryptjs"; //importa o pacote bcryptjs para criptografar a senha do usuário

export default class UsersDataAcess{
    constructor(){
        this.collectionName = 'usuarios' //nome da coleção de usuários
    }
    //OBTER LISTA DE USUÁRIOS
    async getUsers(){
        const users = await Mongo.db.collection(this.collectionName).find({}).toArray() //busca todos os usuários
        // console.log(users) //imprime os usuários
        return users //retorna os usuários
    }

    //DELETAR USUÁRIO
    async deleteUser(id){
        const user = await Mongo.db.collection(this.collectionName).findOneAndDelete({_id: new ObjectId(id)}) //deleta um usuário
        return user //retorna o usuário deletado
    }

    //ATUALIZAR USUÁRIO
    async updateUser(userId, userData){
        if(userData.password){
            const hashedPassword = bcryptjs.hash(userData.password, 10) //gera o hash da senha nova
            userData = {...userData, password: (await hashedPassword).toString() } //se houver senha no corpo da requisição, atualiza a senha do usuário com um novo hash
            
            const result = await Mongo.db.collection(this.collectionName).findOneAndUpdate(
                {_id: new ObjectId(userId)},
                {$set: userData} 
            ) //atualiza a senha do usuário no banco de dados
            return result //retorna o usuário atualizado
        } else{
            const user = await Mongo.db.collection(this.collectionName).findOneAndUpdate(
                {_id: new ObjectId(userId)},
                {$set: userData})
            }
        } //se não houver senha no corpo da requisição, atualiza o usuário de forma geral, sem alterar a senha e nem o hash da senha

}
