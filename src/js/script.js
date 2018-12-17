/* 
* Load the game when enter is press
*/

oxo.inputs.listenKey('enter', function() {
  // do something
  oxo.screens.loadScreen('game', function() {
    // game.html is loaded, do something
  });
});

//

/*
* 
*/
