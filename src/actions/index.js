// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCY_LIST = 'CURRENCY_LIST';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const TOGGLE_ADD_EDIT = 'TOGGLE_ADD_EDIT';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const toggle = (payload = {}) => ({
  type: TOGGLE_ADD_EDIT,
  payload,
});

export const editExpense = (payload, expenseToEdit) => ({
  type: EDIT_EXPENSE,
  payload,
  expenseToEdit,
});

export const login = (email, password) => ({
  type: USER_LOGIN,
  email,
  password,
});

export const currencyListFill = (currencies) => ({
  type: CURRENCY_LIST,
  currencies,
});

export function fetchCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((curr) => dispatch(currencyListFill(Object.keys(curr)
      .filter((arr) => arr !== 'USDT'))));
}

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  expense,
});

export const fetchAndAddExpense = (payload) => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => dispatch(addExpense({ ...payload, exchangeRates: data })));
