import { useEffect, useState } from "react";
import MealItem from "./MealItem";
//funcao padrão para exportar o componente
export default function Meals() {
//controle de estado dos cards q serão importados    
const [loadedMeals, setLoadedMeals] = useState([]);
//hook para evitar o loop infinito ao chamar a função
useEffect(() => {
//função para obter a informação q está sendo transmitida através de uma API
//do backend, é possível usar o async pois é uma função dentro da função do componente
//o fetch, por padrão, já usa o método GET
    async function fetchMeals() {
        const response = await fetch('http://localhost:3000/meals');
        if(!response.ok) {
    
        }
    //variável para guardar a resposta da API
    const meals = await response.json()   
    setLoadedMeals(meals);
    }
    //chamada da função
    fetchMeals();
}, []);


//o q o componente irá retornar, uma lista desordenada com os dados especificados
//de cada item no backend
return <ul id="meals">{loadedMeals.map((meal) => (
<MealItem key={meal.id} meal={meal} />
))}
</ul>
    
}