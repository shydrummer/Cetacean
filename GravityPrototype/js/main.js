'use strict';

//define game
var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'phaser');

var MainMenu = function(game) {
};
MainMenu.prototype = {
	init: function(){
		//initialize
	},

	preload: function() {
		this.load.path = 'assets/img/';
		this.load.image('MainMenu', 'MenuScreen.png');
	},

	create: function() {
		this.menu = this.add.sprite(0, 0, 'MainMenu');
	},

	update: function(){
		//menu logic
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.state.start('Play');
		}
	}
}

//Play state and methods
var Play = function(game) {
	this.HALFSCALE = .5;
	this.MAX_VELOCITY = 500;
	this.ANG_VELOCITY = 180;
	this.ACCELERATION = 1500;
	this.DRAG = 2600;
	this.VOID_ACCELERATION = 100;
};
Play.prototype = {

	//state variables
	init: function() {

	},

	preload: function() {
		// preload assets
		this.load.path = 'assets/img/';
		this.load.image('spaceBG', 'space.png');
		this.load.image('planet', 'planet.png');
		this.load.image('whale', 'whale.png');
		this.load.image('hole', 'black hole.png');
	},

	create: function() {
		//place assets
		//background
		this.spaceBG = this.add.sprite(0, 0, 'spaceBG');
		this.spaceBG.scale.setTo(this.HALFSCALE);

		//whale player
		this.whale = this.add.sprite(250, 450, 'whale');
		this.whale.anchor.set(.5);
		this.whale.scale.setTo(-.25, .25);

		//physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.physics.enable(this.whale, Phaser.Physics.ARCADE);
		this.whale.body.maxVelocity.setTo(this.MAX_VELOCITY, this.MAX_VELOCITY);

		game.world.setBounds(0, 0, 2000, 10000);

		this.planet1 = new Planet(game, 250, 250, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet1);

		this.planet2 = new Planet(game, 750, 400, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet2);


		this.blackHole = new BlackHole(game, 800, 50, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole);

		game.camera.follow(this.whale, Phaser.Camera.FOLLOW_TOPDOWN);
	},

	update: function() {
		//collisions
		this.game.physics.arcade.collide(this.whale, this.planet);


		game.physics.arcade.overlap(this.whale, this.blackHole, this.killWhale, null, this);

		//rotate planet
		this.planet1.rotation +=.025;
		this.planet2.rotation +=.025;

		if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
		{
			this.whale.position.y -= 1;
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
		{
			this.whale.position.y += 1;
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		{
			this.whale.position.x -= 1;
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			this.whale.position.x += 1;
		}

	},

	killWhale: function() {
		this.whale.kill();
		this.state.start('GameOver');
	}
}

var GameOver = function(game) {};
GameOver.prototype = {

	init: function(){
	},

	preload: function() {
		this.load.path = 'assets/img/';
		this.load.image('OverScreen', 'GameOverScreen.png');
	},

	create: function() {
		this.gameOver = this.add.sprite(0, 0, 'OverScreen');
	},

	update: function() {
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.state.start('Play');
		}
	}
}

//add states
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');