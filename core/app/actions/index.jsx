import axios from 'axios';


export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';


const ROOT_URL = 'http://localhost:27017'

export function userLogin(user) {
	const request = axios.post(`${ROOT_URL}/auth/login`, user);

	return {
		type: USER_LOGIN,
		payload: request
	}
};

export function userLogout(userId) {
	const request = axios.get(`${ROOT_URL}/auth/logout/${userId}`);

	return {
		type: USER_LOGOUT,
		payload: request
	}
};

export function addAccount(userInfo) {
	const request = axios.post(`${ROOT_URL}/auth/addAccount/`, userInfo);

	return {
		type: CREATE_ACCOUNT,
		payload: request
	}
}

export function updateUserProfile(userProfile) {
	const request = axios.put(`${ROOT_URL}/user/update`, userProfile);

	return {
		type: UPDATE_USER_PROFILE,
		payload: request
	}
};



