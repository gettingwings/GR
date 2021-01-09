var ghost, ghostImg;
var tower, towerImg;

var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var block, blockGroup;

var invisibleGround;

var gameState = "play";
var speed = 4;


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
 
}


function setup(){
  createCanvas(windowWidth, windowHeight);
  
  //spookySound.loop();
  
  tower = createSprite(width/2, height/2);
  tower.addImage(towerImg);
  tower.velocityY = speed;
  tower.scale = 0.8;
  
  ghost = createSprite(width/2,height-50,10,10);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  //ghost.bounciness = 0.5;
  //ghost.debug = true;
  ghost.setCollider("rectangle", 0, 8, ghost.width, ghost.height);
  
  invisibleGround = createSprite(width/2,height-30,width,1);
  invisibleGround.visible = false;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  blockGroup = new Group();
  
}// ------------end of setup -------------------

function draw(){
  background(0);
  
  if (gameState === "play") {
      
      ghost.collide(invisibleGround);
      if(frameCount>300){
        invisibleGround.scale = 0.001;
      }
    
      if(tower.y > height-150){
         tower.y = height/2;
      }
      
      if(keyDown("left_arrow")){
        ghost.x = ghost.x - 3;
      }

      if(keyDown("right_arrow")){
        ghost.x = ghost.x + 3;
      }

      if( keyDown("up") ){
        ghost.velocityY = -7;
      }
      ghost.velocityY = ghost.velocityY + 0.8

      spawnDoors();
    
      if( climbersGroup.isTouching(ghost) ){
          ghost.bounceOff(climbersGroup);
        
      }

      if( blockGroup.isTouching(ghost) ){
        gameState = "end";
      }
    
    
  }else if(gameState === "end"){
    
    
    fill("orange");
    textSize(30);
    text("Game Over", width/2 - 20, height/2);
    
    tower.visible = false;
    ghost.visible = false;
    
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    blockGroup.destroyEach();
    
  }
  
  drawSprites();
  
}// -----------------end of draw --------------------------


function spawnDoors() {
  
  if (frameCount % 100 === 0) {
    var rand = 
        Math.round(random(width/2-200, width/2+200));
    
    var door = createSprite(rand, -50);
    var climber = createSprite(rand, door.y+door.height/2);
    var block = createSprite(rand, climber.y+15);
    
    
    block.width = climber.width;
    block.height = 2;
    block.visible = true;
    block.shapeColor = "red";
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = speed;
    climber.velocityY = speed;
    block.velocityY = speed;
    
    ghost.depth =door.depth + 1;
   
    //assign lifetime to the variable
    door.lifetime = height/speed;
    climber.lifetime = height/speed;
    block.lifetime = height/speed;
    
    //door.debug = true;
    //climber.debug = true;
    //block.debug = true;
    //block.setCollider("rectangle", 0, 0, 80, 5);
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    blockGroup.add(block);
  }
}


