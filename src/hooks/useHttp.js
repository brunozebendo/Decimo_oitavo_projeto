import { useEffect, useState } from "react";
/**esse componente vai ser um hook customizado, por isso tem q começar 
 * com use
 */
/**essa função abaixo é uma função genérica que aceita um endereço de url
 * e algumas configurações e serve para quando o componente enviar dados e então
 * virá alguma resposta. O professor explica meio genericamente, mas acho que é mesmo
 * um componente genérico
 */
async function sendHttpRequest(url, config){
    const response = await fetch(url, config);
/**abaixo é a resposta do backend a depender do erro que der, pois lá
 * tem várias possibilidades de erro.
 */
    const resData = await response.json();
/**assim, se der erro, vai mostrar a mensagem de erro, conforme configurado
 * no backend ou uma mensagem genérica
 */
    if(!response.ok) {
        throw new Error(
            resData.message || 'Something went wrong, failed to send request'
        )
    }
    /**se der certo, retorna o resData, normal */
    return resData;
}
/**aqui é o hook em si, que usa também a função mais genérica acima, aqui,
 * além do padrão url, config, itens obrigatórios em um método request, tem
 * o initialData passado como valor inicial do data pois estava dando erro
 * enquanto os dados não eram carregados
 */
export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

function clearData() {
    setData(initialData),
};
/**essa segunda função (sendRequest) é quase como a de cima, que é mais genérica, mas ela
 * vai atualizar algum estado com base no status do request. Assim, foram criados os
 * states acima para controlar os dados (data), o carregamento(loading) e o erro.
 * No try foi preciso incluir o await para q a função não proseguisse sem os 
 * dados, o que estava dando erro. Na aula 280 o hook é usado no checkout, que
 * envia os dados para o backend, por isso foi incluído (data) e {...config, body: data}
 * para que a função aceite outras configurações que não o GET padrão e o body
 * aceite o data
 */
    const sendRequest = useCallback(
    async function sendRequest(data) {
        setIsLoading(true)
    try {
        const resData = await sendHttpRequest(url, {...config, body: data});
        setData(resData);
    } catch (error) {
        setError(error.message || 'Something went wrong');
    }
    setIsLoading(false);
}, [url, config]);
/**como o hook pode ser chamado em momentos diferentes, ou seja, o request
 * pode ser automático quando mudar uma das dependências (url, config) ou
 * pode ser quando o form for submetido, ele foi envolto no useEffect abaixo,
 * que vai verificar se o config (q entendi ser o q leva o método get, set, etc...)
 * existe então (se o método for igual ao GET ou se não for configurado) ou mesmo
 * se não existir a função é passada. 
 */
    useEffect(() => {
        if(config && (config.method === 'GET' || !config.method) || !config) {
        sendRequest();
    }
    }, [sendRequest, config]);
/**no return é preciso compartilhar os itens que os componentes que usarão
 * o hook precisam ter acesso
 */
    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    };
}