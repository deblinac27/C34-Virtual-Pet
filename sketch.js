//Create variables here
var dogimg, dog, happyDog;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dogimg = loadImage('images/dogImg.png');
  happyDog = loadImage('images/dogImg1.png');
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogimg) 
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  console.log(foodStock);
}


function draw() {  
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  textSize(15);
  fill("white");
  text("Press the UP ARROW to feed your pet", 150, 100);
}

function readStock(data){
foodS = data.val();
console.log(foodS);
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

