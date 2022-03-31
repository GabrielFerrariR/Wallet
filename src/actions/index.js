// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const CURRENCY_LIST = 'CURRENCY_LIST';

export const login = (email, password) => ({
  type: USER_LOGIN,
  email,
  password,
});

export const currencyListFill = (currencies) => ({
  type: CURRENCY_LIST,
  currencies,
});

export const testAction = () => ({
  type: 'teste',
});

export function fetchCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((curr) => dispatch(currencyListFill(Object.keys(curr)
      .filter((arr) => arr !== 'USDT'))));
}
