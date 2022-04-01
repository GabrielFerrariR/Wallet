// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCY_LIST = 'CURRENCY_LIST';
export const ADD_EXPENSE = 'ADD_EXPENSE';

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

export const fetchAndAddExpense = (payload) => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => dispatch(addExpense({ ...payload, exchangeRates: data })));
