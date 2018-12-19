/*
* Project : JS
* Date : 17/12/2018
*
*/

/*
* Demander setInterval -> s'arrêter et gagner de la vitesse
* Demander Positionnement temps réel
* Demander pour BAD and GOOD
*/

/* 
* Variable
*/

let initial; // Value Initial Game
let position_minimum  = 500; // Initial Position
let position_final = 600; // Finak Position
let gift_statut = ['good', 'bad']; // Define if the gift is good or bad
let gift_array = [`gift_0 ${gift_statut[0]}`, `gift_1 ${gift_statut[0]}`, `gift_2 ${gift_statut[0]}`, `gift_3 ${gift_statut[1]}`]; // Array Gifts and add their statuts
let fireplace_array = [`fireplace_0`, `fireplace_2`, `fireplace_3`, `fireplace_4`]; // Array Spawns
let bonus; // Add a bonus
//let gift_check; // Check gift statue
let spawners_select; // Select the spawner
let spawnTest;
let turnInterval; // The periodic call to the turn function
let NbGifts = 0; // Total of gifts
let character;  // Define the active gift
let position;
let initialY;
let move;
let fireplace_select; //Choose the fireplace
let laser; // Define the laser ID
let health = 3; // Nb of life
let health_array = [`health_0`, `health_2`, `health_3`]
let health_select;
let speed = 3000; // Speed games
let timer = 10;  //Game Timer
let speed_gift = null; //Game stop
let speed_timer = null; //Game stop 
let timer_laser = 10; // Timer Laser
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
  speed_gift = setInterval(level, speed);
  speed_timer = setInterval(count, 1000);
}	

function count() {
  timer--;
  if(timer == 0){
    finish();

    // Load End game
    /* 
    oxo.screens.loadScreen('end', function() {
    });
    */
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
  //console.log( speed + " speed");
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
  spawners_select[fireplace_select].classList.remove(`spawner__position`, 
  `gift_0`, 
  `gift_1`, 
  `gift_2`, 
  `gift_3`);

  //  Add a random gift and define 1 ID for each
  NbGifts++;
  spawners_select[fireplace_select].innerHTML = `<div id="gift_moving_${NbGifts}" class="${gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)]} gifts"></div>`;
  
  //  Select the last id was created
  character = document.getElementById(`gift_moving_${NbGifts}`);
  position = oxo.animation.getPosition(character);
  

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //console.log( spawners_select[fireplace_select]);
  console.log(character);
  //console.log(position = oxo.animation.getPosition(character));
  //console.log(position.x);
  ///////////////////////////////////////////////////////////////////////////////////////////////
  
}
//

/*
* Keys write
* q : fireplace_0
* s : fireplace_1
* d : fireplace_2
* f : fireplace_3
*/

oxo.inputs.listenKeys([ `q`, `s`, `d`, `f`], function(key) {

  // Visual Effect
  laser.classList.add(`laser`);
  // Disapear laser after a delay
  setTimeout(function() {
    laser.classList.remove(`laser`);
  }, timer_laser);

  //Check if the gift status
  if(character.className === `bad`){
    health--;
    health_select[health].classList.remove(`health`);
    speed = speed- 15;

  ///////////////////////////////////////////////////////////////////////////////////////////////
  ///console.log('bad');
  ///////////////////////////////////////////////////////////////////////////////////////////////


  } else {
    //Check the gift and add point
    if(key === `q`){
      if (position_minimum <= position.y  &&  position.y <= position_final) {
        // Add to score
        oxo.player.addToScore(5);
        speed = speed- 30;
      }
    }
    
    if(key === `s`){
      if (position_minimum <= position.y  &&  position.y <= position_final) {
        // Add to score 
        oxo.player.addToScore(5);
        speed = speed- 30;
      }
    }
    
    if(key === `d`){
      if (position_minimum <= position.y  &&  position.y <= position_final) {
        // Add to score
        oxo.player.addToScore(5);
        speed = speed- 30;
      }
    }
    
    if(key === `f`){ddd
      if (position_minimum <= position.y  &&  position.y <= position_final) {
        // Add to score
        oxo.player.addToScore(5);
        speed = speed- 30;
      }
    }
  }
  
  ///////////////////////////////////////////////////////////////////////////////////////////////
  //console.log('good');
  //console.log(key);
  ///////////////////////////////////////////////////////////////////////////////////////////////
});
//

