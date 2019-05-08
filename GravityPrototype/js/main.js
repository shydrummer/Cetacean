//'use strict';

//define game
var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'phaser');

var MainMenu = function(game) {
};
MainMenu.prototype = {
	init: function(){
		//initialize
	},

	preload: function() {

	},

	create: function() {

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
	},

	create: function() {
		//place assets
		//background
		this.spaceBG = this.add.sprite(0, 0, 'spaceBG');
		this.spaceBG.scale.setTo(this.HALFSCALE);

		//planet
		//this.planet = this.add.sprite(this.world.centerX, this.world.centerY, 'planet')
		

		//whale player
		this.whale = this.add.sprite(250, 450, 'whale');
		this.whale.anchor.set(.5);
		this.whale.scale.setTo(.25);

		//physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.physics.enable(this.whale, Phaser.Physics.ARCADE);
		this.whale.body.maxVelocity.setTo(this.MAX_VELOCITY, this.MAX_VELOCITY);

		this.planet1 = new Planet(game, 250, 250, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet1);

		this.planet2 = new Planet(game, 750, 400, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet2);

		//game.physics.enable(this.planet, Phaser.Physics.ARCADE);
		

		//give planet gravity
		

	},

	update: function() {
		//collisions
		this.game.physics.arcade.collide(this.whale, this.planet);

		//rotate planet
		this.planet1.rotation +=.025;
		this.planet2.rotation +=.025;

		if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
		{
			this.whale.position.y -= 5;
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
		{
			this.whale.position.y += 5;
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		{
			this.whale.position.x -= 5;
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			this.whale.position.x += 5;
		}

	},
}

var GameOver = function(game) {};
GameOver.prototype = {

	init: function(){
	},

	preload: function(){
	},

	create: function() {
	},

	update: function() {
	}
}

//add states
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');