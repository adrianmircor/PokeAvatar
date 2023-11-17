import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LayoutPokemones from './components/LayoutPokemones'
import PokemonDescrip from './components/PokemonDescrip'

import PokemonState from './context/PokemonContext/pokemonState.js'
import IndexState from './context/IndexContext/indexState.js'


function App() {
  return (
    <IndexState>
      <PokemonState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutPokemones />} />
            <Route path="/pokemon" element={<PokemonDescrip />} />
          </Routes>
        </BrowserRouter>
      </PokemonState>
    </IndexState>
  );
}

export default App;
