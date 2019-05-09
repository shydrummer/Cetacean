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

	if(distance <= 200)
	{
		if(!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{

			this.radius = Math.sqrt(((this.x - this.playerRef.x) * (this.x - this.playerRef.x)) + ((this.y - this.playerRef.y) * (this.y - this.playerRef.y)));

			Phaser.Point.rotate(this.playerRef, this.position.x, this.position.y, .025, false, this.radius);

		}

		angle = Phaser.Point.angle(this.playerRef.position, this.position);

		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			this.playerRef.body.velocity.x = Math.cos(angle) * 200;
			this.playerRef.body.velocity.y = Math.sin(angle) * 200;

			force =  (1000 - distance) / 200;
			
			this.playerRef.body.velocity.x -= Math.cos(angle) * force;
			this.playerRef.body.velocity.y-= Math.sin(angle) * force;
		}
		else
		{
			this.playerRef.body.acceleration = new Phaser.Point(0,0);
			//this.playerRef.body.velocity = new Phaser.Point(0,0);
		}
	}



	


}