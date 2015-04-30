var Bullet = function(x, y, moveRight)
{	
	this.sprite = new Sprite("bullet.png");
	this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
	this.sprite.setAnimationOffset(0, 0, 0);
	this.sprite.setLoop(0, false);
	
	this.position = new Vector2();
	this.position.set(x, y);
		
	this.velocity = new Vector2();
	
	this.offset = new Vector2();
	this.offset.set(0, 0);
	
	this.width = 32;
	this.height = 32;
		
	this.moveRight = moveRight;
	if(this.moveRight == true)
	{
		this.velocity.set(MAXDX * 2, 0);
	}
	else
	{
		this.velocity.set(-MAXDX * 2, 0);
	}
};

Bullet.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);	
	this.position.x = Math.floor(this.position.x  + (deltaTime * this.velocity.x));
};

Bullet.prototype.draw = function()
{
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
	
	if(!debug)
		return;
	
	context.beginPath();
	context.lineWidth="2";
	context.strokeStyle="red";
	context.rect(this.position.x + (this.offset.x * 0.65) - worldOffsetX, this.position.y + (this.offset.y * 0.75), this.width + (this.offset.x * 0.65), this.height + (this.offset.y * 0.65)); 
	context.stroke();
}











