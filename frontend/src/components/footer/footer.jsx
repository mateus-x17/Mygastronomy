import React from 'react'
import Styles from './footer.module.css'
import { Link } from 'react-router-dom'

export default function footer() {
  return (
    <footer className={Styles.footerConteiner}>
        <img src="/imgs/logo.png" alt="logo" />
        <div>
            <h3>links importantes</h3>
            <div className={Styles.linksConteiner}>
                <Link className={Styles.Link} to="/">Home</Link>
                <Link className={Styles.Link} to="/plates">pratos</Link>
                <Link className={Styles.Link} to="/profile">perfil</Link>
            </div>
        </div>

        <div className={Styles.footerInfo}>
            <p>developed by Mateus Inácio.</p>
            <a href="#" target='_blank'>see my projects</a> {/*adc link para github*/}
        </div>
    </footer>
  )
}
