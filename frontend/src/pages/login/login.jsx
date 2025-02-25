import React from 'react'
import authServices from '../../services/Auth.jsx'
import Styles from './login.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//importa os componentes do material ui
import { TextField } from '@mui/material' // importa o componente TextField responsavel por espaços de fomrularios
import { Button } from '@mui/material' // importa o componente Button responsavel por espaços de fomrularios
import { LuLogIn } from "react-icons/lu";

export default function Auth() {
  const [formType, setFormType] = useState('login')
  const [formData, setFormData] = useState(null) // cria um estado para os dados do formulario
  const {login, singIn, authLoading} = authServices() // chama a função de login e singIn do arquivo services/auth.jsx
  const navegate = useNavigate() // cria uma função para navegação entre as rotas
  const authData = JSON.parse(localStorage.getItem('auth')) // pega os dados do usuario logado no localStorage

  useEffect(() => {
    if (authData) {
      return navegate('/profile')
      // window.location.href = '/profile'
    } // caso o usuario esteja logado redireciona para a pagina de perfil
    }, []) //caso o usuio esteja logado redireciona para a pagina de perfil


  const handleChangeFormType = () => {
      if (formType === 'login') {
        setFormType('signup')
      } else {
        setFormType('login')
      }
      console.log(formType)
    } // troca o tipo de formulario

    const handleFormDataChange = (event) => {
      setFormData({...formData, [event.target.name]: event.target.value}) 
    } //função para alterar os dados do formulario ao ser digitado 

    const handleSubmitForm = (event) => {
      event.preventDefault()
      switch (formType) {
        case 'login':
          login(formData) // envia requisição para o servidor
          console.log('login')
          setFormData({email: '', password: ''}) // reseta o formulario
          break // caso o formulario seja de login 

        case 'signup':
          if (formData.password !== formData.confirmPassword) {
            alert('senhas não conferem')
            return // caso as senhas não sejam iguais interrompe a função e não envia a requisição
          }
          singIn(formData) // envia requisição para o servidor
          console.log('signup')
          setFormData({email: '', password: '', confirmPassword: ''}) // reseta o formulario
          break // caso o formulario seja de cadastro
      }
    } //função para enviar os dados para o servidor

    if (authLoading) {
      return (
        <div>
          <h1>carregando...</h1>
        </div>
      )
    } // caso o estado de authLoading seja true exibe a mensagem de carregando

    return(
      <div className={Styles.pagAutenticacao}>
        {formType === 'login' ? (
                <div className={Styles.pagAutenticacao}>
                <h1>login</h1>
                <form onSubmit={handleSubmitForm}>
                  <TextField label="email" type='email' name='email' required onChange={handleFormDataChange}/>
                  <TextField label="senha" type='password' name='password' required onChange={handleFormDataChange}/>
                  <button type='submit'> entrar <LuLogIn/> </button>
                  <button onClick={handleChangeFormType}> não tem uma conta ? clique aqui</button>
                </form>
              </div> ) : null} {/* caso o formulario seja de login exibe o formulario de login*/}

        {formType === 'signup' ? (
          <div className={Styles.pagAutenticacao}>
            <h1>cadastro</h1>
            <form onSubmit={handleSubmitForm}>
              <TextField label="nome" type='text' name='name' required onChange={handleFormDataChange}/>
              <TextField label="email" type='email' name='email' required onChange={handleFormDataChange}/>
              <TextField label="senha" type='password' name='password' required onChange={handleFormDataChange}/>
              <TextField label="confirmar senha" type='password' name='confirmPassword' required onChange={handleFormDataChange}/>
              <button type='submit'> cadastrar <LuLogIn/> </button>
              <button onClick={handleChangeFormType}> já tem uma conta ? clique aqui</button>
            </form>
          </div> ) : null} {/*caso o formulario seja de cadastro exibe o formulario de cadastro*/}
      </div>
    )
}
