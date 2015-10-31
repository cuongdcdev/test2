AlienGame.MainMenu = function(){
    this.music = null;
    this.playButton = null;
};

AlienGame.MainMenu.prototype = {
  create : function(){
  	  this.add.image(0,0,"mainMenu");
      // this.add.text(this.game.width/2,this.game.height/2,"Điều khiển : Z - bắn , phím mũi tên để di chuyển \n  bấm Z để cứu thế giới :3 ",{
      	// font:"monospace bold 40px ",
      	// fill :"#fff"
      // }).anchor.setTo(0.5,0.5);
  
  },
 update : function(){
    if(this.input.keyboard.isDown(Phaser.Keyboard.Z)){
    	this.startGame();
    }
 },
 startGame : function(){
 	this.game.state.start("Game");
 }
};