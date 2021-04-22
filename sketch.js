
var END=0;
var PLAY=1;
var gameState=PLAY;
var bg,bgimage;
var ground;
var Hero,HeroImage;
var Enemy,enemyImage,Enemygroup;
var bird,cloudImage1,cloudImage2,cloudgroup;
var Heroimg2,enemyimg2;
var over,overimg,reset,seimg;
var score=0;


function preload(){
 HeroImage=loadAnimation("Images/Hero Walking 1.png","Images/Hero Walking 2.png","Images/Hero Walking 3.png","Images/Hero Walking 4.png","Images/Hero Walking 5.png");
 
 cloudImage1=loadAnimation("Images/Bird1.png","Images/Bird2.png","Images/Bird3.png","Images/Bird4.png");

 cloudImage2=loadAnimation("Images/Bird2.png");

 enemyImage=loadAnimation("Images/Enemy_Walking_1.png","Images/Enemy_Walking_2.png","Images/Enemy_Walking_3.png","Images/Enemy_Walking_4.png","Images/Enemy_Walking_5.png","Images/Enemy_Walking_6.png","Images/Enemy_Walking_7.png");

 bgimage=loadImage("Images/Background.jpg");

 Heroimg2=loadAnimation("Images/Hero Fall 4.png");

 enemyimg2=loadAnimation("Images/Enemy_Walking_1.png","Images/Enemy_Walking_2.png");

 overimg=loadImage("Images/Game Over.png");

 seimg=loadImage("Images/Reset.png");

}

function setup(){
createCanvas(1800,800);

bg=createSprite(900,400,2500,800);
bg.addImage(bgimage);
bg.scale=1.5;
bg.velocityX=-5;

over=createSprite(900,400);
over.addImage(overimg);
over.scale=0.5

reset=createSprite(900,200);
reset.addImage(seimg);
reset.scale=0.5

Hero=createSprite(200,790);
Hero.debug=false;
Hero.addAnimation("Hero",HeroImage);
Hero.addAnimation("collided",Heroimg2);

ground = createSprite(2200,790,9000,40); 
ground.x = ground.width/4;
ground.shapeColor="brown";
ground.velocityX=-4;
ground.visible=false;

Enemygroup=createGroup();
cloudgroup=createGroup();
}

function draw(){
  background(0);

  if(gameState===PLAY){
   if(bg.x<600){
     bg.x=bg.width/2;
   }

   over.visible=false;
   reset.visible=false; 

   score = score + Math.round(getFrameRate()/60);

   if(Enemygroup.isTouching(Hero)){
    gameState=END;
    Enemygroup[0].destroy();
   }

   if(keyDown("space")){
     Hero.velocityY=-20;  
   }

   Hero.velocityY = Hero.velocityY + 0.8;

   if (ground.x < 0){
    ground.x = ground.width/4;
  }

   spawnbird();

   spawnEnemy();
 }
 
 if(gameState===END){
   bg.velocityX=0;
   ground.velocityX=0;
   Hero.velocityX=0;
   Enemygroup.setVelocityXEach(0);
   cloudgroup.setVelocityXEach(0);

   if(mousePressedOver(reset)) {
    restart();
  }

   Hero.changeAnimation("collided",Heroimg2);

   over.visible=true;
   reset.visible=true;
 }  
 Hero.collide(ground);
 drawSprites();

   noStroke();
   textSize(30);
   fill("brown");
   text("Score: "+ score,1600,50);
}

function restart(){
  gameState=PLAY;  
  over.visible=false;
  reset.visible=false;
  Enemygroup.destroyEach(); 
  cloudgroup.destroyEach();
  Hero.changeAnimation("Hero",HeroImage);
  score=0;  
  }

function spawnbird(){
  if(frameCount%200===0){ 
   bird=createSprite(1700,50,20,10);
   bird.y=Math.round(random(50,450));
   bird.addAnimation("cloud",cloudImage1);
   bird.addAnimation("collided",cloudImage2)
   bird.scale=0.5;
   bird.velocityX=-4;
   cloudgroup.add(bird);
  }  
}

function spawnEnemy(){
  if(frameCount%150==0){
   Enemy=createSprite(1800,790);
   Enemy.addAnimation("Enemy",enemyImage);
   Enemy.addAnimation("collided",enemyimg2);
   Enemy.scale=0.7;
   Enemy.velocityX=-7;
   Enemy.collide(ground);
   Enemygroup.add(Enemy);
  }  
}