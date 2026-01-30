import React from 'react'
import authServices from '../../services/Auth.jsx'
import Styles from './login.module.css'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import { LuLogIn } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa";
import { useToast } from '../../components/Toast/Toast'

export default function Auth() {
  const [formType, setFormType] = useState('login')
  const [formData, setFormData] = useState({})
  const { login, singIn, authLoading } = authServices()
  const navigate = useNavigate()
  const authData = JSON.parse(localStorage.getItem('auth'))
  const toast = useToast()

  useEffect(() => {
    if (authData) {
      navigate('/profile')
    }
  }, [])

  const handleChangeFormType = () => {
    setFormData({}) // Reset form data when switching
    if (formType === 'login') {
      setFormType('signup')
    } else {
      setFormType('login')
    }
  }

  const handleFormDataChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()

    // Validation
    if (!formData.email || !formData.password) {
      toast.warning('Preencha todos os campos obrigatórios.')
      return
    }

    switch (formType) {
      case 'login':
        login(formData)
        break

      case 'signup':
        if (!formData.name) {
          toast.warning('Por favor, informe seu nome.')
          return
        }
        if (formData.password.length < 6) {
          toast.warning('A senha deve ter no mínimo 6 caracteres.')
          return
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error('As senhas não conferem.')
          return
        }
        singIn(formData)
        break
    }
  }

  if (authLoading) {
    return (
      <div className={Styles.loadingContainer}>
        <div className={Styles.spinner}></div>
        <p>Carregando...</p>
      </div>
    )
  }

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      '&:hover fieldset': {
        borderColor: '#004643',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#004643',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#004643',
    },
  }

  return (
    <div className={Styles.pageContainer}>
      <div className={Styles.formCard}>
        <div className={Styles.cardHeader}>
          <img src="/imgs/logo.png" alt="Logo" className={Styles.logo} />
          <h1>{formType === 'login' ? 'Bem-vindo de Volta!' : 'Crie sua Conta'}</h1>
          <p>{formType === 'login' ? 'Entre para acessar seu perfil e pedidos' : 'Cadastre-se para fazer seus pedidos'}</p>
        </div>

        <form onSubmit={handleSubmitForm} className={Styles.form}>
          {formType === 'signup' && (
            <TextField
              label="Nome Completo"
              type='text'
              name='name'
              value={formData.name || ''}
              required
              onChange={handleFormDataChange}
              fullWidth
              variant="outlined"
              sx={textFieldStyle}
            />
          )}

          <TextField
            label="Email"
            type='email'
            name='email'
            value={formData.email || ''}
            required
            onChange={handleFormDataChange}
            fullWidth
            variant="outlined"
            sx={textFieldStyle}
          />

          <TextField
            label="Senha"
            type='password'
            name='password'
            value={formData.password || ''}
            required
            onChange={handleFormDataChange}
            fullWidth
            variant="outlined"
            sx={textFieldStyle}
          />

          {formType === 'signup' && (
            <TextField
              label="Confirmar Senha"
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword || ''}
              required
              onChange={handleFormDataChange}
              fullWidth
              variant="outlined"
              sx={textFieldStyle}
            />
          )}

          <button type='submit' className={Styles.submitButton} disabled={authLoading}>
            {formType === 'login' ? (
              <>Entrar <LuLogIn /></>
            ) : (
              <>Cadastrar <FaUserPlus /></>
            )}
          </button>
        </form>

        <div className={Styles.cardFooter}>
          <p>
            {formType === 'login' ? 'Não tem uma conta?' : 'Já possui uma conta?'}
          </p>
          <button onClick={handleChangeFormType} className={Styles.switchButton}>
            {formType === 'login' ? 'Criar conta' : 'Fazer login'}
          </button>
        </div>

        <Link to="/" className={Styles.backLink}>← Voltar para Home</Link>
      </div>
    </div>
  )
}
