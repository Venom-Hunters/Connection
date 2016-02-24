import axios from 'axios';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_LOGOUT = 'USER_LOGOUT';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export function login(props) {
  const request = axios.post('http://localhost:8081/auth/login', props);

  return {
    type: USER_LOGIN,
    payload: request
  };
}

export function userLogout(userId) {
  const request = axios.get();

  return {
    type: USER_LOGOUT,
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

export function updateUserProfile(userProfile) {
  const request = axios.put(`${ROOT_URL}/user/update`, userProfile);

  return {
    type: UPDATE_USER_PROFILE,
    payload: request
  };
}
