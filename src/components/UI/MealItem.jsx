import { useContext } from "react";
import { currencyFormatter } from "../../util/formatting.js";
import Button from '../UI/Button.jsx'
import CartContex from "../../store/CartContext.jsx";

/**aqui é o código para cada item q vai ser mostrado na tela, ele é criado
 * nesse molde abaixo e só é importado para o Meals, por isso o prop abaixo {meal},
 * que lá é passado no return
 */
export default function MealItem ({meal}) {
    /**aqui foi criada uma variável usando o useContext para obter os valores
     * setados no objeto CartContext do componente CartContext.jsx, que lá está assim:
const CartContext = {
    items: cart.items,
    addItem,
    removeItem
};*/
    const cartCtx = useContext(CartContex);
/**assim, a função abaixo usa a variável acima para acessar a função de adicionar
 * que mais abaixo é passada no onClick do Button
 */
    function handleAddMealToCart () {
        cartCtx.addItem(meal);
    }

    return (<li className="meal-item">
/**a tag article é para um item q se repete muito, não entendi muito bem... */
        <article>
/**as imagens estão disponibilizadas no endereço abaixo, por isso foi preciso usar essa sintaxe */
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <div>
                <h3>{meal.name}</h3>
        //usado o código para formatar o número para moeda
                <p className="meal-item-price">{currencyFormatter.meal.price}</p>
                <p className="meal-tem-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={handleAddMealToCart}>Add to Cart</Button>
            </p>
        </article>
    </li>);
};