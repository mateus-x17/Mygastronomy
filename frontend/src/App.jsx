import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navBar/navBar'
import Footer from './components/footer/footer'
import { CartProvider } from './contexts/useCartContext'
import { ToastProvider } from './components/Toast/Toast'

function App() {

  return (
    <>
      <ToastProvider>
        <CartProvider>
          <Navbar />
          <main>
            <Outlet /> {/*componente que renderiza as rotas*/}
          </main>
          <Footer />
        </CartProvider>
      </ToastProvider>
    </>
  )
}

export default App
