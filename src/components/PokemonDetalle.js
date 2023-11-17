import React, { useContext, useState, useEffect } from "react";

import pokemonContext from "../context/PokemonContext/pokemonContext";

import axios from "axios";
import styled from "styled-components";

const Contenedor = styled.div`
  display: grid;
  margin: 0 auto;
  max-width: 600px;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 0.5fr 3fr 0.5fr;
  height: 100vh;
`;
const H2 = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 0;
`;
const Span = styled.span`
  text-transform: uppercase;
`;
const Imagen = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
const ContenedorImagen = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const H4 = styled.h4`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0;
  `;
const H3 = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  margin: 0;
`;
const ContenedorInfo = styled.div`
  margin: 0;
`;

const PokemonDetalle = () => {

    const { url, name } = useContext(pokemonContext);
    const [pokemon, setPokemon] = useState({
        imagen: '',
        descripcion: '',
        genero: ''
    });
    const [loading, setLoading] = useState(false);

    let noData = "NO SE ENCONTRARON RESULTADOS";

    useEffect(() => {
        callApi();
    }, []);

    const callApi = () => {

        let id = url.split("/")[6]
        let genero = "";
        let imagen = "";
        let descripcion = "";
        let peso = "";
        let tamano = "";

        axios
            .get(url)
            .then((res) => {

                let responseGenero = res.data["genera"];
                for (let i = 0; i < responseGenero.length; i++) {
                    if (responseGenero[i]["language"]["name"] == 'es') {
                        genero = responseGenero[i]["genus"];
                    }
                }

                let responseDescripcion = res.data["flavor_text_entries"];
                let arrayDescripciones = [];
                for (let i = 0; i < responseDescripcion.length; i++) {
                    if (responseDescripcion[i]["language"]["name"] == 'es') {
                        descripcion = responseDescripcion[i]["flavor_text"];
                        arrayDescripciones.push(descripcion);
                    }
                }
                descripcion = arrayDescripciones.join("");

                axios
                    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    .then((res) => {
                        imagen = res.data["sprites"]["front_default"];
                        peso = res.data["weight"];
                        tamano = res.data["height"];
                        console.log(peso)
                        console.log(tamano)
                        setPokemon({ ...pokemon, imagen, genero, descripcion, peso, tamano })
                        setLoading(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });

    };

    return (
        (loading) ? (
            <Contenedor>
                <H2>
                    <Span>{name}</Span>
                </H2>
                <H3>
                    Tipo:<span style={{ fontWeight: "normal", whiteSpace: "pre" }}> {(pokemon.genero != '') ? pokemon.genero : noData}</span>
                </H3>
                <ContenedorImagen>
                    <Imagen src={pokemon.imagen} />
                </ContenedorImagen>
                <ContenedorInfo>
                    <p style={{ textAlign: "justify", margin: 0 }}>
                        <span style={{ fontWeight: "bold" }}>Peso: </span>{(pokemon.peso != '') ? pokemon.peso : noData}
                    </p>
                    <p style={{ textAlign: "justify", margin: 0 }}>
                        <span style={{ fontWeight: "bold" }}>Tamaño: </span>{(pokemon.tamano != '') ? pokemon.tamano : noData}
                    </p>
                    <p style={{ textAlign: "justify", margin: 0, paddingBottom: "20px" }}>
                        <span style={{ fontWeight: "bold" }}>Descripción: </span>{(pokemon.descripcion != '') ? pokemon.descripcion : noData}
                    </p>
                </ContenedorInfo>
            </Contenedor>
        ) : (
            <H4>Cargando... </H4>
        )
    );
};

export default PokemonDetalle;
