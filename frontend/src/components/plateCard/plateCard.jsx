import React from 'react'
import Styles from './plateCard.module.css'

export default function plateCard({plateData}) {
  return (
    <>
    <div className={Styles.card}>
        <img src={plateData.imgUrl} alt={`img ${plateData.nome}`} className={Styles.cardImage}/>

        <div className={Styles.cardContent}>
            <h4>{plateData.nome}</h4>
            {/* <p>{plateData.descricao}</p> */}
            <p className={Styles.preco}>R${plateData.preco}</p>
        </div>
    </div>
    </>
  )
}
