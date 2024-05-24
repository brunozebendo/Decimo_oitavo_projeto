import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"
/**esse componente vai garantir que o componente do carrinho abra na tela sob os demais
 * para isso aqui vai ser criado um modal "genérico". Na aula 275 é incluído o onClose
 * pois o modal fechava quando se pressiona o Esc, mas não abre novamente já que
 * o código pensa q ele ainda está aberto, assim esse props pode servir para controlar
 * isso no próprio componente
 */
export default function Modal ({children, open, className = '', onClose={onClose} }) {
/**aqui é criada uma lógica para usar o open do <dialog> de forma mais controlada
 * por isso é criado um useRef que se relaciona com o dialog abaixo e no useEffect
 * se o open for true o modal é mostrado. Mais para frente foi trabalhada
 * a possibilidade de fechamento do modal, para isso, foi criada uma variável,
 * modal, para guardar o valor provisório do dialog e se o open (um valor interno
 * do modal) for true, é chamada a função para mostrar o Modal, se o [open] rodar novamente
 * e não for true, ele fecha o modal. 
 */
const dialog = useRef();

    useEffect(() => {
    const modal = dialog.current;

    if (open) {
        modal.showModal();
    }

    return () => modal.close()
}, [open])
/**aqui é retornado o createPortal, lembrando que o getElementByid tem que combinar
 * com um nome q está no index.html, determinando onde ele vai aparecer. o ref está 
 * explicado acima, o className foi setado de forma dinâmica, tendo o cuidado na props
 * acima de passar um valor inicial '' para não dar undefined e {children} é para aceitar
 * o que o componente filho atribuir.
  */
return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose>
        {children}
    </dialog>,
    document.getElementById('modal')
);
}