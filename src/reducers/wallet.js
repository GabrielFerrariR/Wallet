// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_LIST, ADD_EXPENSE, REMOVE_EXPENSE } from '../actions';

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
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp !== action.expense),
    };
  default:
    return state;
  }
};
export default currencyReducer;
