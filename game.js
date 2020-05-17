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
let hero = {width:80, height: 110}
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;
document.body.appendChild(canvas);

let bgReady, heroReady, foodReady, brickReady, brick2Image, brick2Ready;
let bgImage, heroImage, foodImage, brickImage;
let bg2Image, bg3Image, bg4Image, bg5Image, bg6Image, bg7Image, bg3Ready, bg4Ready, bg5Ready, bg6Ready, bg7Ready;
let tree1Image, tree2Image, tree1Ready, tree2Ready;
let gameover, gameoverImage, gameoverReady;
let startTime = Date.now();
const SECONDS_PER_ROUND = 30;
let elapsedTime = 0;

let names = ["hero_walk0", "hero_walk1", "hero_jump0", "hero_jump1"];

function loadImages() {
  let n,name,
      result = {},
      count  = names.length,
      
      onload = function() {
        if (--count == 0) heroReady = true;
      };
  for(n = 0 ; n < names.length ; n++) {
    name = names[n];
    result[name] = document.createElement('img');
    result[name].addEventListener('load', onload);
    result[name].src = "images/" + name + ".png";
  }
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/layer-1.png";
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/hero_down_0.png";
  foodImage = new Image();
  foodImage.onload = function () {
    // show the food image
    foodReady = true;
  };
  foodImage.src = "images/food.png";

  
  brickImage = new Image();
  brickImage.onload = function () {
    // show the brick image
    brickReady = true;
  };
  brickImage.src ="images/brick2.png";

  brick2Image = new Image();
  brick2Image.onload = function () {
    // show the brick image
    brick2Ready = true;
  };
  brick2Image.src ="images/brick.png";

  bg7Image = new Image();
  bg7Image.onload = function () {
    // show the bg7 image
    bg7Ready = true;
  };
  bg7Image.src ="images/layer-7.png";

  bg6Image = new Image();
  bg6Image.onload = function () {
    // show the bg6 image
    bg6Ready = true;
  };
  // bg6Image.src ="images/layer-6.png";

  bg5Image = new Image();
  bg5Image.onload = function () {
    // show the bg5 image
    bg5Ready = true;
  };
  bg5Image.src ="images/layer-5.png";
  bg4Image = new Image();
  bg4Image.onload = function () {
    // show the bg4 image
    bg4Ready = true;
  };
  bg4Image.src ="images/layer-4.png";

  bg3Image = new Image();
  bg3Image.onload = function () {
    // show the bg3 image
    bg3Ready = true;
  };
  bg3Image.src ="images/layer-3.png";

  tree1Image = new Image();
  tree1Image.onload = function () {
    // show the bg3 image
    tree1Ready = true;
  };
  tree1Image.src ="images/tree1.png";

  tree2Image = new Image();
  tree2Image.onload = function () {
    // show the bg3 image
    tree2Ready = true;
  };
  tree2Image.src ="images/tree2.png";

  gameoverImage = new Image();
  gameoverImage.onload = function () {
    // show the gameover image
    gameoverReady = true;
  };
  gameoverImage.src ="images/gameover.png";
}

let state = 0;
let playerPressedUp = 0;
let jumpstate = 0;
let previousDirection = "";
let obstacleFreeLeft = true;
let obstacleFreeRight = true;
let obstacleFreeUp = true;
let obstacleFreeDown = true;
let globaldirection = "";
// let userTyped = "false";
function displayHeroDirection(direction) {
  let heroDirectionLink = "";
  // if (userTyped == true){state +=1;}
  state += 1;
  if (state <10) {stateurl = 0;}
  else if (state <20) {stateurl = 1;}
  heroDirectionLink = `images/hero_walk${stateurl}.png`;
  if (direction == "up") {playerPressedUp = 1};
  if (playerPressedUp == 1) {
    jumpstate +=1;
    if (jumpstate <16) {
      jumpstateurl = 0;
      if (obstacleFreeUp) {heroY -= 12;}
      else {jumpstate = 16}
    }
    else if (jumpstate <34) {
      jumpstateurl = 1;
      if (obstacleFreeDown) {heroY += 12;}
      else { jumpstate = 34}
    }
    // if (obstacleFreeDown == false) {jumpstate +=30; playerPressedUp = 0;}
    if (heroY >322) {heroY = 322}
    heroDirectionLink = `images/hero_jump${jumpstateurl}.png`;
  }
  else if (obstacleFreeDown == true && heroY < 322) {
    heroY += 8;
  }
  // else if (state <30) {stateurl = 2;}
  // else if (state <40) {stateurl = 1;}
  // else if (state <50) {stateurl = 0;}
  // if (direction == "left"){
  //   heroDirectionLink = `images/hero_left_${stateurl}.png`
  // }
  // if (direction == "right"){
  //   heroDirectionLink = `images/hero_right_${stateurl}.png`
  // }
  // if (direction == "up"){
  //   heroDirectionLink = `images/hero_up_${stateurl}.png`
  // }
  // if (direction == "down"){
  //   heroDirectionLink = `images/hero_down_${stateurl}.png`
  // }
  if (state == 20){
    state = 0;
  }
  
  if (jumpstate >= 33){
    playerPressedUp = 0;
    jumpstate = 0;
    heroDirection = "";
  }
  // userTyped = false;
  previousDirection = direction;
  return heroDirectionLink;
}


// * Setting stages
let stage = 0; // 0 = beginning, 1 = after transformation, 2 = boss

// function displayHeroDirection(direction) {
//   let heroDirectionLink = "";
//   if (userTyped == true){state +=1;}
//   if (state >=25) {stateurl = 0;}
//   if (state <25) {stateurl = 1;}
//   if (direction == "left"){
//     heroDirectionLink = `images/pikachu_left_${stateurl}.png`
//   }
//   if (direction == "right"){
//     heroDirectionLink = `images/pikachu_right_${stateurl}.png`
//   }
//   if (direction == "up"){
//     heroDirectionLink = `images/pikachu_up_${stateurl}.png`
//   }
//   if (direction == "down"){
//     heroDirectionLink = `images/pikachu_down_${stateurl}.png`
//   }
//   if (state == 50 && userTyped == true){
//     state = 0;
//   }
//   userTyped = false;
//   return heroDirectionLink;
// }



/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the food.
 */

// let heroEvolved = 0;
let heroDirection = "down";

let heroX = 50;
let heroY = 322;

let foodX = Math.round(Math.random()*(canvas.width - 32));
let foodY = Math.round(Math.random()*(canvas.height -32));

let brickX = Math.round(Math.random()*(canvas.width - 120)); // 
let brickY = 368;

let brick2X = 1200;
let brick2Y = Math.round(Math.random()*(canvas.height - 120))

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







// check if anything is in the way
function checkObstacle(x,width,y,height) {
  let tempLeft, tempRight, tempUp, tempDown;
  // bigloop:
  // for (let i = heroY; i < heroY + hero.height; i++) {
  //   for (let z = y; z < y + height; z++) {
  //       if (z=i) {
  //         if ((x + width > heroX + hero.width) && (heroX + hero.width > x)) {obstacleFreeRight = false; if (heroY + hero.height > y) {heroY = y - hero.height; obstacleFreeRight = true;}}
  //         if ((heroX + hero.width > x + width) && (x + width > heroX)) {obstacleFreeLeft = false}
  //         break bigloop;
  //       }  
  //   }
  //   obstacleFreeRight = true;
  //   obstacleFreeLeft = true;
  // }

  // if (hero.height <= height) {
  //   if (((y < heroY) && (heroY < y + height)) || ((y < heroY + hero.height) && (heroY + hero.height < y + height)))  {
  //     console.log(y, heroY, heroY + hero.height, y + height  )
  //     if ((x + width > heroX + hero.width) && (heroX + hero.width > x)) {
  //       obstacleFreeRight = false;
  //       if (heroY + hero.height > y) {heroY = y - hero.height; obstacleFreeRight = true;}}
  //     else {obstacleFreeRight = true};
  //     if ((heroX + hero.width > x + width) && (x + width > heroX)) {obstacleFreeLeft = false}
  //     else {obstacleFreeLeft = true};
  //   }
  //   else {
  //     obstacleFreeRight = true;
  //     obstacleFreeLeft = true;
  //   }
  // }
  // else {}

        // right obstacle
    if (x <= heroX + hero.width && x + width > heroX + hero.width ) {
      if (( y < heroY && y + height > heroY ) || (y < heroY + hero.height && y > heroY) ) {
        tempRight = false;
        
      }
      else {tempRight = true;}
    }
    else {tempRight = true;}

    // left obstacle
    if (x + width >= heroX && x < heroX ) {
      if (( y  < heroY && y + height > heroY ) || (y < heroY + hero.height && y > heroY) ) {
        tempLeft = false;
      }
      else {tempLeft = true;}
    }
    else {tempLeft = true;}

    // else {
    //   obstacleFreeRight = true;
    //   obstacleFreeLeft = true;
    // }
  
  
  

  if (((x < heroX) && (heroX < x + width)) || ((x < heroX + hero.width) && (heroX + hero.width < x + width))) {
    if ((y < heroY) && (heroY <= y + height)) {tempUp = false}
    else {tempUp = true};
    if ((y < heroY + hero.height) && (heroY + hero.height < y + height)) {
      tempDown = false;
      if (heroY + hero.height > y) {heroY = y - hero.height + 1; tempRight = true; tempLeft = true;}
    }
    else {tempDown = true};
  }
  else {
    tempUp = true;
    tempDown = true;
  }
  if (heroY >= 322) {tempDown = false;}
  let array = [tempLeft, tempRight, tempUp, tempDown];
  return array;
}

function checkAllObstacles() {
  obstacleFreeLeft = true;
  obstacleFreeRight = true;
  obstacleFreeDown = true;
  obstacleFreeUp = true;

   for (let z = 0; z < arguments.length; z++) {
    if (arguments[z][0] == false) {
      obstacleFreeLeft = false;
    }
    if (arguments[z][1] == false) {
      obstacleFreeRight = false;
    }
    if (arguments[z][2] == false) {
      obstacleFreeUp = false;
    }
    if (arguments[z][3] == false) {
      obstacleFreeDown = false;
    }
  }
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the food has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let gameovercheck = false;
let bg7X = 0;
let bg6X = 0;
let bg5X = 0;
let bg4X = 0;
let bg3X = 0;
let tree1X = 0;
let tree2X = 0;

let update = function () {
  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  let o1 = checkObstacle(brickX, 256, brickY, 64);
  let o2 = checkObstacle(brick2X, 64, brick2Y, 64);
  checkAllObstacles(o1,o2);
  if (40 in keysDown) { // Player is holding down key
    userTyped = true;
    heroDirection = "down";
     }
  if (37 in keysDown) { // Player is holding left key
    userTyped = true;
    heroDirection = "left";
    if (obstacleFreeLeft){heroX -= 12};
    if (heroX <= 0){
      heroX += 12;
    }
  }
  if (39 in keysDown) { // Player is holding right key
    userTyped = true;
    heroDirection = "right";
    if (obstacleFreeRight) {heroX += 7;} 
    if (heroX + hero.width >= canvas.width){
      heroX -=7;
    }
  }
  if (38 in keysDown) { // Player is holding up key
    userTyped = true;
    heroDirection = "up";
  }
  // else {heroDirection =""}

  // Check if player and food collided. O
  if (obstacleFreeRight == false) {heroX -=5;}

    if (
      heroX <= (foodX + hero.width)
      && foodX <= (heroX + hero.width)
      && heroY <= (foodY + hero.height)
      && foodY <= (heroY + hero.height)
    ) {
      // Pick a new location for the food.
      // Note: Change this to place the food at a new, random location.
      foodX = 1200;
      foodY = 70 + Math.round(Math.random()*(canvas.height - 140));
    }


    if (
      heroX <= (brickX + 120)
      && brickX <= (heroX + 48)
      && heroY <= (brickY + 120)
      && brickY <= (heroY + 48)
    ) {
      // Pick a new location for the food.
      // Note: Change this to place the food at a new, random location.

      
      // brickX = Math.round(Math.random()*(canvas.width - 120));
      // brickY = Math.round(Math.random()*(canvas.height - 120));
 
  };

  if (heroX <= -150) {
    gameovercheck = true;
  }

  //Parallax Background
  bg7X -= 5;
  if (bg7X <= -1000) {bg7X=0}
  bg6X -= 5;
  if (bg6X <= -1000) {bg6X=0}
  bg5X -= 0.5;
  if (bg5X <= -1000) {bg5X=0}
  bg4X -= 0.5;
  if (bg4X <= -1000) {bg4X=0}
  bg3X -= 1;
  if (bg3X <= -1000) {bg3X=0}
  tree1X -= 4;
  if (tree1X <= (-1200 - (Math.random()*200))) {tree1X=0}
  tree2X -= 4;
  if (tree2X <= (-1500 - (Math.random()*500))) {tree2X=0}
  

  // food movement
  foodX -= 5;
  if (foodX <= 0) {
    foodX = 1100;
    foodY = 70 + Math.round(Math.random()*(canvas.height - 140));}


  // random brick move + out of bound
  // if (brickY > heroY) {brickY -= 3;}
  // else if (brickY < heroY){brickY += 3};
  // if (brickX > heroX) {brickX -= 3;}
  // else if (brickX < heroX) {brickX += 3};
  brickX -= 5;
  if (brickX <= -300) {
    brickX = 900;
  }

  brick2X -= 5;
  if (brick2X <= -300) {
    brick2Y = Math.round(Math.random()*(canvas.height - 120))
    while (brick2Y < brickY && brick2Y + 64 > brickY) {
      brick2Y = Math.round(Math.random()*(canvas.height - 120))
    }
    brick2X = 1200;
  }

  // brickX += Math.round((Math.random() + 0.5)*10);
}
  

/**
 * This function, render, runs as often as possible.
 */
var render = function () {

  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (bg3Ready) {
    ctx.drawImage(bg3Image, bg3X, 0);
    ctx.drawImage(bg3Image, bg3X+1000, 0);
  }
  if (bg4Ready) {
    ctx.drawImage(bg4Image, bg4X, 0);
    ctx.drawImage(bg4Image, bg4X +1000,0);
  }
  if (bg5Ready) {
    ctx.drawImage(bg5Image, bg5X, 0);
    ctx.drawImage(bg5Image, bg5X+1000, 0);
  }

  if (tree1Ready) {
    ctx.drawImage(tree1Image, tree1X -200, 258);
    ctx.drawImage(tree1Image, tree1X +1000, 258);
  }
  if (tree2Ready) {
    ctx.drawImage(tree2Image, tree2X - 500, 188);
    ctx.drawImage(tree2Image, tree2X+ 1200, 188);
  }

  if (bg7Ready) {
    ctx.drawImage(bg7Image, bg7X, 0);
    ctx.drawImage(bg7Image, bg7X+1000, 0);
  }

  if (bg6Ready) {
    ctx.drawImage(bg6Image, bg6X, 0);
    ctx.drawImage(bg6Image, bg6X+1000, 0);
  }

  
  heroImage.src = displayHeroDirection(heroDirection);
 
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (foodReady) {
    ctx.drawImage(foodImage, foodX, foodY);
  }
  if (brickReady) {
    ctx.drawImage(brickImage, brickX, brickY);
    ctx.drawImage(brickImage, brickX+1200, brickY);
    
  }

  if (brick2Ready) {
    ctx.drawImage(brick2Image, brick2X, brick2Y);
    // ctx.drawImage(brick2Image, brick2X+1200, brick2Y);
    
  }

  if (gameovercheck && gameoverReady) {
    ctx.drawImage(gameoverImage, 0, 100);
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