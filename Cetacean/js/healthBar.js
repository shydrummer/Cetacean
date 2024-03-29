function HealthBar(game, xPos, yPos, key) {

	Phaser.Sprite.call(this, game, xPos, yPos, 'atlas', key);
	this.health1 = game.add.sprite(xPos, yPos, 'atlas', key);
	this.health1.fixedToCamera = true;

	this.health2 = game.add.sprite(xPos + this.health1.width + 20, yPos, 'atlas', key);
	this.health2.fixedToCamera = true;

	this.health3 = game.add.sprite(xPos + (this.health1.width*2) + 40, yPos, 'atlas', key);
	this.health3.fixedToCamera = true;
}

HealthBar.prototype = Object.create(Phaser.Sprite.prototype);
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.decreaseHealth = function() {

		if(this.health2.alive == false)
		{
			this.health1.kill();
			return -1;
		}
		else if (this.health3.alive == false)
		{
			this.health2.kill();
		}
		else
		{
			this.health3.kill();
			this.health3.alive = false;
		}
		console.log("ouch");
}