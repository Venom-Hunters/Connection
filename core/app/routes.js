import React from 'react';
import { Route, IndexRoute} from 'react-router';
import App from './components/app';


export default (
	<Route path="/login" component={ App }>
		<IndexRoute component={<div>Hello</div>} />
	</Route>
);