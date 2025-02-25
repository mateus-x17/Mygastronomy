import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../loading/loading.jsx'
import platesServices from '../../services/plates'
import PlateCard from '../../components/plateCard/plateCard.jsx'
import Styles from './plates.module.css'
import PlatePopUp from '../../components/platePopUp/platePopUp.jsx'
import { useCartContext } from '../../contexts/useCartContext.jsx'


// ctrl + espaço - para ver as opções

export default function Plates() {
  const { getAvaliblePlates, platesLoading, reFetchPlates, platesList } = platesServices()
  const [plateSelected, setPlateSelected] = useState(null)
  const {addToCart} = useCartContext()
  
  useEffect(() => {
    if (reFetchPlates) {
      getAvaliblePlates()
    }
  }, [reFetchPlates]) // se o reFetchPlates for true chama a função para obter os pratos

  if (platesLoading) {
    return  (<Loading/>) // exibe mensagem de carregando enquanto carrega os pratos
  }

  // console.log(platesList) // exibe lista de pratos

  const handlePlateSelected = (plate) => () => {
    setPlateSelected(plate) // seleciona o prato clicado para um estado
    console.log(plate)
  }

  const handleClosePopup = () => {
    setPlateSelected(null) // retira o praro do estado
  }

  const handleAddToCard = (itemToAdd) => {
    addToCart(itemToAdd) // adiciona o prato ao carrinho usano a função do contexto
    handleClosePopup() // fecha o popup após adicionar o prato
  }


  return (
    <>
    <div className={Styles.platesContainer}>
      {platesList.map((plate) => (
        <div key={plate._id} className={Styles.cardConteiner} onClick={handlePlateSelected(plate)}>
          <PlateCard plateData={plate}/>
        </div>
      ))} {/* cria um component card para cada prato recebido da api*/}
    </div>

    {plateSelected && (
        <PlatePopUp plateData={plateSelected} onClose={handleClosePopup} onAddToCard={handleAddToCard}/> // se o prato selecionado não for nulo exibe o popup e passa o prato selecionado como propriedade
    )}
    </>
  )
}