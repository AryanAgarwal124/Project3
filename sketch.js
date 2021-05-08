var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {

  createCanvas(1500,700);

  database=firebase.database();

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.35

  var balloonPosition=database.ref('balloon/height')
  balloonPosition.on("value", readPosition, showError)

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);


  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    update(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    update(10,0)
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    update(0,-10)
    balloon.scale = 0.4
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    update(0,10)
    balloon.scale = 0.35
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
  text("Wait for a second as there is a lag",75,75);
  text("So please wait until it changes the position",110,110);
}

function update(x,y) {
  database.ref('balloon/height').set({
      'x' : height.x + x,
      'y' : height.y + y,
  })    

}

function readPosition(data)
{
  height = data.val();
  balloon.x = height.x
  balloon.y = height.y
}

function showError()
{
  console.log("Error in connecting to the database ")
}
