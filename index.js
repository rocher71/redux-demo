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
