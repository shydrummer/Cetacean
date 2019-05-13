'use strict';

//define game
var game = new Phaser.Game(1000, 700, Phaser.AUTO, 'phaser');
var style = { font: '24px Helvetica', fill: '#FFF', align: "center" };

var MainMenu = function(game) {
};
MainMenu.prototype = {
	init: function(){
		//initialize
	},

	preload: function() {
		//load images
		this.load.path = 'assets/img/';
		this.load.image('MainMenu', 'MenuScreen.png');
	},

	create: function() {
		//display image
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
		this.load.image('planet', 'littleplaentVariation1.png');
		this.load.image('whale', 'SpaceWhale.png');
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

		//set world bounds
		game.world.setBounds(0, 0, 10000, 1000);

		//add planet 1
		this.planet1 = new Planet(game, 250, 250, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet1);

		//add planet 2
		this.planet2 = new Planet(game, 750, 400, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet2);

		//add planet 3
		this.planet3 = new Planet(game, 1000, 700, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet3);

		//add planet 4
		this.planet4 = new Planet(game, 1300, 400, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet4);

		//add planet 5
		this.planet5 = new Planet(game, 1600, 100, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet5);

		//add planet 6
		this.planet6 = new Planet(game, 2000, 700, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet6);

		//add black hole1
		this.blackHole1 = new BlackHole(game, 800, 50, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole1);

		//add black hole 2
		this.blackHole2 = new BlackHole(game, 1900, 300, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole2);

		//add camera with 200x200 deadzone
		game.camera.follow(this.whale, Phaser.Camera.FOLLOW_TOPDOWN);
	},

	update: function() {
		//collisions
		this.game.physics.arcade.collide(this.whale, this.planet);

		//check collision with black hole
		game.physics.arcade.overlap(this.whale, this.blackHole1, this.killWhale, null, this);

		game.physics.arcade.overlap(this.whale, this.blackHole2, this.killWhale, null, this);

		//rotate planet
		this.planet1.rotation +=.025;
		this.planet2.rotation +=.025;
		this.planet3.rotation +=.025;
		this.planet4.rotation +=.025;
		this.planet5.rotation +=.025;
		this.planet6.rotation +=.025;


		//whale "nudges"
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


		if(this.whale.position.y < -200 || this.whale.position.y > 1000)
		{
			this.state.start('GameOver');
		}
		if(this.whale.position.x > 2200)
		{
			this.state.start('Victory');
		}
	},

	//removes whale from game
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
		//load assets
		this.load.path = 'assets/img/';
		this.load.image('OverScreen', 'GameOverScreen.png');
	},

	create: function() {
		//display image
		this.gameOver = this.add.sprite(0, 0, 'OverScreen');
	},

	update: function() {
		//check if restarting game
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.state.start('Play');
		}
	}
}


var Victory = function(game) {};
Victory.prototype = {

	init: function(){
	},

	preload: function() {
		//load assets
		//this.load.path = 'assets/img/';
		//this.load.image('OverScreen', 'GameOverScreen.png');
	},

	create: function() {
		//display image
		//this.gameOver = this.add.sprite(0, 0, 'OverScreen');
		var message = game.add.text(10, 10, "After a long journey, you find your mother", style);
	},

	update: function() {
		//check if restarting game
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.state.start('Play');
		}
	}
}

//add states
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.add('Victory', Victory);
game.state.start('MainMenu');