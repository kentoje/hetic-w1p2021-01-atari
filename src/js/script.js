/*
* Project : JS
* Date : 17/12/2018
*
*/

/* 
* Variable
*/

let initial; // Value Initial Game
let speed = 100; // Speed game
let position_initial = 20; // Initial Position
let position_final = 600; // Finak Position
let gift_array = ['gift_0', 'gift_1', 'gift_2', 'gift_3']; // Array Gifts
let fireplace_array = ['fireplace_0', 'fireplace_2', 'fireplace_3', 'fireplace_4']; // Array Spawns
let bonus; // Add a bonus
let spawners_select;
//


/* 
* Load the game when enter is press
*/

//oxo.inputs.listenKey('enter', function() {
  // do something
  oxo.screens.loadScreen('game', function() {
    // game.html is loaded, do something
    
   var test = document.querySelector('.game__area .spawner .spawner__position');
    console.log(test);
    
    spawners_select = document.querySelectorAll('.game__area .spawner .spawner__position');
    console.log(spawners_select);


    game();
 
  });  
//});  
//
function game() {
  for (let i = 0; i < spawners_select.length; i++) {
    spawners_select[i].addEventListener('click', function() {
      console.log('click');
    });
  }
}



/*
* Keys write
*/

oxo.inputs.listenKeys(['q', 's','d', 'f'], function(key) {
  console.log(key); // 'up' or 'down';
});
//



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log(gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)]);
console.log(fireplace_array[oxo.utils.getRandomNumber(0, fireplace_array.length - 1)]);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
