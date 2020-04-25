var cells = [];

function setup() {     
  createCanvas(800, 600);
//  cells.push(new Cell(2));
//  cells.push(new Cell(6));
    
for (var i = 0; i < 10; i++){
    
cells[i] = new Cell(random(1,3));
    
}
    
}

function draw() {
  background(0);

  for (var i=0; i<cells.length; i++){
      
    if (mouseIsPressed){
    var mouseVector = createVector(mouseX,mouseY);
    var locVector = createVector(random(width), height / 2);
    var wind = p5.Vector.sub(mouseVector,locVector);
    wind.setMag(-0.1);
      
      cells[i].applyForce(wind);
  }
      
    var friction = cells[i].speed.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.03);
    cells[i].applyForce(friction);
    cells[i].run();
  }
}

function Cell(_m) {
  this.speed = createVector(random(-1,1), random(-1,1));
  this.loc = createVector(random(width), height / 2);
  this.acceleration = createVector(0, 0);
  this.mass = _m || 3;
  this.diam = this.mass * 10;
  this.intersects = false;

  this.run = function() {
    this.draw();
    this.move();
    this.checkBorders();
      
  }

  this.draw = function() {
    this.diam = this.mass * 10;
    fill(125);
    ellipse(this.loc.x, this.loc.y, this.diam, this.diam);
  }

  this.move = function() {
    this.speed.add(this.acceleration);
    this.loc.add(this.speed);
    this.acceleration.mult(0);
  }

  this.checkBorders = function() {     
    if (this.loc.x > width-this.diam/2) {
      this.loc.x = width-this.diam/2;
      this.speed.x *= -1;
    } else if (this.loc.x < this.diam/2) {
      this.speed.x *= -1;
      this.loc.x = this.diam/2;
    }
    if (this.loc.y > height-this.diam/2) {
      this.speed.y *= -1;
      this.loc.y = height-this.diam/2;
    }
     else if (this.loc.y < this.diam/2) {
      this.speed.y *= -1;
      this.loc.y = this.diam/2;
    }
  }

  this.applyForce = function(f) {
    var adjustedForce = f.copy();
    adjustedForce.div(this.mass);
    this.acceleration.add(adjustedForce);
  }
  
  this.checkCollisions = function(){
      this.intersects = false;
      for (var i = 0; i < cells.length; i++){
          if (cells[i] != this.cells){
        
              
            
              
              
          }
          
          
      }
      
  }
  
}
