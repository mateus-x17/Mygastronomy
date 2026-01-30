import React from 'react'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authServices from '../../services/Auth.jsx'
import orderServices from '../../services/order'
import Styles from './profile.module.css'
import Loading from '../loading/loading.jsx'

import { TbLogout2 } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineCancel, MdOutlineEmail, MdRestaurantMenu } from "react-icons/md";
import { FaUser, FaShoppingBag, FaCalendarAlt } from "react-icons/fa";

export default function Profile() {
  const { logout } = authServices()
  const { getUserOrders, orderLoading, reFetchOrders, ordersList } = orderServices()
  const navigate = useNavigate()
  const authData = JSON.parse(localStorage.getItem('auth'))

  useEffect(() => {
    if (!authData) {
      navigate('/login')
    } else if (reFetchOrders) {
      getUserOrders(authData?.user?._id)
    }
  }, [authData, reFetchOrders])

  if (orderLoading) {
    return (<Loading />)
  }

  const handleLogout = () => {
    logout()
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pendente': return <IoIosTimer />;
      case 'completo': return <CiCircleCheck />;
      case 'cancelado': return <MdOutlineCancel />;
      default: return null;
    }
  }

  return (
    <div className={Styles.pageContainer}>
      {/* User Info Card */}
      <section className={Styles.userCard}>
        <div className={Styles.userAvatar}>
          {authData?.user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div className={Styles.userInfo}>
          <h1>{authData?.user?.name || 'Usuário'}</h1>
          <p><MdOutlineEmail /> {authData?.user?.email}</p>
        </div>
        <button onClick={handleLogout} className={Styles.logoutButton}>
          <TbLogout2 /> Sair
        </button>
      </section>

      {/* Stats Section */}
      <section className={Styles.statsSection}>
        <div className={Styles.statCard}>
          <FaShoppingBag className={Styles.statIcon} />
          <span className={Styles.statNumber}>{ordersList.length}</span>
          <span className={Styles.statLabel}>Pedidos Realizados</span>
        </div>
        <div className={Styles.statCard}>
          <CiCircleCheck className={Styles.statIcon} />
          <span className={Styles.statNumber}>
            {ordersList.filter(o => o.status === 'completo').length}
          </span>
          <span className={Styles.statLabel}>Pedidos Concluídos</span>
        </div>
        <div className={Styles.statCard}>
          <IoIosTimer className={Styles.statIcon} />
          <span className={Styles.statNumber}>
            {ordersList.filter(o => o.status === 'pendente').length}
          </span>
          <span className={Styles.statLabel}>Em Andamento</span>
        </div>
      </section>

      {/* Orders Section */}
      <section className={Styles.ordersSection}>
        <div className={Styles.sectionHeader}>
          <h2><MdRestaurantMenu /> Meus Pedidos</h2>
        </div>

        {ordersList.length > 0 ? (
          <div className={Styles.ordersGrid}>
            {ordersList.map((order) => (
              <div key={order._id} className={Styles.orderCard}>
                <div className={Styles.orderHeader}>
                  <span className={`${Styles.statusBadge} ${Styles[order.status]}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </span>
                  <span className={Styles.orderDate}>
                    <FaCalendarAlt /> {order.createdAt}
                  </span>
                </div>

                <div className={Styles.orderItems}>
                  {order.orderItems.map((item) => (
                    <div key={item._id} className={Styles.orderItem}>
                      <div className={Styles.itemInfo}>
                        <h4>{item.plateDetails[0]?.nome}</h4>
                        <p>{item.plateDetails[0]?.categoria}</p>
                      </div>
                      <div className={Styles.itemDetails}>
                        <span className={Styles.quantity}>x{item.quantity}</span>
                        <span className={Styles.price}>R$ {item.plateDetails[0]?.preco}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={Styles.emptyState}>
            <FaShoppingBag className={Styles.emptyIcon} />
            <h3>Nenhum pedido ainda</h3>
            <p>Você ainda não realizou nenhum pedido.</p>
            <Link to="/plates" className={Styles.emptyLink}>
              <button>Ver Menu</button>
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}