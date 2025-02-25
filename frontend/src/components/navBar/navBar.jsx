import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import Styles from './navBar.module.css'
import { useCartContext } from '../../contexts/useCartContext'
//importações	de icones e componentes do react-icons
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import {Drawer} from '@mui/material'

export default function Navbar() {

  const [openMenu, setOpenMenu] = useState(false) // estado para controlar o menu mobile
  const {cartItens} = useCartContext() // pega o contexto de itens no carrinho
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu) // alterna o estado do menu para um estado diferente do atual no momento em que o usuário clica no ícone do menu

  }
  return (
    <nav className={Styles.navbarConteiner}>
      <div className={Styles.navbarItens}>
        <Link to="/"><img className={Styles.logo} src='/imgs/logo.png' alt='logo'></img></Link>
        <div className={Styles.navbarlinksConteiner}>
          <Link to="/" className={Styles.navbarLink}>Home</Link>
          <Link to="/plates" className={Styles.navbarLink}>Pratos</Link>

          <Link to='/cart' className={Styles.cartWrapper}>
            <FiShoppingCart className={Styles.navbarLink} />
            {cartItens.length > 0 && (
              <span className={Styles.cartBadge}>{cartItens.length}</span>
            )}
          </Link>

          <Link to='/profile'><i>
            <FaRegUserCircle className={Styles.navbarLink}/>
          </i></Link>
        </div>
      </div>

      <div className={Styles.mobileNavbarItens}>
        <Link to="/"><img className={Styles.logo} src='/imgs/logo.png' alt='logo'></img></Link>
        <div className={Styles.navbarMobilebtns}>

        <Link to='/cart' className={Styles.cartWrapper}>
            <FiShoppingCart className={Styles.navbarLink} />
            {cartItens.length > 0 && (
              <span className={Styles.cartBadge}>{cartItens.length}</span>
            )}
          </Link>
          
          <IoMenu className={Styles.navbarLink2} onClick={handleOpenMenu}/> {/* chama função para abri o menu mobile ao clicar no icone*/}
        </div>
      </div>

      {/* componente de menu responsivo importado do material ui */}
      <Drawer
        anchor={"right"}
        open={openMenu}
        onClose={handleOpenMenu}
        >
          <div className={Styles.drawer}> {/*estilo para o menu lateral*/}
          <Link to="/" className={Styles.navbarLink} onClick={handleOpenMenu}>Home</Link>
          <Link to='/plates' className={Styles.navbarLink} onClick={handleOpenMenu}>Pratos</Link>
          <Link to='/profile' className={Styles.navbarLink} onClick={handleOpenMenu}>Perfil</Link>
          </div>
        </Drawer>
    </nav>
  )
}