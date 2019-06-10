function Planet(game, xPos, yPos, key, player, acceleration, maxVel) {
	//extend sprite object
	Phaser.Sprite.call(this, game, xPos, yPos, 'atlas', key);

	//has physics can't move
	game.physics.p2.enable(this, false);
	this.body.setCircle(50);
	this.body.static = true;

	//set anchor and scale
	this.anchor.set(.5, .5);
	if(key == 'littleplanetVariation1' || key == 'littleplanetVariation4')
	{
		this.scale.setTo(.25);
	}
	else
	{
		this.scale.setTo(.125);
	}

	this.launch = game.add.audio('launch');
	this.launch.volume = 0.5;
	
	this.orb = game.add.audio('orbit');
	this.orb.volume = 0.5;

	//reference to the player object
	this.playerRef = player;

	//"constants"
	this.MAX_VELOCITY = maxVel;
	this.ACCELERATION = acceleration;

	//player is not yet orbiting
	this.orbiting = false;
	this.constraint = null;
}

Planet.prototype = Object.create(Phaser.Sprite.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.update = function() {
	//check distance between player and planet
	distance = Phaser.Math.distance(this.playerRef.x, this.playerRef.y, this.position.x, this.position.y);

	if(this.orbiting)
	{
		game.camera.follow(this, Phaser.Camera.FOLLOW_LOCKON, .05, .05);
	}
	else
	{
		//game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN, .25, .25);
	}

	//in orbit
	if(distance <= 150 && !this.orbiting)
	{
		this.orbiting = true;
		this.orb.play('', 0, 0.3, false);	
		this.orb.fadeOut(900);

		//continue orbiting
		if(!game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			this.constraint = game.physics.p2.createRevoluteConstraint(this, [ this.playerRef.world.x-this.world.x, this.playerRef.world.y-this.world.y], this.playerRef, [0,0]);
		}
	}
	else if(distance<=150 && this.orbiting)
	{
		//launch
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			game.physics.p2.removeConstraint(this.constraint);
			this.constraint = null;

			//LAUNCH SOUND HERE
			this.launch.play('', 0, 0.3, false);
			this.launch.fadeOut(700);		// fade music
		}
	}

	//out of orbit
	if(distance > 175){
		this.orbiting = false;
		game.physics.p2.removeConstraint(this.constraint);
		this.constraint = null;
		game.camera.follow(this.playerRef, Phaser.Camera.FOLLOW_TOPDOWN, .05, .05);
	}

}