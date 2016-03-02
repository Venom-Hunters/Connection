import { USER_SEARCH, ADD_MEMBERS_TO_UPDATE, CLEAR_MEMBERS_TO_UPDATE } from "../actions/index";

export default function(state = {membersToAdd:[]}, action = "") {
	switch(action.type) {
		case(USER_SEARCH):
			return Object.assign({}, state, {searchResults: action.payload.data});
		case(ADD_MEMBERS_TO_UPDATE):
			return Object.assign({}, state, {membersToAdd: [...state.membersToAdd,action.payload]});
		case(CLEAR_MEMBERS_TO_UPDATE):
			return Object.assign({}, state, {membersToAdd: []});
		default:
			return state;
	}
}
