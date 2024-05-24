import { createContext, useState } from "react";
/**quando estava construindo o carrinho de compras, viu-se a 
 * necessidade de criar uma lógica para ele abrir e fechar,
 * o professor adotou a lógica de criar esse context para
 * ter aqui as funções e controle de estado e depois
 * no App.jsx colocá-lo por fora dos outros itens para
 * dar acesso a todos.
 * Esse atributo progress acho que é uma forma de controlar
 * o open, pois mais abaixo a função showCart recebe o argumento 'cart' e
 * no componente cart, que é o do carrinho de compras, o open está assim
 * <Modal className='cart' open={UserProgressCtx.progress === 'cart'}>
 * Só não entendi como esse progress vai receber o checkout, acho q é 
 * setado automaticamente, já que ele é setado aqui como atributo
 */
const UserProgressContext = createContext({
    progress: '', //'cart', 'checkout'
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
});

/**aqui é setado um state e abaixo as funções q vão
 * modificá-lo conforme forem chamadas. Observar q há dois exports, uma 
 * da função abaixo e outra do próprio componente q servirá para dar acesso aos 
 * outros componentes. Essa função foi usada no header, por exemplo. 
 */
export function UserProgressContextProvider({children}) {
const [userProgress, setUserProgress] = useState('');

function showCart(){
    setUserProgress('cart');
}
function hideCart(){
    setUserProgress('');
}
function showCheckout(){
    setUserProgress('checkout');
}
function hideCheckout(){
    setUserProgress('');
}
/**aqui é criado um objeto para juntar todas as funções e, mais abaixo,
 * ele é passado no value
 */
const UserProgressCtx ={
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
}

    return (
        <UserProgressContext.Provider value={UserProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    )
}

export default UserProgressContext;