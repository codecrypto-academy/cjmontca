import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createContext, useState} from 'react'
import { QueryClient,QueryClientProvider } from 'react-query'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
//import './index.css'
import { Cesta } from './components/Cesta'
import { Home } from './components/Home'
import { Productos } from './components/Productos'
import { Producto } from './components/Producto'

const queryClient = new QueryClient();
export const Context = createContext(null)

function App() {
  
  const [estado, setEstado] = useState({
    cesta: []
  })
  return <Context.Provider value={[estado, setEstado]}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}>
              <Route index element={<Productos></Productos>}></Route>
              <Route path="*" element={<Productos></Productos>}></Route>
              <Route path="productos" element={<Productos></Productos>}></Route>
              <Route path="productos/:id" element={<Producto></Producto>}></Route>
              <Route path="cesta" element={<Cesta></Cesta>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>    
  </QueryClientProvider>
</Context.Provider>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
