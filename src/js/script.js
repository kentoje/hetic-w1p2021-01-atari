/*
* Project : JS
* Date : 17/12/2018
*
*/

/* 
* Variable
*/

let initial; // Value Initial Game
let speed = 1000; // Speed game
let position_initial = 20; // Initial Position
let position_final = 600; // Finak Position
let gift_array = ['gift_0', 'gift_1', 'gift_2', 'gift_3']; // Array Gifts
let fireplace_array = ['fireplace_0', 'fireplace_2', 'fireplace_3', 'fireplace_4']; // Array Spawns
let bonus; // Add a bonus
let spawners_select; // Select the spawner
let spawnTest;
let turnInterval; // The periodic call to the turn function
let NbGifts = 0; // Total of gifts
let character;
let position;
let initialY;
let move;
let fireplace_select;
//

/* 
* Load the game when enter is press
*/

//oxo.inputs.listenKey('enter', function() {
  // do something
  oxo.screens.loadScreen('game', function() {
    // game.html is loaded, do something

    //Select spawners
    spawners_select = document.querySelectorAll('.game__area .spawner .spawner__position');
    console.log(spawners_select);


    //Load Game Function
    game(spawners_select);
  });  
//});  
//


/*
* Function game
*/

function game(spawners_select) {
  //Load Game Function
  spawn(spawners_select);
  //Load Turn Function
  turn(spawners_select);

}
//

/*
* Select and Create Gifts
*/

function spawn(spawners_select, fireplace_select) {

  fireplace_select = oxo.utils.getRandomNumber(0, 3);
  
  //Remove all classes
  spawners_select[fireplace_select].classList.remove('spawner__position', 'gift_0', 'gift_1', 'gift_2', 'gift_3');

  //Spawn a gift
  //spawners_select[i].classList.add(gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)], 'gifts');

  //spawners_select[i].innerHTML = `<div class="${gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)], 'gifts'}"></div>`;
  spawners_select[fireplace_select].innerHTML = `<div class="${gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)]} gifts"></div>`;
  
  //Call SetMove
  SetMove(spawners_select, fireplace_select);
}

//


/*
* Party Settings
*/
function turn(spawners_select, fireplace_select) {
  turnInterval = setInterval(game, speed);
  
}
//

/*
* Add move transition
*/
function SetMove(spawners_select, fireplace_select) {
  // Add a translate effect
  move = oxo.elements.createElement({
    class: 
    `${gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)]} gifts gift_position`,
    styles: 
    {
      transform: 'translate(' + position_initial.x + 'px, ' + position_final.y + 'px)',
    },
    appendTo: 'spawner' // Select spawner class
  });
  
  // Give a id
  NbGifts++;
  move.setAttribute("id", `gift_moving_` + NbGifts);

  console.log(move);


}
//



/*
* Keys write
* q : fireplace_0
* s : fireplace_1
* d : fireplace_2
* f : fireplace_3
*/

oxo.inputs.listenKeys(['q', 's','d', 'f'], function(key) {
  console.log(key); // For each fireplace
});
//


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//console.log(gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)]);
//console.log(fireplace_array[oxo.utils.getRandomNumber(0, fireplace_array.length - 1)]);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
