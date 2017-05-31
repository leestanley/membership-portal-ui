import Immutable from 'immutable';

import Config from 'config';

const FETCH_USER = Symbol('FETCH_USER');
const FETCH_USER_ERR = Symbol('FETCH_USER_ERR');

const UPDATE_USER_ERR = Symbol('UPDATE_USER_ERR');
const UPDATE_USER_SUCCESS = Symbol('UPDATE_USER_SUCCESS');
const UPDATE_DONE = Symbol('UPDATE_DONE');

const defaultState = Immutable.fromJS({
    profile: {},
    updated: false,
    updateSuccess: false,
    fetchsuccess: false,
    error: ''
});

const fetchUserAction = (user) => {
    return ({
        type: FETCH_USER,
        user
    });
}

const fetchUserError = (error) => {
    return ({
        type: FETCH_USER_ERR,
        error
    });
}

const FetchUser = () => {

    return async (dispatch) => {
        try {
            const response = await fetch(Config.API_URL + Config.routes.user, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            const status = await response.status;
            if (status >=200 && status<300) {
                const data = await response.json();
                dispatch(fetchUserAction(data.user));
            } else {
                throw new Error('Could not get user from api server');
            }
        } catch (err) {
            dispatch(updateUserError(err.message));
        }
    }
}
//PATCH

const updateUserSuccess = ()=>{
    return {
        type: UPDATE_USER_SUCCESS,
    };
};

const updateUserError = (error) => {
    return {
        type: UPDATE_USER_ERR,
        error
    };
};

const UserUpdateDone = ()=>{
    return {
        type: UPDATE_DONE,
    };
};

const UpdateUser = (newprofile) => {
    return async (dispatch) => {
        try {
            const response = await fetch(Config.API_URL + Config.routes.user,  {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({"user": newprofile})
            });
            const status = await response.status;
            const data = await response.data;

            if (status >= 200 && status < 300) {
                if (!data.error) {
                    dispatch(fetchUserAction(data.user));
                    dispatch(updateUserSuccess());
                } else {
                    throw new Error(data.error);
                }
            }
        } catch (err) {
            dispatch(updateUserError(err.message));
        }
    }
}

const initialState = () => defaultState;

const User = (state=initialState(), action) => {
    switch(action.type) {

        case FETCH_USER:
            return state.withMutations(val => {
                val.set('profile', action.user);
                val.set('fetchsuccess', true);
                val.set('error', '');
            });

        case FETCH_USER_ERR:
            return state.withMutations(val => {
                val.set('error', action.error);
                val.set('profile', {});
                val.set('fetchsuccess', false);
            })

        case UPDATE_USER_ERR:
            return state.withMutations((val)=>{
                val.set('updated', true);
                val.set('updateSuccess', false);
                val.set('error', action.error);
            });

        case UPDATE_USER_SUCCESS:
            return state.withMutations((val)=>{
                val.set('updated', true);
                val.set('updateSuccess', true);
                val.set('error', '');
            });
        
        case UPDATE_DONE:
            return state.withMutations((val)=>{
                val.set('updated', false);
            });

        default:
            return state;
    }
}

export { User, FetchUser, UpdateUser, UserUpdateDone }
