import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import authServices from '../../services/Auth.jsx'
import orderServices from '../../services/order'  
import Styles from './profile.module.css'
import Loading from '../loading/loading.jsx'

// importa os icones
import { TbLogout2 } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineCancel, MdOutlineEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export default function Profile() {
  const { logout } = authServices()
  const { getUserOrders, orderLoading, reFetchOrders, ordersList } = orderServices()
  const navegate = useNavigate()
  const authData = JSON.parse(localStorage.getItem('auth')) // pega os dados do usuario logado no localStorage

  useEffect(() => {
    if (!authData) {
      return navegate('/login' ) // window.location.href = '/auth' // caso o usuario não esteja logado redireciona para a pagina de login
    } else if(reFetchOrders) {
      getUserOrders(authData?.user?._id) // chama função para obter os pedidos do usuario
    } // se o usuario estiver logado e o reFetchOrders for true chama a função para obter os pedidos do usuario
  }, [authData, reFetchOrders]) //observa se o usuario esta logado e renderiza a pagina sempre que o usuario logar ou deslogar

  if (orderLoading) {
    return( <Loading/> ) // exibe mensagem de carregando enquanto carrega os pedidos
  }

  const handleLogout = () => {
    logout() // chama função de logout
    navegate('/login') // redireciona para a pagina de login
    alert('Logout realizado com sucesso') // exibe mensagem de logout realizado com sucesso
  } // função para fazer o logout

  // console.log(ordersList)// exibe lista de pedidos

  return (
    <div className={Styles.pageContainer}>
      <h1>profile</h1>

      <div className={Styles.userInfoContainer}>
        <p> <FaUser /> nome do usuario logado: {authData?.user?.name}</p> {/* exibe o nome do usuario logado se existir, caso não exista exibe undefined */}
        <p> <MdOutlineEmail /> email do usuario logado: {authData?.user?.email}</p>
      </div>

      <button onClick={handleLogout}> <TbLogout2/> Logout</button> {/* chama função de logout*/}

      {ordersList.length > 0 ? 
        <div className={Styles.ordersContainer}>
          {ordersList.map((order) => (
            <div key={order._id} className={Styles.orderContainer}>
              {order.status === 'pendente' ? <p className={`${Styles.status} ${Styles.pendente}`}>Status: {order.status} <IoIosTimer/> </p> : null} {/* exibe o status do pedido e aplica um estilo diferente para cada status */}
              {order.status === 'completo' ? <p className={`${Styles.status} ${Styles.completo}`}>Status: {order.status} <CiCircleCheck/> </p> : null}
              {order.status === 'cancelado' ? <p className={`${Styles.status} ${Styles.cancelado}`}>Status: {order.status} <MdOutlineCancel/> </p> : null}
              <p>Status: {order.status}</p>
              <p>data: {order.createdAt}</p>
              {order.orderItems.map((item) => (
                <div key={item._id}>
                    <div>
                      <h3>Prato: {item.plateDetails[0].nome}</h3>
                      <p><i>Descrição:</i> {item.plateDetails[0].descricao}</p>
                      <p><i>categoria:</i> {item.plateDetails[0].categoria}</p>
                      <p><i>quantidade:</i> {item.quantity}</p>
                      <p><i>preço:</i> R$ {item.plateDetails[0].preco}</p>
                    </div>
                </div> // exibe os detalhes do pedido
              ))}
            </div>
          ))}
        </div>
       : 
        <div>
          <p>você não realizou pedidos ainda  <Link to={'/plates'} className={Styles.LinkPratos}>clique aqui e veja nossas especialidades :)</Link> </p>
        </div>
      }
    </div>
  )
}