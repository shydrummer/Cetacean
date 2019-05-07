//obstacles that kill the player
function Planet(game, xPos, yPos, key, player, acceleration, maxVel) {
	Phaser.Sprite.call(this, game, xPos, yPos, key);

	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.immovable = true;

	this.anchor.set(.5, .5);
	this.scale.setTo(.1);

	//reference to the player object
	this.playerRef = player;

	//"constants"
	this.MAX_VELOCITY = maxVel;
	this.ACCELERATION = acceleration;

}

Planet.prototype = Object.create(Phaser.Sprite.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.update = function() {
	distance = Phaser.Math.distance(this.playerRef.position.x, this.playerRef.position.y, this.position.x, this.position.y);

	if(distance <= 300 && distance >200)
	{
		//game.physics.arcade.accelerateToObject(this.playerRef, this, this.ACCELERATION, this.MAX_VELOCITY/5, this.MAX_VELOCITY/5);
		if(this.playerRef.position.x <= this.position.x)
		{
			this.playerRef.position.x += 2;
		}
		else
		{
			this.playerRef.position.x -=2;
		}

		if(this.playerRef.position.y <= this.position.y)
		{
			this.playerRef.position.y += 2;
		}
		else
		{
			this.playerRef.position.y -=2;
		}
	}
	if(distance <= 200)
	{

		//this.playerRef.pivot.x = this.position.x;
		//this.playerRef.pivot.y = this.position.y;

		//console.log('x: ' + this.playerRef.pivot.x);
		//console.log('y: ' + this.playerRef.pivot.y);

		//this.playerRef.rotation +=.025;
		Phaser.Point.rotate(this.playerRef, this.position.x, this.position.y, .025, false, 150);
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACE))
		{
			//accelerate out of orbit
		}
	}
	else 
	{
		//this.playerRef.body.acceleration = 0;
	}

}