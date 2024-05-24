/**Na aula 275 é criado esse componente para criar um Input genérico
 * que será recebido no Checkout, mas não entendi muito bem para q já q a única
 * função genérica aqui é o required, o resto foi digitado.
 *  
 */
export default function Input ({label, id, ...props}) {
    return <p className="control">
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} required {...props}/>
    </p>
}