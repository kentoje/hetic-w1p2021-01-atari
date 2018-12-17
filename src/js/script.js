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

oxo.inputs.listenKey('enter', function() {

  console.log(oxo.utils.getRandomNumber(1, 3));
});

