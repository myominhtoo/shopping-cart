import {Container} from 'react-bootstrap';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Store} from "./pages/Store";
import {About} from "./pages/About";
import { Navbar } from './components/Navbar';
import { CartContextProvider } from './context/CartContext';

function App() {
  return (
       <>
        <CartContextProvider>
          <Navbar/>
          <Container className='bg-light' >
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/store' element={<Store/>} />
                  <Route path='/about' element={<About/>} />
              </Routes>
          </Container>
        </CartContextProvider>
       </>
  )
}

export default App
