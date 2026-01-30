import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config'
import { useToast } from '../components/Toast/Toast'

export default function authServices() {
    const navigate = useNavigate()
    const [authLoading, setAuthLoading] = useState(false)
    const toast = useToast()
    const url = API_BASE_URL

    const login = async (formData) => {
        setAuthLoading(true)
        try {
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access-control-allow-origin': '*'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok && data.body?.logged === true && data.body?.token) {
                localStorage.setItem('auth', JSON.stringify({
                    token: data.body.token,
                    user: data.body.user
                }))
                toast.success(`Bem-vindo(a), ${data.body.user?.name || 'Usuário'}!`)
                setTimeout(() => {
                    navigate('/profile')
                }, 500)
            } else {
                // Handle specific error messages from backend
                const errorMessage = data.message || 'Erro ao realizar login'
                toast.error(errorMessage)
            }
        } catch (err) {
            console.error(err)
            toast.error('Erro de conexão. Tente novamente.')
        } finally {
            setAuthLoading(false)
        }
    }


    const singIn = async (formData) => {
        setAuthLoading(true)
        try {
            const response = await fetch(`${url}/singIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'access-control-allow-origin': '*'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok && data.body?.logged === true && data.body?.token) {
                localStorage.setItem('auth', JSON.stringify({
                    token: data.body.token,
                    user: data.body.user
                }))
                toast.success('Cadastro realizado com sucesso! Redirecionando...')
                setTimeout(() => {
                    navigate('/profile')
                }, 1000)
            } else {
                // Handle specific error messages from backend
                const errorMessage = data.message || 'Erro ao realizar cadastro'
                toast.error(errorMessage)
            }
        } catch (err) {
            console.error(err)
            toast.error('Erro de conexão. Tente novamente.')
        } finally {
            setAuthLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('auth')
        toast.info('Você saiu da sua conta.')
        navigate('/login')
    }


    return { singIn, logout, login, authLoading }
}
