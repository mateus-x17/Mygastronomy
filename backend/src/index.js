import express from "express"
import cors from "cors"
import { Mongo } from "./database/mongo.js" //importa o arquivo mongo.js responsavel pela conexão com o banco de dados
import autenticado from "./auth/auth.js"//importa o arquivo auth.js responsavel pela autenticação do usuário
import usersRouter from "./routes/users.js"
import platesRouter from "./routes/plates.js"
import ordersRouter from "./routes/orders.js"
import { config } from "dotenv"


config() //carrega as variáveis de ambiente do arquivo .env

async function main (){
    const hostname = 'localhost' //endereço do servidor
    const port = 3000 //porta que o servidor vai rodar
    const app = express() // instancia o express para criar o servidor

    const mongoConnetion = await Mongo.connect({
        mongoConnectionString: process.env.MONGO_CONNECTION_STRING,
        mongoDbName: process.env.MONGO_DB_NAME
    }) //conecta ao banco de dados chamando o método connect do objeto Mongo
    console.log(mongoConnetion) //imprime o resultado da conexão com o banco de dados

    app.use(cors()) //permite que o servidor receba requisições de qualquer origem
    app.use(express.json()) //permite que o servidor receba requisições com o corpo no formato json

    app.get('/', (req, res) => {
        res.send({
            sucess: true,
            statusCode: 200,
            body: 'Servidor rodando'
        })
    }) //rota para testar se o servidor está funcionando



    //ROTAS
    app.use('/singIn', autenticado.register) //rota para criar  um novo usuário e autenticar
    app.use('/login', autenticado.authLogin) //rota para autenticação de usuário ja existente
    app.use('/users', usersRouter) //rota para controlar acesso aos usuários
    app.use('/plates', platesRouter) //rota para controlar acesso aos pratos
    app.use('/orders', ordersRouter) //rota para controlar acesso aos pedidos

    app.listen(port, () => {
        console.log(`Servidor rodando em http://${hostname}:${port}`)
    }) //inicia o servidor
}
main()