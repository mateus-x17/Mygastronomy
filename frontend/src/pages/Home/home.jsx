import React from 'react'
import { Link } from 'react-router-dom'
import Dessert from '../../components/icons/dessert.jsx'
import NaturalFood from '../../components/icons/naturalFood.jsx'
import Vegetable from '../../components/icons/vegetable.jsx'
import Styles from './home.module.css'
import { FaInstagram, FaWhatsapp, FaFacebook, FaMapMarkerAlt, FaQuoteLeft, FaStar } from "react-icons/fa";
import { MdRestaurantMenu, MdDeliveryDining } from "react-icons/md";
import { GiChefToque } from "react-icons/gi";

export default function Home() {
  return (
    <div className={Styles.pageContainer}>
      {/* Hero Section */}
      <section className={Styles.heroSection}>
        <span className={Styles.heroBadge}>🍽️ Bem-vindo ao MyGastronomy</span>
        <h1>Experiência Gastronômica Única</h1>
        <p>Descubra sabores inesquecíveis em um ambiente acolhedor. Nossa culinária mistura tradição e modernidade para proporcionar momentos especiais a você e sua família.</p>
        <div className={Styles.heroButtons}>
          <Link to="/plates">
            <button className={Styles.heroButton}>Ver Menu Completo</button>
          </Link>
          <Link to="/login">
            <button className={Styles.heroButtonSecondary}>Fazer Pedido</button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className={Styles.statsSection}>
        <div className={Styles.statItem}>
          <MdRestaurantMenu className={Styles.statIcon} />
          <span className={Styles.statNumber}>50+</span>
          <span className={Styles.statLabel}>Pratos no Menu</span>
        </div>
        <div className={Styles.statItem}>
          <GiChefToque className={Styles.statIcon} />
          <span className={Styles.statNumber}>5</span>
          <span className={Styles.statLabel}>Chefs Especialistas</span>
        </div>
        <div className={Styles.statItem}>
          <MdDeliveryDining className={Styles.statIcon} />
          <span className={Styles.statNumber}>1000+</span>
          <span className={Styles.statLabel}>Pedidos Entregues</span>
        </div>
        <div className={Styles.statItem}>
          <FaStar className={Styles.statIcon} />
          <span className={Styles.statNumber}>4.9</span>
          <span className={Styles.statLabel}>Avaliação Média</span>
        </div>
      </section>

      {/* Features Section */}
      <section className={Styles.foodSection}>
        <div className={Styles.featureCard}>
          <i><Dessert /></i>
          <h4>Excelência Diária</h4>
          <p>Pratos preparados todos os dias com o máximo de cuidado e dedicação por nossa equipe de chefs renomados.</p>
        </div>
        <div className={Styles.featureCard}>
          <i><NaturalFood /></i>
          <h4>Ingredientes Premium</h4>
          <p>Selecionamos rigorosamente nossos fornecedores para garantir frescor e qualidade incomparável em cada refeição.</p>
        </div>
        <div className={Styles.featureCard}>
          <i><Vegetable /></i>
          <h4>Opções para Todos</h4>
          <p>Cardápio diversificado com opções vegetarianas, veganas e sem glúten, sem abrir mão do sabor.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className={Styles.storySection}>
        <div className={Styles.storyContent}>
          <span className={Styles.sectionTag}>Nossa História</span>
          <h2>Uma Paixão pela Gastronomia</h2>
          <p>Fundado em 2020, o MyGastronomy nasceu do sonho de criar um espaço onde a boa comida e o ambiente acolhedor se encontrassem. Nossa jornada começou com uma pequena cozinha e uma grande ambição: servir pratos que tocassem o coração das pessoas.</p>
          <p>Hoje, continuamos comprometidos com a mesma paixão e dedicação, trazendo receitas que combinam técnicas tradicionais com toques contemporâneos. Cada prato conta uma história, e queremos que você faça parte dela.</p>
        </div>
        <div className={Styles.storyImage}>
          <div className={Styles.storyImagePlaceholder}>
            <GiChefToque size={80} />
            <span>Desde 2020</span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={Styles.testimonialsSection}>
        <span className={Styles.sectionTag}>Depoimentos</span>
        <h2>O Que Nossos Clientes Dizem</h2>
        <div className={Styles.testimonialsGrid}>
          <div className={Styles.testimonialCard}>
            <FaQuoteLeft className={Styles.quoteIcon} />
            <p>"A melhor experiência gastronômica que já tive! Os pratos são incríveis e o atendimento é impecável."</p>
            <div className={Styles.testimonialAuthor}>
              <div className={Styles.authorAvatar}>M</div>
              <div>
                <strong>Maria Silva</strong>
                <span>Cliente desde 2021</span>
              </div>
            </div>
          </div>
          <div className={Styles.testimonialCard}>
            <FaQuoteLeft className={Styles.quoteIcon} />
            <p>"Ambiente aconchegante e comida deliciosa. Voltarei com certeza! Recomendo a todos."</p>
            <div className={Styles.testimonialAuthor}>
              <div className={Styles.authorAvatar}>J</div>
              <div>
                <strong>João Santos</strong>
                <span>Cliente desde 2022</span>
              </div>
            </div>
          </div>
          <div className={Styles.testimonialCard}>
            <FaQuoteLeft className={Styles.quoteIcon} />
            <p>"Os ingredientes frescos fazem toda a diferença. Você sente o carinho em cada garfada!"</p>
            <div className={Styles.testimonialAuthor}>
              <div className={Styles.authorAvatar}>A</div>
              <div>
                <strong>Ana Oliveira</strong>
                <span>Cliente desde 2023</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={Styles.newsletterSection}>
        <h2>Receba Nossas Novidades</h2>
        <p>Cadastre-se para receber promoções exclusivas, novos pratos e eventos especiais diretamente no seu email.</p>
        <form className={Styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Seu melhor email" className={Styles.newsletterInput} />
          <button type="submit" className={Styles.newsletterButton}>Inscrever-se</button>
        </form>
      </section>

      {/* Contact Section */}
      <section className={Styles.contactSection}>
        <h1>Fique Conectado</h1>
        <p>Siga-nos nas redes sociais para promoções exclusivas e novidades. Entre em contato ou venha nos visitar!</p>

        <div className={Styles.socialConteinerButtons}>
          <button className={Styles.socialButtons}> <FaInstagram /> Instagram</button>
          <button className={Styles.socialButtons}> <FaFacebook /> Facebook </button>
          <button className={Styles.socialButtons}> <FaWhatsapp /> WhatsApp</button>
          <button className={Styles.socialButtons}> <FaMapMarkerAlt /> Localização </button>
        </div>

      </section>
    </div>
  )
}
