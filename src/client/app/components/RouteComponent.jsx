/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import axios from 'axios';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import AdminComponent from './AdminComponent';
import NotFoundComponent from './NotFoundComponent';
import GroupContainer from '../containers/groups/GroupMainContainer';
import EditGroupComponent from './groups/EditGroupComponent';

/**
 * Middleware function that requires proper authentication for a page route
 * @param nextState The next state of the router
 * @param replace Function that allows a route redirect
 */
function requireAuth(nextState, replace) {
	function redirectRoute() {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		});
	}

	const token = localStorage.getItem('token');
	// Redirect route to login page if the auth token does not exist
	if (!token) {
		redirectRoute();
		return;
	}
	// Verify that the auth token is valid
	axios.post('/api/verification/', { token }, { validateStatus: status => (status >= 200 && status < 300) || (status === 401 || status === 403) })
		.then(res => {
			// Route to login page if the auth token is not valid
			if (!res.data.success) browserHistory.push('/login');
		})
		.catch(err => console.log(err));
}

/**
 * React component that controls the app's routes
 * Note that '/admin' requires authentication
 * @returns JSX to create the RouteComponent
 */
export default function RouteComponent() {
	return (
		<Router history={browserHistory}>
			<Route path="/" component={HomeComponent} />
			<Route path="/login" component={LoginComponent} />
			<Route path="/admin" component={AdminComponent} onEnter={requireAuth} />
			<Route path="/group" component={GroupContainer} />
			<Route path="/editGroup" component={EditGroupComponent} />
			<Route path="*" component={NotFoundComponent} />
		</Router>
	);
}
