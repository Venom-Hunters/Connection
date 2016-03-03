import axios from "axios";

export const USER_LOGIN = "USER_LOGIN";
export const USER_REGISTER = "USER_REGISTER";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_GET = "USER_GET";
export const USER_SEARCH = "USER_SEARCH";
export const INITIATE_SOCKET = "INITIATE_SOCKET";

export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
export const GET_USER_TEAMS = "GET_USER_TEAMS";
export const SET_ACTIVE_TEAM = "SET_ACTIVE_TEAM";
export const GET_ACTIVE_TEAM_CHATS = "GET_ACTIVE_TEAM_CHATS";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const JOIN_ROOM = "JOIN_ROOM";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const GET_MESSAGE = "GET_MESSAGE";

export const CREATE_TEAM = "CREATE_TEAM";
export const ADD_TEAM_MEMBERS = "ADD_TEAM_MEMBERS";


const ROOT_URL = "https://localhost:8888";

export function login(props) {
  const request = axios.post(`${ROOT_URL}/auth/login`, props);

  return {
    type: USER_LOGIN,
    payload: request
  };
}

export function initiateSocket() {
  let socket = io();

  return {
    type: INITIATE_SOCKET,
    payload: socket
  };
}

export function getUser() {
  const request = axios.get(`${ROOT_URL}/user/getUser`);

  return {
    type: USER_GET,
    payload: request
  };
}

export function userLogout(userId) {
  const request = axios.get(`${ROOT_URL}/auth/logout`);

  return {
    type: USER_LOGOUT,
    payload: request
  };
}

export function register(props) {
  const request = axios.post(`${ROOT_URL}/auth/addAccount`, props);

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

export function getUserTeams() {
  const request = axios.get(`${ROOT_URL}/team/getTeams`);

  return {
    type: GET_USER_TEAMS,
    payload: request
  };
}

export function setActiveTeam(team) {
  const request = axios.put(`${ROOT_URL}/user/updateActiveTeam`, team);

  return {
    type: SET_ACTIVE_TEAM,
    payload: team
  };
}

export function getActiveTeamChats(teamId) {
  const request = axios.get(`${ROOT_URL}/chat/${teamId}`);

  return {
    type: GET_ACTIVE_TEAM_CHATS,
    payload: request
  };
}

export function addMessage (message) {

  return {
    type: ADD_MESSAGE,
    payload: message
  };
}

export function createTeam(newTeam) {
  const request = axios.post(`${ROOT_URL}/team/create`, newTeam);

  return {
    type: CREATE_TEAM,
    payload: request
  };
}

export function searchUsers(searchTerm) {

  const request = axios.post(`${ROOT_URL}/user/search`, {
    searchTerm: searchTerm
  });

  return {
    type: USER_SEARCH,
    payload: request
  };
}

export function addTeamMembers(teamId, newMembers) {
  const request = axios.post(`${ROOT_URL}/team/addMembers/${teamId}`, newMembers);

  return {
    type: ADD_TEAM_MEMBERS,
    payload: request

  };
}
