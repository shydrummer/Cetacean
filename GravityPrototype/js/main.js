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
		this.load.image('MainMenu', 'MainMenu.png');
		this.load.image("frontWave", 'TopWaves.png');
		this.load.image('backWave', 'BottomWaves.png');
		this.load.image('PlayButton', 'PlayButton.png');
		this.load.image('InstructionButton', 'InstructionButton.png');
		this.load.image('CreditButton', 'CreditsButton.png');
		this.load.image('whaleMom', 'SpaceWhale.png');
		this.load.image('whaleBaby', 'frame0000.png');
		this.load.image('logo', 'logo.png');


	},

	create: function() {

		//display image
		this.menu = this.add.sprite(0, 0, 'MainMenu');
		this.logo = this.add.sprite(200, 30, 'logo');
		this.logo.scale.setTo(2);

		this.wave2 = this.add.sprite(0, 155, 'backWave');
		this.wave4 = this.add.sprite(-1200, 155, 'backWave');

		this.wave1 = this.add.sprite(0, 155, 'frontWave');
		this.wave3 = this.add.sprite(1200, 155, 'frontWave');

		this.testButton1 = this.add.sprite(800, 275, 'PlayButton');

		this.testButton2 = this.add.sprite(800, 375, 'InstructionButton');

		this.testButton3 = this.add.sprite(800, 475, 'CreditButton');

		this.buttons = [this.testButton1, this.testButton2, this.testButton3];

		this.buttons[0].tint = 0xffffff;
		this.buttons[1].tint = 0xA0A0A0;
		this.buttons[2].tint = 0xA0A0A0;

		this.currentButton = 0;

		this.whaleMom = this.add.sprite(50, 50, 'whaleMom');
		this.whaleMom.scale.setTo(1, 1);
		this.whaleBaby = this.add.sprite(75, 350, 'whaleBaby');
		this.whaleBaby.scale.setTo(.5);

		this.goingUpA = true;
		this.goingUpB = false;
		this.launched = false;
	},

	update: function(){
		//menu logic


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

		if(this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			if(this.currentButton == 0)
			{
				this.state.start('Cutscene');
			}
			else if(this.currentButton == 1)
			{
				//go to directions
			}
			else if(this.currentButton == 2)
			{
				//go to credits/social links
			}
		}


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
		//load images
		this.load.path = 'assets/img/';
		this.load.image('MainMenu', 'MainMenu.png');
		this.load.image('background', 'starting screen 4.png');
		this.load.image("frontWave", 'TopWaves.png');
		this.load.image('backWave', 'BottomWaves.png');
		this.load.image('PlayButton', 'PlayButton.png');
		this.load.image('InstructionButton', 'InstructionButton.png');
		this.load.image('CreditButton', 'CreditsButton.png');
		this.load.image('whaleMom', 'SpaceWhale.png');
		this.load.image('whaleBaby', 'frame0000.png');
		this.load.image('asteroid', 'Asteroid.png');
	},

	create: function() {

			//display image
		this.menu = this.add.sprite(0, -1200, 'background');

		this.wave2 = this.add.sprite(0, 4355, 'backWave');
		this.wave4 = this.add.sprite(-1200, 4355, 'backWave');

		this.wave1 = this.add.sprite(0, 4355, 'frontWave');
		this.wave3 = this.add.sprite(1200, 4355, 'frontWave');

		this.whaleMom = this.add.sprite(500, 4500, 'whaleMom');
		this.whaleMom.scale.setTo(1, 1);

		this.whaleBaby = this.add.sprite(400, 4650, 'whaleBaby');
		this.whaleBaby.scale.setTo(.5);

		this.goingUpA = true;
		this.goingUpB = false;

		//physics
		game.physics.startSystem(Phaser.Physics.P2JS);

		game.physics.p2.enable(this.whaleMom, false);
		this.whaleMom.body.setCircle(60);
		this.whaleMom.body.collideWorldBounds = false;

		game.physics.p2.enable(this.whaleBaby, false);
		this.whaleBaby.body.setCircle(30);
		this.whaleBaby.body.collideWorldBounds = false;

		game.world.setBounds(0, 0, 20000, 4800);

		game.physics.p2.gravity.y = 0;

		this.launched = false;

		game.camera.follow(this.whaleBaby, Phaser.Camera.FOLLOW_TOPDOWN, .25, .25);

	},

	update: function() {

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

		if(this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			this.whaleMom.body.velocity.y = -300;
			this.whaleBaby.body.velocity.y = -300;
			this.launched = true;
			game.camera.follow(this.whaleMom, Phaser.Camera.FOLLOW_TOPDOWN, .25, .25);

		}

		if(this.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
		{
			this.state.start("Play");
		}

		if(this.whaleMom.y < 2000)
		{
			this.asteroidShower = new Asteroids(game, 'asteroid', 1800, 1200);
			this.game.add.existing(this.asteroidShower);
			this.whaleMom.body.velocity.x = 200;
			game.camera.follow(this.whaleBaby, Phaser.Camera.FOLLOW_TOPDOWN, .05, .05);
		}


		var distance = Phaser.Math.distance(this.whaleBaby.x, this.whaleBaby.y, this.whaleMom.x, this.whaleMom.y);

		if(distance > 1500)
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
		// preload assets
		this.load.path = 'assets/img/';
		this.load.image('spaceBG', 'Space BG.png');
		this.load.image('planet1', 'littleplaentVariation1.png');
		this.load.image('planet2', 'littleplanetVariation2.png');
		this.load.image('planet3', 'littleplanetVariation3.png');
		this.load.image('whale', 'frame0000.png');
		this.load.image('hole', 'black hole.png');
		this.load.image('star', 'star.png');
		this.load.image('ring', 'ring.png');


		this.load.path = 'assets/audio/';
		game.load.audio('theme', ['whale-music.mp3']);
		game.load.audio('launch', ['launch1.mp3']);
		game.load.audio('orbit', ['orbit1.mp3']);

	},

	create: function() {

		this.beats = game.add.audio('theme');
		this.beats.play('', 0, 1, true);
		this.beats.volume = 0.5;

		//place assets
		//background
		this.spaceBG = this.add.sprite(0, 0, 'spaceBG');
		this.spaceBG.scale.setTo(1);

		//physics
		game.physics.startSystem(Phaser.Physics.P2JS);

		game.physics.p2.gravity.y = 0;

		//whale player
		this.whale = this.add.sprite(450, 500, 'whale');

		game.physics.p2.enable(this.whale, false);
		this.whale.body.setCircle(30);

		this.whale.anchor.set(.5);
		this.whale.scale.setTo(.25, .25);


		//set world bounds


		//add planet 1
		this.planet1 = new Planet(game, 600, 500, 'planet1', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet1);

		this.ring = this.add.sprite(600, 500, 'ring');
		this.ring.anchor.setTo(0.5);	//set anchor
		this.ring.scale.setTo(1.25);
		this.ring.alpha = 0.5;						// make semi-transparent



		//add planet 2
		this.planet2 = new Planet(game, 1200, 500, 'planet2', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet2);

		//add planet 3
		this.planet3 = new Planet(game, 1750, 500, 'planet3', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet3);

		//add black hole1
		this.blackHole1 = new BlackHole(game, 2300, 500, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole1);

		//add planet 4
		this.planet4 = new Planet(game, 2300, 250, 'planet1', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet4);

		//add planet 5
		this.planet5 = new Planet(game, 2300, 750, 'planet2', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet5);

		//add planet 6
		this.planet6 = new Planet(game, 2800, 500, 'planet3', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet6);

		//add planet 7
		this.planet7 = new Planet(game, 3200, 300, 'planet1', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet7);

		//add planet 8
		this.planet8 = new Planet(game, 3600, 700, 'planet2', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet8);

		//add black hole 2
		this.blackHole2 = new BlackHole(game, 3400, 500, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole2);

		//add planet 9
		this.planet9 = new Planet(game, 3800, 300, 'planet3', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet9);

		//add black hole 3
		this.blackHole3 = new BlackHole(game, 4150, 250, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole3);

		//add black hole 4
		this.blackHole4 = new BlackHole(game, 4000, 550, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole4);

		//add planet 10
		this.planet10 = new Planet(game, 4375, 475, 'planet1', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet10);

		//add black hole 5
		this.blackHole5 = new BlackHole(game, 4200, 725, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole5);

		//add planet 11
		this.planet11 = new Planet(game, 4800, 200, 'planet2', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet11);

		//add black hole 6
		this.blackHole6 = new BlackHole(game, 4800, 500, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole6);

		//add black hole 7
		this.blackHole7 = new BlackHole(game, 4900, 700, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole7);

		//add planet 12
		this.planet12 = new Planet(game, 5200, 300, 'planet3', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet12);

		//add planet 13
		this.planet13 = new Planet(game, 5700, 500, 'planet1', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet13);

		//add planet 14
		this.planet14 = new Planet(game, 6200, 500, 'planet2', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet14);

		//add planet 15
		this.planet15 = new Planet(game, 6700, 500, 'planet3', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet15);

		//this.starBar = new HealthBar(game, 10, 10, 'star');
		//game.add.existing(this.starBar);

		this.cursors = game.input.keyboard.createCursorKeys();
		this.whale.body.onBeginContact.add(this.killWhale, this);
		this.whale.body.colliedeWorldBounds = false;
		this.rotateSpeed = .04;

		this.textStyle = {
			font: 'Fira Sans',
			fontSize: 32,
			wordWrap: true,
			wordWrapWidth: 586,
			fill: '#FFFFFF'
		};

		this.tut1 = false;
		this.tut2 = false;
		this.tut3 = false;
	},

	update: function() {
		this.whale.body.setZeroRotation();

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


		//passing the finish line
		/*if(this.whale.position.x > 2200)
		{
			this.state.start('Victory');
		}*/

		if(this.whale.x > 600 && !this.tut1)
		{
			this.tutorial1 = game.add.text(100, 300, 'Use the [spacebar] to release yourself from this orbit', this.textStyle);
			this.tut1 = true;
		}

		if(this.whale.x > 1200 && !this.tut2)
		{
			if(this.tutorial1 != null)
			{
				this.tutorial1.destroy();
			}
			this.tutorial2 = game.add.text(700, 300, 'Thats it! youve got it! Make sure you stay close to the planets, so that you dont get lost in space', this.textStyle);
			this.tut2 = true;
		}

		if(this.whale.x > 1800 && !this.tut3)
		{
			if(this.tutorial2 != null)
			{
				this.tutorial2.destroy();
			}
			this.tutorial3 = game.add.text(1400, 300, 'Watch out for black holes, they end your journey prematurely' , this.textStyle);
			this.tut3 = true;
		}

		if(this.whale.x > 2400 && this.tutorial3 != null)
		{
			this.tutorial3.destroy();
		}
	},

	//removes whale from game
	killWhale: function(body, bodyB, shapeA, shapeB, equation) {
		// onBeginContact is sent 5 arguments automatically, in this order:
		// 1. the Phaser.Physics.P2.Body it is in contact with
		// 2. The P2.Body this body is in contact with
		// 3. the shape from this P2 body that caused the contact
		// 4. the shape from the contact P2 body
		// 5. the contact equation data array
		this.beats.fadeOut(500);

		let info = {
			'body': body,
			'bodyB': bodyB,
			'shapeA': shapeA,
			'shapeB': shapeB,
			'equation': equation
		};
		console.log(info);

		// make sure body isn't null (i.e., the wall)
		if(body) {
			// only kill/destroy the football
			// use second line instead of first to clear sprite AND physics body
			if(body.sprite.key === 'hole')
			{
				this.healthStatus = this.starBar.decreaseHealth();
			}

			if(this.healthStatus == -1)
			{
				this.whale.kill()
				game.state.start("GameOver");
			}
		}
		else
		{
			this.whale.kill();
			this.state.start('GameOver');
		}
	}
}

var GameOver = function(game, beats) {};
GameOver.prototype = {

	init: function(){

	this.beats.fadeOut(500);

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
game.state.add('Cutscene', Cutscene);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.add('Victory', Victory);
game.state.start('MainMenu');
