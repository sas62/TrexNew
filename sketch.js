
  var trex, trex_running;
  var suelo, suelo_image;
  var sueloInvisible;
  var nubeI
  var ob1, ob2, ob3, ob4, ob5, ob6;
  var score=0;
  
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;
  var grupoNubes;
  var grupoObstaculos;
  
  var gameOverImg, restartImg;
  
  var trexC
 
  var soundDie
  var soundCheckpoint
  var soundJump


  function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  suelo_image=loadImage("ground2.png");
  nubeI=loadImage("cloud.png");
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("Restart.png");
  trexC=loadImage("trex_collided.png");
  soundDie=loadSound("die.mp3");
  soundCheckpoint=loadSound("checkpoint.mp3");
  soundJump=loadSound("jump.mp3");








}//Fin de Function preload



function setup(){
  createCanvas(windowWidth, windowHeight);
  
  trex=createSprite(50,328,10,50);
  trex.addAnimation("trex",trex_running);
  trex.addImage("trexC",trexC);
  trex.scale=0.7;
  
  suelo=createSprite(200,358,30,30);
  suelo.addImage("suelo",suelo_image);
  sueloInvisible=createSprite(100,368,200,20)
  sueloInvisible.visible=false;
  var azar= Math.round(random(1,10));
  
  console.log(azar);
  
  trex.setCollider("rectangle",1,10,40,60);
  //trex.debug=true;

  grupoNubes=new Group();
  grupoObstaculos=new Group();
  
  gameOver=createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);

  restart=createSprite(width/2,height/2);
  restart.addImage(restartImg);

  gameOver.scale = 0.6
  restart.scale = 0.8

  gameOver.visible = false;
  restart.visible = false;

}// Fin function setup




function draw(){
  background("white")
  
  if(gameState===PLAY){
  score=score + Math.round(frameCount/60);
  text("Score " + score,500,20)
    
    crearNubes();
    crearObstaculos();
    suelo.velocityX = -(5 + 3*frameCount/300)
    trex.velocityY=trex.velocityY+0.8;//gravedad
    
    
    if(keyDown("space")&& trex.y>315){
      trex.velocityY=-15;
      console.log(trex.y);
      soundJump.play();  
    }
   
   if(frameCount%300===0){
     soundCheckpoint.play();
   }
   
  
  
  } 
  
  if(gameState===END){
    trex.changeAnimation("trexC")
    suelo.velocityX = 0;
    grupoNubes.setVelocityXEach(0);
    grupoObstaculos.setVelocityXEach(0);
    gameOver.visible = true;
    restart.visible = true;
    grupoObstaculos.setLifetimeEach(-1);
    grupoNubes.setLifetimeEach(-1);
    trex.velocityY = 0;
    
    if(mousePressedOver(restart)){
      reinicio();

    }
  }
  
  if(grupoObstaculos.isTouching(trex)){
    gameState = END;

  }
 
  trex.collide(sueloInvisible);

  
  
  
  
  
  
  
  
  
  
  
  
  


if(suelo.x<0){
  suelo.x=suelo.width/2
}



  

  
  


  drawSprites();
}//Fin de Function draw






function crearNubes(){
  var altura=Math.round(random(20,110));
  if(frameCount%40===0){
    var nubes=createSprite(600,altura,30,15);
    nubes.addImage("nube",nubeI);
    nubes.velocityX=-5;
    nubes.lifetime=150;
    grupoNubes.add(nubes);
  }

}




function crearObstaculos(){
 var azarObstaculos=Math.round(random(1,6));
  if (frameCount%80===0){
    var obstaculo = createSprite(1300,330,40,20)
    obstaculo.scale = 0.6;
    obstaculo.velocityX = -(5 + 3*frameCount/300);
    switch(azarObstaculos){
      case 1: obstaculo.addImage("cactus1",ob1);
        break;
      case 2: obstaculo.addImage("cactus2",ob2);
        break;
      case 3: obstaculo.addImage("cactus3",ob3);
        break;
      case 4: obstaculo.addImage("cactus4",ob4);
        break;
      case 5: obstaculo.addImage("cactus5",ob5);
        break;
      case 6: obstaculo.addImage("cactus6",ob6);
        break;

    }
    obstaculo.lifetime=1100;
    grupoObstaculos.add(obstaculo);
   
  }
 
}    


function reinicio(){
  gameState = PLAY
  trex.changeAnimation("trex");
  grupoObstaculos.destroyEach();
  grupoNubes.destroyEach();
  score = 0
  restart.visible = false;
  gameOver.visible = false;
}