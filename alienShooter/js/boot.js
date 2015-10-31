var AlienGame = {
BG_SCROLL_LEVEL1_SPEED : 80,
BG_SCROLL_LEVEL2_SPEED : 40,
BG_SCROLL_LEVEL3_SPEED : 80,
// SCORE_LEVEL1 : 200,
// SCORE_LEVEL2 : 300,
// SCORE_LEVEL3 : 400,

SCORE_LEVEL1 : 200,
SCORE_LEVEL2 : 300,
SCORE_LEVEL3 : 550,

WEGAPON_SCORE : 2,
INSTRUCTION_TIME : 3000,

PLAYER_CLASS : {
        LIFE : 5 ,
        HP : 3,
        speed : 200,

//bullet damage : 
        NORMAL_DAMAGE : 1,
        LAZE_DAMAGE : 5 ,
        MISSILE_DAMAGE : 3,

        wegaponType : this.NORMAL,
        fireRate :100,
//        GHOST_TIME : Phaser.Time.SECOND*3,
        GHOST_TIME : 5000,
        
            // fire Speed : 
            NORMAL_BULLET_FIRE_SPEED : 500,
            SPREAD_BULLET_FIRE_SPEED : 300,
            LAZE_BULLET_FIRE_SPEED : 1000,
            MISSILE_BULLET_FIRE_SPEED : 600,
            
        //fire rate :
            NORMAL_BULLET_FIRE_RATE : 100,
        
            SPREAD_BULLET_FIRE_RATE : 300,
        
            LAZE_BULLET_FIRE_RATE : 800,
        
            MISSILE_BULLET_FIRE_RATE : 150,
        
            SUPPORT_FIRE_RATE : 300
    },
ENEMY_CLASS : {
    

  SMALL_ENEMY : {
        TYPE : "enemySmall",
        SPAWN_TIME_LEVEL1 : 7400, //600ms
        SPAWN_TIME_LEVEL2 : 7750, // 250ms
        SPAWN_TIME_LEVEL3 : 6000, // 2s -> fight boss 

        CONST_SPAWN_TIME : 8000,
        SPAWN_TIME : 800, //level 0 
        
        REWARD : 3,
        MIN_SPEED : 100, 
        MAX_SPEED : 500,
        
        BULLET_SPEED : 460,
        DAMAGE : 1,
        ARRAY_ANIMATIONS : [0,1],
        ARRAY_HIT_ANIMATIONS : [0,3,1,3],
        EXPLOSION_SIZE : 1 ,
        HEALTH : 2
    },
        
    NORMAL_ENEMY : {
        TYPE :"enemyNormal",
        SPAWN_TIME_LEVEL1 : 6000, //1500ms*2
        SPAWN_TIME_LEVEL2 : 8000, // 1000ms
        SPAWN_TIME_LEVEL3 : 7000, // 2000

        CONST_SPAWN_TIME : 9000,
        SPAWN_TIME : 4000,

        CONST_SHOT_DELAY : 5000,
        SHOT_DELAY : 6000,
        SHOT_DELAY_LEVEL1 : 2000,
        SHOT_DELAY_LEVEL2 : 4000,
        SHOT_DELAY_LEVEL3 : 3000,

        REWARD : 3,
        MIN_SPEED : 50, 
        MAX_SPEED : 100,
        
        BULLET_SPEED : 150,
        DAMAGE : 2,
        ARRAY_ANIMATIONS : [0,1],
        ARRAY_HIT_ANIMATIONS : [0,1],
        EXPLOSION_SIZE : 2 ,
        RANDOM_MOVE : true,
        MOVE_TYPE : 1 , // 
        HEALTH : 8,
        
        
    },
    
      BIG_ENEMY : {
        TYPE : "enemyBig",
        SPAWN_TIME_LEVEL1 : 2500, //2500
        SPAWN_TIME_LEVEL2 : 3000, // 2000
        SPAWN_TIME_LEVEL3 : 1000, //4000

        CONST_SPAWN_TIME : 5000,
        SPAWN_TIME : 2000,

        CONST_SHOT_DELAY : 6000,
        SHOT_DELAY : 6000,
        SHOT_DELAY_LEVEL1 : 2000,
        SHOT_DELAY_LEVEL2 : 4500,
        SHOT_DELAY_LEVEL3 : 2500,
        REWARD : 3,
        MIN_SPEED : 30, 
        MAX_SPEED : 60,
        
        BULLET_SPEED : 300,
        DAMAGE : 4,
        ARRAY_ANIMATIONS : [0,1],
        ARRAY_HIT_ANIMATIONS : [0,2,1,2],  
        EXPLOSION_SIZE : 2,
        RANDOM_MOVE : true,
          
        HEALTH : 10,
    },

        BOSS :{
            //BOSS_SPAWN_SCORE : 12,
             BOSS_SPAWN_SCORE : 600,
            TYPE :  "boss",
            CONST_SHOT_DELAY : 3000,
            SHOT_DELAY : 3000,
            
            REWARD:10,

            MIN_SPEED :600,
            MAX_SPEED:900,

            BULLET_SPEED : 400,
            DAMAGE : 10,

            HEALTH : 700

        }
    },
};

AlienGame.Boot = function(game){
    console.log("%cStart my awesome game","backgroundColor:white,color:yellow" );
};

AlienGame.Boot.prototype = {

  init: function () {

    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    this.input.maxPointers = 1;

    //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    // this.stage.disableVisibilityChange = true;

    if (this.game.device.desktop) {
      //  If you have any desktop specific settings, they can go in here
    } else {
      //  Same goes for mobile settings.
      //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.setMinMax(480, 260, 1024, 768);
      this.scale.forceLandscape = true;
    }
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
    
    preload : function(){
            this.load.image("preloaderBar","img/preloader-bar.png");
    },
    
    create : function(){
        //tien vao preloader :
        this.state.start("Preloader");
    }

};