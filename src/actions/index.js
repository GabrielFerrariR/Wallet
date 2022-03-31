// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';

export const login = (email, password) => ({
  type: USER_LOGIN,
  email,
  password,
});
