/**esse componente foi criado para dar um padrão a mensagem
 * de erro, se ela houver
 */
export default function Error() {    
    return (<div className="error">
        <h2>{title}</h2>
        <p>{message}</p>
    </div>);
}