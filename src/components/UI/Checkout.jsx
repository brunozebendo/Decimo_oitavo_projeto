import { useContext } from "react"
import Modal from "./Modal"
import CartContext from "../../store/CartContext"
import { currencyFormatter } from "../../util/formatting";
import Input from "./Input";
import Button from "./Button";
import UserProgressContext from "../../store/UserProgressContext";
import useHttp from "../../hooks/useHttp";

/**aqui é criado o config do useHook que vai ser chamado mais abaixo,
 * o método Post, pois o checkout vai inserir dados no backend e o headers
 * abaixo pois serão dados no formato json
 */
const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type':'aplication/json'
    }
};
/**esse componente está dentro do carrinho de compuras e abre quando se clica no botão
 * finaliza o carrinho de compras e abre um formulário com vários inputs, esse form
 * vai estar dentro de um Modal. Lembrando de também adicioná-lo ao App.js
 */

export default function Checkout () {
    /**aqui é importado os context pois são usados para mostrar o valor que vem do
     * carrinho e o userProgressContext foi o componente criado para controle
     * de abertura e fechamento desse modal e do cart
      */
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
/**aqui o custom hook criado para substituir a função request que tinha antes,
 * assim, nas {} todos os itens que são necessários (dados, o status do carregamento,
 * auqi usado com um alias para aproveitar o nome anterior, o error,
 * o sendrequest q foi acima configurado e o cleardata que foi criado para limpar
 * as condigurações após a submissão)
 */
    const {data, isLoading: isSending, error, sendRequest, clearData} = 
    useHttp('http://localhost:3000/orders', requestConfig);
/**aqui foi copiada a função para calcular o total do carrinho */
    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price, 0);
/**aqui a função passada no button para fechar o checkout, usando o context
 * importado acima
 */
    function handleClose() {
        userProgressCtx.hideCheckout();
    }
/**aqui a função para lidar com a finalização do formulário, ele se comunica
 * com a função criada no CartContext
 */
    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }
    /**aqui a lógica do que fazer quando o form for submetido, primeiro, evitar
     * a submissão padrão passando essa função abaixo no submit e depois
     * usando essa sintaxe para capturar todos os valores informado nos inputs
     */
    function handleSubmit (event) {
        event.preventDefault();

        const fd = new FormData (event.target);
        const customerData = Object.fromEntries(fd.entries());
/**abaixo a chamada da função para enviar os dados para o backend, essa função
 * foi criada no componente useHttp
*/
        sendRequest(JSON.stringyfy({
        order: {
            items: cartCtx.items,
            customer: customerData
        },
    }));
/**aqui os botões foram declarados antes como actions, como um módulo para que não sejam
 * mostrados quando o status do issending for true, ou seja, q sejam ocultados
 * os botões quando o formulário for enviado, por isso o if abaixo
 */
    let actions = (
       <> <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }
/**o código abaixo retorna um modal que será mostrado se houver dados a serem envaidos
 * e não houver erro
 */
    if (data && !error) {
        return <Modal open={userProgressCtx.progress==='checkout'} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you more details via email within the next few minutes</p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
            
    }

/**então é estabelecido o método fetch para mandar os dados para o endereço
 * através do POST mandando os dados da compra (items) e os dados do cliente (customer)
 * esse código foi comentado pois foi substituido pelo custom hook acima.
 */
        /* fetch('http://localhost:3000/orders', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        });
    } */

return <Modal
     open={userProgressCtx.progress === 'checkout'}
     onClose={userProgressCtx.progress === 'cart' ? handleClose : null}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
            <Input label="Full Name" type="text" id="name" />
            <Input label="E-mail Address" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>

            {error && <Error title="Failed to submit order" message={error}/>}
            <p className="modal-actions">
               {actions}
            </p>
        </form>

    </Modal>
}