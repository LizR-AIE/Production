var Player = function()
{
	// Sprite
	this.image = document.createElement("img");
	this.image.src = "./Downloads/spaceshooter/playerShip1_red.png";
		
	// Width and Height
	this.dimension = new Vector2();
	this.dimension.set(99/2, 75/2);
	
	// Position
	this.position = new Vector2();
	this.position.set(SCREEN_WIDTH/2 - this.dimension.x/2, (SCREEN_HEIGHT * 7/8) - this.dimension.y/2);
	
	// Rotation
	this.rotation = 0;
		
	// Velocity
	this.velocity = new Vector2();
	
	// Speeds
	this.strafeSpeed = 400;
	this.forwardSpeed = 500;
	this.backwardSpeed = 250;
	this.rotationSpeed = 50; 
	
	// Lasers
	this.lasers = [];
	
	// Shoot timer
	this.shootTimer = 0;
	this.shootTime = 0.15;
}

Player.prototype.checkInput = function(dt)
{
	// Move Left
	if(keyboard.isKeyDown(keyboard.KEY_A))
	{
		this.velocity.x -= this.strafeSpeed;
	}
	// Move right
	if(keyboard.isKeyDown(keyboard.KEY_D))
	{
		this.velocity.x += this.strafeSpeed;
	}
	// Move Up / Down
	if(keyboard.isKeyDown(keyboard.KEY_W) || keyboard.isKeyDown(keyboard.KEY_S))
	{
		if(keyboard.isKeyDown(keyboard.KEY_W) && keyboard.isKeyDown(keyboard.KEY_S))
		{
			this.velocity.y = 0;
		}
		else
		{
			if(keyboard.isKeyDown(keyboard.KEY_W))
				this.velocity.y -= this.forwardSpeed;
			if(keyboard.isKeyDown(keyboard.KEY_S))
				this.velocity.y += this.backwardSpeed;
		}
	}
		
	// Shoot
	this.shootTimer -= dt;
	
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) && this.shootTimer <= 0) 
	{
		this.shootTimer = this.shootTime;
		this.lasers.push(new Laser(this.position.x, this.position.y, this.rotation));
	}
}

Player.prototype.updatePositionAndRotation = function(dt)
{
	var mouseX = mouse.getMouseX();
	var mouseY = mouse.getMouseY();
	
	var direction = new Vector2();
	direction.set(this.position.x - mouseX, this.position.y - mouseY);
	
	var distance = direction.magnitude();
	
	this.position.set(mouse.getMouseX(), mouse.getMouseY());
	
	
	//var mouseX = mouse.getMouseX();
	//var mouseY = mouse.getMouseY();
	//
	//var precision = 7;
	//if(Math.abs(this.position.x - mouseX) < precision && Math.abs(this.position.y - mouseY) < precision)
	//{
	//	this.velocity.set(0,0);
	//	return;
	//}
	//
	//// Update position based on velocity	
	//var s = Math.sin(this.rotation);
	//var c = Math.cos(this.rotation);
	//
	//var xVel = (this.velocity.x * c) - (this.velocity.y * s);
	//var yVel = (this.velocity.x * s) + (this.velocity.y * c);
	//
	//this.position.x += xVel * dt;
	//this.position.y += yVel * dt;
	//
	//// Rotate
	//var mouseX = mouse.getMouseX();
	//var mouseY = mouse.getMouseY();
	//
	//this.rotation = Math.atan2(this.position.y - mouseY, this.position.x - mouseX) - 1.57079632679;
	//
	this.velocity.set(0,0);
}

Player.prototype.clampToScreen = function()
{
	// Clamp Left
	if(this.position.x - (this.dimension.x/2)< 0)
		this.position.x = (this.dimension.x/2);
	
	// Clamp Right
	if(this.position.x + (this.dimension.x/2) > SCREEN_WIDTH)
		this.position.x = SCREEN_WIDTH - (this.dimension.x/2);
	
	// Clamp Top
	if(this.position.y - (this.dimension.x/2) < 0)
		this.position.y = (this.dimension.x/2);
	
	// Clamp Bottom
	if(this.position.y + (this.dimension.x/2) > SCREEN_HEIGHT)
		this.position.y = SCREEN_HEIGHT - (this.dimension.x/2);
}

Player.prototype.update = function(dt)
{
	this.checkInput(dt);
	
	this.updatePositionAndRotation(dt);
	
	this.clampToScreen();
	
	this.lasers.update();
	this.lasers.checkLasers();
}

Player.prototype.draw = function()
{
	this.lasers.draw();
	
	context.save();			
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.dimension.x/2, -this.dimension.y/2, this.dimension.x/1, this.dimension.y/1); 	
	context.restore();
}

Player.prototype.reset = function()
{
	this.position.set(SCREEN_WIDTH/2 - this.dimension.x/2, SCREEN_HEIGHT/2 - this.dimension.y/2);
	this.velocity.set(0, 0);
}