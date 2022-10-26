import {Container} from 'react-bootstrap';
import { Navbar } from './components/Navbar';
import { StoreItem } from './components/StoreItem';
import { CartContextProvider } from './context/CartContext';
import items from './data/items.json';

function App() {
  return (
       <>
        <CartContextProvider>
          <Navbar/>
          <Container className='bg-light' >
            {items.map( item => {
              return (
                  <StoreItem key={item.id} {...item} />
              )
            })}
          </Container>
        </CartContextProvider>
       </>
  )
}

export default App
