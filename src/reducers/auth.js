import Config from 'config';
import Storage from 'storage';
import Immutable from 'immutable';

import { replace } from 'react-router-redux';

/**********************************************
 ** Contants                                 **
 *********************************************/

const USER_GET = Symbol('USER_GET');
const AUTH_USER = Symbol('AUTH_USER');
const UNAUTH_USER = Symbol('UNAUTH_USER');
const AUTH_ERROR = Symbol('AUTH_ERROR');

/**********************************************
 ** Helper Functions                         **
 *********************************************/

const tokenGetClaims = token => {
	const tokenArray = token.split('.');
	if(tokenArray.length !== 3){
		return {};
	}
	return JSON.parse(window.atob(tokenArray[1].replace('-', '+').replace('_', '/')));
};

const tokenIsAdmin = token => tokenGetClaims(token).admin;

/**********************************************
 ** Auth States                              **
 *********************************************/

class State {
	static AuthSuccess(token) {
		return {
			type: AUTH_USER,
			isAdmin: tokenIsAdmin(token),
		};
	}
	static AuthError(error) {
		return {
			type: AUTH_ERROR,
			error,
		};
	}
	static AuthInit() {
		return {
			type: AUTH_GET,
		};
	}
	static UnAuth(error) {
		return {
			type: UNAUTH_USER,
		};
	}
}

/**********************************************
 ** Actions                                  **
 *********************************************/

const LoginUser = (email, password) => {
  return async (dispatch) => {
		dispatch(State.AuthInit());
		try {
			const response = await fetch(Config.API_URL + Config.routes.auth.login, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: { email, password },
			});

			const status = await response.status;
			const data = await response.json();

			if (!data) {
				throw new Error('Empty response from server');
			} else if (data.error) {
				throw new Error(data.error.message);
			}

			Storage.set('token', data.token);
			dispatch(State.AuthSuccess(data.token));
		} catch (err) {
			dispatch(State.AuthError(err.message));
		}
  };
}

const LogoutUser = (error) => {
	return async (dispatch) => {
		dispatch(State.UnAuth());
		Storage.remove('token');
		dispatch(replace('/login'));
	}
}

/**********************************************
 ** Auth Reducer                             **
 *********************************************/

const initState = () => {
	const token = Storage.get('token');
	return Immutable.fromJS({
		error: null,
		authenticated: !!token,
		isAdmin: !!token && tokenIsAdmin(token),
	});
}

const Auth = (state=initState(), action) => {
	switch (action.type) {
		case AUTH_USER:
			return state.withMutations(val => {
				val.set('authenticated', true);
				val.set('error', null);
				val.set('isAdmin', action.isAdmin);
			});

		case UNAUTH_USER:
			return state.withMutations(val => {
				val.set('authenticated', false);
				val.set('isAdmin', false);
			});

		case AUTH_ERROR:
			return state.withMutations(val => {
				val.set('error', action.error);
			});

		default:
			return state;
	}
}

export {
	Auth, LoginUser, LogoutUser
}
