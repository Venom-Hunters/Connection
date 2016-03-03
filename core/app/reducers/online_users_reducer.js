import {
	ONLINE_USERS
} from '../actions/index';

export default function(state = [], action = '') {

	switch(action.type) {
		case(ONLINE_USERS):
		console.log(action.payload);
			return action.payload;
		default:
			return state;
	}

}