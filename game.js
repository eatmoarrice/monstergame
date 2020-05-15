/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/


let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 564;
canvas.height = 846;
document.body.appendChild(canvas);

let bgReady, heroReady, foodReady;
let bgImage, heroImage, foodImage;

let startTime = Date.now();
const SECONDS_PER_ROUND = 30;
let elapsedTime = 0;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/background.jpg";
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = displayHeroDirection(heroDirection);

  foodImage = new Image();
  foodImage.onload = function () {
    // show the food image
    foodReady = true;
  };
  foodImage.src = "images/food.png";
}

function displayHeroDirection(direction) {
  let heroDirectionLink = "";
  if (direction == "left"){
    heroDirectionLink = "images/hero_left.png"
  }
  if (direction == "right"){
    heroDirectionLink = "images/hero_right.png"
  }
  if (direction == "up"){
    heroDirectionLink = "images/hero_up.png"
  }
  if (direction == "down"){
    heroDirectionLink = "images/hero_down.png"
  }
  return heroDirectionLink;
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the food.
 */

 let heroDirection = "down";

let heroX = canvas.width / 2;
let heroY = canvas.height / 2;

let foodX = Math.round(Math.random()*(canvas.width - 32));
let foodY = Math.round(Math.random()*(canvas.height -32));

/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}


/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the food has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  let upright = 0;
  let upleft = 0;
  let downright = 0;
  let downleft = 0;
  if (38 in keysDown) { // Player is holding up key
    heroDirection = "up";
    heroY -= 7;
    if (heroY <= 0){
      heroY = canvas.height;
    }
  }
  if (40 in keysDown) { // Player is holding down key
    heroDirection = "down";
    heroY += 7;
    if (heroY >= canvas.height){
      heroY = 0;
    }
  }
  if (37 in keysDown) { // Player is holding left key
    heroDirection = "left";
    heroX -= 7;
    if (heroX <= 0){
      heroX = canvas.width;
    }
  }
  if (39 in keysDown) { // Player is holding right key
    heroDirection = "right";
    heroX += 7;
    if (heroX >= canvas.width){
      heroX = 0;
    }
  }

  // Check if player and food collided. Our images
  // are about 32 pixels big.
  if (
    heroX <= (foodX + 48)
    && foodX <= (heroX + 48)
    && heroY <= (foodY + 48)
    && foodY <= (heroY + 48)
  ) {
    // Pick a new location for the food.
    // Note: Change this to place the food at a new, random location.
    foodX = Math.round(Math.random()*(canvas.width - 32));
    foodY = Math.round(Math.random()*(canvas.height - 32));
  }
};

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    heroImage.src = displayHeroDirection(heroDirection);
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (foodReady) {
    ctx.drawImage(foodImage, foodX, foodY);
  }
  ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 100);
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and food)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update(); 
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();