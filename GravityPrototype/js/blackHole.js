//obstacles that kill the player
function BlackHole(game, xPos, yPos, key, player, acceleration, maxVel) {
	Phaser.Sprite.call(this, game, xPos, yPos, key);

	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.immovable = true;

	this.anchor.set(.5, .5);

	this.scale.setTo(.25);

	//reference to the player object
	this.playerRef = player;

	//"constants"
	this.MAX_VELOCITY = maxVel;
	this.ACCELERATION = acceleration;
}

BlackHole.prototype = Object.create(Phaser.Sprite.prototype);
BlackHole.prototype.constructor = BlackHole;

BlackHole.prototype.update = function() {
	//check distance
	distance = Phaser.Math.distance(this.playerRef.position.x, this.playerRef.position.y, this.position.x, this.position.y);

	//in gravitational pull
	if(distance < 200)
	{
		//gravity fwooooooosh
		game.physics.arcade.accelerateToObject(this.playerRef, this, this.ACCELERATION, this.MAX_VELOCITY/5, this.MAX_VELOCITY/5);
	}

	

}
