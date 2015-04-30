var LEFT = 0;
var RIGHT = 1;
var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_SHOOT_LEFT = 3;
var ANIM_CLIMB = 4;
var ANIM_IDLE_RIGHT = 5;
var ANIM_JUMP_RIGHT = 6;
var ANIM_WALK_RIGHT = 7;
var ANIM_SHOOT_RIGHT = 8;
var ANIM_MAX = 9;

var Player = function()
{
	this.sprite = new Sprite("ChuckNorris.png");
	this.sprite.buildAnimation(12, 8, 165, 126, 0.5, [0, 1, 2, 3, 4, 5, 6, 7]);  									// IDLE_LEFT
	this.sprite.buildAnimation(12, 8, 165, 126, 0.5, [8, 9, 10, 11, 12]);  										// JUMP_LEFT
	this.sprite.buildAnimation(12, 8, 165, 126, 0.5, [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);  	// WALK_LEFT
	this.sprite.buildAnimation(12, 8, 165, 126, 0.5, [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]);  	// SHOOT_LEFT
	this.sprite.buildAnimation(12, 8, 165, 126, 0.5, [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);  				// CLIMB
	this.sprite.buildAnimation(12, 8, 165, 126, 0.5, [52, 53, 54, 55, 56, 57, 58, 59]);  							// IDLE_RIGHT
	this.sprite.buildAnimation(12, 8, 165, 126, 0.5, [60, 61, 62, 63, 64]);  										// JUMP_RIGHT
	this.sprite.buildAnimation(12, 8, 165, 126, 0.5, [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]);  	// WALK_RIGHT
	this.sprite.buildAnimation(12, 8, 165, 126, 0.5, [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92]);  	// SHOOT_RIGHT
	
	this.offset = new Vector2();
	this.offset.set(-55, -87);
	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, this.offset.x, this.offset.y);
	}

	this.position = new Vector2();
	this.position.set( 9*TILE, 5*TILE );
	
	this.width = 159;
	this.height = 163;
		
	this.velocity = new Vector2();
	
	this.falling = true;
	this.jumping = false;
	this.climbing = false;
	
	this.direction = LEFT;	
	
	this.shooting = false;
	this.cooldownTimer = 0;
	this.isDead = false;
};

Player.prototype.update = function(deltaTime)
{
	if(this.isDead == true)
		return;
		
	var left = false;
	var right = false;
	var jump = false;
	
	var climbingUp = false;
	var climbingDown = false;
	
	if(this.climbing)
	{	
		if(keyboard.isKeyDown(keyboard.KEY_UP) == true) 
		{
			climbingUp = true;
			this.sprite.update(deltaTime);
		}
		if(keyboard.isKeyDown(keyboard.KEY_DOWN) == true) 
		{
			climbingDown = true;
			this.sprite.update(deltaTime);
		}
	}
	else
	{
		this.sprite.update(deltaTime);
		
		if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) 
		{
			left = true;
			this.direction = LEFT;
			if(	this.sprite.currentAnimation != ANIM_WALK_LEFT && !this.jumping && this.cooldownTimer <= 0)
			{
				this.sprite.setAnimation(ANIM_WALK_LEFT);
			}
			else if(this.jumping && this.cooldownTimer <= 0)
			{
				this.sprite.setAnimation(ANIM_JUMP_LEFT);
			}
		}
		else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) 
		{
			right = true;
			this.direction = RIGHT;
			if(	this.sprite.currentAnimation != ANIM_WALK_RIGHT && !this.jumping && this.cooldownTimer <= 0)
			{
				this.sprite.setAnimation(ANIM_WALK_RIGHT);
			}
			else if(this.jumping && this.cooldownTimer <= 0)
			{
				this.sprite.setAnimation(ANIM_JUMP_RIGHT);
			}
		}
		else 
		{
			if(this.jumping == false && this.falling == false)
			{
				if(this.direction == LEFT)
				{
					if(this.sprite.currentAnimation != ANIM_IDLE_LEFT && this.cooldownTimer <= 0)
						this.sprite.setAnimation(ANIM_IDLE_LEFT);
				}
				else
				{
					if(this.sprite.currentAnimation != ANIM_IDLE_RIGHT && this.cooldownTimer <= 0)
						this.sprite.setAnimation(ANIM_IDLE_RIGHT);
				}
			}
		} 
	
		if(keyboard.isKeyDown(keyboard.KEY_UP) == true) 
		{
			jump = true;
		}
		
		if(this.cooldownTimer > 0)
		{
			this.cooldownTimer -= deltaTime;
		}
		
		if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true && this.cooldownTimer <= 0)
		{
			if(!mute)
				sfxFire.play();
			this.cooldownTimer = 0.3;
						
			var b = new Bullet(this.position.x, this.position.y, this.direction);
			bullets.push(b);
			if(this.direction == RIGHT)
				this.sprite.setAnimation(ANIM_SHOOT_RIGHT);
			else
				this.sprite.setAnimation(ANIM_SHOOT_LEFT);
		}
	}
	
	var wasleft = this.velocity.x < 0;
	var wasright = this.velocity.x > 0;
	var wasup = this.velocity.y < 0;
	var wasdown = this.velocity.y > 0;
	
	var falling = this.falling;
	
	var ddx = 0; // acceleration
	var ddy = GRAVITY;
	
	if(this.climbing)
	{
		ddy = 0;
		if (climbingUp)
		{
			ddy -= ACCEL;
		}
		else if (wasup)
		{
			this.velocity.y = 0; 
			ddx = 0; 
		}
	
		if (climbingDown)
		{
			ddy += ACCEL;
		}
		else if (wasdown) 
		{
			this.velocity.y = 0; 
			ddx = 0;
		}
	}
	else
	{
		if (left)
			ddx -= ACCEL; // player wants to go left
		else if (wasleft)
			ddx += FRICTION; // player was going left, but not any more
		if (right)
			ddx += ACCEL; // player wants to go right
		else if (wasright)
			ddx -= FRICTION; // player was going right, but not any more
	}
	
	if(!this.climbing)
	{
		if (jump && !this.jumping && !falling)
		{
			// apply an instantaneous (large) vertical impulse
			ddy = ddy - JUMP;
			this.jumping = true;
			if(this.direction == LEFT)
				this.sprite.setAnimation(ANIM_JUMP_LEFT)
			else
				this.sprite.setAnimation(ANIM_JUMP_RIGHT)
		}
	}
	
	// calculate the new position and velocity:
	this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);
	
	if ((wasleft && (this.velocity.x > 0)) ||
			(wasright && (this.velocity.x < 0)))
	{
		// clamp at zero to prevent friction from making us jiggle side to side
		this.velocity.x = 0;
	}
	
	// collision detection
	// Our collision detection logic is greatly simplified by the fact that the
	// player is a rectangle and is exactly the same size as a single tile.
	// So we know that the player can only ever occupy 1, 2 or 4 cells.
	// This means we can short-circuit and avoid building a general purpose
	// collision detection
	// engine by simply looking at the 1 to 4 cells that the player occupies:
	var tx = pixelToTile(this.position.x);
	var ty = pixelToTile(this.position.y);
	var nx = (this.position.x)%TILE; // true if player overlaps right
	var ny = (this.position.y)%TILE; // true if player overlaps below
	
	var layer = LAYER_PLATFORMS;
	
	if(this.climbing)
	{
		layer = LAYER_LADDERS;
	}
	
	var cell 		= cellAtTileCoord(layer, tx, 		ty);
	var cellright 	= cellAtTileCoord(layer, tx + 1, 	ty);
	var celldown 	= cellAtTileCoord(layer, tx, 		ty + 1);
	var celldiag 	= cellAtTileCoord(layer, tx + 1, 	ty + 1);
		
	if(!this.climbing)
	{
		// If the player has vertical velocity, then check to see if they have hit a platform
		// below or above, in which case, stop their vertical velocity, and clamp their
		// y position:
		if (this.velocity.y > 0) 
		{
			if ((celldown && !cell) || (celldiag && !cellright && nx)) 
			{
				// clamp the y position to avoid falling into platform below
				this.position.y = tileToPixel(ty);
				this.velocity.y = 0; // stop downward velocity
				this.falling = false; // no longer falling
				this.jumping = false; // (or jumping)
				ny = 0; // no longer overlaps the cells below
			}
		}
		else if (this.velocity.y < 0) 
		{
			if ((cell && !celldown) || (cellright && !celldiag && nx)) 
			{
				// clamp the y position to avoid jumping into platform above
				this.position.y = tileToPixel(ty + 1);
				this.velocity.y = 0; // stop upward velocity
				// player is no longer really in that cell, we clamped them to the cell below
				cell = celldown;
				cellright = celldiag; // (ditto)
				ny = 0; // player no longer overlaps the cells below
			}
		}
		if (this.velocity.x > 0) 
		{
			if ((cellright && !cell) || (celldiag && !celldown && ny)) 
			{
				// clamp the x position to avoid moving into the platform we just hit
				this.position.x = tileToPixel(tx);
				this.velocity.x = 0; // stop horizontal velocity
			}
		}
		else if (this.velocity.x < 0) 
		{
			if ((cell && !cellright) || (celldown && !celldiag && ny)) 
			{
				// clamp the x position to avoid moving into the platform we just hit
				this.position.x = tileToPixel(tx + 1);
				this.velocity.x = 0; // stop horizontal velocity
			}
		}
		
		this.falling = !(celldown || (nx && celldiag));
		
		if((right == false && left == false && this.falling == false)  || 
			this.falling == true && keyboard.isKeyDown(keyboard.KEY_UP))
		{
			var ladderCell = cellAtTileCoord(LAYER_LADDERS, tx, ty);
			var ladderCellright = cellAtTileCoord(LAYER_LADDERS, tx + 1, ty);	
			var ladderCelldown = cellAtTileCoord(LAYER_LADDERS, tx, ty + 1);
			var ladderCelldiag = cellAtTileCoord(LAYER_LADDERS, tx + 1, ty + 1);
			
			if(ladderCell || (ladderCellright && nx))
			{
				if(keyboard.isKeyDown(keyboard.KEY_UP) == true)
				{
					this.climbing = true;
					this.sprite.setAnimation(ANIM_CLIMB);
					this.velocity.x = 0;
				}
			}			
			else if(ladderCelldown || (ladderCelldiag && nx))
			{
				if(keyboard.isKeyDown(keyboard.KEY_DOWN) == true)
				{
					this.climbing = true;
					this.sprite.setAnimation(ANIM_CLIMB);
					this.velocity.x = 0;
				}
			}
		}
	}
	else
	{
		if (this.velocity.y > 0 || wasdown) 		// moving down
		{
			if ((!celldown && cell) || (!celldiag && cellright && nx)) 
			{
				this.position.y = tileToPixel(ty);      // clamp the y position to avoid falling into platform below
				this.velocity.y = 0;            // stop downward velocity						
				this.climbing = false;
			}
		}
		else if (this.velocity.y < 0 || wasup) 	// moving up
		{
			if ((!cell && !celldown) && ((!cellright && !celldiag && nx) || !nx))
			{
				this.position.y = tileToPixel(ty + 1);  // clamp the y position to avoid jumping into platform above
				this.velocity.y = 0;            // stop upward velocity				
				this.climbing = false;
			}		
		}
	}
	
	if(cellAtTileCoord(LAYER_OBJECT_TRIGGERS, tx, ty) == true || this.position.y > SCREEN_HEIGHT)
	{
		//console.log(tx);
		console.log(ty);
		this.isDead = true;
	}
};

Player.prototype.draw = function()
{
	if(this.isDead == true)
		return;
	
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
	
	if(!debug)
		return;
	
	context.beginPath();
	context.lineWidth="2";
	context.strokeStyle="red";
	context.rect(this.position.x + (this.offset.x * 0.65) - worldOffsetX, this.position.y + (this.offset.y * 0.75), this.width + (this.offset.x * 0.65), this.height + (this.offset.y * 0.65)); 
	context.stroke();
}











