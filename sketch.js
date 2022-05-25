var alien1,alien1_img,alien2,alien2_img,alien3,alien3_img,alien4,alien4_img;
var gameover_img,background_img,platform;
var shooter,shooter_img;
var alienGroup,alien,bullet,bulletGroup,bullet_img;
var die_sound,jump_sound,shoot_sound

var lives = 3;
var score = 0;
var gameState = 1;
const PLAY = 1;
const END = 0;

function preload()
{
	alien1_img = loadImage("assets/alien1.png")
	alien2_img = loadImage("assets/alien2.png")
	alien3_img = loadImage("assets/alien3.png")
	alien4_img = loadImage("assets/alien4.png")
	gameover_img = loadImage("assets/GameOver.jpg")
	shooter_img = loadImage("assets/Shooter.png")
	bullet_img = loadImage("assets/bullet1.png")
	background_img = loadImage("assets/Background.jpg")
	die_sound = loadSound("sounds/die.mp3")
	jump_sound = loadSound("sounds/jump.mp3")
	shoot_sound = loadSound("sounds/shoot.mp3")

}

function setup() {
	createCanvas(windowWidth,windowHeight);

	platform = createSprite(width/2,height/3-50);
    platform.addImage(background_img);
	platform.scale = 1.6;

	shooter = createSprite(400,500,10,10);
	shooter.addImage(shooter_img);
	shooter.scale = 0.2;
	shooter.setCollider("rectangle", 6, 0, 30, 150);

	alienGroup = createGroup();
    bulletGroup =  createGroup();

  
}


function draw() {
  //rectMode(CENTER);
  background(0);
  drawSprites();
  fill("black");
  textSize(20);
  text("Lives:" + lives,50,50);
  text("Score: " + score, 200, 50);
 
  if(gameState===1)
  {
	  
	if(keyDown("space")) //for shooting
	{
	 bulletspawn();
	 shoot_sound.play()
	 shoot_sound.setVolume(0.3)
	}

	//spawn(); alien spawned
	if(frameCount %100 ===0)
	{
      spawnAlien1();
	}

	if(frameCount %60 === 0)
	{
		spawnAlien2();
	}
	
	movement(); //control for the shooter

	//collision with the bullet 
	if(alienGroup.collide(bulletGroup))
    {
    alienGroup.destroyEach();
	score+=10
    }
	//collision with the shooter
    if(alienGroup.collide(shooter))
    {
    gameover();
	die_sound.play();
    }
  }  
 
}

function movement()
{

	if(keyDown("D"))
    {
	shooter.x = shooter.x+5; //movement going right
    }

	if(keyDown("A"))
	{
		shooter.x-=5; //movement going right
	}

	if(shooter.y<height-300)
	{
    shooter.velocityY+=1; //gravity
	}
	else{
		//movement along vertical
		shooter.velocityY=0;
		if(keyDown("W"))
        {
		shooter.velocityY-=20
		jump_sound.play()
	    }

    }
}

function spawnAlien1(){
alien1 = createSprite(2000,random(300,500),10,10);
alien1.addImage(alien1_img);
alien1.scale=1.2;
alien1.velocityX=-(6+3*score/100);
alien1.lifetime=1000;
alienGroup.add(alien1)
}

function spawnAlien2(){
alien2 = createSprite(2200,random(200,500),10,10);
alien2.addImage(alien2_img);
alien2.scale=1.2;
alien2.velocityX=-(10+3*score/100);
alien2.lifetime=1000;
alienGroup.add(alien2);
}

function bulletspawn()
{
  bullet= createSprite(shooter.x+20, width/2, 50,20)
  bullet.addImage(bullet_img)
  bullet.scale=0.07
  bulletGroup.add(bullet);
  bullet.visible=false
  setTimeout(()=>{
	bullet.y= shooter.y-10
	bullet.velocityX= 10
	bullet.visible=true
  },3000)

  
}

function gameover()
{
	lives= lives-1;
	alienGroup.destroyEach();
	if(lives===0)
	{
		swal(
			{ title: `Game Over!!!`,
			imageUrl: "GameOver.jpg",
			imageSize: "160x160",
			text: "Thanks for playing, your score was: " + score + "!!", 
			confirmButtonText: "Play Again" 
		   }, 
		   function (isConfirm) { 
			   if (isConfirm)
				{
					 location.reload(); 
				} 
			   }
		);   
	}
	
}