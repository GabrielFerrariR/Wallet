// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_LIST } from '../actions';

const INTITAL_STATE = {
  currencies: [],
  expenses: [],
};

const currencyReducer = (state = INTITAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_LIST:
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};
export default currencyReducer;
