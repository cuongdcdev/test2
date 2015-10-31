AlienGame.Game = function(){
   
};
AlienGame.Game.prototype = {

  //end tmpObject 
    create : function(){
        this.setAudio();
        this.setBackground();
        this.setPlayer();
        this.setEnemiesSmall(AlienGame.ENEMY_CLASS.SMALL_ENEMY);
        this.setEnemiesNormal(AlienGame.ENEMY_CLASS.NORMAL_ENEMY);
        this.setEnemiesBig(AlienGame.ENEMY_CLASS.BIG_ENEMY);
        this.setBoss(AlienGame.ENEMY_CLASS.BOSS,1);
        this.setBullets();
        this.setExplosions('explosion');
        this.setPlayerIcon();
        this.setText();
        this.cursors = this.input.keyboard.createCursorKeys();     
        },
    update : function(){
          this.checkCollision(this.bulletPool,[this.enemySmallPool,this.enemyNormalPool,this.enemyBigPool,this.bossPool],this.enemyHit);
          this.checkCollision(this.lazeBulletPool,[this.enemySmallPool,this.enemyNormalPool,this.enemyBigPool,this.bossPool],this.enemyHit);
          this.checkCollision(this.missileBulletPool,[this.enemySmallPool,this.enemyNormalPool,this.enemyBigPool,this.bossPool],this.enemyHit);
          this.checkCollision(this.player,[this.bulletPoolItem,this.lazeBulletPoolItem,this.missileBulletPoolItem,this.supportPlayerPoolItem],this.playerPowerUp);
            //va chạm PLAYER và đạn của quái ..... 
         this.checkCollision(this.player,[this.enemySmallPool,this.enemyNormalPool,this.enemyBigPool,this.bossPool,this.enemyNormalBulletPool,this.enemyBigBulletPool,this.bossBulletPool],this.playerHit);
         if(this.spawnEnemy === undefined || this.spawnEnemy === true){

          if(this.bossPool.bossFight === true){
              this.spawnEnemies(AlienGame.ENEMY_CLASS.SMALL_ENEMY,this.enemySmallPool);
              //this.enemyFire([this.enemyNormalPool,this.enemyBigPool]);
          }else{
              this.spawnEnemies(AlienGame.ENEMY_CLASS.SMALL_ENEMY,this.enemySmallPool);
              this.spawnEnemies(AlienGame.ENEMY_CLASS.BIG_ENEMY,this.enemyBigPool);   
              this.spawnWaveEnemies(AlienGame.ENEMY_CLASS.NORMAL_ENEMY,this.enemyNormalPool);
              this.enemyFire([this.enemyNormalPool,this.enemyBigPool]);
          }
        }
          this.moveBoss(this.bossPool);
          this.playerInput();
          this.otherEffect();
          this.levelManager(this.score);
    },
    render : function(){
//      this.game.debug.spriteBounds(this.player,50,50);  
       // this.game.debug.body(this.player);
//        this.game.debug.text("loai vu khi : "  + this.player.wegaponType + " laze level : " + this.player.lazeBulletLevel + "spread Level :"  + this.player.spreadBulletLevel + "missile LEvel : " + this.player.missileBulletLevel + " boss HP : " + this.bossPool.health ,100,100);
      //  this.game.debug.text("lazeBulletPoolItem DEad : " + this.lazeBulletPoolItem.countDead() + " missileBulletPoolItem Dead : " + this.missileBulletPoolItem.countDead() + "  support Pool dead : " + this.supportPoolItem.countDead() + " missileBulletPoolItem DEad : " + this.missileBulletPoolItem.countDead())
        // this.game.debug.text("boss hp : " + this.bossPool.health,100,100);
        // this.game.debug.text/()
    },
    setAudio : function(){
      //players sounds 
      this.soundNormalFire = this.add.audio('normalFire');
      this.soundNormalFire.volume = 0.3;
      this.soundMissileFire = this.add.audio('missileFire');
      this.soundMissileFire.volume = 0.6;
      this.soundLazeFire = this.add.audio('lazeFire');
      this.soundPowerUp = this.add.audio('powerUp');
      this.soundPowerUp.volume = 1.5;
      this.soundPlayerDead = this.add.audio('dead');
      this.soundPlayerDead.volume = 2 ;
      //boss's sounds
      this.soundLostBoss = this.add.audio('lostBoss');
      this.soundWinBoss = this.add.audio('winBoss');
      this.soundBossFire = this.add.audio('bossFire');
      this.soundBossFire.volume  =  2;
      this.soundBossFightBgSound = this.add.audio('bossFightBgSound');
      //bg's sounds
      this.soundBgSound = this.add.audio('bgSound',2,true);
      this.soundBgSound.play();
      this.soundNormalExplosion = this.add.audio('normalExplosion');
    },
    setBackground : function(){
      this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'bg');
      this.bg.autoScroll(0,200);
    },
    playerInput : function(){

        if(this.cursors.left.isDown){
            this.player.play("flyLeft");
            this.player.body.velocity.x = -AlienGame.PLAYER_CLASS.speed ;
            
        }else 
        if(this.cursors.right.isDown){
            this.player.play("flyRight");
            this.player.body.velocity.x = AlienGame.PLAYER_CLASS.speed;
        }else
        if(this.cursors.up.isDown){
            this.player.play("fly");
            this.player.body.velocity.y = -AlienGame.PLAYER_CLASS.speed;
        }else
        if(this.cursors.down.isDown){
            this.player.play("fly");
            this.player.body.velocity.y = AlienGame.PLAYER_CLASS.speed;
        }else {
             this.player.play("fly");
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0 ;
        } 
        
        if(this.input.keyboard.isDown(Phaser.Keyboard.Z)){
           this.playerFire();
        }
        // if(this.input.keyboard.isDown(Phaser.Keyboard.SPACE)){
        //     this.playerSkill();
        // }
    },
    setPlayer : function(){
        // 1 là đạn tỏa  ,  2 là đạn laze , 3 là đạn loại to 
      this.player = this.add.sprite(this.game.width/2,this.game.height/2,'player');
      this.player.animations.add('flyLeft',[0,5],20,false);
      this.player.animations.add('flyRight',[4,9],20,false);
      this.player.animations.add("fly",[2,7],20,false);
      this.player.animations.add("ghostTime",[7,12],20,false);
      this.player.play("fly");  
      this.player.explosionSize = 5;
      this.physics.enable(this.player);
      // this.player.enableBody = true ;
      this.player.anchor.setTo(0.5,0.5);
      this.player.scale.setTo(2,2);
      this.player.body.collideWorldBounds = true;
      this.player.body.setSize(10,10,0,-10);
   
     this.player.wegaponType = 0 ;  //mac dinh la dan cui  
    // this.player.wegaponLevel = 3;
     this.player.nextShotAt = 0 ;
        // 0 - normalBullet;
        //1 - dan toa : 
    this.player.spreadBulletLevel =1;
    this.player.spreadBulletMaxLevel = 3;
        //2 - dan laze :
    this.player.lazeBulletLevel = 0;
    this.player.lazeBulletMaxLevel = 10 ;    
        //3  - dan ten lua :
    this.player.missileBulletLevel = 0 ;
    this.player.missileBulletMaxLevel = 1;
        // 4 - support 
    this.player.supportPlayerState = null; //0 = DEAD  , 1 = ALive 
    this.player.supportPlayerShotDelay = 0 ;
        //MẠNG : 
    this.player.hp = AlienGame.PLAYER_CLASS.HP; 
    this.player.life = AlienGame.PLAYER_CLASS.LIFE;
    this.player.ghostTime = 0 ;
            
    },
    setBullets : function(){
          this.bulletPool = this.add.group();
             this.bulletPool.enableBody = true;
                 this.bulletPool.createMultiple(150,"normalBullet");
                 this.bulletPool.setAll("anchor.x",0.5);
                 this.bulletPool.setAll("anchor.y",0.5);
                 this.bulletPool.setAll("outOfBoundsKill",true);
                 this.bulletPool.setAll("checkWorldBounds",true);
                 this.bulletPool.nextShotAt =  0;
                 this.bulletPool.setAll("bulletDamage",AlienGame.PLAYER_CLASS.NORMAL_DAMAGE,false,false,0,true);
                this.bulletPool.setAll("itemType","spread",false,false,0,true);
            
            this.lazeBulletPool = this.add.group();
                this.lazeBulletPool.enableBody = true;//chu y : phải để enableBody ở trên cùng khi tạo group 
                 this.lazeBulletPool.createMultiple(100,"lazeBullet");
                 this.lazeBulletPool.setAll("anchor.x",0.5);
                 this.lazeBulletPool.setAll("anchor.y",0.5);
                 this.lazeBulletPool.setAll("outOfBoundsKill",true);
                 this.lazeBulletPool.setAll("checkWorldBounds",true);
                 this.lazeBulletPool.nextShotAt =  0;
                this.lazeBulletPool.setAll("bulletDamage",AlienGame.PLAYER_CLASS.LAZE_DAMAGE,false,false,0,true);
                this.lazeBulletPool.setAll("itemType","laze",false,false,0,true);
                    
            this.missileBulletPool = this.add.group();
                this.missileBulletPool.enableBody = true ;
                this.missileBulletPool.createMultiple(50,"missileBullet");
                this.missileBulletPool.setAll("anchor.x",0.5);
                this.missileBulletPool.setAll("anchor.y",0.5);
                this.missileBulletPool.setAll("outOfBoundsKill",true);
                this.missileBulletPool.setAll("checkWorldBounds",true);
                this.missileBulletPool.nextShotAt = 0;
                this.missileBulletPool.setAll("bulletDamage",AlienGame.PLAYER_CLASS.MISSILE_DAMAGE,false,false,0,true);
                this.missileBulletPool.setAll("itemType","missile",false,false,0,true);
                
                
            this.supportPlayerPool = this.add.group();
                 this.supportPlayerPool.enableBody = true;
                this.supportPlayerPool.createMultiple(2,"supportPlayer");
                this.supportPlayerPool.setAll("anchor.x",0.5);
                this.supportPlayerPool.setAll("anchor.y",0.5);
                this.supportPlayerPool.setAll("bulletDamage",1,false,false,0,true);
                this.supportPlayerPool.setAll("itemType","support",false,false,0,true);
                this.supportPlayerPool.nextShotAt = 0;
             
                    //protect circle 
            this.protectCircle = this.add.group();
            this.protectCircle.createMultiple(1,"protect");
            this.protectCircle.enableBody = true ;
            this.protectCircle.setAll("anchor.x",0.5);
            this.protectCircle.setAll("anchor.y",0.5);
               
            this.enemyNormalBulletPool  = this.add.group();
            this.enemyNormalBulletPool.enableBody = true;
            this.enemyNormalBulletPool.createMultiple(50,"enemyNormalBullet");
            this.enemyNormalBulletPool.setAll("outOfBoundsKill",true);
            this.enemyNormalBulletPool.setAll("checkWorldBounds",true);
            this.enemyNormalBulletPool.setAll("anchor.x",0.5);
            this.enemyNormalBulletPool.setAll("anchor.y",0.5);
            this.enemyNormalBulletPool.setAll("damage",AlienGame.ENEMY_CLASS.NORMAL_ENEMY.DAMAGE,false,false,0,true);
            
            this.enemyBigBulletPool = this.add.group();
            this.enemyBigBulletPool.enableBody = true;
            this.enemyBigBulletPool.createMultiple(40,"enemyBigBullet");
            this.enemyBigBulletPool.setAll("outOfBoundsKill",true);
            this.enemyBigBulletPool.setAll("checkWorldBounds",true);
            this.enemyBigBulletPool.setAll("anchor.x",0.5);
            this.enemyBigBulletPool.setAll("anchor.y",0.5);
            this.enemyBigBulletPool.setAll("damage",AlienGame.ENEMY_CLASS.BIG_ENEMY.DAMAGE,false,false,0,true);
            
            this.bossBulletPool = this.add.group();
            this.bossBulletPool.enableBody = true ;
            this.bossBulletPool.createMultiple(100,'bossBullet');
            this.bossBulletPool.setAll("outOfBoundsKill",true);
            this.bossBulletPool.setAll("checkWorldBounds",true);
            this.bossBulletPool.setAll("damage",AlienGame.ENEMY_CLASS.BOSS.DAMAGE,false,false,0,true);
            this.bossBulletPool.setAll("anchor.x",0.5);
            this.bossBulletPool.setAll("anchor.y",0.5);
    },
    setEnemiesSmall : function(EnemyOb){
  //enemy OB : enemy Object was created in boot.js 
      this.enemySmallPool = this.add.group();
      this.enemySmallPool.enableBody = true ;
      this.enemySmallPool.createMultiple(100,EnemyOb.TYPE);
      this.enemySmallPool.setAll("anchor.x",0.5);
      this.enemySmallPool.setAll("anchor.y",0.5);
      this.enemySmallPool.setAll("outOfBoundsKill",true);
      this.enemySmallPool.setAll("checkWorldBounds",true);
      this.enemySmallPool.setAll("score",EnemyOb.REWARD,false,false,0,true);
      this.enemySmallPool.setAll("explosionSize",EnemyOb.EXPLOSION_SIZE,false,false,0,true);
      this.enemySmallPool.setAll("damage",AlienGame.ENEMY_CLASS.SMALL_ENEMY.DAMAGE,false,false,0,true);
      this.enemySmallPool.forEach(function(e){
        e.animations.add("fly",EnemyOb.ARRAY_ANIMATIONS,20,true);
        e.animations.add("hit",EnemyOb.ARRAY_HIT_ANIMATIONS,20,false);
        e.explosionSize = 2;
        e.events.onAnimationComplete.add(function(e){
            e.play("fly");
        });
      });
     this.enemySmallPool.nextShotAt = 0 ;
     this.enemySmallPool.spawnTime = this.time.now + EnemyOb.SPAWN_TIME;
     this.enemySmallPool.targetPlayer = true ;
    },
    setEnemiesNormal : function(EnemyOb){
  //enemy OB : enemy Object was created in boot.js 
      this.enemyNormalPool = this.add.group();
      this.enemyNormalPool.enableBody = true ;
      this.enemyNormalPool.createMultiple(100,EnemyOb.TYPE);
      this.enemyNormalPool.setAll("anchor.x",0.5);
      this.enemyNormalPool.setAll("anchor.y",0.5);
      this.enemyNormalPool.setAll("outOfBoundsKill",true);
      this.enemyNormalPool.setAll("checkWorldBounds",true);
      this.enemyNormalPool.setAll("score",EnemyOb.REWARD,false,false,0,true);
      this.enemyNormalPool.setAll("damage",AlienGame.ENEMY_CLASS.NORMAL_ENEMY.DAMAGE,false,false,0,true);
      this.enemyNormalPool.setAll("explosionSize",EnemyOb.EXPLOSION_SIZE,false,false,0,true);
      this.enemyNormalPool.forEach(function(e){
       // e.animations.add("fly",EnemyOb.ARRAY_ANIMATIONS,20,true);
       e.explosionSize = 2;
       e.animations.add("hit",EnemyOb.ARRAY_HIT_ANIMATIONS,20,false);
       e.events.onAnimationComplete.add(function(e){
             e.frame = 0;
       })
      });
     this.enemyNormalPool.nextShotAt = 0 ;
     this.enemyNormalPool.shotDelay = EnemyOb.SHOT_DELAY;
     this.enemyNormalPool.spawnTime = 0;
     this.enemyNormalPool.bulletSpeed = EnemyOb.BULLET_SPEED;
      
    },
    setEnemiesBig : function(EnemyOb){
  //enemy OB : enemy Object was created in boot.js 
      this.enemyBigPool = this.add.group();
      this.enemyBigPool.enableBody = true ;
      this.enemyBigPool.createMultiple(100,EnemyOb.TYPE);
      this.enemyBigPool.setAll("anchor.x",0.5);
      this.enemyBigPool.setAll("anchor.y",0.5);
      this.enemyBigPool.setAll("outOfBoundsKill",true);
      this.enemyBigPool.setAll("checkWorldBounds",true);
      this.enemyBigPool.setAll("score",EnemyOb.REWARD,false,false,0,true);
      this.enemyBigPool.setAll("explosionSize",EnemyOb.EXPLOSION_SIZE,false,false,0,true);
      this.enemyBigPool.setAll("damage",AlienGame.ENEMY_CLASS.BIG_ENEMY.DAMAGE,false,false,0,true);
      this.enemyBigPool.forEach(function(e){
        e.explosionSize = 2;
       e.animations.add("fly",EnemyOb.ARRAY_ANIMATIONS,20,true);
        e.animations.add("hit",EnemyOb.ARRAY_HIT_ANIMATIONS,20,false);
        e.events.onAnimationComplete.add(function(e){
            e.play("fly");
        });
      });
     this.enemyBigPool.nextShotAt = 0 ;
     this.enemyBigPool.spawnTime = this.time.now + EnemyOb.SPAWN_TIME;
     this.enemyBigPool.shotDelay = EnemyOb.SHOT_DELAY;
     this.enemyBigPool.bulletSpeed = EnemyOb.BULLET_SPEED;
    },
    setBoss : function(bossOB,amount){
      if(!amount)console.log("missing amount of boss ob in setBoss Function! " );
      this.bossPool = this.add.group();
      this.bossPool.enableBody = true ;
      this.bossPool.createMultiple(amount,bossOB.TYPE);
      this.bossPool.setAll("anchor.x",0.5);
      this.bossPool.setAll("anchor.y",0.5);
      this.bossPool.forEach(function(boss){
        boss.score = bossOB.REWARD;
        boss.moveDown = true;
        boss.damage = AlienGame.ENEMY_CLASS.BOSS.DAMAGE;
        boss.type = "boss";
        boss.animations.add("hit",[0,1,0,1],30,false);
           boss.events.onAnimationComplete.add(function(){
            boss.animations.stop("hit",true);
            boss.explosionSpeed = 5;
           });
          boss.approaching = true;
        boss.animations.add("nearlyDie",[0,2,1,0,2,1,0],20,true);
      });
      this.bossPool.nextShotAt = 0;
      this.bossPool.shotDelay = bossOB.SHOT_DELAY;
      this.bossPool.bulletSpeed = bossOB.BULLET_SPEED;
      this.bossPool.movingDelay = 0 ;
      this.bossPool.health = bossOB.HEALTH;
      this.bossPool.isBossDead = false;
      this.bossPool.bossFight = false;
    },
    setExplosions : function(explosionType){
      this.explosionPool = this.add.group();
      this.explosionPool.enableBody = true;
      this.explosionPool.createMultiple(100,explosionType);
      this.explosionPool.setAll("anchor.x",0.5);
      this.explosionPool.setAll("anchor.y",0.5);
      this.explosionPool.setAll("outOfBoundsKill",true);
      this.explosionPool.setAll("checkWorldBounds",true);
      this.explosionPool.forEach(function(e){
        e.animations.add("boom",[0,1,2,3,4],20);
      });
    },
    setText : function(){
     this.score = 0 ;
      this.currentLevel = 1 ;
     this.scoreText =  this.add.text(this.game.width/2,50,"0",{
        font:"20px monospace ",
        fill :"white"
      });
        
        //DISPLAY INFO , GAMESTATE
        var content =  "HP : " +this.player.hp+" LIFE : "  +this.player.life + " LEVEL : " + this.currentLevel ;
        this.playerInfo = this.add.text(10,10,content,{
           font : "15px monospace ",
           fill :"#fff"
        });
//        this.instructionTime = this.time.now + Phaser.Timer.SECOND * 4;
       
    },
    setPlayerIcon : function(){

        this.bulletPoolItem = this.add.group();
        this.bulletPoolItem.enableBody = true;
        this.bulletPoolItem.createMultiple(10,'normalBullet');
        this.bulletPoolItem.setAll("outOfBoundsKill",true);
        this.bulletPoolItem.setAll("checkWorldBounds",true);
        this.bulletPoolItem.setAll("itemType","spread",false,false,0,true);
        
        this.lazeBulletPoolItem = this.add.group();
        this.lazeBulletPoolItem.enableBody = true ;
        this.lazeBulletPoolItem.createMultiple(10,'lazeBullet');
        this.lazeBulletPoolItem.setAll("outOfBoundsKill",true);
        this.lazeBulletPoolItem.setAll("checkWorldBounds",true);
        this.lazeBulletPoolItem.setAll("itemType","laze",false,false,0,true);
        
        this.missileBulletPoolItem = this.add.group();
        this.missileBulletPoolItem.enableBody = true ;
        this.missileBulletPoolItem.createMultiple(10,"missileBullet");
        this.missileBulletPoolItem.setAll("checkWorldBounds",true);
        this.missileBulletPoolItem.setAll("outOfBoundsKill",true);
        this.missileBulletPoolItem.setAll("itemType","missile",false,false,0,true);
        
        this.supportPlayerPoolItem = this.add.group();
        this.supportPlayerPoolItem.enableBody = true ;
        this.supportPlayerPoolItem.createMultiple(10,"supportPlayer");
        this.supportPlayerPoolItem.setAll("checkWorldBounds",true);
        this.supportPlayerPoolItem.setAll("outOfBoundsKill",true);
        this.supportPlayerPoolItem.setAll("itemType","support",false,false,0,true);
    },
    //UPDATE FUNCTION :
    playerFire : function(){
       switch(this.player.wegaponType){
            case 0 : //dan mac dinh 
        if(this.time.now < this.player.nextShotAt || !this.player.alive || this.bulletPool.countDead() <= 10 ) return ;
             var bullet = this.bulletPool.getFirstDead();
              bullet.reset(this.player.x , this.player.y - 20);
              bullet.body.velocity.y = -AlienGame.PLAYER_CLASS.NORMAL_BULLET_FIRE_SPEED;
                this.player.nextShotAt = this.time.now + AlienGame.PLAYER_CLASS.NORMAL_BULLET_FIRE_RATE ;
                this.soundNormalFire.play();
            break;
                
            case 1 : //dan toa  
       if(this.time.now < this.player.nextShotAt || !this.player.alive || this.bulletPool.countDead() <= 10 ) return;
               
            if(this.player.spreadBulletLevel > 1){
                for(var i = 0; i<this.player.spreadBulletLevel;i++){
                    var bullet =  this.bulletPool.getFirstDead();
                        //left bullet nghieng ve ben trai cua player 
                    //chú ý  , vì những viên đạn có thể va chạm với nhau => nếu để quá sát thì chúng sẽ va chạm trc khi kịp bắn -> lỗi ko bắn dc đạn ! 
                       bullet.reset(this.player.x - (10 + i*5), this.player.y - 20);
                        this.physics.arcade.velocityFromAngle(
                            -95 - i*5 , 400,bullet.body.velocity
                        );
                    
                         var bullet =  this.bulletPool.getFirstDead();
                        //right bullet nghieng ben phai cua player 
                            bullet.reset(this.player.x +(10+ i*5),this.player.y - 20);
                            this.physics.arcade.velocityFromAngle(
                                -85+i*5,400,bullet.body.velocity
                            );
                    }
                    this.player.nextShotAt = this.time.now +100;
//                        console.log("loai wegapon  :"  + this.player.wegaponType + "bullet velocity : " + bullet.body.velocity.y + "next shot at :" + this.player.nextShotAt + "this time now : " + this.time.now + "bullet y : " + bullet.y  );
                }else{
                    var bullet = this.bulletPool.getFirstDead();
                        bullet.reset(this.player.x , this.player.y -20);
                        bullet.body.velocity.y = -AlienGame.PLAYER_CLASS.NORMAL_BULLET_FIRE_SPEED;
                    this.player.nextShotAt = this.time.now +100;
                }
                this.soundNormalFire.play();
                break;
                
            case 2 : //dan laze :
                if(this.time.now < this.player.nextShotAt || !this.player.alive || this.lazeBulletPool.countDead() <= 10 ) return;
                        if(this.player.lazeBulletLevel > 1){
                            for(var i =0 ;i<this.player.lazeBulletLevel ; i++){
                                var bullet = this.lazeBulletPool.getFirstDead();
                                    bullet.reset(this.player.x - (5+i*5) , this.player.y-30 );
                                    bullet.body.velocity.y = -AlienGame.PLAYER_CLASS.LAZE_BULLET_FIRE_SPEED;
                                
                                var bullet = this.lazeBulletPool.getFirstDead();
                                    bullet.reset(this.player.x +(5+i*5),this.player.y-30);
                                    bullet.body.velocity.y = -AlienGame.PLAYER_CLASS.LAZE_BULLET_FIRE_SPEED;
                            }
                            this.player.nextShotAt = this.time.now + AlienGame.PLAYER_CLASS.LAZE_BULLET_FIRE_RATE;
                        }else{
                               var bullet = this.lazeBulletPool.getFirstDead();
                                    bullet.reset(this.player.x,this.player.y -30);
                                    bullet.body.velocity.y = -AlienGame.PLAYER_CLASS.LAZE_BULLET_FIRE_SPEED;
                            this.player.nextShotAt = this.time.now + AlienGame.PLAYER_CLASS.LAZE_BULLET_FIRE_RATE; 
                        }
                this.soundLazeFire.play();
                break;
                
            case 3 ://dan ten lua 
                if(this.time.now < this.player.nextShotAt || !this.player.alive || this.missileBulletPool.countDead() <= 10 ) return;
//                    if(this.player.missileBulletLevel > 1){
//                        for(var i = 0; i<this.player.missileBulletLevel;i++){
//                            var bullet = this.missileBulletPool.getFirstDead();
//                                bullet.reset(this.player.x - 50 , this.player.y -20);
//                                bullet.body.velocity.y = -AlienGame.PLAYER_CLASS.MISSILE_BULLET_FIRE_SPEED;
//
//                            var bullet = this.missileBulletPool.getFirstDead();
//                                bullet.reset(this.player.x +50 , this.player.y - 20);
//                                bullet.body.velocity.y = -AlienGame.PLAYER_CLASS.MISSILE_BULLET_FIRE_SPEED;
//
//                        }
//                        this.player.nextShotAt = this.time.now + AlienGame.PLAYER_CLASS.MISSILE_BULLET_FIRE_RATE;
//                       }else{
                            var bullet = this.missileBulletPool.getFirstDead();
                                bullet.reset(this.player.x , this.player.y -20);
                                bullet.body.velocity.y =-AlienGame.PLAYER_CLASS.MISSILE_BULLET_FIRE_SPEED;
                           this.player.nextShotAt = this.time.now + AlienGame.PLAYER_CLASS.MISSILE_BULLET_FIRE_RATE;
//                        }
                this.soundMissileFire.play();
            break;
        }//end switch 
         
    },//endplayer fire 
    checkCollision : function(ob1,ArrCollideWidthOthers,doSomething){
        for(var i =0 ; i< ArrCollideWidthOthers.length ; i++){
            this.physics.arcade.overlap(ob1,ArrCollideWidthOthers[i],doSomething,null,this);
        }
    },
    spawnEnemies : function(enemyOb,enemyPool){
                if(enemyPool.spawnTime > this.time.now || enemyPool.countDead() <= 0) return;
                var enemy = enemyPool.getFirstDead() ;
               
                enemy.play("fly");
                enemyPool.spawnTime = this.time.now + enemyOb.SPAWN_TIME;
        
                if(!enemyPool.targetPlayer){
                 enemy.reset(this.rnd.integerInRange(20,this.game.width - 20),0,enemyOb.HEALTH);
                var targetX = this.rnd.integerInRange(20,this.game.width-20);
                enemy.rotation = this.physics.arcade.moveToXY(
                    enemy,targetX,this.game.height+10,this.rnd.integerInRange(enemyOb.MIN_SPEED,enemyOb.MAX_SPEED)
                ) - Math.PI/2;
                }else{
                    enemy.reset(this.rnd.integerInRange(20,this.game.width - 20),0,enemyOb.HEALTH);
                    this.physics.arcade.moveToObject(enemy,this.player,this.rnd.integerInRange(enemyOb.MIN_SPEED,enemyOb.MAX_SPEED));
                }  
    },
    spawnBoss : function(bossPool,amount){
      if(!amount ) console.log("phải điền đầy đủ số lượng boss muốn spawn _ hàm spawn boss");
      if(!bossPool.length || bossPool.length < amount) console.log("bossPool truyền ko đúng hoặc vượt quá số lượng có trong bossPool");
      for(var i =0 ; i<amount ;i++){
        var boss = this.bossPool.getFirstDead();
          boss.reset(this.game.width/2,0,AlienGame.ENEMY_CLASS.BOSS.HEALTH);
          boss.health = AlienGame.ENEMY_CLASS.BOSS.HEALTH ;
          boss.approaching = true ;
          this.soundBgSound.mute = true;
          if(this.isEnd === false) this.soundBossFightBgSound.play();
      }
    },
    moveBoss : function(bossPool){
      // console.log("is boss DEAD : " + bossPool.isBossDead);
    if(!bossPool) console.log("thiếu bossPool_moving Boss");
      //nếu ko thì tiếp tục tiến hành điều khiển b0ss 
        bossPool.forEachAlive(function(b){
           if(b.health <250){
                  b.play("nearlyDie",40);
            }

         if(bossPool.isBossDead === true){
          if(this.time.now < bossPool.movingDelay) return;
            var targetX = this.rnd.integerInRange(0,this.game.width) ;
            b.rotation += 3;
            this.physics.arcade.moveToXY(b,targetX,this.game.height + 200 ,100);
            for(var i = 0 ; i<5 ;i++){
              this.explode(b,true,this.rnd.integerInRange(1,4));
            }
            console.log("boss runaway ");
            // this.bossPool.destroy();
            bossPool.movingDelay = this.time.now + 300;
           }
          // this.physics.arcade.moveToXY(b,randX,0,randSpeed);
//            b.body.velocity.y = 10;
        if(bossPool.isBossDead === false){
             var rand = Math.random();
             if(this.time.now < bossPool.movingDelay ) {
              console.log("return ");
              return;
            }
              var randX = this.rnd.integerInRange(this.player.x-50,this.player.x+50);
              var randSpeed = this.rnd.integerInRange(AlienGame.ENEMY_CLASS.BOSS.MIN_SPEED,AlienGame.ENEMY_CLASS.BOSS.MAX_SPEED);
              if(b.y > 100){
                b.approaching = false;
                b.moveDown = false;
              }
              if(b.y <=50) b.moveDown=true;
              if(b.moveDown){
                b.body.velocity.y = 20;
              }else{
                b.body.velocity.y = -50;
              }
              if(rand < 0.2){
                  //đâm thẳng vào player 
                  this.physics.arcade.moveToObject(b,this.player,500);
               }            
            if(b.approaching === false  ){
              this.bossPool.bossFight = true ; //cho enemy duoc spawn cham hon 
              // b0ss  nghiêng :
              var bank = b.body.velocity.x / AlienGame.ENEMY_CLASS.BOSS.MAX_SPEED;
                  b.angle =  - bank*20;
              //xoay b0ss theo hướng của player + bắn:
              var angleToPlayer = this.math.radToDeg(this.game.physics.arcade.angleBetween(b,this.player)) ;
              var anglePointing = 180 - Math.abs(b.angle);

                    this.bossFire(bossPool);
                    // console.log("boss fire");
                    console.log("máu của b0ss : " + b.health);
            }
              bossPool.movingDelay = this.time.now + 1000;
          }//end check isBossDead 
        },this);
    },//end moving Boss 
    enemyHit : function(ob1,ob2){
      //hàm enemy hit này nhận tham số 1 cách tự động từ 2 đối tượng được truyền cho nó qua function : this.physics.arcade.overlap(ob1,ob2,doSomething,null,this! 
        if(ob1.itemType === "laze"){
              if(ob2.type ==='boss') ob1.kill();
               this.damageEnemy(ob2,ob1.bulletDamage);
        }else{   
            ob1.kill();
            this.damageEnemy(ob2,ob1.bulletDamage);
        }
    },
    damageEnemy : function(ob1,damage){
//         ob1 la enemy bi hit 
        if(ob1.type ==="boss" && ob1.approaching === true){
            console.log("boss dang xuat hien , ko the ban " );
            return ;
        }
          ob1.health-=damage;
            if(ob1.health <= 0 ) ob1.alive = false;
        if(ob1.alive){
                ob1.play("hit");
//                console.log("hit");
    //            this.explode(ob1);
        }else{
            if(ob1.type==='boss'){
                    this.gameOver(true);
                    this.bossPool.isBossDead = true ;
                    this.soundBossFightBgSound.mute = true ;
                    this.soundWinBoss.play();
                     // this.soundBgSound.mute = true ;
                    // this.soundWinBoss.play();
                   
            }else{
                ob1.kill();
                this.explode(ob1,true);
                this.addToScore(ob1.score);
                this.soundNormalExplosion.play();
                console.log("kill");
                this.dropItem(ob1);
                }
            }
    },
    enemyFire : function(){
            this.enemyNormalPool.forEachAlive(function(e){
                if(this.time.now < e.nextShotAt || this.enemyNormalBulletPool.countDead() <= 0 ) return;
                e.nextShotAt = this.time.now +this.enemyNormalPool.shotDelay;
                var enemyNormalFire = this.enemyNormalBulletPool.getFirstDead();
                    enemyNormalFire.reset(e.x,e.y);
                this.physics.arcade.moveToObject(enemyNormalFire,this.player,AlienGame.ENEMY_CLASS.NORMAL_ENEMY.BULLET_SPEED);
            },this);
        
            this.enemyBigPool.forEachAlive(function(e){
                if(this.time.now < e.nextShotAt || this.enemyBigBulletPool.countDead() <= 0 ) return;
                
                e.nextShotAt = this.time.now + this.enemyBigPool.shotDelay ;
                var enemyBigFire = this.enemyBigBulletPool.getFirstDead();
                    enemyBigFire.reset(e.x,e.y);
                this.physics.arcade.moveToObject(enemyBigFire,this.player,AlienGame.ENEMY_CLASS.BIG_ENEMY.BULLET_SPEED);
            },this);
    },
    bossFire : function(bossPool){
 //boss 
             bossPool.forEachAlive(function(b){
                 if(this.time.now < bossPool.nextShotAt || this.bossBulletPool.countDead() <=0) return;

                 bossPool.nextShotAt = this.time.now + AlienGame.ENEMY_CLASS.BOSS.SHOT_DELAY;
                 this.soundBossFire.play();
/*
                 var bullet = this.bossBulletPool.getFirstDead();//left bullet
                   bullet.reset(b.x-100 , b.y-30); 
                 this.physics.arcade.moveToXY(bullet,this.player.x,this.player.y,AlienGame.ENEMY_CLASS.BOSS.BULLET_SPEED);
                   bullet = this.bossBulletPool.getFirstDead();//right Bullet
                   bullet.reset(b.x + 100,b.y -30);
                 this.physics.arcade.moveToXY(bullet,this.player.x,this.player.y,AlienGame.ENEMY_CLASS.BOSS.BULLET_SPEED);
                 
*/
                //BOSS dan toa : 
                  for (var i = 0  ; i < 4 ; i++){
                      var bullet =  this.bossBulletPool.getFirstDead();
                          //left bullet nghieng ve ben trai cua player 
                      //chú ý  , vì những viên đạn có thể va chạm với nhau => nếu để quá sát thì chúng sẽ va chạm trc khi kịp bắn -> lỗi ko bắn dc đạn ! 
                         bullet.reset(b.x - (10 + i*50), b.y - 20);
/*
                          this.physics.arcade.velocityFromAngle(
                              -95 - i*5 , 400,bullet.body.velocity
                          );
  */                    
                          this.physics.arcade.moveToXY(bullet,this.player.x + i * 10, this.player.y,AlienGame.ENEMY_CLASS.BOSS.BULLET_SPEED);
                           var bullet =  this.bossBulletPool.getFirstDead();
                          //right bullet nghieng ben phai cua boss 
                              bullet.reset(b.x +(10+ i*50),b.y - 20);
/*
                              this.physics.arcade.velocityFromAngle(
                                  -85+i*5,400,bullet.body.velocity
                              );
*/
                              this.physics.arcade.moveToXY(bullet,this.player.x - i * 10, this.player.y,AlienGame.ENEMY_CLASS.BOSS.BULLET_SPEED);
                      }//end for ban dan toa 
                   //nếu máu b0ss dưới 100 hp thì bắn thẳng vào player luôn và tốc độ bắn tăng lên 
                   if(bossPool.health < 100){
                     this.physics.arcade.moveToObject(bullet,this.player,AlienGame.ENEMY_CLASS.BOSS.BULLET_SPEED);
                     bossPool.nextShotAt = this.time.now + this.rnd.integerInRange(AlienGame.ENEMY_CLASS.BOSS.SHOT_DELAY-2000,AlienGame.ENEMY_CLASS.BOSS.SHOT_DELAY-1000);
                     console.log("ban thang vao player ");
                   }else{
                     bossPool.nextShotAt = this.time.now + AlienGame.ENEMY_CLASS.BOSS.SHOT_DELAY;
                   }
                 
             },this);
        console.log("boss fire");
     },
    explode : function(ob,rndPosition,explosionSize){
      if(rndPosition){
        var ExplosionSpeed = ob.explosionSpeed || 10 ;  
        explosionSize = ob.explosionSize || 1 ;
        var x = this.rnd.integerInRange(ob.x-50,ob.x+50);
        var y = this.rnd.integerInRange(ob.y-50,ob.y+50) ;
        var explosion = this.explosionPool.getFirstDead();
            explosion.reset(x,y);
            explosion.body.velocity.x = ob.body.velocity.x;
            explosion.body.velocity.y = ob.body.velocity.y ;
            explosion.scale.setTo(explosionSize);
            explosion.play("boom",ExplosionSpeed,false,true);
      }else{
        var ExplosionSpeed = ob.explosionSpeed || 10 ;  
        explosionSize = ob.explosionSize || 1 ;
        var x = ob.x;
        var y = ob.y ;
        var explosion = this.explosionPool.getFirstDead();
            explosion.reset(x,y);
            explosion.body.velocity.x = ob.body.velocity.x;
            explosion.body.velocity.y = ob.body.velocity.y ;
            explosion.scale.setTo(explosionSize);
            explosion.play("boom",ExplosionSpeed,false,true);
      }
    },
    dropItem : function(ob){
        //ob la doi tuong enemy bi tan cong 
      var rand = this.rnd.integerInRange(1,5);
          if(rand <=9 ){//ti le la 20%
              var rand2 = this.rnd.integerInRange(1,4);
                switch(rand2){
                    case 1 : //item 1 - đạn tỏa 
                        if(this.bulletPoolItem.countDead() <= 0 ) return;
                        var item = this.bulletPoolItem.getFirstDead();
                        item.reset(ob.x,ob.y);
                        this.physics.arcade.moveToObject(item,this.player,100);
                    break;
                        
                    case 2 : //dan laze 
                      if(this.lazeBulletPoolItem.countDead() <= 0)return;
                        var item = this.lazeBulletPoolItem.getFirstDead();
                            item.reset(ob.x,ob.y);
                            this.physics.arcade.moveToObject(item,this.player,100);
                    break;
                        
                    case 3 : //dan ten lua 
                        if(this.missileBulletPoolItem.countDead() <= 0) return;
                        var item = this.missileBulletPoolItem.getFirstDead();
                            item.reset(ob.x,ob.y);
                            this.physics.arcade.moveToObject(item,this.player,100);
                        break;
                        
                    case 4 : //gọi 2 thằng đệ 
                        if(this.supportPlayerPoolItem.countDead() <= 0 ) return;
                        var item = this.supportPlayerPoolItem.getFirstDead();
                            item.reset(ob.x,ob.y);
                            this.physics.arcade.moveToObject(item,this.player,100);
                        break;
                }
          }
    },
    playerPowerUp : function(player,item){
      this.soundPowerUp.play();
        switch(item.itemType){
            case "spread":
                this.player.wegaponType = 1;
                if(this.player.spreadBulletLevel > this.player.spreadBulletMaxLevel){
                    this.player.spreadBulletLevel = this.player.spreadBulletMaxLevel;
                }else{
                    this.player.spreadBulletLevel++;}
                item.kill();
                this.player.lazeBulletLevel = this.player.missileBulletLevel = 0 ;
                break;
                
            case "laze":
                this.player.wegaponType = 2 ; 
                if(this.player.lazeBulletLevel > this.player.lazeBulletMaxLevel){
                    this.player.spreadBulletLevel = this.player.lazeBulleMaxtLevel;
                }else{
                    this.player.lazeBulletLevel++;
                }
                 item.kill();
                this.player.spreadBulletLevel = this.player.missileBulletLevel = 0 ;
            break;
                
            case "missile":
                this.player.wegaponType = 3 ;
                 item.kill();
                if(this.player.missileBulletLevel > this.player.missileBulletMaxLevel){
                    this.player.missileBulletLevel = this.player.missileBulletMaxLevel;
                }else{
                    this.player.missileBulletLevel++;
                }
                this.player.lazeBulletLevel = this.player.spreadBulletLevel = 0 ;
            break;
            
            case "support":
                this.player.supportPlayerState = 0;
                item.kill();
            break;

        }
//        this.addtoScore(item.score);
    },
    addToScore : function(score){
        this.score += score;
        this.scoreText.text = this.score; 
        
    },
    otherEffect : function(){
      this.playerInfo.text = "HP : " +this.player.hp+" LIFE : "  +this.player.life + " LEVEL : " + this.currentLevel ;
      if(this.score >= AlienGame.ENEMY_CLASS.BOSS.BOSS_SPAWN_SCORE-200){
        var hpBoss = this.bossPool.getAt(0);
        var bossCommingScore = (AlienGame.ENEMY_CLASS.BOSS.BOSS_SPAWN_SCORE - this.score ) >= 0 ? (AlienGame.ENEMY_CLASS.BOSS.BOSS_SPAWN_SCORE - this.score ) : 0;
        var bossHp = hpBoss.health ? hpBoss.health : "???";
        this.playerInfo.text = "HP : " +this.player.hp+" LIFE : "  +this.player.life + " LEVEL : " + this.currentLevel + " BOSS COMMING IN : " + bossCommingScore+ " boss hp : " + bossHp ;
      }
      if(this.player.alive){
         //support player 
        if(this.player.supportPlayerState === 1){
            var supportLeft = this.supportPlayerPool.getAt(0);
                supportLeft.reset(this.player.x -30 ,this.player.y);
            
            var  supportRight = this.supportPlayerPool.getAt(1);
                supportRight.reset(this.player.x + 30 ,this.player.y );
            
            for(var i =0 ; i<2;i++){
               if(this.bulletPool.countDead() <= 2 || this.player.supportPlayerShotDelay > this.time.now ) return;
                var support = this.supportPlayerPool.getAt(i);
                var bullet = this.bulletPool.getFirstDead();
                    bullet.reset(support.x + this.rnd.integerInRange(-10,10),support.y-10);
                    bullet.body.velocity.y =-AlienGame.PLAYER_CLASS.NORMAL_BULLET_FIRE_SPEED;
            }
            this.player.supportPlayerShotDelay = this.time.now + AlienGame.PLAYER_CLASS.NORMAL_BULLET_FIRE_RATE;
        }
        if (this.player.supportPlayerState === 0){
            this.player.supportPlayerState = 1;
        }//end check supportPlayer 

      //play protect cricle while player in ghostTime :
        if(this.player.ghostTime > this.time.now ){
          // if(this.protectCircle.countDead() <= 0 ) return;
          // console.log("dang duoc bao ve ,toa do x support : " + this.protectCircle.x  + " toa do y : " + this.protectCircle.y );
            var protect = this.protectCircle.getAt(0);
            protect.reset(this.player.x,this.player.y);
            protect.rotation += 1 ;
        }else{
          var protect = this.protectCircle.getAt(0);
              protect.kill();
        }
    }else{
      this.protectCircle.forEachAlive(function(e){
          this.explode(e,true,1);
          e.kill();
      },this)
      this.supportPlayerPool.forEachAlive(function(e){
        this.explode(e,true,2);
        e.kill();
      },this);
    }
    //HIÊN MENU CHÍNH KHI KÊT THÚC GAME 
        if(this.isEnd === true ){
            this.add.text(this.game.width/2,this.game.height-50,"ấn Z để quay lại menu chính ",{
                font:"10px monospace  ",
                fill :"#fff"
            }).anchor.setTo(0.5,0.5);
            if(this.input.keyboard.isDown(Phaser.Keyboard.Z)){
                // this.resetGame([this.enemySmallPool,this.enemyNormalPool,this.enemyBigPool,this.bossPool,
                //                 this.enemyNormalBulletPool,this.enemyBigBulletPool,this.supportPlayerPool,
                //                 this.bulletPool,this.lazeBulletPool,this.missileBulletPool,this.player]);
                this.isEnd = false;
                //location.reload()
                //this.state.shutdown("Game");
                // this.soundBossFire.mute = true ;
                // this.soundBossFightBgSound.mute = true ;
                // this.soundLostBoss.mute = true ;
                // this.soundWinBoss.mute = true ;

                // this.soundNormalFire.mute = true ;
                // this.spawnEnemy = true;
                // this.bossPool.bossFight = false;
                location.reload();
                // this.state.start("Preloader",true,false);
                  // this.state.start("MainMenu")
                // this.state.start("MainMenu");
               
            }
        }
        
    },
    spawnWaveEnemies : function(){
        if(this.time.now < this.enemyNormalPool.spawnTime || this.enemyNormalPool.countDead() <= 0 ) return ;
        
    var startingX = this.rnd.integerInRange(100, this.game.width - 100);
    var verticalSpeed = 80;
    var spread = 90;
    var frequency = 30; //cang nho cang xoay nhanh quanh truc 0x 
    var verticalSpacing = 50;
    var numEnemiesInWave = 5;

    //  Launch ENEMY wave
    for (var i =0; i < numEnemiesInWave; i++) {
        var enemy = this.enemyNormalPool.getFirstExists(false);
        if (enemy) {
            enemy.startingX = startingX;
            enemy.reset(this.game.width / 2, -verticalSpacing * i ,AlienGame.ENEMY_CLASS.NORMAL_ENEMY.HEALTH);
            enemy.body.velocity.y = verticalSpeed;
            //  Update function for each enemy
            enemy.update = function(){
              //  Wave movement
              this.body.x = this.startingX + Math.sin((this.y) / frequency) * spread;

            };
        }
    }
        
    //  Send another wave soon
        this.enemyNormalPool.spawnTime = this.time.now +AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SPAWN_TIME; 
    },
    playerHit : function(OBplayer,ob2){
        if(OBplayer.ghostTime > this.time.now){
          // OBplayer.play("ghostTime");
          console.log("play ghost time ");
          return ;
        }else{
        OBplayer.hp -= ob2.damage;
        if(ob2.type !=="boss" ){
            this.explode(ob2);
            ob2.kill();
        }else{
            this.playerDie(OBplayer);
        }
        console.log("hp cua player : " + OBplayer.hp);
        console.log("hit");
        
         if(OBplayer.hp <= 0 ){
            this.playerDie(OBplayer);
//                 OBplayer.play("hit");
            console.log("die");             
            }
          }
    },
    playerDie : function(OBplayer){
      this.soundPlayerDead.play();
      this.explode(OBplayer);
      OBplayer.hp = AlienGame.PLAYER_CLASS.HP;
      OBplayer.life--;
      this.explode(OBplayer);
      OBplayer.killable = false;
      if(OBplayer.life <= 0) this.gameOver(false);
      OBplayer.ghostTime = this.time.now + AlienGame.PLAYER_CLASS.GHOST_TIME;
    },
    gameOver : function(win){
      this.playerInfo.destroy();
        if(win){
         this.killAllEnemy([this.enemySmallPool,this.enemyNormalPool,this.enemyBigPool]);
          this.spawnEnemy = false;
          this.bossPool.isBossDead = true ;
          this.displayEnd(true);
          this.soundNormalExplosion.play();
        }else{
        this.player.kill();
        this.soundBgSound.mute = true;
        this.soundBossFightBgSound.mute = true ;
        this.soundLostBoss.play();
        this.displayEnd(false);
        }
    },
    displayEnd : function(win){

    if(this.endText && this.endText.exists) return ; 
     var msg = win ? "TRÁI ĐẤT ĐƯỢC BẢO VỆ KHỎI CUỘC XÂM LĂNG CỦA QUÂN ĐOÀN ALIEN_51 \n\t  NHIỆM VỤ HOÀN THÀNH ! " : " NHIỆM VỤ THẤT BẠI,TRÁI ĐẤT HOÀN TOÀN BỊ HUỶ DIỆT .......  \n\t  " ;
     this.endText =this.add.text(this.game.width/2 , this.game.height/2 , msg,{
            font:"20px monospace ",
            fill :"#ffF"
        }).anchor.setTo(0.5,0.5);

        if(this.player.alive===true ){
        this.game.time.events.add(5000,function(){
            this.add.text(this.game.width/2,this.game.height-100, "nhưng Trái Đất chưa hẳn đã yên bình,HẮN sẽ quay lại ..........",{
                font:"15px monospace ",
                fill :"#ffF"
            }).anchor.setTo(0.5,0.5);
        },this);
        
        }
        this.game.time.events.add(7000,function(){
            this.isEnd = true ;
        },this);
            
    },
    levelManager : function(score){
            score = parseInt(score);
            if(score > AlienGame.ENEMY_CLASS.BOSS.BOSS_SPAWN_SCORE && this.bossPool.countDead() >= 1) this.spawnBoss(this.bossPool,1);
           
            // if( score > AlienGame.SCORE_LEVEL1 && score < AlienGame.SCORE_LEVEL2)this.changeLevel(1);
                
            // if(  score > AlienGame.SCORE_LEVEL2 && score < AlienGame.SCORE_LEVEL3)this.changeLevel(2);
                
            // if( score >AlienGame.SCORE_LEVEL3)this.changeLevel(3);

            if( score >= AlienGame.SCORE_LEVEL1  && score < AlienGame.SCORE_LEVEL2){
                  this.changeLevel(1);
              }

            if(  score >= AlienGame.SCORE_LEVEL2 && score < AlienGame.SCORE_LEVEL3 ){
                this.changeLevel(2);
            }
                
            if( score >=AlienGame.SCORE_LEVEL3){
              this.changeLevel(3);
            }
//        console.log("alien small  spawn time : " +  AlienGame.ENEMY_CLASS.SMALL_ENEMY.SPAWN_TIME +  "normal SpawnTime : " + AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SPAWN_TIME                     )
    },
    //TODO : đang làm cái này,thay đổi mức độ ra quái theo số điểm 
    changeLevel : function(levelNum){
        //thay doi :  2 - EnemySmall_spawn_time_levelX , 3-enemyNormal_spawn_time_levelX, 
    //        4-enemyBigSpawnTImeLevelX,5-enenyNormal_shotDelayLEvelX,6-enemyBig_shotDelayLevelX
            var num = parseInt(levelNum);
        switch(num){
            case 1 :
                AlienGame.ENEMY_CLASS.SMALL_ENEMY.SPAWN_TIME = AlienGame.ENEMY_CLASS.SMALL_ENEMY.CONST_SPAWN_TIME - AlienGame.ENEMY_CLASS.SMALL_ENEMY.SPAWN_TIME_LEVEL1;
                AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SPAWN_TIME = AlienGame.ENEMY_CLASS.NORMAL_ENEMY.CONST_SPAWN_TIME - AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SPAWN_TIME_LEVEL1;
                AlienGame.ENEMY_CLASS.BIG_ENEMY.SPAWN_TIME = AlienGame.ENEMY_CLASS.BIG_ENEMY.CONST_SPAWN_TIME - AlienGame.ENEMY_CLASS.BIG_ENEMY.SPAWN_TIME_LEVEL1;
                
                AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SHOT_DELAY = AlienGame.ENEMY_CLASS.NORMAL_ENEMY.CONST_SHOT_DELAY - AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SHOT_DELAY_LEVEL1;
                AlienGame.ENEMY_CLASS.BIG_ENEMY.SHOT_DELAY = AlienGame.ENEMY_CLASS.BIG_ENEMY.CONST_SHOT_DELAY - AlienGame.ENEMY_CLASS.BIG_ENEMY.SHOT_DELAY_LEVEL1;
                console.log("level 1 ");
                break;
                
            case 2 :
                AlienGame.ENEMY_CLASS.SMALL_ENEMY.SPAWN_TIME = AlienGame.ENEMY_CLASS.SMALL_ENEMY.CONST_SPAWN_TIME - AlienGame.ENEMY_CLASS.SMALL_ENEMY.SPAWN_TIME_LEVEL2;
                AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SPAWN_TIME = AlienGame.ENEMY_CLASS.NORMAL_ENEMY.CONST_SPAWN_TIME - AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SPAWN_TIME_LEVEL2;
                AlienGame.ENEMY_CLASS.BIG_ENEMY.SPAWN_TIME = AlienGame.ENEMY_CLASS.BIG_ENEMY.CONST_SPAWN_TIME - AlienGame.ENEMY_CLASS.BIG_ENEMY.SPAWN_TIME_LEVEL2;

                AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SHOT_DELAY = AlienGame.ENEMY_CLASS.NORMAL_ENEMY.CONST_SHOT_DELAY - AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SHOT_DELAY_LEVEL2;
                AlienGame.ENEMY_CLASS.BIG_ENEMY.SHOT_DELAY = AlienGame.ENEMY_CLASS.BIG_ENEMY.CONST_SHOT_DELAY - AlienGame.ENEMY_CLASS.BIG_ENEMY.SHOT_DELAY_LEVEL2;
                console.log("level 2 ");
                break;
                
            case 3 :
               AlienGame.ENEMY_CLASS.SMALL_ENEMY.SPAWN_TIME = AlienGame.ENEMY_CLASS.SMALL_ENEMY.CONST_SPAWN_TIME - AlienGame.ENEMY_CLASS.SMALL_ENEMY.SPAWN_TIME_LEVEL3;
                AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SPAWN_TIME = AlienGame.ENEMY_CLASS.NORMAL_ENEMY.CONST_SPAWN_TIME - AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SPAWN_TIME_LEVEL3;
                AlienGame.ENEMY_CLASS.BIG_ENEMY.SPAWN_TIME = AlienGame.ENEMY_CLASS.BIG_ENEMY.CONST_SPAWN_TIME - AlienGame.ENEMY_CLASS.BIG_ENEMY.SPAWN_TIME_LEVEL3;
                
                AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SHOT_DELAY = AlienGame.ENEMY_CLASS.NORMAL_ENEMY.CONST_SHOT_DELAY - AlienGame.ENEMY_CLASS.NORMAL_ENEMY.SHOT_DELAY_LEVEL3;
                AlienGame.ENEMY_CLASS.BIG_ENEMY.SHOT_DELAY = AlienGame.ENEMY_CLASS.BIG_ENEMY.CONST_SHOT_DELAY - AlienGame.ENEMY_CLASS.BIG_ENEMY.SHOT_DELAY_LEVEL3;
                console.log("level 3");
                break;
         
            default :
                console.log("wwwwwwwwwwwwwwW");
        }
        this.currentLevel = levelNum + 1;
    },
    killAllEnemy : function(enemyArrOb){
        for(var i =0 ;i<enemyArrOb.length;i++){
            var enemy = enemyArrOb[i] ;
                enemy.forEachAlive(function(e){
                    this.explode(e);
                    e.kill();
                },this);
        }
        console.log("call kill all enemy " );
    },
    resetGame : function(arrOb){
        for(var i = 0;i<arrOb.length;i++){
            arrOb[i].destroy();
        }
    }
};