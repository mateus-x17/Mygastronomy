import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config'

export default function platesServices() {
    const navegate = useNavigate() // cria uma função para navegação entre as rotas
    const [platesLoading, setPlatesLoading] = useState(false) // estado para controlar o loading (carregamento) do login
    const [reFetchPlates, setReFetchPlates] = useState(true) // estado para controlar o re-renderização da pagina
    const [platesList, setPlatesList] = useState([]) // estado para armazenar a lista de pedidos

    const url = `${API_BASE_URL}/plates`

    const getAvaliblePlates = (userId) => {
        setPlatesLoading(true)
        fetch(`${url}/avalibles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'acesss-control-allow-origin': '*' // para que o cors funcione permitindo requisições da mesma maquina
            },
            body: JSON.stringify() // body é o corpo da requisição e JSON.stringify transforma o objeto em uma string depois transforma em json
        })
            .then(res => res.json()) // transforma a resposta em json
            .then(data => {
                setPlatesList(data) // armazena a lista de pedidos no estado
                console.log(data)
            }) // exibe a resposta no console 
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setPlatesLoading(false)
                setReFetchPlates(false) //finaliza o refetch dos pedidos
            })
    } // função para obter os pedidos do usuario enviando uma requisição para o servidor

    return { getAvaliblePlates, platesLoading, reFetchPlates, platesList }
}