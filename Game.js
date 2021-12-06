class Game{
    constructor(){

    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      fighter1 = createSprite(100,200);
      fighter1.addImage("fighter1",fighter1_img);
      
      fighter2 = createSprite(300,200);
      fighter2.addImage("fighter2",fighter2_img);
      fighter2.scale=0.1;
      fighter3 = createSprite(500,200);
      fighter3.addImage("fighter3",fighter3_img);
      fighter4 = createSprite(700,200);
      fighter4.addImage("fighter4",fighter4_img);

      // fighter1.collide(fighter2,fighter3,fighter4);
      // fighter2.collide(fighter1,fighter3,fighter4);
      // fighter3.collide(fighter1,fighter2,fighter4);
      // fighter4.collide(fighter1,fighter2,fighter3);
      
      fighters = [fighter1, fighter2, fighter3, fighter4];
}
  play(){
     form.hide();
     
     Player.getPlayerInfo();
     player.getFightersAtEnd();
     if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(space, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          
          x = x + 200;
         
          y = displayHeight - allPlayers[plr].distance;
          fighters[index-1].x = x;
          fighters[index-1].y = y;
         // console.log(index, player.index)
  
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            fighters[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = fighters[index-1].y;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
          player.x=x+1;
          player.update();
      }
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
          player.x=x-1;
          player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank +=1
        Player.updateFightersAtEnd(player.rank)
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log(player.rank);
    }
  }
  
  
