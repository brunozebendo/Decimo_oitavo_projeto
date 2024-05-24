import {currencyFormatter} from '../../util/formatting'
/**na aula 274 é criado esse componente que é o corpo do 
 * carrinho de compras, mostrando um resumo dos itens, mas não é o carrinho de 
 * compras todo que está no componente Cart. Assim, ele leva os itens que 
 * precisa mostrar e o onIncrease, onDecrease que no cart chamarão funções, conforme
 * lá está explicado
 */
export default function CartItem({name, quantity, price, onIncrease, onDecrease}) {
    return (
    <li className="cart-item">
        <p>{name}-{quantity} x {currencyFormatter.format(price)} </p>
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>)
}