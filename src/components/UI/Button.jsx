/**esse é um componente genérico para botões, então recebe como props
 * o children para que seja aceito o que for incluído no componente
 * que o recebe, o textOnly para o botão que só for aceitar texto (acho q é isso),
 * className para classes customizadas a depender do botão e para os outros
 * props que não forem específicados, ...props
 */
export default function Button ({children, textOnly, className, ...props}) {
/**aqui uma forma de setar dinâmicamente a classe a ser aplicada */
    let cssClasses = textOnly ? 'text-button' : "button";
    cssClasses += ' ' + className;

    return (
    <button className={cssClasses} {...props}>
        {children}
    </button>);
}