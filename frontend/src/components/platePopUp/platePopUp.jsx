import React from 'react'
import { Dialog } from '@mui/material'
import Styles from './platePopUp.module.css'
import { FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function PlatePopUp({ plateData, onClose, onAddToCard }) {

  return (
    <Dialog
      open={true}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: '16px',
          overflow: 'hidden',
          maxWidth: '500px',
        }
      }}
    >
      <div className={Styles.popUpContainer}>
        <button className={Styles.closeButton} onClick={onClose}>
          <IoClose />
        </button>

        <div className={Styles.imageContainer}>
          <img src={plateData.imgUrl} alt={`img ${plateData.nome}`} />
        </div>

        <div className={Styles.popUpInfo}>
          <span className={Styles.category}>{plateData.categoria}</span>
          <h2>{plateData.nome}</h2>
          <p className={Styles.description}>{plateData.descricao}</p>

          <div className={Styles.ingredientsList}>
            <span className={Styles.ingredientsLabel}>Ingredientes:</span>
            <p>{String(plateData.ingredientes)}</p>
          </div>

          <div className={Styles.priceRow}>
            <span className={Styles.price}>R$ {plateData.preco}</span>
            <button className={Styles.addButton} onClick={() => onAddToCard(plateData)}>
              <FaShoppingCart /> Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
