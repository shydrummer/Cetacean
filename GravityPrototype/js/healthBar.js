function HealthBar(game, xPos, yPos, key) {
	this.heath1 = game.add.sprite(xPos, yPos, key);
	this.health2 = game.add.sprite(xPos + this.health1.width + 20, yPos, key);

	this.anchor.set(.5, .5);
}

HealthBar.prototype = Object.create(Phaser.Sprite.prototype);
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.update = function() {
	
}

function decreaseHealth()
{

}