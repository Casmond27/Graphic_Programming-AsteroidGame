var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score;
var button;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
  score = 0;
    
  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);

  restartButton();
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();
  
  showScore();
  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i=0; i < asteroids.locations.length;i++){
        var asteroidLoc = asteroids.locations[i];
        var asteroidSize = asteroids.diams[i];
        var collision = isInside(spaceship.location, spaceship.size, asteroidLoc, asteroidSize);
        if(collision){
            gameOver();
        }
    }
    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
     for(var i=0; i < asteroids.locations.length;i++){
        var asteroidLoc = asteroids.locations[i];
        var asteroidSize = asteroids.diams[i];
        var collision = isInside(earthLoc, earthSize.y, asteroidLoc, asteroidSize);
        if(collision){
            gameOver();
        }
    }
    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
        var collision = isInside(earthLoc, earthSize.y, spaceship.location, spaceship.size);
        if(collision){
            gameOver();
        }
    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
        var collision = isInside(atmosphereLoc, atmosphereSize.y, spaceship.location, spaceship.size);
        if(collision){
            spaceship.setNearEarth();
        }

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    
    var bulletSys = spaceship.bulletSys;
    var bullets = bulletSys.bullets;
    for(var i=0; i<bullets.length;i++) {
        var bullet = bullets[i];
        var bulletSize = bulletSys.diam;
        for(var j =0; j<asteroids.locations.length;j++){
            var asteroidLoc = asteroids.locations[j];
            var asteroidSize = asteroids.diams[j];
            var collision = isInside(bullet, bulletSize, asteroidLoc, asteroidSize);
            
            if(collision){ // for the score board
                asteroids.destroy(i);
                score += 1 // add points if the bullet hit the asteroid
                spaceship.bulletSys.bullets.splice(j,1);
                i--;
                break;
            }
        }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var distance = dist(locA.x, locA.y, locB.x, locB.y);
    var maxDistance = sizeA/2 + sizeB/2;
    if(maxDistance<distance){
        return false;
    }else{
        return true;
    }
    
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
    button.show();
    //game over and display total score
    push();
    fill(255,0,0);
    textSize(80);
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
    textSize(42);
    translate(0, 50);
    text("Total Score: " + score, width/2, height/2);
    pop();
    noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}

//////////////////////////////////////////////////
function showScore(){
  // score board (extra features)
  fill(255,255,255);
  textSize(50);
  text("Score: " + score, 500, 40); 
}

//////////////////////////////////////////////////
function restartButton(){
    button = createButton('Try Again');
    button.position(550, 470);
    button.size(100,50);
    button.mousePressed(restartGame);
    button.hide();
}
//////////////////////////////////////////////////
function restartGame(){
    button.hide();
    setup();
    draw();
    loop();
}


