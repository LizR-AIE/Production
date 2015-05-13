var Entity = function()
{
	this.image = document.createElement("img");
	
	this.dimensions = new Vector2();
	this.position = new Vector2();
	this.velocity = new Vector2();
	this.rotation = 0;
}

Entity.prototype.load = function()
{
	
}

Entity.prototype.unload = function()
{
	
}

Entity.prototype.update = function(deltaTime)
{
	
}

Entity.prototype.draw = function()
{
	context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.dimensions.x/2, -this.dimensions.y/2);
	context.restore();
}