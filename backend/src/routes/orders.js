import { Router } from 'express';
import ordersController from '../controllers/orders.js';

const ordersRouter = Router(); //instancia o objeto router para criar rotas com express
const ordersControllers = new ordersController(); //instancia o objeto platesController para chamar os métodos do controller dos pedidos

ordersRouter.get('/', async (req, res) => {
    const {success, statusCode, body} = await ordersControllers.getOrders() //rota para buscar todos os pedidos
    res.status(statusCode).json(body) //retorna os pedidos

})

ordersRouter.get('/userorders/:id', async (req, res) => {
    const {success, statusCode, body} = await ordersControllers.getOrdersByUserId(req.params.id) //rota para buscar todos os pedidos
    res.status(statusCode).json(body) //retorna os pedidos

})

ordersRouter.delete('/:id', async (req, res) => {
    const {success, statusCode, body} = await ordersControllers.deleteOrder(req, res) //rota para deletar um pedido - necessario passar req e res para o método deletePlates
    res.status(statusCode).json({message:`dados do pedido abaixo deletados !`,
        body}) //retorna o prato deletado
})

ordersRouter.put('/:id', async (req, res) => {
    const {success, statusCode, body} = await ordersControllers.updateOrder(req, res) //rota para atualizar um pedido - necessario passar req e res para o método updateOrder
    res.status(statusCode).json({message: `dados do pedido atualizados com sucesso !`, 
        body}) //retorna o pedido atualizado
})

ordersRouter.post('/', async (req, res) => {
    const {success, statusCode, body} = await ordersControllers.insertOrder(req, res) //rota para atualizar um usuário - necessario passar req e res para o método insertOrder
    res.status(statusCode).json({message: `pedido criado com sucesso !`, 
        body}) //retorna o pedido criado
})

export default ordersRouter; // exporta as rotas de pedidos
