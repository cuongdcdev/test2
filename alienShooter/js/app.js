window.onload = function(){
    var game = new Phaser.Game(1280,608,Phaser.CANVAS,'');
    // var game = new Phaser.Game(800,600,Phaser.CANVAS,'');
        game.state.add("Boot",AlienGame.Boot);
        game.state.add("Preloader",AlienGame.Preloader);
        game.state.add("MainMenu",AlienGame.MainMenu);
        game.state.add("Game",AlienGame.Game);
        
        game.state.start("Boot");
                               
};