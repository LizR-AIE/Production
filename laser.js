var Laser = function(playerX, playerY, rotation)
{
	// Sprite
	this.image = document.createElement("img");
	this.image.src = "./Downloads/spaceshooter/Lasers/laserRed07.png";
	
	// Position
	this.position = new Vector2();
	this.position.set(playerX, playerY);
	
	// Rotation
	this.rotation = rotation;
	
	// Speed
	this.speed = 50;
	
	// Velocity
	this.velocity = new Vector2();	
	this.velocity.set(Math.cos(this.rotation - (3.142/2)), Math.sin(this.rotation) - (3.142/2));
	//this.velocity.x *= this.speed;
	//this.velocity.x *= this.speed;
	
	// Dimensions
	this.dimension = new Vector2();
	this.dimension.set(9, 37);
}

Laser.prototype.update = function(dt)
{
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;
}

Laser.prototype.draw = function()
{
	context.save();			
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.dimension.x/2, -this.dimension.y/2); 	
	context.restore();
}