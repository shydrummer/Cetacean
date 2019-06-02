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

		this.load.path = 'assets/audio/';
		game.load.audio('theme', ['space_whale_temp.mp3']);
		game.load.audio('launch', ['launch_sound.wav']);
	},

	create: function() {
		//display image
		this.menu = this.add.sprite(0, 0, 'MainMenu');

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
	},

	update: function(){
		//menu logic
		this.beats = game.add.audio('theme');
		this.beats.play('', 0, 0.5, true);	
		this.beats.volume = 0.05;

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
	},

	create: function() {
			//display image
		this.menu = this.add.sprite(0, -1200, 'background');

		this.wave2 = this.add.sprite(0, 155, 'backWave');
		this.wave4 = this.add.sprite(-1200, 155, 'backWave');

		this.wave1 = this.add.sprite(0, 155, 'frontWave');
		this.wave3 = this.add.sprite(1200, 155, 'frontWave');

		this.whaleMom = this.add.sprite(500, 300, 'whaleMom');
		this.whaleMom.scale.setTo(1, 1);

		this.whaleBaby = this.add.sprite(400, 450, 'whaleBaby');
		this.whaleBaby.scale.setTo(.5);

		this.goingUpA = true;
		this.goingUpB = false;

		//physics
		game.physics.startSystem(Phaser.Physics.P2JS);

		game.physics.p2.enable(this.whaleMom, true);
		this.whaleMom.body.setCircle(60);

		game.physics.p2.enable(this.whaleBaby, true);
		this.whaleBaby.body.setCircle(30);

		game.world.setBounds(0, 0, 20000, 800);

		game.physics.p2.gravity.y = 0;

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

		if(this.whaleBaby.y > 500)
		{
			this.goingUpA = false;
		}
		else if (this.whaleBaby.y < 400)
		{
			this.goingUpA = true;
		}

		if(this.whaleMom.y > 375)
		{
			this.goingUpB = false;
		}
		else if (this.whaleMom.y < 225)
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

		if(this.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			this.whaleMom.body.velocity.x = 100;
		}

		if(this.input.keyboard.justPressed(Phaser.Keyboard.ENTER))
		{
			this.state.start("Play");
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
		this.load.image('spaceBG', 'starting screen 4.png');
		this.load.image('planet', 'littleplaentVariation1.png');
		this.load.image('whale', 'frame0000.png');
		this.load.image('hole', 'black hole.png');

	},

	create: function() {
		//place assets
		//background
		this.spaceBG = this.add.sprite(-1200, 0, 'spaceBG');
		this.spaceBG.scale.setTo(2);

		//physics
		game.physics.startSystem(Phaser.Physics.P2JS);
		//game.physics.startSystem(Phaser.Physics.ARCADE);

		game.physics.p2.gravity.y = 0;

		//whale player
		this.whale = this.add.sprite(250, 450, 'whale');

		game.physics.p2.enable(this.whale, false);
		this.whale.body.setCircle(30);

		this.whale.anchor.set(.5);
		this.whale.scale.setTo(.25, .25);


		//set world bounds
		

		//add planet 1
		this.planet1 = new Planet(game, 600, 400, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet1);

		//add planet 2
		this.planet2 = new Planet(game, 1200, 400, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet2);

		//add planet 3
		this.planet3 = new Planet(game, 1750, 400, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet3);

		//add black hole1
		this.blackHole1 = new BlackHole(game, 2300, 400, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole1);

		//add planet 4
		this.planet4 = new Planet(game, 2300, 150, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet4);

		//add planet 5
		this.planet5 = new Planet(game, 2300, 650, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet5);

		//add planet 6
		this.planet6 = new Planet(game, 2800, 400, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet6);

		//add planet 7
		this.planet7 = new Planet(game, 3200, 200, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet7);

		//add planet 8
		this.planet8 = new Planet(game, 3600, 600, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet8);

		//add black hole 2
		this.blackHole2 = new BlackHole(game, 3400, 400, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole2);

		//add planet 9
		this.planet9 = new Planet(game, 3800, 200, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet9);

		//add black hole 3
		this.blackHole3 = new BlackHole(game, 4150, 150, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole3);

		//add black hole 4
		this.blackHole4 = new BlackHole(game, 4000, 450, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole4);

		//add planet 10
		this.planet10 = new Planet(game, 4375, 375, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet10);

		//add black hole 5
		this.blackHole5 = new BlackHole(game, 4200, 625, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole5);

		//add planet 11
		this.planet11 = new Planet(game, 4800, 100, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet11);

		//add black hole 6
		this.blackHole6 = new BlackHole(game, 4800, 400, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole6);

		//add black hole 7
		this.blackHole7 = new BlackHole(game, 4900, 600, 'hole', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.blackHole7);

		//add planet 12
		this.planet12 = new Planet(game, 5200, 200, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet12);

		//add planet 13
		this.planet13 = new Planet(game, 5700, 400, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet13);

		//add planet 14
		this.planet14 = new Planet(game, 6200, 400, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet14);

		//add planet 15
		this.planet15 = new Planet(game, 6700, 400, 'planet', this.whale, this.VOID_ACCELERATION, this.MAX_VELOCITY);
		game.add.existing(this.planet15);

		//add camera with 200x200 deadzone
		//game.camera.follow(this.whale, Phaser.Camera.FOLLOW_TOPDOWN);

		this.cursors = game.input.keyboard.createCursorKeys();
		this.whale.body.onBeginContact.add(this.killWhale, this);
		this.whale.body.colliedeWorldBounds = false;
		this.rotateSpeed = .04;
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

		//out of bounds game over
		if(this.whale.position.y < -200 || this.whale.position.y > 1000)
		{
			killWhale();
		}


		//passing the finish line
		/*if(this.whale.position.x > 2200)
		{
			this.state.start('Victory');
		}*/
	},

	//removes whale from game
	killWhale: function(body, bodyB, shapeA, shapeB, equation) {
		// onBeginContact is sent 5 arguments automatically, in this order:
		// 1. the Phaser.Physics.P2.Body it is in contact with
		// 2. The P2.Body this body is in contact with
		// 3. the shape from this P2 body that caused the contact
		// 4. the shape from the contact P2 body
		// 5. the contact equation data array

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
				this.whale.kill();
				this.state.start('GameOver');
			}
			else if(body.sprite.key == 'wall')
			{
				//x
			}
		}
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
game.state.add('Cutscene', Cutscene);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.add('Victory', Victory);
game.state.start('MainMenu');