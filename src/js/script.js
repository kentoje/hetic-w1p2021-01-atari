/* 
* Variable
*/

var gift_array = ['gift_0', 'gift_1', 'gift_2', 'gift_3'];

console.log(gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)]);




/* 
* Load the game when enter is press
*/

//oxo.inputs.listenKey('enter', function() {
  // do something
  oxo.screens.loadScreen('game', function() {
    // game.html is loaded, do something
  });
//});

//

/*
* 
*/


//  