import React from 'react'
import { Dialog } from '@mui/material'
import  Styles from './platePopUp.module.css'
import { useState } from 'react';

export default function platePopUp({plateData, onClose, onAddToCard}) {

  return (
    <Dialog open={true} onClose={onClose}>
        <div className={Styles.popUpContainer}>
            <img src={plateData.imgUrl} alt={`img ${plateData.name}`} />

            <div className={Styles.popUpInfo}>
                <h2>{plateData.nome}</h2>
                <p>{plateData.descricao}</p>
                <p className={Styles.ingredientes}>ingredientes: {String(plateData.ingredientes)}</p>
                <h3>R$ {plateData.preco}</h3>
                <button onClick={()=> {onAddToCard(plateData)} }> adc ao carrinho </button> {/* evento chama uma função para adicionar o prato ao carrinho passando o prato como parametro */}
                
            </div>
        </div>

    </Dialog>
  )
}
