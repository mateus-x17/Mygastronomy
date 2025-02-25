import React, { useEffect, useState } from "react"; 
import Styles from './notificationsPopUp.module.css'; // Importa o arquivo de estilos

const Notification = ({ message, onClose, bgColor }) => {
  // Estado local para controlar a visibilidade da notificação
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Define um temporizador para esconder a notificação após 3 segundos
    const timer = setTimeout(() => {
      setVisible(false); // Atualiza o estado para ocultar a notificação
      onClose(); // Chama a função onClose do componente pai para remover a notificação
    }, 3000);

    // Cleanup: limpa o temporizador se o componente for desmontado antes dos 3s
    return () => clearTimeout(timer);
  }, [onClose]); // Executa sempre que onClose mudar

  // Se a notificação estiver invisível, não renderiza nada
  if (!visible) return null;

  return <div className={Styles.notification} style={{ backgroundColor: bgColor }}>{message}</div>;
};

export default Notification;