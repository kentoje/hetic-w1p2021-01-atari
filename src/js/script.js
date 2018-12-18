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
let spawners_select; // Select the spawner
let spawnTest;
let turnInterval; // The periodic call to the turn function
let NbGifts = 0; // Total of gifts
let character;
let position;
//
//////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////

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
  //Load Turn Function
//  SetMove() 

}
//

/*
* Select and Create Gifts
*/

function spawn(spawners_select) {
     
  for (let i = 0; i < spawners_select.length; i++) {
    spawners_select[i].addEventListener('click', function() {
    console.log('click');
    
    //Remove all classes
    spawners_select[i].classList.remove('spawner__position', 'gift_0', 'gift_1', 'gift_2', 'gift_3');

    //Spawn a gift
    //spawners_select[i].classList.add(gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)], 'gifts');

    //spawners_select[i].innerHTML = `<div class="${gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)], 'gifts'}"></div>`;
    spawners_select[i].innerHTML = `<div class="${gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)]} gifts"></div>`;
    
    
    
    SetMove();
  });
}
}
//


/*
* Party Settings
*/
function turn() {
  
  
  
}
//

/*
* Add move transition
*/
function SetMove() {
  // Add a translate effect
  var move = oxo.elements.createElement({
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

  // Receive Id

  
  //character = document.getElementById(`gift_moving_` + NbGifts);
  character = document.getElementById(`gift_moving_1`);
  //character = document.getElementById(`test`);
  var initialY = character.getBoundingClientRect().y;





  console.log(initialY);
  //position = oxo.animation.getPosition(character);
  console.log(move);
  //console.log(character);
  console.log(NbGifts);
  //console.log(position.y); // 0
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
console.log(gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)]);
console.log(fireplace_array[oxo.utils.getRandomNumber(0, fireplace_array.length - 1)]);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
