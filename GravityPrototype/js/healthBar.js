function HealthBar(game, xPos, yPos, key) {
	Phaser.Sprite.call(this, game, xPos, yPos, key);
	this.fixedToCamera = true;

	this.health1 = game.add.sprite(xPos, yPos, key);
	this.health1.fixedToCamera = true;

	this.health2 = game.add.sprite(xPos + this.health1.width + 20, yPos, key);
	this.health2.fixedToCamera = true;

	this.health3 = game.add.sprite(xPos + (this.health1.width*2) + 40, yPos, key);
	this.health3.fixedToCamera = true;
}

HealthBar.prototype = Object.create(Phaser.Sprite.prototype);
HealthBar.prototype.constructor = HealthBar;

decreaseHealth = function ()
{
	if(this.health2 == null)
	{
		this.health1.destroy();
		return -1;
	}
	else if (this.health3 == null)
	{
		this.health2.destroy();
	}
	else
	{
		this.health3.destroy();
	}
}