import 'antd/dist/antd.min.css'
import './App.css';
import { OrderProvider } from './Context/OrderContext';
import { ProductProvider } from './Context/ProductContext';
import { UserProvider } from './Context/UserContext';
import Main from './Layout/Content';

function App() {
  return (
    <UserProvider>
      <ProductProvider>
        <OrderProvider>
          <Main/>
        </OrderProvider>
      </ProductProvider>
    </UserProvider>
  );
}

export default App;
