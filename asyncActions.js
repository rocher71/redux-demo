const redux = require('redux');
const thunkMiddleWare = require('redux-thunk').default;
const axios = require('axios');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

//initial state
const initialState = {
  loading: false,
  users: [],
  error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//actions creators
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

//reducer
const reducer = (state = initialState, action) => {
  switch(action.type){
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }

    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }

    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
  }
}

//action creator, return an action
//thunk makes it able to return a function
const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest); //set loading true
    axios.get('http://jsonplacdfeholder.typicode.com/users')
      .then(response => {
        //response.data is array of users
        const users = response.data.map(user => user.id);
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        //error.message is the error description
        dispatch(fetchUsersFailure(error.message));
      })
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleWare));
store.subscribe(() => { console.log(store.getState())});
store.dispatch(fetchUsers());
