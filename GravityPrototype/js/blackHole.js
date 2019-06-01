//obstacles that kill the player
function BlackHole(game, xPos, yPos, key, player, acceleration, maxVel) {
	Phaser.Sprite.call(this, game, xPos, yPos, key);

	game.physics.p2.enable(this, true);
	this.body.setCircle(50);
	this.body.static = true;

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
		accelerateToObject(this.playerRef, this, 20)
	}

	

}

function accelerateToObject(obj1, obj2, speed) {
    if (typeof speed === 'undefined') { speed = 60; }
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry bullets (depends on the sprite used)
    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject 
    obj1.body.force.y = Math.sin(angle) * speed;
}
