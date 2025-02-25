import { createContext, useContext, useState } from "react";
import Notification from '../components/notificationsPopUp/notificationsPopUp.jsx'

const CartContext = createContext() //atribui a criação de um contexto para a variavel CartContext

export const CartProvider = ({children}) => {
  const [cartItens, setCartItens] = useState([]) // cria um estado para os itens do carrinho

  const [showNotification, setShowNotification] = useState(false);
  const [notificationKey, setNotificationKey] = useState(0); // Estado para chave única
  const [sucessAdc, setSucessAdc] = useState(false)

  const handleNotification = () => {
    setShowNotification(false); // Garante que a notificação desapareça antes de ser reexibida
    setNotificationKey((prevKey) => prevKey + 1); // Atualiza a chave da notificação
    setTimeout(() => {
      setShowNotification(true); // Exibe a notificação novamente
      setTimeout(() => {
        setShowNotification(false); // Esconde após 3 segundos
      }, 3000);
    }, 10); // Pequeno delay para garantir a atualização
  }; // função para adicionar uma notificação PopUp

  const addToCart = (itemToAdd) => {
    const itemExists = cartItens.find((item) => item._id === itemToAdd._id); // verifica se o item já existe no carrinho
    
    if (!itemExists) {
      itemToAdd.quantidade = 1;
      setCartItens([...cartItens, itemToAdd]); // adiciona o item ao carrinho
      setSucessAdc(true); // Define que a notificação será positiva
    } else {
      setSucessAdc(false); // Define que a notificação será negativa
    }
    
    handleNotification(); // Chama a função de exibir a notificação
  };

  const removeFromCart = (itemToRemove) => {
    const cleanCartItens = cartItens.filter((item) => item._id !== itemToRemove._id) // remove o item do carrinho
    
    console.log(`item removido do carrinho: ${itemToRemove.nome}`)
    // adc popUp infomação de que o item foi removido

    setCartItens(cleanCartItens) // atualiza o carrinho sem o item removido
  } // remove um item do carrinho

  const updateCartItens = (itens) => {
    setCartItens(itens) 
  } // atualiza o carrinho com os itens passados como parametro

  const clearCart = () => {
    setCartItens([])
  } // limpa o carrinho

  return (
    <CartContext.Provider value={{cartItens, addToCart, removeFromCart, updateCartItens, clearCart}}>
      {children}
        {showNotification && (
          <Notification
          key={notificationKey}
          message={sucessAdc ? `Item adicionado ao carrinho!` : `Item já existe no carrinho!`}
          onClose={() => setShowNotification(false)}
          bgColor={sucessAdc ? "green" : "red"}
          />
        )}
    </CartContext.Provider> // retorna o contexto criado para o carrinho e seus componentes filhos
  );
} // cria um provedor de contexto para o carrinho (as funções acessadas pelos componentes filhos) 


export const useCartContext = () => {
    const context = useContext(CartContext) //usa o contexto criado para o carrinho
    if(!context){
        console.log("useCart deve ser usado dentro de um CartProvider, voce esta fora de contexto !")
    }
    return context
} // cria um hook personalizado para acessar o contexto
 