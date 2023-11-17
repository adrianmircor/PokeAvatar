import {
    URL_POKEMON,
    NAME_POKEMON
} from "../../types/index";
  
  export default (state, action) => {
    switch (action.type) {
      case URL_POKEMON:
        return {
          ...state,
          url: action.payload
        };
      case NAME_POKEMON:
        return {
          ...state,
          name: action.payload
        };
      
      default:
        return state;
    }
  };