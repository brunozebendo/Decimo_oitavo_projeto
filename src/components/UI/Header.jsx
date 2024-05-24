import { useContext } from 'react'
import logoImg from '../../assets/logo.jpg'
import Button from './Button'
import CartContex from '../../store/CartContext'
import UserProgressContext from '../../store/UserProgressContext';

export default function Header () {
    /**como no Header é preciso mostrar a quantidade dos itens adicionados é
     * novamente usado o userContext que importa não o componente mas o objeto que
     * está no componente CartContext.jsx :
 const CartContext = {
    items: cart.items,
    addItem,
    removeItem
};
     */
    const cartCtx = useContext(CartContex);
    const UserProgressCtx = useContext(UserProgressContext)

/**então aqui é usada a função reduce para o total de itens no geral adicionados ao carrinho
 * ou seja, o item + a quantidade de cada item, nesse caso o lenght não daria certo  */
    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);
/**essa função utiliza o context criado no componente UserProgressContext para
 * controlar o estado de mostrar e fechar o modal do cart, aqui, para mostrar,
 * por isso é passada no botão abaixo
 */
    function handleShowCart() {
        UserProgressCtx.showCart();
    }

    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt ="a restaurant" />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        </nav>
    </header>
}