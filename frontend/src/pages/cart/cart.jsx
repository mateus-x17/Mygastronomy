import React from 'react'
import { useState } from 'react';
import { useCartContext } from '../../contexts/useCartContext'
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Styles from './cart.module.css'
import ConfirmOrderPopup from '../../components/confirmOrderPopUp/confirmOrderPopUp';
import orderServices from '../../services/order';
import Notification from '../../components/notificationsPopUp/notificationsPopUp';


export default function Cart() {
  const {cartItens, updateCartItens, removeFromCart, clearCart} = useCartContext() // pega o contexto do carrinho
  const [confirmPopUpOpen, setConfirmPopUpOpen] = useState(false)
  const {sendOrder} = orderServices() //pega a função de evniar uma requisição http com o pedido ao BD
  const [showNotification, setShowNotification] = useState(false);
  const [notificationKey, setNotificationKey] = useState(0); // Estado para chave única

  const handleNotification = () => {
    setShowNotification(false); // Garante que a notificação desapareça antes de ser reexibida
    setNotificationKey((prevKey) => prevKey + 1); // Atualiza a chave da notificação
    setTimeout(() => {
      setShowNotification(true); // Exibe a notificação novamente
      setTimeout(() => {
        setShowNotification(false); // Esconde após 3 segundos
      }, 3000);
    }, 10); // Pequeno delay para garantir a atualização
  };

  const handleChangeQuantity = (mode, itemId) => {
    const updatedCartItens = cartItens.map((item)=>{
      if(item._id === itemId){
        if(mode === 'less' && item.quantidade > 1){
          item.quantidade -= 1
        } else if (mode === 'more'){
          item.quantidade += 1
        }} // atualiza a quantidade do item
      return item
    })
    updateCartItens(updatedCartItens) // atualiza o carrinho com a quantidade de itens atualizada
  } // função para alterar a quantidade de itens no carrinho

  const handleOpenPopup = (e) => {
        e.preventDefault()
        setConfirmPopUpOpen(!confirmPopUpOpen)
  } // função para abrir/fechar o popUp de confirmação de pedido

  const handleConfirmOrder = (orderData) => {
    orderData.itens = cartItens.map((item) => ({
      plateId: item._id,
      quantity: item.quantidade,
    }))
    console.log(orderData)
    sendOrder(orderData) // envia o pedido ao BD
    setConfirmPopUpOpen(!confirmPopUpOpen) // fecha o popUp de confirmação de pedido
    clearCart() // limpa o carrinho
    alert('Pedido enviado com sucesso!')
  } // função para confirmar o pedido e enviar ao BD


  if (cartItens.length === 0) {
    return (
      <div className={Styles.emptyCart}>
        <h1>Carrinho vazio ;/ </h1>
        <p><a href="/plates">clique aqui</a> para ver nossas opções no cardápio</p>
      </div>
    )
  }

  return (
    <>
      <div className={Styles.pageConteiner}>
        <h1>Carrinho: </h1>
        <section>
          <div className={Styles.conteinerListItens}>
            {cartItens.map((item) => (
              <div key={item._id} className={Styles.itemConteiner}>
                <img src={item.imgUrl} alt={`img ${item.nome}`} />

                <div className={Styles.itemConteudo}>
                  <p>{item.nome}</p>
                  <p> {item.descricao}</p>
                  <p>{String(item.ingredientes)}</p>
                  <p>R$ {item.preco}</p>
                  
                  <div className={Styles.porcoesConteiner}>
                    <p>quantidade: {item.quantidade}</p>
                    <div className={Styles.porcoesButtons}>
                      <button onClick={()=>{handleChangeQuantity ('less', item._id)}}>-</button>
                      <button onClick={()=>{handleChangeQuantity ('more', item._id)}}>+</button>
                    </div>
                  </div>
                  <button className={Styles.removeItemBtn} onClick={()=>{removeFromCart(item); handleNotification()}}>
                    <IoIosRemoveCircleOutline/> remover item  
                  </button>

                  {showNotification && (
                    <Notification 
                      key={notificationKey} 
                      message="Item removido do carrinho!" 
                      onClose={() => setShowNotification(false)} 
                      bgColor="red" 
                    />
                  )}

                </div>

              </div>

            ))}
          </div>
        </section>
        <button className={Styles.confirmBtn} onClick={handleOpenPopup}>confirmar pedido </button>
      </div>
      
      <ConfirmOrderPopup open={confirmPopUpOpen} onClose={handleOpenPopup} onConfirm={handleConfirmOrder}/>
    </>
  )
}