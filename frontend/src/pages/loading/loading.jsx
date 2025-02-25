import React from 'react'
import { CircularProgress } from '@mui/material'; //componente de carregamento do material ui
import Styles from './loading.module.css'


export default function Loading() {
  return (
    <div className={Styles.loadingContainer}>
        <CircularProgress color='info' size={50} />
    </div>
  )
}
