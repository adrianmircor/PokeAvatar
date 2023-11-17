import React, { useEffect, useState, useContext } from 'react';

import Pokemon from './Pokemon';
import indexContext from "../context/IndexContext/indexContext";

import axios from "axios";
import styled from 'styled-components';


const ContenedorPrincipal = styled.div`
  display: grid;
  min-height: 100vh;
  margin: 0 auto;
  max-width: 800px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 5fr;
`;
const H4 = styled.h4`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 0;
`;

const ContenedorLayout = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  font-size: 2rem;
`;

const Boton = styled.button`
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  padding: 15px;
  cursor:pointer;
`;

const ContenedorBotones = styled.div`
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  padding: 15px;
`;

const PokemonLayout = () => {

    const [pokemones, setPokemones] = useState([]);
    const [loading, setLoading] = useState(true);

    const { index, movimientoIndex } = useContext(indexContext);

    useEffect(() => {
        callApiPoke();
    }, [index]);

    const callApiPoke = async () => {

        let pokemonesApi = '';
        await axios
            .get(`https://pokeapi.co/api/v2/pokemon-species?offset=${index}&limit=20`)
            .then((res) => {
                pokemonesApi = res.data.results;
                setPokemones(pokemonesApi);
                setLoading(true);
            })
            .catch((error) => {
                console.log(error);
            });

        return;
    };

    const handleLink = (_movimiento) => {
        let cantidadPaginacion = 0;
        if (_movimiento == "siguiente") {
            cantidadPaginacion = index + 20;
            movimientoIndex(cantidadPaginacion)
        } else if (_movimiento == "anterior") {
            cantidadPaginacion = index - 20;
            movimientoIndex(cantidadPaginacion)
        }
    };

    return (
        <ContenedorPrincipal>
            <H2>POKEMON - AVATAR</H2>
            {loading === true ? (
                <>
                    <ContenedorLayout>
                        {pokemones.map((pokemon, i) => {
                            return <Pokemon key={i} pokemon={pokemon}></Pokemon>
                        })}
                    </ContenedorLayout>
                    <ContenedorBotones>
                        {(index != 0) ? (<Boton
                            style={{ textDecoration: "none", color: "black" }}
                            onClick={() => handleLink("anterior")}
                        >
                            <span>ANTERIOR</span>
                        </Boton>) : <div></div>}

                        {(index < 1000) ? (<Boton
                            style={{ textDecoration: "none", color: "black" }}
                            onClick={() => handleLink("siguiente")}
                        >
                            <span>SIGUIENTE</span>
                        </Boton>) : <div></div>}
                    </ContenedorBotones>
                </>
            ) : (
                <H4>Cargando... : </H4>
            )}
        </ContenedorPrincipal>
    )
}

export default PokemonLayout;