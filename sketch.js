let cell = [];
let cl;
let maxMass = 6;

function setup() {
  createCanvas(800, 600);
//   Remove initial overlapping of the cells when dom created
  let protection = 0;
  for (let i = 0; i < 10; i++) {
    cl = new Cell(createVector(random(-1,1), random(-1,1)), initialLocation = undefined, random(1, 3),65);
    let intersects = false;
    for (var j = 0; j < cell.length; j++) {
        let other = cell[j];
        let d = dist(cl.loc.x, cl.loc.y, other.loc.x, other.loc.y);
        if (d < cl.diam/2 + other.diam/2) {
          intersects = true;
        }
      }

    if (!intersects) {
        cell.push(cl);
      }

    protection++;
    if (protection > 10000) {
      break;
    }
  }
}

function draw() {
    background(0);
    for (let cl of cell) {
      if (mouseIsPressed){
        var mouseVector = createVector(mouseX,mouseY);
        var locVector = createVector(random(width), height / 2);
        var wind = p5.Vector.sub(mouseVector,locVector);
        wind.setMag(-0.1);
        cl.applyForce(wind);
        intersects = false;
        for (let other of cell) {
          this.intersects = false;
          if (cl !== other && cl.checkCollision(other)) {
            intersects = true;
            clVector = createVector(cl.loc.x, cl.loc.y);
            otherVector = createVector(other.loc.x, other.loc.y);
            wind = p5.Vector.sub(clVector,otherVector);
            wind.setMag(0.8);
            cl.applyForce(wind);
          }
        }
        if (intersects) {
          cl.changeColor(color(255,0,0));
        } else {
          cl.changeColor(65);
        }
      }
      cl.checkConstraints();
      var friction = cl.speed.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(0.03);
      cl.applyForce(friction);
      cl.aging();
    }
  }

class Cell {
    constructor(speed, initialLocation, mass, col) {
        this.speed = speed;
        this.loc = createVector(random(width),random(height));
        if(initialLocation !== undefined){
          this.loc.x = initialLocation.x;
          this.loc.y = initialLocation.y;
        }
        this.acceleration = createVector(0, 0);
        this.mass = mass || 3;
        this.diam = this.mass * 10;
        this.col = col;
        this.agingRate = random(0.003, 0.015);
    }

    applyForce(wind) {
      var adjustedForce = wind.copy();
      adjustedForce.div(this.mass);
      this.acceleration.add(adjustedForce);
        this.acceleration.add()
      }

    checkConstraints(){
        this.draw();
        this.move();
        this.checkBorders();
    }

    draw(){
        this.diam = this.mass * 10;
        fill(this.col);
        ellipse(this.loc.x, this.loc.y, this.diam, this.diam);
        noStroke();
    }

    checkBorders(){
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

    move(){
        this.speed.add(this.acceleration);
        this.loc.add(this.speed);
        this.acceleration.mult(0);
    }

    changeColor(col){
        this.col = col;   
    }

    checkCollision(other){
      this.intersects = false;
        let distance = dist(this.loc.x,this.loc.y, other.loc.x, other.loc.y)
        if(distance <= this.diam/2 + other.diam/2){
          this.intersects = true;
            return true;
        }
        return  false;
    }

    aging(){
      // adding mass with againg rate 
       this.mass = this.mass + this.agingRate;
       
       if(this.mass > maxMass){
        let index = cell.indexOf(this);
        // check current object index and remove it using splice
         cell.splice(index, 1);
        //  adding two new childCells
         cell.push(this.mitosis())
         cell.push(this.mitosis())
       }
    }

    mitosis(){
      var initialLocation = {}
      initialLocation.x = random(width);
      initialLocation.y = random(height);
      var childCell = new Cell(createVector(random(-1,1), random(-1,1)), initialLocation, this.mass/3,65);
      return childCell;
    }
}