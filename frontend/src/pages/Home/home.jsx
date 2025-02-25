import React from 'react'
import Dessert from '../../../public/imgs/Home/dessert.jsx'
import NaturalFood from '../../../public/imgs/Home/naturalFood.jsx'
import Vegetable from '../../../public/imgs/Home/vegetable.jsx'
import Styles from './home.module.css'
import { FaInstagram, FaWhatsapp, FaFacebook, FaMapMarkerAlt } from "react-icons/fa";



export default function Home() {
  return (
    <div className={Styles.pageContainer}>
      <section>
        <h1>Bem vindo ao Site</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum vero ipsum tenetur impedit libero fugit delectus earum tempora repudiandae quod harum unde nisi reiciendis temporibus, dolor fugiat nobis laboriosam. Architecto?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum vero ipsum tenetur impedit libero fugit delectus earum tempora repudiandae quod harum unde nisi reiciendis temporibus, dolor fugiat nobis laboriosam. Architecto?</p>
      </section>

      <section className={Styles.foodSection}> 
        <div>
          <i><Dessert/></i>
          <h4>excelencia em todos os dias</h4>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error fugiat omnis unde sunt sed quas ratione dolorem consectetur nam deleniti! Aspernatur labore quis sit placeat quas rerum, quod iste qui!</p>
        </div>
        <div>
          <i><NaturalFood/></i>
          <h4>ingredientes de primeira linha</h4>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error fugiat omnis unde sunt sed quas ratione dolorem consectetur nam deleniti! Aspernatur labore quis sit placeat quas rerum, quod iste qui!</p>
        </div>
        <div>
          <i><Vegetable/></i>
          <h4>feito para todos</h4>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error fugiat omnis unde sunt sed quas ratione dolorem consectetur nam deleniti! Aspernatur labore quis sit placeat quas rerum, quod iste qui!</p>
        </div>
      </section>

      <section className={Styles.contactSection}>
        <h1>fique atualizado</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis ipsum ut assumenda molestiae voluptatibus, ullam totam error a recusandae minus. Eius voluptatum architecto rerum voluptates autem ipsa modi laudantium amet.</p>

        <div className={Styles.socialConteinerButtons}>
          <button className={Styles.socialButtons}> <FaInstagram /> instagram</button>
          <button className={Styles.socialButtons}> <FaFacebook /> facebook </button>
          <button className={Styles.socialButtons}> <FaWhatsapp /> whatsapp</button>
          <button className={Styles.socialButtons}> <FaMapMarkerAlt /> localização </button>
        </div>

      </section>
    </div>
  )
}
