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
  stroke("black");
  fill("white");
  text("Press the UP ARROW to feed your pet", 150, 100);
  text("Food remaining: "+foodS, 200, 120);
}

function readStock(data){
foodS = data.val();
console.log(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

