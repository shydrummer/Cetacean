'use strict';

//define game
var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'phaser');
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
		game.load.atlas('atlas', 'spritesheet.png', 'sprites.json');

		//load audio
		this.load.path = 'assets/audio/';
		game.load.audio('water', ['water.mp3']);
	},

	create: function() {


		//display images
		this.menu = this.add.sprite(0, 0, 'atlas', 'MainMenu');
		this.logo = this.add.sprite(200, 30, 'atlas', 'Logo');
		this.logo.scale.setTo(2);
		this.wave2 = this.add.sprite(0, 155, 'atlas', 'BottomWaves');
		this.wave4 = this.add.sprite(-1200, 155, 'atlas', 'BottomWaves');
		this.wave1 = this.add.sprite(0, 155, 'atlas', 'TopWaves');
		this.wave3 = this.add.sprite(1200, 155, 'atlas', 'TopWaves');
		this.testButton1 = this.add.sprite(800, 325, 'atlas', 'PlayButton');
		this.testButton3 = this.add.sprite(800, 425, 'atlas', 'CreditsButton');
		//end display images

		//create framework for button logic
		this.buttons = [this.testButton1, this.testButton3];

		this.buttons[0].tint = 0xffffff;
		this.buttons[1].tint = 0xA0A0A0;

		this.currentButton = 0;

		//add mom and baby, set up drifting logic
		this.whaleMom = this.add.sprite(50, 50, 'atlas', 'SpaceWhale');
		this.whaleMom.scale.setTo(1, 1);
		this.whaleBaby = this.add.sprite(75, 350, 'atlas', 'frame0000');
		this.whaleBaby.scale.setTo(.5);

		//animation
		this.whaleBaby.animations.add('swim', Phaser.Animation.generateFrameNames('frame', 0, 4, '', 4), 10, true);
		this.whaleMom.animations.add('mom', Phaser.Animation.generateFrameNames('mom', 0, 4, '', 4), 10, true);

		this.goingUpA = true;
		this.goingUpB = false;
		this.launched = false;

				//audio for menu
		game.water = game.add.audio('water');
		game.water.play('', 0, 1, true);
		game.water.volume = 0.2;
	},

	update: function(){
		//play animations
		this.whaleBaby.animations.play('swim');
		this.whaleMom.animations.play('mom');

		//Makes waves move in background
		this.wave1.position.x --;
		this.wave3.position.x --;
		if(this.wave1.position.x < -1200)
		{
			this.wave1.position.x = 0;
			this.wave3.position.x = 1200;
		}

		this.wave2.position.x ++;
		this.wave4.position.x ++;
		if(this.wave2.position.x > 1200)
		{
			this.wave2.position.x = 0;
			this.wave4.position.x = -1200;
		}

		//logic for highlighting buttons
		if(this.input.keyboard.justPressed(Phaser.Keyboard.DOWN))
		{
			this.buttons[this.currentButton].tint =  0xA0A0A0;
			this.currentButton ++;
			if(this.currentButton > this.buttons.length-1)
			{
				this.currentButton = 0;
			}

			this.buttons[this.currentButton].tint = 0xffffff;
		}
		else if(this.input.keyboard.justPressed(Phaser.Keyboard.UP))
		{
			this.buttons[this.currentButton].tint =  0xA0A0A0;
			this.currentButton --;
			if(this.currentButton < 0)
			{
				this.currentButton = this.buttons.length-1;
			}

			this.buttons[this.currentButton].tint = 0xffffff;
		}

		//menu logic
		if(this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			if(this.currentButton == 0)
			{
				//console.log("water sound fading");

				if(this.cache.isSoundDecoded('water')) {

					this.state.start('Cutscene');

				}
			}
			else if(this.currentButton == 1)
			{
				//go to directions
			}
			else if(this.currentButton == 2)
			{
				this.state.start("Credits");
			}
		}

			//Make whales drift up and down
			if(this.whaleBaby.y > 400)
			{
				this.goingUpA = false;
			}
			else if (this.whaleBaby.y < 300)
			{
				this.goingUpA = true;
			}

			if(this.whaleMom.y > 125)
			{
				this.goingUpB = false;
			}
			else if (this.whaleMom.y < -25)
			{
				this.goingUpB = true;
			}

			if(this.goingUpA)
			{
				this.whaleBaby.y ++;
			}
			else
			{
				this.whaleBaby.y --;
			}

			if(this.goingUpB)
			{
				this.whaleMom.y ++;
			}
			else
			{
				this.whaleMom.y --;
			}
	}
}

var Cutscene = function(game) {};
Cutscene.prototype = {

	init: function(){

	},

	preload: function() {
		//load audio
		this.load.path = 'assets/audio/';
		game.load.audio('asteroid', ['asteroid.wav']);
	},

	create: function() {

		//display images
		this.menu = this.add.sprite(0, 3000, 'atlas', 'Space BG');
		this.menu.scale.setTo(1);
		this.wave2 = this.add.sprite(0, 4355, 'atlas', 'BottomWaves');
		this.wave4 = this.add.sprite(-1200, 4355, 'atlas', 'BottomWaves');
		this.wave1 = this.add.sprite(0, 4355, 'atlas', 'TopWaves');
		this.wave3 = this.add.sprite(1200, 4355, 'atlas', 'TopWaves');
		this.whaleMom = this.add.sprite(500, 4500, 'atlas', 'SpaceWhale');
		this.whaleMom.scale.setTo(1, 1);
		this.whaleBaby = this.add.sprite(400, 4650, 'atlas', 'frame0000');
		this.whaleBaby.scale.setTo(.5);

		//logic for drifting
		this.goingUpA = true;
		this.goingUpB = false;

		//start physics system
		game.physics.startSystem(Phaser.Physics.P2JS);

		//mom physics
		game.physics.p2.enable(this.whaleMom, false);
		this.whaleMom.body.setCircle(60);
		this.whaleMom.body.collideWorldBounds = false;

		//baby physics
		game.physics.p2.enable(this.whaleBaby, false);
		this.whaleBaby.body.setCircle(30);
		this.whaleBaby.body.collideWorldBounds = false;

		//set world bounds
		game.world.setBounds(0, 0, 20000, 4800);

		//no gravity! we're in space!
		game.physics.p2.gravity.y = 0;

		//cutscene logic setup
		this.launched = false;

		//follow the baby with the camera
		game.camera.follow(this.whaleBaby, Phaser.Camera.FOLLOW_TOPDOWN, .25, .25);


		//animation
		this.whaleBaby.animations.add('swim', Phaser.Animation.generateFrameNames('frame', 0, 4, '', 4), 10, true);
		this.whaleMom.animations.add('mom', Phaser.Animation.generateFrameNames('mom', 0, 4, '', 4), 10, true);

	},

	update: function() {
		//play animations
		this.whaleBaby.animations.play('swim');
		this.whaleMom.animations.play('mom');

		//make waves drift
		this.wave1.position.x --;
		this.wave3.position.x --;
		if(this.wave1.position.x < -1200)
		{
			this.wave1.position.x = 0;
			this.wave3.position.x = 1200;
		}

		this.wave2.position.x ++;
		this.wave4.position.x ++;
		if(this.wave2.position.x > 1200)
		{
			this.wave2.position.x = 0;
			this.wave4.position.x = -1200;
		}

		if(!this.launched)
		{
			if(this.whaleBaby.y > 4700)
			{
				this.goingUpA = false;
			}
			else if (this.whaleBaby.y < 4600)
			{
				this.goingUpA = true;
			}

			if(this.whaleMom.y > 4575)
			{
				this.goingUpB = false;
			}
			else if (this.whaleMom.y < 4425)
			{
				this.goingUpB = true;
			}

			if(this.goingUpA)
			{
				this.whaleBaby.body.y ++;
			}
			else
			{
				this.whaleBaby.body.y --;
			}

			if(this.goingUpB)
			{
				this.whaleMom.body.y ++;
			}
			else
			{
				this.whaleMom.body.y --;
			}
	}

		//launch into the sky
		if(this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{

			//audio from prev scene: fade out
			game.water.fadeOut(2000);

			this.whaleMom.body.velocity.y = -300;
			this.whaleBaby.body.velocity.y = -300;
			this.launched = true;
			game.camera.follow(this.whaleMom, Phaser.Camera.FOLLOW_TOPDOWN, .25, .25);

			//asteroid audio
			game.asteroid = game.add.audio('asteroid');
			game.asteroid.volume = 0.5;
			//game.asteroid.play('', 0, 1, false);
			game.asteroid.fadeIn(5000);
			console.log("asteroid");




		}

		//start asteroid shower, seperate mom from baby
		if(this.whaleMom.y < 3600)
		{

			this.asteroidShower = new Asteroids(game, 'Asteroid', 1200, 4200);
			this.game.add.existing(this.asteroidShower);
			this.whaleBaby.body.velocity.y = 0;
			this.whaleMom.body.velocity.x = 400;
			game.camera.follow(this.whaleBaby, Phaser.Camera.FOLLOW_TOPDOWN, .05, .05);


		}

		//distance between mom and baby
		var distance = Phaser.Math.distance(this.whaleBaby.x, this.whaleBaby.y, this.whaleMom.x, this.whaleMom.y);

		//when far enough, start game
		if(distance > 2000)
		{
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

		game.asteroid.fadeOut(900);
		//load audio
		this.load.path = 'assets/audio/';
		game.load.audio('theme', ['whale-music.mp3']);
		game.load.audio('launch', ['launch1.mp3']);
		game.load.audio('orbit', ['orbit1.mp3']);
		game.load.audio('mommy', ['mother.wav']);
		game.load.audio('baby', ['baby.wav']);

	},

	create: function() {
		//create audio
		game.beats = game.add.audio('theme');

		game.beats.fadeIn(1000);
		game.beats.play('', 0, 1, true);
		game.beats.volume = 0.5;

		game.mommy = game.add.audio('mommy');
		game.baby = game.add.audio('baby');

		//place background
		this.spaceBG = this.add.sprite(0, 0, 'atlas', 'Space BG');

		//physics
		game.physics.startSystem(Phaser.Physics.P2JS);

		//NO gravity
		game.physics.p2.gravity.y = 0;

		//whale player
		this.whale = this.add.sprite(450, 500, 'atlas', 'frame0000');
		this.whale.anchor.set(.5);
		this.whale.scale.setTo(.25, .25);

		//animations setup
		this.whale.animations.add('swim', Phaser.Animation.generateFrameNames('frame', 0, 4, '', 4), 10, true);

		//setup whale physics
		game.physics.p2.enable(this.whale, false);
		this.whale.body.setCircle(30);

		//add planet 1
		this.planet1 = new Planet(game, 600, 500, 'littleplanetVariation1', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet1);

		//add visual feedback
		this.ring = this.add.sprite(600, 500, 'atlas', 'ring');
		this.ring.anchor.setTo(0.5);	//set anchor
		this.ring.scale.setTo(1.25);
		this.ring.alpha = 0.5;			// make semi-transparent

		//add planet 2
		this.planet2 = new Planet(game, 1200, 500, 'littleplanetVariation2', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet2);

		//visual feedback
		this.ring = this.add.sprite(1200, 500, 'atlas', 'ring');
		this.ring.anchor.setTo(0.5);	//set anchor
		this.ring.scale.setTo(1.25);
		this.ring.alpha = 0.5;						// make semi-transparent

		//add planet 3
		this.planet3 = new Planet(game, 1750, 500, 'littleplanetVariation3', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet3);

		//visual feedback
		this.ring = this.add.sprite(1750, 500, 'atlas', 'ring');
		this.ring.anchor.setTo(0.5);	//set anchor
		this.ring.scale.setTo(1.25);
		this.ring.alpha = 0.5;						// make semi-transparent

		//add black hole1
		this.blackHole1 = new BlackHole(game, 2300, 500, 'black hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole1);

		//add planet 4
		this.planet4 = new Planet(game, 2300, 250, 'littleplanetVariation1', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet4);

		//add planet 5
		this.planet5 = new Planet(game, 2300, 750, 'littleplanetVariation2', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet5);

		//add planet 6
		this.planet6 = new Planet(game, 2800, 500, 'littleplanetVariation4', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet6);

		//add planet 7
		this.planet7 = new Planet(game, 3200, 300, 'littleplanetVariation1', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet7);

		//add planet 8
		this.planet8 = new Planet(game, 3600, 700, 'littleplanetVariation2', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet8);

		//add black hole 2
		this.blackHole2 = new BlackHole(game, 3400, 500, 'black hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole2);

		//add planet 9
		this.planet9 = new Planet(game, 3800, 300, 'littleplanetVariation3', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet9);

		//add black hole 3
		this.blackHole3 = new BlackHole(game, 4150, 250, 'black hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole3);

		//add black hole 4
		this.blackHole4 = new BlackHole(game, 4000, 550, 'black hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole4);

		//add planet 10
		this.planet10 = new Planet(game, 4375, 475, 'littleplanetVariation1', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet10);

		//add black hole 5
		this.blackHole5 = new BlackHole(game, 4200, 725, 'black hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole5);

		//add planet 11
		this.planet11 = new Planet(game, 4800, 200, 'littleplanetVariation2', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet11);

		//add black hole 6
		this.blackHole6 = new BlackHole(game, 4800, 500, 'black hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole6);

		//add black hole 7
		this.blackHole7 = new BlackHole(game, 4900, 700, 'black hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole7);

		//add planet 12
		this.planet12 = new Planet(game, 5200, 300, 'littleplanetVariation3', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet12);

		//add planet 13
		this.planet13 = new Planet(game, 5700, 500, 'littleplanetVariation4', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet13);

		//add planet 14
		this.planet14 = new Planet(game, 6200, 500, 'littleplanetVariation2', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet14);

		//add planet 15
		this.planet15 = new Planet(game, 6700, 500, 'littleplanetVariation3', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet15);

		//add health bar (stars)
		this.starBar = new HealthBar(game, 10, 10, 'star');
		game.add.existing(this.starBar);

		//add cursors for controls
		this.cursors = game.input.keyboard.createCursorKeys();

		//collision for whale
		this.whale.body.onBeginContact.add(this.killWhale, this);
		this.whale.body.colliedeWorldBounds = false;
		
		//rotation for planets/blackholes
		this.rotateSpeed = .04;

		//css for tutorial text
		this.textStyle = {
			font: 'Lucida Sans Unicode',
			fontSize: 32,
			wordWrap: true,
			wordWrapWidth: 586,
			fill: '#FFFFFF'
		};

		//setup for tutorial logic
		this.tut1 = false;
		this.tut2 = false;
		this.tut3 = false;
	},

	update: function() {
		//you DONT get to wiggle
		this.whale.body.setZeroRotation();

		//just keep swimming...
		this.whale.animations.play('swim');

		//rotate planets
		this.planet1.body.rotation += this.rotateSpeed;
		this.planet2.body.rotation += this.rotateSpeed;
		this.planet3.body.rotation += this.rotateSpeed;
		this.planet4.body.rotation += this.rotateSpeed;
		this.planet5.body.rotation += this.rotateSpeed;
		this.planet6.body.rotation += this.rotateSpeed;
		this.planet7.body.rotation += this.rotateSpeed;
		this.planet8.body.rotation += this.rotateSpeed;
		this.planet9.body.rotation += this.rotateSpeed;
		this.planet10.body.rotation += this.rotateSpeed;
		this.planet11.body.rotation += this.rotateSpeed;
		this.planet12.body.rotation += this.rotateSpeed;
		this.planet13.body.rotation += this.rotateSpeed;
		this.planet14.body.rotation += this.rotateSpeed;
		this.planet15.body.rotation += this.rotateSpeed;

		//rotate black holes
		this.blackHole1.body.rotation += this.rotateSpeed;
		this.blackHole2.body.rotation += this.rotateSpeed;
		this.blackHole3.body.rotation += this.rotateSpeed;
		this.blackHole4.body.rotation += this.rotateSpeed;
		this.blackHole5.body.rotation += this.rotateSpeed;
		this.blackHole6.body.rotation += this.rotateSpeed;
		this.blackHole7.body.rotation += this.rotateSpeed;

		//WHALE MVMT FOR TESTING ONLY
		//REMOVE FOR FINAL GAME
		if(this.cursors.left.isDown) {
			this.whale.body.velocity.x = -this.MAX_VELOCITY;
		} else if(this.cursors.right.isDown) {
			this.whale.body.velocity.x = this.MAX_VELOCITY;
		}
		if(this.cursors.up.isDown) {
			this.whale.body.velocity.y = -this.MAX_VELOCITY;
		} else if(this.cursors.down.isDown) {
			this.whale.body.velocity.y = this.MAX_VELOCITY;
		}
		//END REMOVE

		if(this.whale.position.x == 2500) { //baby whale cry


			game.baby.fadeIn(100);
			game.baby.play('', 0, 1, true);
			//game.baby.volume = 0.5;
			console.log('baby whale cry');


		}

		if(this.whale.position.x == 5000) { //mother whale cry

			game.mommy.fadeIn(100);
			game.mommy.play('', 0, 1, true);
			game.mommy.volume = 0.5;

		}


		//out of bounds
		if(this.whale.position.y > 900)
		{
			this.whale.destroy();
			this.state.start("GameOver");
		}

		//passing the finish line
		if(this.whale.position.x > 7000)
		{
			this.state.start("Victory");
		}

		//tutorial logic
		if(this.whale.x > 550 && !this.tut1)
		{
			this.tutorial1 = game.add.text(350, 200, 'Use the [spacebar] to release yourself from this orbit', this.textStyle);
			this.tut1 = true;
		}

		if(this.whale.x > 1150 && !this.tut2)
		{
			if(this.tutorial1 != null)
			{
				this.tutorial1.destroy();
			}
			this.tutorial2 = game.add.text(825, 200, 'Thats it! youve got it! Make sure you stay close to the planets, so that you dont get lost in space', this.textStyle);
			this.tut2 = true;
		}

		if(this.whale.x > 1750 && !this.tut3)
		{
			if(this.tutorial2 != null)
			{
				this.tutorial2.destroy();
			}
			this.tutorial3 = game.add.text(1450, 200, 'Watch out for black holes, they end your journey prematurely' , this.textStyle);
			this.tut3 = true;
		}

		if(this.whale.x > 2400 && this.tutorial3 != null)
		{
			this.tutorial3.destroy();
		}
		//end tutorial logic
	},

	//removes whale from game
	killWhale: function(body, bodyB, shapeA, shapeB, equation) {

		let info = {
			'body': body,
			'bodyB': bodyB,
			'shapeA': shapeA,
			'shapeB': shapeB,
			'equation': equation
		};
		// make sure body isn't null (i.e., the wall)
		if(body) {
			this.healthStatus = this.starBar.decreaseHealth();

			if(this.healthStatus == -1)
			{
				this.whale.kill()
				game.state.start("GameOver");
			}
		}
	}
}

var GameOver = function(game) {};
GameOver.prototype = {

	init: function(){

		game.beats.fadeOut(5000);

	},

	preload: function() {

	},

	create: function() {
		//display image
		this.gameOver = this.add.sprite(0, 0, 'atlas', 'GameOver');
	},

	update: function() {
		//check if restarting game
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.state.start('Play');
		}
	}
}

var Credits = function(game, beats) {};
Credits.prototype = {

	init: function(){

		//this.beats.fadeOut(500);

	},

	preload: function() {

	},

	create: function() {
		//display image
		this.credits = this.add.sprite(0, 0, 'atlas', 'Credits');
	},

	update: function() {
		//check if restarting game
		if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			this.state.start('MainMenu');
		}
	}
}

var Victory = function(game) {};
Victory.prototype = {

	init: function(){
	},

	preload: function() {
		//load images
		this.load.path = 'assets/img/';
		game.load.atlas('atlas', 'spritesheet.png', 'sprites.json');
	},

	create: function() {
		//background
		this.splashScreen = this.add.sprite(0, 0, 'atlas', 'VictoryScreen');

		//whaleBaby
		this.whaleBaby = this.add.sprite(600, 375, 'atlas', 'frame0000');
		this.whaleBaby.scale.setTo(.25);
		this.whaleBaby.anchor.set(.5);

		//whaleMom
		this.whaleMom = this.add.sprite(600, 250, 'atlas', 'SpaceWhale');
		this.whaleMom.scale.setTo(.75);
		this.whaleMom.anchor.setTo(.5);

		//animation
		this.babyAnim = this.whaleBaby.animations.add('baby', Phaser.Animation.generateFrameNames('baby', 0, 26, '', 4), 5, false);
		this.momAnim = this.whaleMom.animations.add('momend', Phaser.Animation.generateFrameNames('momend', 0, 24, '', 4), 4, true);
		this.babyAnim.loop = false;
		this.momAnim.loop = false;

		this.whaleBaby.animations.play('baby', 5, false);
		this.whaleMom.animations.play('momend', 4, false);
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
game.state.add('Cutscene', Cutscene);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.add('Victory', Victory);
game.state.add('Credits', Credits);
game.state.start('MainMenu');
