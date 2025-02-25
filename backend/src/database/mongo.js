import { MongoClient } from "mongodb" //importa a biblioteca do mongodb

export const Mongo ={
    async connect ({mongoConnectionString, mongoDbName}){
        if (!mongoConnectionString || !mongoDbName) {
            throw new Error('Variáveis de ambiente para conexão com o banco de dados não foram definidas.');
        } //verifica se as variáveis de ambiente foram definidas

        try{
            const client = new MongoClient (mongoConnectionString) //cria uma nova instância do cliente do mongodb
            await client.connect() //conecta ao banco de dados
            const db = client.db(mongoDbName) //pega o banco de dados

            this.client = client //atribui o cliente ao objeto Mongo
            this.db = db //atribui o banco de dados ao objeto Mongo
            return 'Conectado ao banco de dados'

        } catch (error){
            return {
                text: 'Erro ao conectar ao banco de dados', error
            } //retorna um objeto com o erro
        }
    }
} // objeto com métodos para conectar ao banco de dados