var BACKGROUNDCOLOR_BLACK = 0;
var BACKGROUNDCOLOR_BLUE = 1;
var BACKGROUNDCOLOR_DARKPURPLE = 2;
var BACKGROUNDCOLOR_PURPLE = 3;

var Background = function(backgroundColor)
{
	this.speed = 100;
	
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
	
	this.backgrounds = [];
	for(var y = 0; y < SCREEN_HEIGHT / this.height; y++)
	{
		this.backgrounds[y] = [];
		for(var x = 0; x < SCREEN_WIDTH / this.width; x++)
		{
			this.backgrounds[y][x] = this.image;
			this.backgrounds[y][x].x = x * this.width;
			this.backgrounds[y][x].y = y * this.height;
		}
	}
}

Background.prototype.update = function(deltaTime)
{
	for(var y = 0; y < this.backgrounds.length; y++)
	{
		for(var x = 0; x < this.backgrounds[y].length; x++)
		{
			this.backgrounds[y][x].y -= this.speed * deltaTime;
		}
	}
}

Background.prototype.draw = function()
{
	for(var y = 0; y < this.backgrounds.length; y++)
	{
		for(var x = 0; x < this.backgrounds[y].length; x++)
		{
			context.drawImage(this.image, this.backgrounds[y][x].x, this.backgrounds[y][x].y);
		}
	}
}