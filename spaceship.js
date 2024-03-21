class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
    this.direction = 'w';
    this.jetTrusterFires = [];
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(0,0,255);
    this.spaceShip();
    this.jetTruster();
  }

  move(){
      // YOUR CODE HERE (4 lines)
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
      this.velocity.limit(this.maxVelocity);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0)); //decrease x
        this.direction == 'a'
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0.1, 0)); //increase x
        this.direction == 'd'
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0, -0.1)); //decrease y
        this.direction == 'w'
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
        this.applyForce(createVector(0, 0.1)); //increase y
        this.direction == 's'
      }
      var jetTruster = new jetTrustersFire(this.direction, this.location);
       this.jetTrusterFires.push(jetTruster);
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
      var gravity = createVector(0,0.05); //inc y
      this.applyForce(gravity);
      
      var friction = this.velocity.copy();
      friction.mult(-1);
      friction.mult(1/30);
      this.applyForce(friction);
  }


//make the spaceship pretty by adding the truster
spaceShip(){ 
        if(this.direction == 'w'){
            triangle(this.location.x - this.size/2, this.location.y + this.size/2,
                   this.location.x + this.size/2, this.location.y + this.size/2,
                   this.location.x, this.location.y - this.size/2);
            rect(this.location.x + 5, this.location.y + (this.size* 11/30), 10, 20);
            rect(this.location.x - 15, this.location.y + (this.size* 11/30), 10, 20);
            
        }
      if(this.direction == 'a'){
            triangle(this.location.x + this.size/2, this.location.y + this.size/2,
                   this.location.x + this.size/2, this.location.y - this.size/2,
                   this.location.x - this.size/2, this.location.y);
            rect(this.location.x + (this.size * 11/30), this.location.y - 15, 20, 10);
            rect(this.location.x + (this.size * 11/30), this.location.y + 5, 20, 10);
        }
        if(this.direction == 's'){
            triangle(this.location.x - this.size/2, this.location.y - this.size/2,
                   this.location.x + this.size/2, this.location.y - this.size/2,
                   this.location.x, this.location.y + this.size/2);
            rect(this.location.x + 5, this.location.y - (this.size * 4/5), 10, 20);
            rect(this.location.x - 15, this.location.y - (this.size * 4/5), 10, 20);
        }
        if(this.direction == 'd'){
            triangle(this.location.x - this.size/2, this.location.y + this.size/2,
                   this.location.x - this.size/2, this.location.y - this.size/2,
                   this.location.x + this.size/2, this.location.y);
            rect(this.location.x - (this.size * 4/5), this.location.y - 15, 20, 10);
            rect(this.location.x - (this.size * 4/5), this.location.y + 5, 20, 10);
        }
  }


jetTruster(){
        for (var i=0; i<this.jetTrusterFires.length; ++i){
            fill(255,random(255),0);
            if(this.jetTrusterFires[i].Span == 0){
                splice(this.jetTrusterFires.splice(i,1));
            }
            if(this.jetTrusterFires[i].direction == 'w'){
                ellipse(this.jetTrusterFires[i].moveX + 10, this.jetTrusterFires[i].moveY + (this.size * 3/4), this.jetTrusterFires[i].outputSize);    
                ellipse(this.jetTrusterFires[i].moveX - 10, this.jetTrusterFires[i].moveY + (this.size * 3/4), this.jetTrusterFires[i].outputSize);    
            }
            if(this.jetTrusterFires[i].direction == 'a'){
                ellipse(this.jetTrusterFires[i].moveX + (this.size * 3/4), this.jetTrusterFires[i].moveY + 10, this.jetTrusterFires[i].outputSize);    
                ellipse(this.jetTrusterFires[i].moveX + (this.size * 3/4), this.jetTrusterFires[i].moveY - 10, this.jetTrusterFires[i].outputSize);    
            }
            if(this.jetTrusterFires[i].direction == 's'){
                ellipse(this.jetTrusterFires[i].moveX + 10, this.jetTrusterFires[i].moveY - (this.size * 3/4), this.jetTrusterFires[i].outputSize);    
                ellipse(this.jetTrusterFires[i].moveX - 10, this.jetTrusterFires[i].moveY - (this.size * 3/4), this.jetTrusterFires[i].outputSize);    
            }
            if(this.jetTrusterFires[i].direction == 'd'){
                ellipse(this.jetTrusterFires[i].moveX - (this.size * 3/4), this.jetTrusterFires[i].moveY + 10, this.jetTrusterFires[i].outputSize);    
                ellipse(this.jetTrusterFires[i].moveX - (this.size * 3/4), this.jetTrusterFires[i].moveY - 10, this.jetTrusterFires[i].outputSize);    
            }
            this.jetTrusterFires[i].Span--;
        }
  }
}

class jetTrustersFire{
    constructor(direction, location){
        this.moveX = location.x;
        this.moveY = location.y;
        this.outputSize = random(10,20);
        this.Span = 2;
        this.direction = direction;
    }
}