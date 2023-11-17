import React, { useReducer } from "react";
import pokemonContext from "./pokemonContext";
import pokemonReducer from "./pokemonReducer";

import {
    URL_POKEMON,
    NAME_POKEMON,
} from "../../types/index.js";

const PokemonState = (props) => {

    const initialState = {
        url: '',
        name: ''
    };

    //useReducer
    const [state, dispatch] = useReducer(pokemonReducer, initialState);

    //Funciones
    const capturarUrlPokemon = (_url) => {
        dispatch({
            type: URL_POKEMON,
            payload: _url,
        });
    }
    const capturarNamePokemon = (_name) => {
        dispatch({
            type: NAME_POKEMON,
            payload: _name,
        });
    }

    return (
        <pokemonContext.Provider
            value={{
                url: state.url,
                name: state.name,
                capturarUrlPokemon,
                capturarNamePokemon,
            }}
        >
            {props.children}
        </pokemonContext.Provider>
    );
};

export default PokemonState;