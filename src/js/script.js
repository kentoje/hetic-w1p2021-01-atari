/*
* Project : JS
* Date : 17/12/2018
*
*/

/*
* TODO:
*
* FIXME: Demander NbGifts
*
* FIXME: Demander getID
*
*
* FIXME: Demander pour cadeau vie en moins si pas cliqué
*
*/

oxo.screens.loadScreen('home', function() {
  let rules = document.getElementById(`rules`);
  let info = document.getElementById(`info`);

  rules.addEventListener('click', function() {
    rules.classList.toggle('infoBox--active');
  });
  
  info.addEventListener('click', function() {
    info.classList.toggle('infoBox--active');
  }); 
});



 /* 
* Variable
*/

let initial; // Value Initial Game
let position; // Actual Position Gift
let position_minimum  = 0; //400; // Initial Position
let position_maximun = 600;//500; // Maximun position
let position_final = 700; // Finak Position
let position_status;
let countdown_start;
let gift_color_array = ['red', 'yellow', 'green', 'black'];
let gift_color_select;

let gift_statut = ['present--good good', 'present--bad bad']; // Define if the gift is good or bad
let gift_array = [`gift_0 ${gift_statut[1]}`, `gift_1 ${gift_statut[1]}`, `gift_2 ${gift_statut[1]}`, `gift_3 ${gift_statut[1]}`]; // Array Gifts and add their statuts
let fireplace_array = [`fireplace_0`, `fireplace_2`, `fireplace_3`, `fireplace_4`]; // Array Spawns
let bonus; // Add a bonus
//let gift_check; // Check gift statue
let spawners_select; // Select the spawner
let NbGifts = 0; // Total of gifts
let character;  // Define the active gift
let move;
let fireplace_select; //Choose the fireplace
let laser; // Define the laser ID
let health = 3; // Nb of life
let health_array = [`health_0`, `health_1`, `health_2`]
let health_select;
let snow_life;
let wrapper_select;


let speed = 1000; // Speed spawn gifts
let timer = 90;  //Game Timer
let speed_gift = null; //Game stop
let speed_timer = null; //Game stop 
let timer_laser = 1000; // Timer Laser
let position_refresh = 10;
let refresh;
let refresh_timer;
let audio_background; // Variable Background Song
let audio_laser; // Laser soundù
let gift;
//let end_id; // Choose the end
let end_status = true;
let end_id;
//

/* 
* Load the game when enter is press
*/

oxo.inputs.listenKey('enter', function() {
  // do something
  if (oxo.screens.getCurrentScreen !== 'game') {
    oxo.screens.loadScreen(`game`, function() {
    // game.html is loaded, do something  

    //Select countdown_start
    countdown_start = document.getElementById(`countdown_start`);

    wrapper_select = document.getElementById(`game__area_snow`);

    //  Show  countdown when the party starts 
    let timeleft = 3;
    let time_start_interval = setInterval(function(){
    let time_start = [`GO`, `1`,`2`,`3`];
    countdown_start.innerHTML = `${time_start[timeleft]}`
    timeleft--;
    if(timeleft < 0)
      clearInterval(time_start_interval);
    },1000);


      //Select spawners
      spawners_select = document.querySelectorAll(`.game__area .spawner .spawner__position`);

      //Select health
      health_select = document.querySelectorAll(`.health`);

      //Select laser
      laser = document.getElementById(`deer_arm`);
      
    //Select snow div
    snow_life = document.querySelectorAll(`.snow_life`);
    
    //Select audio
    audio_background = document.getElementById('song_background');
    audio_laser = document.getElementById('song_laser');
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //console.log(health_select);
    //console.log('spawners_select  '+ spawners_select);
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    //Load start Function
    setTimeout(function() {

      // Anime the deer
      laser.classList.remove(`deer__arm--start`);
      laser.classList.remove(`deer__arm--shoot`);
      laser.classList.add(`deer__arm--up`);
      start();
        }, 4500);
    }); 
  } 
});  
//


/*
* Define Game Timer
*/

function start(){
  //player.play();
  audio_background.play();
  
  speed_timer = setInterval(count, 1000);
}	

function count() {
  level();
  timer--;
  if(timer == 0){
    finish();

  } 
  else {
    // WHile time != 0 do :
    NbGifts = NbGifts + 1;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //console.log( timer + " secondes restantes");
    ///////////////////////////////////////////////////////////////////////////////////////////////
  }	
}

function finish() {
  // Load End game  
  oxo.screens.loadScreen('end', function() {

    
   end_id = document.getElementById(`end_type`);

    // Choose the end
    if(end_status === true) {
      end_id.classList.add(`goodScore`);
    } else {
      end_id.classList.add(`badScore`);
    }
    let test = document.getElementById('top_bottom');

    setTimeout(function() {
      document.getElementById('top_bottom').click();
      //console.log('smooth');
      }, 1000);


  });
     
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
  // Get the a random color
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
  //console.log(NbGifts);
  spawners_select[fireplace_select].innerHTML = `<div id="gift_moving_${NbGifts}" class="${gift_array[oxo.utils.getRandomNumber(0, gift_array.length - 1)]} gifts present "><div class="present__image present--${gift_color_array[gift_color_select]}"></div><div class="present__value present__value--coint"><img src=""></div></div>`;

  gift = document.getElementById(`gift_moving_${NbGifts}`);

  var giftInterval = setInterval(function() {
    oxo.animation.move(gift, 'down', 10);
    //console.log(oxo.animation.getPosition(gift).y);
  }, 10);

  // When the gift go out of the screen
  oxo.elements.onLeaveScreenOnce(gift, function() {
    //console.log('OUT');
    gift.remove();
    clearInterval(giftInterval);
  });


  
  


  //  Select the last id was created
  character = document.getElementById(`gift_moving_${NbGifts}`);

  //Check position gift
  //gift_move();
  ///////////////////////////////////////////////////////////////////////////////////////////////
  //console.log( spawners_select[fireplace_select]);
  //console.log(character.className === `bad`);
  //console.log(character);
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

oxo.inputs.listenKeys([ `f`], function(key) {
  //console.log(oxo.animation.getPosition(gift));
  //console.log(oxo.animation.getPosition(gift).y);

  clearInterval(refresh_timer);
  laser_effect();
  // Compare the tower was selected
  if(spawners_select[0] === spawners_select[fireplace_select]) {
    console.log('f');

    //console.log(oxo.animation.getPosition(gift));
   

    score();
  }
});


oxo.inputs.listenKeys([ `g`], function(key) {
  clearInterval(refresh_timer);
  laser_effect();
  // Compare the tower was selected
  if(spawners_select[1] === spawners_select[fireplace_select]) {
    console.log('g');
    score();
  }
});


oxo.inputs.listenKeys([ `h`], function(key) {
  clearInterval(refresh_timer);
  laser_effect();
  // Compare the tower was selected
  if(spawners_select[2] === spawners_select[fireplace_select]) {
    console.log('h');
    score();
  }
});


oxo.inputs.listenKeys([ `j`], function(key) {
  clearInterval(refresh_timer);
  laser_effect();
  // Compare the tower was selected
  if(spawners_select[3] === spawners_select[fireplace_select]) {
    
    console.log('j');
    score();
  }
});


/*
* Add score or end game
*/

function score(){
  console.log('%c coucou', 'background-color: green; padding: 5px');
  // Compare position

  let marchestpfrr = oxo.animation.getPosition(gift).y;

  if (position_minimum <= marchestpfrr  &&  marchestpfrr <= position_maximun) {

    // Check
    spawners_select[fireplace_select].classList.add(`check`);
    //console.log(spawners_select[fireplace_select]);
    
    if (character.classList.contains(`bad`)){
      health_counter();
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
  laser.classList.add(`deer__arm--shoot`);
  // Disapear laser after a delay
  setTimeout(function() {
  laser.classList.remove(`deer__arm--shoot`);
  //console.log(laser);
  }, timer_laser);
}
//

/*
* Health Counter Function
*/

function health_counter(){
  health--;
  health_select[health].classList.remove(`health`);
  speed = speed- 15;
  
   wrapper_select.classList.remove(`wrapper`);



  snow_life[health].classList.add(`disturber--snow`);
  //Arrête la partie
  if(health === 0){
    // Set the bad game
    end_status = false;
    finish();
    
  } 
}
//