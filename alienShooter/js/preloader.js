AlienGame.Preloader = function(){
  this.background = null;
  this.preloadBar = null;
    
};

AlienGame.Preloader.prototype = {
    preload : function(){
      this.state.backgroundColor = "black";
      this.preloadBar = this.add.sprite(this.game.width/2 - 100,this.game.height/2,'preloaderBar');
      this.add.text(this.game.width / 2, this.game.height/2 - 50 ,"Loading......",{
        font : "monospace 30px",
        fill : "white"
      }).anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(this.preloadBar);
//SOUNDS :
        //player's audio :  
         this.load.audio('normalFire','sound/player/normalFire.ogg');
         this.load.audio('missileFire','sound/player/missileFire.ogg');
         this.load.audio('lazeFire','sound/player/lazeFire.ogg');
         this.load.audio('powerUp','sound/player/powerUp.ogg');
         this.load.audio('dead','sound/player/dead.ogg');

        //boss : 
         this.load.audio('lostBoss','sound/boss/lostBoss.ogg');
         this.load.audio('winBoss','sound/boss/winBoss.ogg');
         this.load.audio('bossFire','sound/boss/bossFire.ogg');
        this.load.audio('bossFightBgSound','sound/boss/bossFightBgSound.ogg');

           //background Sound :
         this.load.audio('bgSound','sound/bgSound.ogg');
        this.load.audio('normalExplosion','sound/normalExplosion.ogg');

      
//OTHERS 
         this.load.image("mainMenu","img/mainMenu.png");
         this.load.spritesheet("explosion","img/explosion.png",16,16,5);
         this.load.image("bg","img/bg.png");
         // this.load.image("clound","img/clound.png");
        
//    BULLET + ITEM CHO PLAYER    
        this.load.image("normalBullet","img/normalBullet.png");
        this.load.image("supportPlayer","img/supportPlayer.png"); //2 thang de 
        this.load.image("missileBullet","img/missileBullet.png");
        this.load.image("lazeBullet","img/lazeBullet.png");
        this.load.image("protect","img/protect.png");
        //ENEMY 
        this.load.spritesheet("enemyBig","img/enemy-big.png",32,32,3);
        this.load.spritesheet("enemySmall","img/enemy-small.png",16,16,3);
        this.load.spritesheet("boss","img/boss.png",141,179,3);
//        this.load.spritesheet("enemyNormal","img/enemy-medium.png",32,16,3);
        this.load.spritesheet("enemyNormal","img/enemy-medium.png",57,46,2);
        //ENEMY BULLET     
        this.load.image("enemyBigBullet","img/bigEnemyBullet.png");
        this.load.image("enemyNormalBullet","img/normalEnemyBullet.png");
        this.load.image("bossBullet","img/bossBullet.png");
        
    //PLAYER 
        this.load.spritesheet("player","img/ship.png",16,24,10);
       
        
    },
    
    
    update : function(){
        this.state.start("MainMenu");
    }
};