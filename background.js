var BACKGROUNDCOLOR_BLACK = 0;
var BACKGROUNDCOLOR_BLUE = 1;
var BACKGROUNDCOLOR_DARKPURPLE = 2;
var BACKGROUNDCOLOR_PURPLE = 3;

var Background = function(backgroundColor)
{
	this.speed = 50;
	
	this.width = 256;
	this.height = 256;
	
	this.image = document.createElement("img");
	switch(backgroundColor)
	{
		case(BACKGROUNDCOLOR_BLACK):
			this.image.src = "./Downloads/spaceshooter/Backgrounds/black.png";
			break;
		case(BACKGROUNDCOLOR_BLUE):
			this.image.src = "./Downloads/spaceshooter/Backgrounds/blue.png";
			break;
		case(BACKGROUNDCOLOR_DARKPURPLE):
			this.image.src = "./Downloads/spaceshooter/Backgrounds/darkPurple.png";
			break;
		case(BACKGROUNDCOLOR_PURPLE):
			this.image.src = "./Downloads/spaceshooter/Backgrounds/purple.png";
			break;
	}
	
	this.backgroundPositions = [];
	for(var y = 0; y < (SCREEN_HEIGHT / this.height) + 1; y++)
	{
		this.backgroundPositions[y] = [];
		for(var x = 0; x < (SCREEN_WIDTH / this.width) + 1; x++)
		{
			this.backgroundPositions[y][x] = new Vector2();
			this.backgroundPositions[y][x].x = x * this.width;
			this.backgroundPositions[y][x].y = (y-1) * this.height;
		}
	}
}

Background.prototype.update = function(deltaTime)
{
	for(var y = 0; y < this.backgroundPositions.length; y++)
	{
		for(var x = 0; x < this.backgroundPositions[y].length; x++)
		{
			this.backgroundPositions[y][x].y += this.speed * deltaTime;
			if(this.backgroundPositions[y][x].y > SCREEN_HEIGHT)
			{
				this.backgroundPositions[y][x].y -= this.height * 5;
			}
		}
	}
}

Background.prototype.draw = function()
{
	for(var y = 0; y < (SCREEN_HEIGHT / this.height) + 1; y++)
	{
		for(var x = 0; x < (SCREEN_WIDTH / this.width) + 1; x++)
		{
			context.drawImage(this.image, this.backgroundPositions[y][x].x, this.backgroundPositions[y][x].y);
		}
	}
}