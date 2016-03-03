webpackHotUpdate(0,{

/***/ 294:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ADD_TEAM_MEMBERS = exports.CREATE_TEAM = exports.GET_MESSAGE = exports.ADD_MESSAGE = exports.JOIN_ROOM = exports.SEND_MESSAGE = exports.GET_ACTIVE_TEAM_CHATS = exports.SET_ACTIVE_TEAM = exports.GET_USER_TEAMS = exports.UPDATE_USER_PROFILE = exports.INITIATE_SOCKET = exports.USER_SEARCH = exports.USER_GET = exports.USER_LOGOUT = exports.USER_REGISTER = exports.USER_LOGIN = undefined;
	exports.login = login;
	exports.initiateSocket = initiateSocket;
	exports.getUser = getUser;
	exports.userLogout = userLogout;
	exports.register = register;
	exports.updateUserProfile = updateUserProfile;
	exports.getUserTeams = getUserTeams;
	exports.setActiveTeam = setActiveTeam;
	exports.getActiveTeamChats = getActiveTeamChats;
	exports.addMessage = addMessage;
	exports.createTeam = createTeam;
	exports.searchUsers = searchUsers;
	exports.addTeamMembers = addTeamMembers;

	var _axios = __webpack_require__(295);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var USER_LOGIN = exports.USER_LOGIN = "USER_LOGIN";
	var USER_REGISTER = exports.USER_REGISTER = "USER_REGISTER";
	var USER_LOGOUT = exports.USER_LOGOUT = "USER_LOGOUT";
	var USER_GET = exports.USER_GET = "USER_GET";
	var USER_SEARCH = exports.USER_SEARCH = "USER_SEARCH";
	var INITIATE_SOCKET = exports.INITIATE_SOCKET = "INITIATE_SOCKET";

	var UPDATE_USER_PROFILE = exports.UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE";
	var GET_USER_TEAMS = exports.GET_USER_TEAMS = "GET_USER_TEAMS";
	var SET_ACTIVE_TEAM = exports.SET_ACTIVE_TEAM = "SET_ACTIVE_TEAM";
	var GET_ACTIVE_TEAM_CHATS = exports.GET_ACTIVE_TEAM_CHATS = "GET_ACTIVE_TEAM_CHATS";

	var SEND_MESSAGE = exports.SEND_MESSAGE = "SEND_MESSAGE";
	var JOIN_ROOM = exports.JOIN_ROOM = "JOIN_ROOM";
	var ADD_MESSAGE = exports.ADD_MESSAGE = "ADD_MESSAGE";
	var GET_MESSAGE = exports.GET_MESSAGE = "GET_MESSAGE";

	var CREATE_TEAM = exports.CREATE_TEAM = "CREATE_TEAM";
	var ADD_TEAM_MEMBERS = exports.ADD_TEAM_MEMBERS = "ADD_TEAM_MEMBERS";

	var ROOT_URL = "https://localhost:8888";

	function login(props) {
	  var request = _axios2.default.post(ROOT_URL + "/auth/login", props);

	  return {
	    type: USER_LOGIN,
	    payload: request
	  };
	}

	function initiateSocket() {
	  var socket = io();

	  return {
	    type: INITIATE_SOCKET,
	    payload: socket
	  };
	}

	function getUser() {
	  var request = _axios2.default.get(ROOT_URL + "/user/getUser");

	  return {
	    type: USER_GET,
	    payload: request
	  };
	}

	function userLogout(userId) {
	  var request = _axios2.default.get(ROOT_URL + "/auth/logout");

	  return {
	    type: USER_LOGOUT,
	    payload: request
	  };
	}

	function register(props) {
	  var request = _axios2.default.post(ROOT_URL + "/auth/addAccount", props);

	  return {
	    type: USER_REGISTER,
	    payload: request
	  };
	}

	function updateUserProfile(userProfile) {
	  var request = _axios2.default.put(ROOT_URL + "/user/update", userProfile);

	  return {
	    type: UPDATE_USER_PROFILE,
	    payload: request
	  };
	}

	function getUserTeams() {
	  var request = _axios2.default.get(ROOT_URL + "/team/getTeams");

	  return {
	    type: GET_USER_TEAMS,
	    payload: request
	  };
	}

	function setActiveTeam(team) {
	  var request = _axios2.default.put(ROOT_URL + "/user/updateActiveTeam", team);

	  return {
	    type: SET_ACTIVE_TEAM,
	    payload: team
	  };
	}

	function getActiveTeamChats(teamId) {
	  var request = _axios2.default.get(ROOT_URL + "/chat/" + teamId);

	  return {
	    type: GET_ACTIVE_TEAM_CHATS,
	    payload: request
	  };
	}

	function addMessage(message) {

	  return {
	    type: ADD_MESSAGE,
	    payload: message
	  };
	}

	function createTeam(newTeam) {
	  var request = _axios2.default.post(ROOT_URL + "/team/create", newTeam);

	  return {
	    type: CREATE_TEAM,
	    payload: request
	  };
	}

	function searchUsers(searchTerm) {

	  var request = _axios2.default.post(ROOT_URL + "/user/search", {
	    searchTerm: searchTerm
	  });

	  return {
	    type: USER_SEARCH,
	    payload: request
	  };
	}

	function addTeamMembers(teamId, newMembers) {
	  var request = _axios2.default.post(ROOT_URL + "/team/addMembers/" + teamId, newMembers);

	  return {
	    type: ADD_TEAM_MEMBERS,
	    payload: request

	  };
	}

/***/ }

})