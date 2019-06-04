function Planet(game, xPos, yPos, key, player, acceleration, maxVel) {
	//extend sprite object
	Phaser.Sprite.call(this, game, xPos, yPos, key);

	//has physics can't move
	game.physics.p2.enable(this, false);
	this.body.setCircle(50);
	this.body.static = true;

	//set anchor and scale
	this.anchor.set(.5, .5);
	if(key == 'planet1')
	{
		this.scale.setTo(.25);
	}
	else
	{
		this.scale.setTo(.125);
	}
	

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
		//continue orbiting
		if(!game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{

			/*this.radius = Math.sqrt(((this.x - this.playerRef.x) * (this.x - this.playerRef.x)) + ((this.y - this.playerRef.y) * (this.y - this.playerRef.y)));

			Phaser.Point.rotate(this.playerRef, this.position.x, this.position.y, .025, false, this.radius);*/
			console.log("x" + (this.playerRef.position.x-this.position.x));
			console.log("y" + (this.playerRef.position.y-this.position.y));


			this.constraint = game.physics.p2.createRevoluteConstraint(this, [ this.playerRef.world.x-this.world.x, this.playerRef.world.y-this.world.y], this.playerRef, [0,0]);
			console.log("running");

		}

		//calculate takeoff angle
		/*angle = Phaser.Point.angle(this.playerRef.position, this.position);
		this.playerRef.body.rotation -= angle;*/
		//this.playerRef.body.rotateLeft(50);
	}
	else if(distance<=150 && this.orbiting)
	{
		//launch
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			game.physics.p2.removeConstraint(this.constraint);
			this.constraint = null;

			console.log("here");
		}
	}

	//out of orbit
	if(distance > 175){
		this.orbiting = false;
		game.physics.p2.removeConstraint(this.constraint);
			this.constraint = null;
	}

}