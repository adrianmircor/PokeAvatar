import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import PokemonLayout from './components/PokemonLayout'
import PokemonDetalle from './components/PokemonDetalle'

import PokemonState from './context/PokemonContext/pokemonState.js'
import IndexState from './context/IndexContext/indexState.js'

function App() {
  return (
    <IndexState>
      <PokemonState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PokemonLayout />} />
            <Route path="/pokemon" element={<PokemonDetalle />} />
          </Routes>
        </BrowserRouter>
      </PokemonState>
    </IndexState>
  );
}

export default App;
