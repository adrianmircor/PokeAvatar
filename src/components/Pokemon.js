import React, { useContext } from "react";
import { Link } from "react-router-dom";

import pokemonContext from "../context/PokemonContext/pokemonContext";

import styled from "styled-components";

const Span = styled.span`
  font-size: 2rem;
  text-transform: uppercase;
`;

const Pokemon = ({ pokemon }) => {

    const { capturarUrlPokemon, capturarNamePokemon } = useContext(pokemonContext);

    const handleLink = (pokemon) => {
        capturarUrlPokemon(pokemon.url);
        capturarNamePokemon(pokemon.name);
    };

    return (
        <>
            <Link
                className="linkreact"
                style={{ textDecoration: "none", color: "black", display: "flex", justifyContent: "center", alignItems: "center" }}
                to="/pokemon"
                onClick={() => handleLink(pokemon)}
            >
                <Span>{pokemon.name}</Span>
            </Link>
        </>
    );
};

export default Pokemon;
