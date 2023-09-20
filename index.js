const redux = require('redux')
const createStore = redux.createStore

const BUY_CAKE = 'BUY_CAKE';

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

// reducer
// (previousState, action) => newState
// state has to be represented by a single object

const initialState = {
  numOfCakes: 10
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case BUY_CAKE: return {
      ...state, 
      //first make a copy of state object! so that other properties might not change
      numOfCakes: state.numOfCakes - 1
    }
    
    default: return state
  }
}

const store = createStore(reducer);
console.log("initial state : ", store.getState());
const unsubscribe = store.subscribe(() => console.log("updated state :", store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();
