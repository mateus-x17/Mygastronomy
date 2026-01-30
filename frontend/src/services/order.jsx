import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config'

export default function orderServices() {
    const navegate = useNavigate() // cria uma função para navegação entre as rotas
    const [orderLoading, setOrderLoading] = useState(false) // estado para controlar o loading (carregamento) do login
    const [reFetchOrders, setReFetchOrders] = useState(true) // estado para controlar o re-renderização da pagina
    const [ordersList, setOrdersList] = useState([]) // estado para armazenar a lista de pedidos

    const url = `${API_BASE_URL}/orders`

    const getUserOrders = (userId) => {
        setOrderLoading(true)
        fetch(`${url}/userorders/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'acesss-control-allow-origin': '*' // para que o cors funcione permitindo requisições da mesma maquina
            },
            body: JSON.stringify() // body é o corpo da requisição e JSON.stringify transforma o objeto em uma string depois transforma em json
        })
            .then(res => res.json()) // transforma a resposta em json
            .then(data => {
                setOrdersList(data) // armazena a lista de pedidos no estado
                console.log(data)
            }) // exibe a resposta no console 
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setOrderLoading(false)
                setReFetchOrders(false) //finaliza o refetch dos pedidos
            })
    } // função para obter os pedidos do usuario enviando uma requisição para o servidor

    const sendOrder = (orderData) => {
        setOrderLoading(true)
        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'acesss-control-allow-origin': '*' // para que o cors funcione permitindo requisições da mesma maquina
            },
            body: JSON.stringify(orderData)
        })
            .then(res => res.json()) // transforma a resposta em json
            .then(data => {
                console.log(data)
            }) // exibe a resposta no console 
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setOrderLoading(false)
                setReFetchOrders(false) //finaliza o refetch dos pedidos
            })
    } // função para obter os pedidos do usuario enviando uma requisição para o servidor

    return { getUserOrders, orderLoading, reFetchOrders, ordersList, sendOrder }
}