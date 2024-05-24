import Cart from "./components/UI/Cart";
import Checkout from "./components/UI/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import {UserProgressContextProvider} from "./store/UserProgressContext";

function App() {  
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout /> 
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
