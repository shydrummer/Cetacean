//obstacles that kill the player
function Planet(game, xPos, yPos, key, player, acceleration, maxVel) {
	//extend sprite object
	Phaser.Sprite.call(this, game, xPos, yPos, key);

	//has physics can't move
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.immovable = true;

	//set anchor and scale
	this.anchor.set(.5, .5);
	this.scale.setTo(.45);

	//reference to the player object
	this.playerRef = player;

	//"constants"
	this.MAX_VELOCITY = maxVel;
	this.ACCELERATION = acceleration;

	//player is not yet orbiting
	this.orbiting = false;
}

Planet.prototype = Object.create(Phaser.Sprite.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.update = function() {

	this.launch = game.add.audio('launch');
	this.launch.volume = 0.3;
	//check distance between player and planet
	distance = Phaser.Math.distance(this.playerRef.position.x, this.playerRef.position.y, this.position.x, this.position.y);

	//turn off acceleration if caught in orbit
	if(this.orbiting == false && distance <= 200)
	{
		this.playerRef.body.velocity = new Phaser.Point(0,0);
		this.playerRef.body.acceleration = new Phaser.Point(0,0);
		console.log("set to 0");
	}

	//in orbit
	if(distance <= 200)
	{
		this.orbiting = true;
		//continue orbiting
		if(!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{

			this.radius = Math.sqrt(((this.x - this.playerRef.x) * (this.x - this.playerRef.x)) + ((this.y - this.playerRef.y) * (this.y - this.playerRef.y)));

			Phaser.Point.rotate(this.playerRef, this.position.x, this.position.y, .025, false, this.radius);


		}

		//calculate takeoff angle
		angle = Phaser.Point.angle(this.playerRef.position, this.position);

		//launch
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{

			this.launch.play('', 0, 1, false);	

			this.playerRef.body.velocity.x = Math.cos(angle) * 200;
			this.playerRef.body.velocity.y = Math.sin(angle) * 200;

			force =  (1000 - distance) / 200;
			
			this.playerRef.body.velocity.x -= Math.cos(angle) * force;
			this.playerRef.body.velocity.y-= Math.sin(angle) * force;
			console.log("here");
		}
		else
		{
			//stop
			this.playerRef.body.acceleration = new Phaser.Point(0,0);
		}
	}

	//out of orbit
	if(distance > 220){
		this.orbiting = false;
	}

}