import React, { useState } from 'react'
import Styles from './confirmOrderPopUp.module.css'
import TextField from '@mui/material/TextField'
import { Dialog } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MdAccessTime, MdCalendarToday } from "react-icons/md"
import { useToast } from '../Toast/Toast'

export default function ConfirmOrderPopUp({ open, onClose, onConfirm }) {
  const [formData, setFormData] = useState(null)
  const authData = JSON.parse(localStorage.getItem('auth'))
  const navigate = useNavigate()
  const toast = useToast()

  const handleConfirm = (event) => {
    event.preventDefault()
    if (!authData?.user?._id) {
      toast.warning('Faça o login para confirmar o pedido')
      onClose()
      return navigate('/login')
    } else {
      if (!formData?.pickupTime) {
        return toast.warning('Informe o horário de retirada do seu pedido')
      } else {
        const orderData = {
          userId: authData?.user?._id,
          pickupTime: formData?.pickupTime,
        }
        onConfirm(orderData)
      }
    }
  }

  const handleFormDataChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const formatCurrentDate = () => {
    const today = new Date()
    return today.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: '16px',
          overflow: 'hidden',
          maxWidth: '450px',
        }
      }}
    >
      <div className={Styles.popupContainer}>
        <h2>🎉 Estamos quase lá!</h2>
        <p className={Styles.subtitle}>Confirme os detalhes do seu pedido</p>

        <div className={Styles.infoCard}>
          <MdCalendarToday className={Styles.icon} />
          <div>
            <span className={Styles.label}>Data do pedido:</span>
            <strong className={Styles.value}>{formatCurrentDate()}</strong>
          </div>
        </div>

        <form className={Styles.formContainer} onSubmit={handleConfirm}>
          <div className={Styles.timePickerWrapper}>
            <label htmlFor="pickupTime">
              <MdAccessTime className={Styles.icon} /> Horário de retirada:
            </label>
            <TextField
              id="pickupTime"
              onChange={handleFormDataChange}
              required
              type="time"
              name='pickupTime'
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#004643',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#004643',
                  },
                },
              }}
            />
          </div>
          <div className={Styles.confirmBtns}>
            <button type="button" className={Styles.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={Styles.confirmBtn}>
              Confirmar Pedido
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}