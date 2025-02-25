import { Router } from 'express';
import UsersController from '../controllers/users.js';

const usersRouter = Router(); //instancia o objeto router para criar rotas com express
const usersController = new UsersController(); //instancia o objeto usersController para chamar os métodos do controller dos usuários

usersRouter.get('/', async (req, res) => {
    const {success, statusCode, body} = await usersController.getUsers() //rota para buscar todos os usuários
    res.status(statusCode).json(body) //retorna os usuários

})

usersRouter.delete('/:id', async (req, res) => {
    const {success, statusCode, body} = await usersController.deleteUser(req, res) //rota para deletar um usuário - necessario passar req e res para o método deleteUser
    res.status(statusCode).json({message:`dados do usuario ${body.name} deletados !`,
        body}) //retorna o usuário deletado
})

usersRouter.put('/:id', async (req, res) => {
    const {success, statusCode, body} = await usersController.updateUser(req, res) //rota para atualizar um usuário - necessario passar req e res para o método updateUser
    res.status(statusCode).json({message: `dados do usuario atualizados com sucesso !`, 
        body}) //retorna o usuário atualizado
})

export default usersRouter; // exporta as rotas de usuarios
