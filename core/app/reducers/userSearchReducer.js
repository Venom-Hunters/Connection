import { USER_SEARCH } from "../actions/index";

export default function(state = [], action = "") {
	switch(action.type) {
		case USER_SEARCH:
			return action.payload.data;
	}
	return state;
}
