/*
* Project : JS
* Date : 17/12/2018
*
*/

/* 
* Variable
*/

let initial; // Value Initial Game
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
let fireplace_select; //Choose the fireplace
let laser; // Define the laser ID

let speed = 3000; // Speed games
let timer = 10;  //Game Timer
let speed_gift = null; //Game stop
let speed_timer = null; //Game stop 
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

    //Select laser
    laser = document.getElementById('laser');
    ///////////////////////////////////////////////////////////////////////////////////////////////
    console.log('spawners_select  '+ spawners_select);
    ///////////////////////////////////////////////////////////////////////////////////////////////

    //Load start Function
    start();
  });  
//});  
//


/*
* Define Game Timer
*/

function start(){
  speed_gift = setInterval(level, speed);
  speed_timer = setInterval(count, 1000);
}	

function count() {
  timer--;
  if(timer == 0){
    finish();
  } 
  else {
    // WHile time != 0 do :
    ///////////////////////////////////////////////////////////////////////////////////////////////
    console.log( timer + " secondes restantes");
    ///////////////////////////////////////////////////////////////////////////////////////////////
  }	
}

function finish() {
  clearInterval(speed_timer);
}

/*
* Define Level
*/

function level(){
  clearInterval(speed_gift);
  speed_gift++;
  //Incrase level
  speed = speed- 300;
  spawn();
  ///////////////////////////////////////////////////////////////////////////////////////////////
  console.log( speed + " speed");
  //console.log( speed_gift + " level");
  ///////////////////////////////////////////////////////////////////////////////////////////////
}

/*
* Select and Create Gifts
*/

function spawn() {

  //  Choose a random spawner
  fireplace_select = oxo.utils.getRandomNumber(0, 3);
  //console.log('fireplace_select ' +fireplace_select);

  //Remove all classes
  spawners_select[fireplace_select].classList.remove('spawner__position', 
  'gift_0', 
  'gift_1', 
  'gift_2', 
  'gift_3');

  //  Add a random gift
  spawners_select[fireplace_select].innerHTML = `<div class="${gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)]} gifts"></div>`;
  
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

  laser.classList.add("laser");
  laser.classList.remove("laser");

  var x = setTimeout(function() {laser.classList.toggle("laser"); }, 1);

  console.log(key); // For each fireplace
});
//