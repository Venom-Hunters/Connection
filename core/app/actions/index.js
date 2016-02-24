import axios from 'axios';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_REGISTER = 'USER_REGISTER';

export function login(props) {
  const request = axios.post('http://localhost:8081/auth/login', props);

  return {
    type: USER_LOGIN,
    payload: request
  };
}

export function register(props) {
  const request = axios.post('http://localhost:8081/auth/addAccount', props);

  return {
    type: USER_REGISTER,
    payload: request
  };
}
