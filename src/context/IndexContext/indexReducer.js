import {
    MOVIMIENTO_INDEX
} from "../../types/index";
  
  export default (state, action) => {
    switch (action.type) {
      case MOVIMIENTO_INDEX:
        return {
          ...state,
          index: action.payload
        };
      
      default:
        return state;
    }
  };