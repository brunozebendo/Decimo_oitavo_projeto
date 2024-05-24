import { useContext } from 'react';
import Modal from './Modal';
import CartContext from '../../store/CartContext'
import Button from "./Button"
import UserProgressContext from '../../store/UserProgressContext';
import CartItem from './CartItem';
/**esse componente vai criar a lógica para mostrar o carrinho de compra
 * em um modal, ou seja, ele vai reunir as informações dos itens selecionados
 * nos cards e a quantidade selecionada. Por isso, mais abaixo, foi usado o CartContext
 * que é o outro componente q está compartilhando as informações através do useContext
 *Depois, dentro do ul, é passado um map para iterar pelos itens do card
 e mostrá-lo no cart
 Também foi importado o UserProgressContext que é o componente criado
 para controlar o abrir e o fechar do cart. Reparar que o nome da variável é o mesmo
 da função, mas "resumido"
 Lembrando que mesmo sendo um modal e não "aparecendo" na renderização da UI
 do DOM inicialmente, ele tem que ser passado para o App.jsx 
 */
export default function Cart () {
const cartCtx = useContext(CartContext);
const UserProgressCtx = useContext(UserProgressContext);
/**aqui uma fórmula para calcular o total dos itens, começando em zero
 * multiplicando a quantidade pelo preço do item, esse totalPrice, aparentemente,
 * é um parâmetro da própria função que vai reduzir, ou seja, somar, todos 
 * os itens selecionados, depois o cartTotal está no return
*/
const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price, 0);
/**essa função utiliza o context criado no componente UserProgressContext para
 * controlar o estado de mostrar e fechar o modal do cart, aqui, para fechar,
* por isso é passada no botão abaixo
*/
function handleCloseCart() {
    UserProgressCtx.hideCart();
}
/**aqui é a função que vai ser passada abaixo para abrir o modal do checkout
 * quando o botão for clicado
 */
function handleGoToCheckout() {
    UserProgressCtx.showCheckout();
}
/**aqui a lógica para abrir o modal se o valor setado for cart, conforme lógica no context,
 * e para fechar caso seja pressionado o esc o valor é modificado e assim o sistema
 * entende q foi fechado e permite abrir novamente.
 */
return (<Modal
    className='cart'
    open={UserProgressCtx.progress === 'cart'}
    onClose=
    {UserProgressCtx.progress === 'cart' ? handleCloseCart : null}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map((item) => (
                /**o componente abaixo foi criado a parte e aqui customizado
                 * com os itens que devem ser mostrados e chamando a função
                 * já criada anteriormente para incluir e remover itens.
                 */
            <CartItem 
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={()=> cartCtx.addItem(item)}
            onDecrease={()=> cartCtx.removeItem(item.id)}/>
            ))}
        </ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button textOnly onClick={handleCloseCart}>Close </Button>
//aqui é a lógica para só mostrar o botão de Checkout se houver itens no carrinho
            {cartCtx.items.lenght > 0 &&
             (<Button onClick={handleGoToCheckout}>Go to Checkout</Button>)}
            </p> 
    </Modal>
    );
}