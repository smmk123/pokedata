import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter,Routes, Route } from "react-router-dom";
import NavBar from './components/navbar';
import PokemonDetail from './components/pokemonDetails';
import PokemonListV3 from './components/pokemonListv3';

import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient()

function App() {
  return (
    <div className='container'>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path="/" element={<PokemonListV3/>}/>
    <Route path="/pokemon/:id" element={<PokemonDetail />}/>
    </Routes>
    </BrowserRouter>
    <ReactQueryDevtools/>
    </QueryClientProvider>
    </div>
  );
}

export default App;
