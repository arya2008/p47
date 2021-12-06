var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var fighters, fighter1, fighter2, fighter3, fighter4;

var track, fighter1_img, fighter2_img, fighter3_img, fighter4_img;

var score=0;

function preload(){
  track = loadImage("space.png");
  fighter1_img = loadImage("fighter2.png");
  fighter2_img = loadImage("fighter5.png");
  fighter3_img = loadImage("fighter14.png");
  fighter4_img = loadImage("fighter16.png");
  
 
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    
  }
  if(gameState === 2){
    game.end();
    
  }
 
 
}