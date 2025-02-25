import React from 'react'
import  Styles from './confirmOrderPopUp.module.css'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Dialog } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function ConfirmOrderPopUp({open, onClose, onConfirm}) {
   const [formData, setFormData] = useState(null) // cria um estado para os dados do formulario
   const authData = JSON.parse(localStorage.getItem('auth')) // pega os dados do usuario logado no localStorage
   const navigate = useNavigate()

  const handleConfirm = (event)=>{
    event.preventDefault() // evita que a pagina seja recarregada
    if (!authData?.user?._id){
      alert('Faça o login para confirmar o pedido')
      // adcionar popUp de login
      return navigate('/login') // caso o usuario não esteja logado redireciona para a pagina de login
    } else {
        if (!formData?.pickupTime){
          return alert('informe o horário de retirada do seu pedido')
        } else{
          const orderData = {
            userId: authData?.user?._id,
            pickupTime: formData?.pickupTime,
          }
          console.log(orderData)
          onConfirm(orderData)
          // onClose()
        }
    }
  }

  const handleFormDataChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value}) 
  } //função para alterar os dados do formulario ao ser digitado 

  return (
    <Dialog open={open} onClose={onClose}>
        <div className={Styles.popupContainer}>
            <h2>estamos quase lá...</h2>
            <p>confirme a data do seu pedido: <strong>{(new Date()).toLocaleDateString()}</strong></p>
            <p>informe o horário de retirada do seu pedido:</p>
            <form className={Styles.formContainer}>
                <TextField
                onChange={handleFormDataChange}
                required
                type="time"
                name='pickupTime'
                />
                <div className={Styles.confirmBtns}>
                    <button className={Styles.cancelBtn} onClick={onClose}>Cancelar</button>
                    <button onClick={handleConfirm}>Confirmar</button>
                </div>
            </form>
        </div>
    </Dialog>
  )
}