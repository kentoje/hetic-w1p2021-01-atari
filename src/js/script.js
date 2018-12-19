/*
* Project : JS
* Date : 17/12/2018
*
*/

/*
* TODO:
*
* FIXME: Demander setInterval -> s'arrêter et gagner de la vitesse
*
* FIXME: Demander Positionnement temps réel
*        Demander refresh de chaque
*
* FIXME: Demander pour BAD and GOOD
*
* FIXME: Demander music
*/

/* 
* Variable
*/

let initial; // Value Initial Game
let position; // Actual Position Gift
let position_minimum  = 500; // Initial Position
let position_final = 700; // Finak Position

let gift_color_array = ['red', 'yellow', 'green', 'black'];
let gift_color_select;

let gift_statut = ['present--good good', 'present--bad bad']; // Define if the gift is good or bad
let gift_array = [`gift_0 ${gift_statut[0]}`, `gift_1 ${gift_statut[0]}`, `gift_2 ${gift_statut[0]}`, `gift_3 ${gift_statut[1]}`]; // Array Gifts and add their statuts
let fireplace_array = [`fireplace_0`, `fireplace_2`, `fireplace_3`, `fireplace_4`]; // Array Spawns
let bonus; // Add a bonus
//let gift_check; // Check gift statue
let spawners_select; // Select the spawner
let spawnTest;
let turnInterval; // The periodic call to the turn function
let NbGifts = 0; // Total of gifts
let character;  // Define the active gift
let initialY;
let move;
let fireplace_select; //Choose the fireplace
let laser; // Define the laser ID
let health = 3; // Nb of life
let health_array = [`health_0`, `health_1`, `health_2`]
let health_select;

let speed = 1000; // Speed spawn gifts
let timer = 90;  //Game Timer
let speed_gift = null; //Game stop
let speed_timer = null; //Game stop 
let timer_laser = 10; // Timer Laser
let position_refresh = 10;
let refresh;
let refresh_timer;
let audio_background;
//

/* 
* Load the game when enter is press
*/

//oxo.inputs.listenKey('enter', function() {
  // do something
  oxo.screens.loadScreen(`game`, function() {
    // game.html is loaded, do something

    //Select spawners
    spawners_select = document.querySelectorAll(`.game__area .spawner .spawner__position`);

    //Select health
    health_select = document.querySelectorAll(`.health`);

    //Select laser
    laser = document.getElementById(`laser`);

    //Select audio
    audio_background = document.getElementById('song_background');
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //console.log(health_select);
    //console.log('spawners_select  '+ spawners_select);
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
  //player.play();
  audio_background.play();
  
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
    //console.log( timer + " secondes restantes");
    ///////////////////////////////////////////////////////////////////////////////////////////////
  }	
}

function finish() {
  // Load End game
    
  oxo.screens.loadScreen('end', function() {});
    
  clearInterval(speed_timer);
  clearInterval(refresh);
  clearInterval(refresh_timer);
  clearInterval(speed_gift);
}

/*
* Define Level
*/

function level(){
  //Incrase level
  speed = speed- 30;
  spawn();
  ///////////////////////////////////////////////////////////////////////////////////////////////
  //console.log( speed + " speed");
  //console.log( speed_gift + " level");
  ///////////////////////////////////////////////////////////////////////////////////////////////
}

/*
* Select and Create Gifts
*/

function spawn() {
  //console.log('spawn');

  
  gift_color_select = oxo.utils.getRandomNumber(0, 3);


  //  Choose a random spawner
  fireplace_select = oxo.utils.getRandomNumber(0, 3);
  //console.log('fireplace_select ' +fireplace_select);

  //Remove all classes
  spawners_select[fireplace_select].classList.remove(`spawner__position`, 
  `gift_0`, 
  `gift_1`, 
  `gift_2`, 
  `gift_3`);

  //  Add a random gift and define 1 ID for each
  NbGifts++;
  spawners_select[fireplace_select].innerHTML = `<div id="gift_moving_${NbGifts}" class="${gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)]} gifts present present--${gift_color_array[gift_color_select]}"></div>`;
  
  


  //  Select the last id was created
  character = document.getElementById(`gift_moving_${NbGifts}`);

  //Check position gift
  gift_move();

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //console.log( spawners_select[fireplace_select]);
  //console.log(character.className === `bad`);
  //console.log(character);
  //console.log(position = oxo.animation.getPosition(character));
  //console.log(position.x);
  ///////////////////////////////////////////////////////////////////////////////////////////////
  
}
//

/**
 * Keyframe 
 * Define the position of gift
 */

function gift_move() {
  // Id use is Character
  position = 0;

  refresh_timer = setInterval(frame, 30);
  function frame() {
    if (position == position_final) {
      clearInterval(refresh_timer);
    } else {
      position = position + 10; 
      ///////////////////////////////////////////////////////////////////////////////////////////////
      //console.log(position + 'px');
      ///////////////////////////////////////////////////////////////////////////////////////////////
    }
  }
}


/*
* Keys write
* q : fireplace_0
* s : fireplace_1
* d : fireplace_2
* f : fireplace_3
*/

oxo.inputs.listenKeys([ `q`], function(key) {
  laser_effect();
  // Compare the tower was selected
  if(spawners_select[0] === spawners_select[fireplace_select]) {
  console.log('q');
  score();
  }
});


oxo.inputs.listenKeys([ `s`], function(key) {
  laser_effect();
  // Compare the tower was selected
  if(spawners_select[1] === spawners_select[fireplace_select]) {
    console.log('s');
    score();
  }
});


oxo.inputs.listenKeys([ `d`], function(key) {
  laser_effect();
  // Compare the tower was selected
  if(spawners_select[2] === spawners_select[fireplace_select]) {
    console.log('d');
    score();
  }
});


oxo.inputs.listenKeys([ `f`], function(key) {
  laser_effect();
  // Compare the tower was selected
  if(spawners_select[3] === spawners_select[fireplace_select]) {
    console.log('f');
    score();
  }
});


/*
* Add score or end game
*/

function score(){
  // Compare position
  if (position_minimum <= position  &&  position <= position_final) {
    if (character.classList.contains(`bad`)){
      health--;
      health_select[health].classList.remove(`health`);
      speed = speed- 15;
      
      //Arrête la partie
      if(health === 0){
        finish();
        
      } 
    } else {

      //spawners_select[fireplace_select].classList.add(`present--noAccept`);

      // Add to score
      oxo.player.addToScore(5);
      speed = speed- 30;
      
      // One time for each gift
      position = 0;
      
    }
  } 
}
//

/* 
* Effect laser
*/
 
function laser_effect() {
  // Visual Effect
  laser.classList.add(`laser`);
  // Disapear laser after a delay
  setTimeout(function() {
  laser.classList.remove(`laser`);
  }, timer_laser);
}
//