import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function authServices() {
    const navegate = useNavigate() // cria uma função para navegação entre as rotas
    const [authLoading, setAuthLoading] = useState(false) // estado para controlar o loading (carregamento) do login
    const url = 'http://localhost:3000'

    const login = (formData) =>{
        setAuthLoading(true)
        fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'acesss-control-allow-origin': '*' // para que o cors funcione permitindo requisições da mesma maquina
            },
            body: JSON.stringify(formData) // body é o corpo da requisição e JSON.stringify transforma o objeto em uma string depois transforma em json
        })
        .then(res => res.json()) // transforma a resposta em json
        .then(data => {
            console.log(data)
            if (data.body.logged === true && data.body.token) {
                localStorage.setItem('auth', JSON.stringify({token:data.body.token, user: data.body.user})) // seta o token no localStorage
                // window.location.href = '/'
                alert('Login realizado com sucesso') // exibe mensagem de login realizado com sucesso
                navegate('/profile') // redireciona para a pagina inicial (Home)
            } else {
                alert('email ou senha incorretos')
            } // caso o login seja feito com sucesso seta o token no localStorage e redireciona para a pagina inicial (Home)
            setAuthLoading(false)
        }) // exibe a resposta no console e seta o estado de authLoading para false
        .catch(err => {
            console.log(err)
            setAuthLoading(false)
        })
        .finally(() => {
            setAuthLoading(false)
        }) 
    } // função para fazer o login enviando uma requisição para o servidor


    const singIn = (formData) =>{
        setAuthLoading(true)
        fetch(`${url}/singIn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'acesss-control-allow-origin': '*' // para que o cors funcione permitindo requisições da mesma maquina
            },
            body: JSON.stringify(formData) // body é o corpo da requisição e JSON.stringify transforma o objeto em uma string depois transforma em json
        })
        .then(res => res.json()) // transforma a resposta em json
        .then(data => {
            console.log(data)
            if (data.body.logged === true && data.body.token) {
                localStorage.setItem('auth', JSON.stringify({token:data.body.token, user: data.body.user})) // seta o token no localStorage
                // window.location.href = '/'
            } else {
                alert('email ou senha incorretos')
            } // caso o login seja feito com sucesso seta o token no localStorage e redireciona para a pagina inicial (Home)
            setAuthLoading(false)
        }) // exibe a resposta no console e seta o estado de authLoading para false
        .catch(err => {
            console.log(err)
            setAuthLoading(false)
        })
        .finally(() => {
            setAuthLoading(false)
        }) 
    } // função para fazer o cadastro enviando uma requisição para o servidor

    const logout = () =>{
        localStorage.removeItem('auth')
        console.log('logout')
        navegate('/login')
    } // função para fazer o logout removendo o token do localStorage e redirecionando para a pagina de login


  return {singIn, logout, login, authLoading}
}


