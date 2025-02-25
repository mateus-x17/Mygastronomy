import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navBar/navBar'
import Footer from './components/footer/footer'
import { CartProvider } from './contexts/useCartContext'

function App() {

  return (
    <>
    <CartProvider>
      <Navbar/>
      <main>
        <Outlet/> {/*componente que renderiza as rotas*/}
      </main>
      <Footer/>
    </CartProvider>
    </>
  )
}

export default App
