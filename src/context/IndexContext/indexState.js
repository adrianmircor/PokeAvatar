import React, { useReducer } from "react";
import indexContext from "./indexContext";
import indexReducer from "./indexReducer";

import {
    MOVIMIENTO_INDEX
} from "../../types/index.js";

const IndexState = (props) => {

    const initialState = {
        index: 0
    };

    //useReducer
    const [state, dispatch] = useReducer(indexReducer, initialState);

    //Funciones
    const movimientoIndex = (_index) => {
        dispatch({
            type: MOVIMIENTO_INDEX,
            payload: _index,
        });
    }

    return (
        <indexContext.Provider
            value={{
                index: state.index,
                movimientoIndex
            }}
        >
            {props.children}
        </indexContext.Provider>
    );
};

export default IndexState;