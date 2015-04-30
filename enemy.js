var Enemy = function(x, y)
{
	this.offset = new Vector2();
	this.offset.set(-35, -40);
	
	this.sprite = new Sprite("bat.png");
	this.sprite.buildAnimation(2, 1, 88, 94, 0.3, [0, 1]);
	this.sprite.setAnimationOffset(0, this.offset.x, this.offset.y);
	
	this.position = new Vector2();
	this.position.set(x, y);
	
	this.width = 88;
	this.height = 94;
	
	this.velocity = new Vector2();
	
	this.moveRight = true;
	this.pause = 0;
};

Enemy.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	
	if(this.pause > 0)
	{
		this.pause -= deltaTime;
	}
	else
	{
		var ddx = 0;
				
		var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		var nx = (this.position.x)%TILE; // true if player overlaps right
		var ny = (this.position.y)%TILE; // true if player overlaps below
		var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
		var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
		
		if(this.moveRight)
		{
			if(celldiag && !cellright)
			{
				ddx += ENEMY_ACCEL;
			}
			else
			{
				this.velocity.x = 0;
				this.moveRight = false;
				this.pause = 0.5;
			}
		}
		if(!this.moveRight)
		{
			if(celldown && !cell)
			{
				ddx -= ENEMY_ACCEL;
			}
			else
			{
				this.velocity.x = 0;
				this.moveRight = true;
				this.pause = 0.5;
			}
		}
		this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
		this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -ENEMY_ACCEL, ENEMY_ACCEL);
	}
};

Enemy.prototype.draw = function()
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











