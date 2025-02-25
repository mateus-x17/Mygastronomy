import express from "express"
// import passport from "passport"
// import { Strategy as LocalStrategy } from "passport-local"
// import crypto from "crypto"
import { Mongo } from "../database/mongo.js" //importa o arquivo mongo.js responsavel pela conexão com o banco de dados
import jwt from "jsonwebtoken" //importa o pacote jwt para gerar o token de autenticação
import bcryptjs from "bcryptjs" //importa o pacote bcryptjs para criptografar a senha do usuário
import { ObjectId } from "mongodb" //importa o pacote ObjectId do mongodb para gerar o id do usuário

//rota para cadastrar um novo usuário e gerar o token de autenticação no cadastro
 const register = async (req, res) => {
    const checkUser = await Mongo.db.collection('usuarios').findOne({email: req.body.email})
    if (checkUser){
        return res.status(400).json({message: 'Usuário já cadastrado.'}) //se o usuário já estiver cadastrado, retorna um erro
    } //verifica se o usuário já está cadastrado

    const hashedPassword = bcryptjs.hash(req.body.password, 10) //gera o hash da senha

    const result = await Mongo.db.collection('usuarios').insertOne({
        name: req.body.name,
        email: req.body.email,
        password: (await hashedPassword).toString(),
    }) //insere o usuário no banco de dados

    if (result.insertedId) {
        const user = await Mongo.db.collection('usuarios').findOne({_id: result.insertedId}) //busca o usuário pelo id
        const token = jwt.sign({id: user._id}, "mygastronomy ", {expiresIn: '1h'}) //gera o token de autenticação
        // process.env.JWT_SECRET - é a chave secreta que foi gerada no arquivo .env deve substituir a string no jwt.sign

        return res.status(200).send({body:{
            text: 'Usuário cadastrado com sucesso.', //retorna uma mensagem de sucesso
            token, //retorna o token de autenticação
            user, // retorna os dados do usuário cadastrado
            id: user._id,
            logged: true //indica que o usuário está logado
        }})
    } else {
        return res.status(400).json({message: 'Erro ao cadastrar usuário.'}) //se der erro, retorna um erro
    }
}

//gera token no login do usuário
const authLogin = async (req, res) => {
    try {
        const { email, password } = req.body; // Extrai email e password do corpo da requisição
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        } //verifica se o email e a senha foram enviados

        // Busca o usuário pelo email no banco de dados
        const user = await Mongo.db.collection('usuarios').findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }
        // Verifica se o campo password existe no usuário encontrado
        if (!user.password) {
            return res.status(500).json({ message: 'Erro interno: senha do usuário não encontrada no banco de dados.' });
        }

        // Compara a senha fornecida com a senha do banco de dados
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        // Gera o token de autenticação
        const token = jwt.sign({ id: user._id }, "mygastronomy", { expiresIn: '1h' });
        // process.env.JWT_SECRET - é a chave secreta que foi gerada no arquivo .env deve substituir a string no jwt.sing

        return res.status(200).json({
            body: {
                text: `Login do usuário ${user.name} realizado com sucesso.`,
                token, // Retorna o token de autenticação
                user, // Retorna os dados do usuário
                logged: true // Indica que o usuário está logado
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

//verifica se o usuário está autenticado para acessar a rota
const verifyAuthToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] //pega o header de autorização
    const token = authHeader && authHeader.split(' ')[1] //pega o token do header
    if (!token) {
        return res.status(401).json({message: 'Token não informado'}) //se o token não for informado, retorna um erro
    }
    try{
        const decoded = jwt.verify(token, "mygastronomy ") //decodifica o token
        // process.env.JWT_SECRET - é a chave secreta que foi gerada no arquivo .env deve substituir a string no jwt.verify
        req.user = decoded //atribui o usuário ao request
        next() //chama a próxima função
    } catch (error){
        return res.status(401).json({message: 'Token inválido'}) //se o token for inválido, retorna um erro
    }
}

const autenticação = {
    register,
    authLogin,
    verifyAuthToken
 } //exporta as funções de autenticação
export default autenticação; 





























// const collectionName = 'users' //nome da coleção de usuários

// passport.use( new LocalStrategy({usernameField: 'email'}, async (email, password, callback)=>{
//     const user = await Mongo.db.collection(collectionName).findOne({email}) //busca o usuário pelo email
    
//     if (!user) {
//         return callback(null, false, {message: 'Usuário não encontrado.'}) //se o usuário não for encontrado, retorna um erro
//     }

//     const saltBuffer = user.salt.saltBuffer //pega o salt do usuário
//     const hashBuffer = crypto.pbkdf2Sync(password, saltBuffer, 1000, 64, 'sha512', (err, hashedPassword)=>{
//         if (err) {
//             return callback(err, false) //se der erro, retorna um erro
//         }
        
//         const userPasswordBuffer = Buffer.from(user.password.buffer) //pega o hash da senha do usuário
//         const isPasswordValid = crypto.timingSafeEqual(userPasswordBuffer, hashedPassword) //compara o hash da senha com o hash da senha do usuário
//     }) //gera o hash da senha
// }))
