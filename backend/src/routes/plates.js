import { Router } from 'express';
import platesController from '../controllers/plates.js';

const platesRouter = Router(); //instancia o objeto router para criar rotas com express
const platesControllers = new platesController(); //instancia o objeto platesController para chamar os métodos do controller dos pratos

platesRouter.get('/', async (req, res) => {
    const {success, statusCode, body} = await platesControllers.getplates() //rota para buscar todos os pratos
    res.status(statusCode).json(body) //retorna os pratos

})

platesRouter.get('/avalibles', async (req, res) => {
    const {success, statusCode, body} = await platesControllers.getAvaliblePlates() //rota para buscar todos os pratos disponiveis
    res.status(statusCode).json(body) //retorna os pratos

})

platesRouter.delete('/:id', async (req, res) => {
    const {success, statusCode, body} = await platesControllers.deletePlate(req, res) //rota para deletar um usuário - necessario passar req e res para o método deletePlates
    res.status(statusCode).json({message:`dados do prato ${body.name} deletados !`,
        body}) //retorna o prato deletado
})

platesRouter.put('/:id', async (req, res) => {
    const {success, statusCode, body} = await platesControllers.updateplate(req, res) //rota para atualizar um usuário - necessario passar req e res para o método updatePlates
    res.status(statusCode).json({message: `dados do prato atualizados com sucesso !`, 
        body}) //retorna o prato atualizado
})

platesRouter.post('/', async (req, res) => {
    const {success, statusCode, body} = await platesControllers.insertPlate(req, res) //rota para atualizar um usuário - necessario passar req e res para o método updatePlates
    res.status(statusCode).json({message: `prato criado com sucesso !`, 
        body}) //retorna o prato criado
})

export default platesRouter; // exporta as rotas de pratos
