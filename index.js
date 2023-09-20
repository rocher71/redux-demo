//since it's vanilla js, 'require' is used.
const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleWare = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';


//define action : object that has a 'type' property
// {
//   type: BUY_CAKE
//   info: 'First redux action'
// }

//action creator : function that returns an action
function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First redux action'
  }
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
  }
}

// reducer
// (previousState, action) => newState
// state has to be represented by a single object
// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20  
// }

const initialCakeState = {
  numOfCakes: 10,
}

const initialIceCreamState = {
  numOfIceCreams: 20  
}

const cakeReducer = (state = initialCakeState, action) => {
  switch(action.type){
    case BUY_CAKE: return {
      ...state, 
      //first make a copy of state object! so that other properties might not change
      numOfCakes: state.numOfCakes - 1
    }
    default: return state
  }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch(action.type){
    case BUY_ICECREAM: return {
      ...state, 
      //first make a copy of state object! so that other properties might not change
      numOfIceCreams: state.numOfIceCreams - 1
    }
    default: return state
  }
}

/*
 redux store : brings actions and reducers together
 one store for the entire application
 'getState()' : gives access to the state it holds.
 'dsipatch()' : updates to application state. accepts an actions as it's parameter.
 'subscribe()' : allows application to register listeners, accepts a function as parameter, 
    executed any time the state in the redux store changes. 
    can unsubscribe to the store by calling the function that was returned by subscribe().
*/
//create redux store
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})
// can pass as many middlewares you want
const store = createStore(rootReducer, applyMiddleWare(logger)); 

//expose a method that gives the current state in the store.
console.log("Initial state : ", store.getState());

//allow app to subscribe to changes in the store that is achieved using the subscribe()
//listener to the store, so anytime the store updates, this runs
const unsubscribe = store.subscribe(() => {});

// dispatch accepts an actions as parameter. 
// can directly provide the action, but use an action creator, which return the action.
store.dispatch(buyCake()); //action of buying a cake
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

//when we dispatch an action, both the reducers recieve the action
// one acts and one ignores.


// unsubscribe from the store by calling the function returned by the subscribe method.
unsubscribe();
