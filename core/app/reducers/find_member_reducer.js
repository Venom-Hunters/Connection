import {FIND_POTENTIAL_MEMBER} from '../actions/index';


export default function(state = [], action = "") {
	switch(action.type) {
		case(FIND_POTENTIAL_MEMBER):
			return action.payload.data;
		default:
			return state;
	}
}