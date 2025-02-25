import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home/home.jsx'
import Cart from './pages/cart/cart.jsx'
import Profile from './pages/profile/profile.jsx'
import Plates from './pages/plates/plates.jsx'    
import Login from './pages/login/login.jsx'  
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//crirando as rotas e indicando qual elemento renderizar
const pages = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home/>},
      { path: '/cart', element: <Cart/>},
      { path: '/profile', element: <Profile/>},
      { path: '/plates', element: <Plates/>},
      { path: 'login', element: <Login/>},
    ] // children indica que dentro do elemento App, teremos outros elementos
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={pages} /> {/*passando as rotas para o RouterProvider*/}
    </StrictMode>,
)
