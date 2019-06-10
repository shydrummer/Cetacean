function Asteroids(game, key, scrnwidth, scrnheight) {
	//add screen size as a property
	this.scrnwidth = scrnwidth;
	this.scrnheight = scrnheight;
	
	//generate random x and y
	var xPos = Math.random() * scrnwidth;
	var yPos = Math.random() * scrnheight;

	//make this object ingerit from sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'atlas', key);

	//change properties of sprite
	this.scale.setTo(.125,.125);
	this.anchor.set(.5);
	this.rotation = Math.random() * 8;
	this.alpha = 1;

	//add physics and start rotation/motion
	game.physics.p2.enable(this, false);
	this.body.angularVelocity = Math.random() * 400;
	this.body.velocity.x = Math.random() * 200;
	this.body.velocity.y = Math.random() * 200;

}

//create prototype/ constructor
Asteroids.prototype = Object.create(Phaser.Sprite.prototype);
Asteroids.prototype.constructor = Asteroids;

//overwrite update
Asteroids.prototype.update = function() {
	//check screen bounds
	if(this.x > this.scrnwidth + this.width)//right
	{
		this.x = 0 - this.width;
	}
	else if (this.y > this.scrnheight + this.height)//bottom
	{
		this.y = 0 - this.height;
	}
	else if(this.x < 0 - this.width)//left
	{
		this.x = this.scrnwidth;
	}
}
