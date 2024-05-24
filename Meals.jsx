import MealItem from "./src/components/UI/MealItem";
import useHttp from "./src/hooks/useHttp";
import Error from "./src/components/UI/Error";

const requestConfig = {};

/*funcao padrão para exportar o componente, abaixo é criada a função que recebe
os parâmetros para usar o hook useHttp para fazer o request, ou seja, passar
para o backend as informações das refeições selecionadas. O requestConfig entra
como o config obrigatório (acho...) e foi chamado fora do escopo pois estava dando
um loop, já o [] é para não dar erro enquanto carrega, ou seja, é o initialData passado
no hook*/

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />
  }

  //essa parte está toda comentada pois foi substituida por um hook personalizado o useHttp
  //controle de estado dos cards q serão importados
  //const [loadedMeals, setLoadedMeals] = useState([]);
  //hook para evitar o loop infinito ao chamar a função
  //useEffect(() => {
  //função para obter a informação q está sendo transmitida através de uma API
  //do backend, é possível usar o async pois é uma função dentro da função do componente
  //o fetch, por padrão, já usa o método GET
  /* async function fetchMeals() {
        const response = await fetch('http://localhost:3000/meals');
        if(!response.ok) {
    
        }
    //variável para guardar a resposta da API
    const meals = await response.json()   
    setLoadedMeals(meals);
    }
    //chamada da função
    fetchMeals();
}, []);*/

  //o q o componente irá retornar, uma lista desordenada com os dados especificados
  //de cada item no backend

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
