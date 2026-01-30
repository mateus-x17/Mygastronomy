import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCartContext } from '../../contexts/useCartContext'
import { IoIosRemoveCircleOutline } from "react-icons/io"
import { FiMinus, FiPlus } from "react-icons/fi"
import { FaShoppingCart } from "react-icons/fa"
import { MdShoppingCartCheckout } from "react-icons/md"
import Styles from './cart.module.css'
import ConfirmOrderPopup from '../../components/confirmOrderPopUp/confirmOrderPopUp'
import orderServices from '../../services/order'
import { useToast } from '../../components/Toast/Toast'

export default function Cart() {
  const { cartItens, updateCartItens, removeFromCart, clearCart } = useCartContext()
  const [confirmPopUpOpen, setConfirmPopUpOpen] = useState(false)
  const { sendOrder } = orderServices()
  const toast = useToast()
  const navigate = useNavigate()

  const handleChangeQuantity = (mode, itemId) => {
    const updatedCartItens = cartItens.map((item) => {
      if (item._id === itemId) {
        if (mode === 'less' && item.quantidade > 1) {
          item.quantidade -= 1
        } else if (mode === 'more') {
          item.quantidade += 1
        }
      }
      return item
    })
    updateCartItens(updatedCartItens)
  }

  const handleRemoveItem = (item) => {
    removeFromCart(item)
    toast.warning(`${item.nome} removido do carrinho`)
  }

  const handleOpenPopup = (e) => {
    e.preventDefault()
    setConfirmPopUpOpen(!confirmPopUpOpen)
  }

  const handleConfirmOrder = (orderData) => {
    orderData.itens = cartItens.map((item) => ({
      plateId: item._id,
      quantity: item.quantidade,
    }))
    sendOrder(orderData)
    setConfirmPopUpOpen(false)
    clearCart()
    toast.success('Pedido realizado com sucesso!')
    setTimeout(() => {
      navigate('/profile')
    }, 1500)
  }

  const calculateTotal = () => {
    return cartItens.reduce((total, item) => {
      return total + (parseFloat(item.preco) * item.quantidade)
    }, 0).toFixed(2)
  }

  if (cartItens.length === 0) {
    return (
      <div className={Styles.emptyCart}>
        <FaShoppingCart className={Styles.emptyIcon} />
        <h1>Seu carrinho está vazio</h1>
        <p>Adicione pratos deliciosos ao seu carrinho para começar!</p>
        <Link to="/plates">
          <button className={Styles.emptyButton}>Ver Cardápio</button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className={Styles.pageContainer}>
        <div className={Styles.pageHeader}>
          <h1><FaShoppingCart /> Meu Carrinho</h1>
          <span className={Styles.itemCount}>{cartItens.length} {cartItens.length === 1 ? 'item' : 'itens'}</span>
        </div>

        <div className={Styles.cartContent}>
          <div className={Styles.itemsList}>
            {cartItens.map((item) => (
              <div key={item._id} className={Styles.itemCard}>
                <img src={item.imgUrl} alt={item.nome} className={Styles.itemImage} />

                <div className={Styles.itemInfo}>
                  <h3>{item.nome}</h3>
                  <p className={Styles.itemDescription}>{item.descricao}</p>
                  <p className={Styles.itemPrice}>R$ {item.preco}</p>
                </div>

                <div className={Styles.itemActions}>
                  <div className={Styles.quantityControl}>
                    <button
                      onClick={() => handleChangeQuantity('less', item._id)}
                      className={Styles.quantityBtn}
                      disabled={item.quantidade === 1}
                    >
                      <FiMinus />
                    </button>
                    <span className={Styles.quantity}>{item.quantidade}</span>
                    <button
                      onClick={() => handleChangeQuantity('more', item._id)}
                      className={Styles.quantityBtn}
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <div className={Styles.itemTotal}>
                    <span>Subtotal:</span>
                    <strong>R$ {(parseFloat(item.preco) * item.quantidade).toFixed(2)}</strong>
                  </div>

                  <button
                    className={Styles.removeBtn}
                    onClick={() => handleRemoveItem(item)}
                  >
                    <IoIosRemoveCircleOutline /> Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={Styles.cartSummary}>
            <h2>Resumo do Pedido</h2>
            <div className={Styles.summaryLine}>
              <span>Subtotal:</span>
              <span>R$ {calculateTotal()}</span>
            </div>
            <div className={Styles.summaryLine}>
              <span>Taxa de entrega:</span>
              <span>R$ 5.00</span>
            </div>
            <div className={`${Styles.summaryLine} ${Styles.total}`}>
              <span>Total:</span>
              <strong>R$ {(parseFloat(calculateTotal()) + 5.00).toFixed(2)}</strong>
            </div>
            <button className={Styles.checkoutBtn} onClick={handleOpenPopup}>
              <MdShoppingCartCheckout /> Finalizar Pedido
            </button>
          </div>
        </div>
      </div>

      <ConfirmOrderPopup open={confirmPopUpOpen} onClose={handleOpenPopup} onConfirm={handleConfirmOrder} />
    </>
  )
}