import { createContext, useReducer } from "react";
/**esse componente vai servir para transportar dados dos componentes inseridos
 * no botão add to cart,como são dados que serão usados em diferentes locais,
 * como no próprio card e no modal do carrinho de compras que vai abrir, foi 
 * usado o createContex que dá acesso ao componente para toda a árvore DOM.
 * Para isso ele foi importado acima e foram setados valores iniciais abaixo,
 * que não são obrigatórios, mas ajudam no autocomplete e no planejamento, aqui
 * a ideia é administrar um array de items e ter uma função para adicionar e remover
 */
const CartContex = createContext ({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});
/**aqui é a função reducer em si, lidando com as difentes possibilidades, primeiro,
 * caso a ação seja de adicionar um item, sendo necessário nesse caso, verificar se esse 
 * item já está no array
 */
function cartReducer(state, action) {
    /**aqui a lógica para verificar se o item que está sendo adicionado
     * já consta no array*/
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id);
        const updatedItems = [...state.items];
/*se o findIndex não encontrar o item, ele retorna -1, portanto, se for maior que -1, ele
encontrou o item e é mantido o array, mas é possível atualizar a quantidade do item.
Esse quantity acho que é uma variável aqui criada e já setada para ser atualizada. */
        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex]
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            /**aqui é feita a chamada para atualizar o array com o item já existente
             * mas com a quantidade atualizada.
              */
          updatedItems[existingCartItemIndex] = updatedItem;
/**já aqui se o item não foi encontrado pelo findIndex, ele é adicionado, usando
 * o array anterior e incluindo o novo item
 */
        } else {
          updatedItems.push({...action.item, quantity: 1});
        }
        /**aqui o return da função para addItem que vai retornar o estado geral atualizado
         * e o os itens atualizados.
         */
        return {...state, items: updatedItems};
    }
    /**aqui a lógica para remover itens */
    if (action.type === 'REMOVE_ITEM'){
        /**a mesma lógica acima para achar o item */
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        /**a variável para setar o item encontrado e abaixo o array
         * de itens atualizados, usados na lógica mais abaixo.
         */
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        /**aqui a lógica para remover o item do array se a quantidade for apenas
         * 1, para isso foi usado o splice que pode remover ou substituir itens do
         * array. Aqui foi usado para remover o item, o 1 depois da vírgula significa
         * um item só a ser removido
         */
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        /**mas se a quantidade de itens for maior que um, ele vai copiar o antigo
         * array e atualizar a quantidade
          */
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {...state, items: updatedItems};
    }
/**esse if serve para voltar o site para o estado original após o checkout, por isso
 * ele está ligado a função clearcard abaixo e depois a função handlefinish no componente
 * Checkout
 */
    if (action.type === "CLEAR_CART") {
        return{...state, items: []};
    }

    return state;
}

export function CartContextProvider ({children}) {

/**como o context só serve para tornar as informações acessíveis para outros componente
 * também é preciso um hook para controlar o estado, aqui foi escolhido o useReducer
 * pois são vários estados diferentes, conforme a lógica acima, assim é a passada
 * a função e um estado inicial
 */
const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });
   
/**no return, mais abaixo, fica a sintaxe para garantir que qualquer componente que fique
 * envolvido entre essas tags terá acesso ao estado e às funções acima, por isso
 * o padrão usando o children. Aqui as funções ligando o tipo ao tipo criado acima,
 * já o item seria para ligar o item passado como atributo ao item das funções acima
 * item: item, mas é possível colocar só item
 */
function addItem(item) {
    dispatchCartAction({ type: 'ADD_ITEM', item});
}

function removeItem(id){
    dispatchCartAction({ type: 'REMOVE_ITEM', id });
}

function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART'})
}
/**aqui é setado o CartContext que mais abaixo é usado como Provider são passados
 * os "props" que serão usados nos outros componentes.
*/
const CartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
};
/**aqui o componente que vai envolver outros componentes, sendo o valor a variável
 * acima que, por sua vez, contém a referência às funções anteriores.
 */
    return <CartContext.Provider value={CartContext}>{children}</CartContext.Provider>;
}

export default CartContex;