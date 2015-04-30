var NinePatch = function(filename, cSizeX, cSizeY, width, height)
{
	this.image = document.createElement("img");
	this.image.src = filename;
	this.width = width;
	this.height = height;
	this.cornerSize = new Vector2();
	this.middleSize = new Vector2();
	this.cornerSize.set(cSizeX, cSizeY);
	this.middleSize.set(this.image.width - (this.cornerSize.x * 2), this.image.height - (this.cornerSize.y * 2));
	
	this.sourcePositions  		= [];
	this.sourceDimensions 		= [];
	this.destinationPositions 	= [];
	this.destinationDimensions 	= [];
	
	for(var i = 0; i < 9; i++)
	{
		this.sourcePositions[i] 		= new Vector2();
		this.sourceDimensions[i] 		= new Vector2();
		this.destinationPositions[i] 	= new Vector2();
		this.destinationDimensions[i]	= new Vector2();
	}
	
	this.calculate = function()
	{
		this.middleSize.set(this.image.width - (this.cornerSize.x * 2), this.image.height - (this.cornerSize.y * 2));
		
		// Top Left
		this.sourcePositions		[0].set(0, 0);
		this.sourceDimensions		[0].set(this.cornerSize.x, this.cornerSize.y);
		this.destinationPositions	[0].set(0, 0);
		this.destinationDimensions	[0].set(this.sourceDimensions[0].x, this.sourceDimensions[0].y);
		
		// Top Middle
		this.sourcePositions		[1].set(this.sourceDimensions[0].x, 0);
		this.sourceDimensions		[1].set(this.middleSize.x, this.cornerSize.y);
		this.destinationPositions	[1].set(this.destinationPositions[0].x + this.destinationDimensions[0].x, 0);
		this.destinationDimensions	[1].set(this.width - (this.cornerSize.x*2), this.sourceDimensions[1].y);
		
		// Top Right
		this.sourcePositions		[2].set(this.sourcePositions[1].x + this.sourceDimensions[1].x, 0);
		this.sourceDimensions		[2].set(this.cornerSize.x, this.cornerSize.y);
		this.destinationPositions	[2].set(this.destinationPositions[1].x + this.destinationDimensions[1].x, 0);
		this.destinationDimensions	[2].set(this.cornerSize.x, this.cornerSize.y);
		
		// Middle Left
		
		// Middle Middle
		
		// Middle Right
		
		// Bottom Left
		
		// Bottom Middle
		
		// Bottom Right
		
	}
	
	this.onLoaded = function()
	{
		this.calculate();
	}
}

NinePatch.prototype.draw = function(x, y)
{
	// Specifies the image, canvas, or video element to use	 
	// Optional. The x coordinate where to start clipping	
	// Optional. The y coordinate where to start clipping	
	// Optional. The width of the clipped image	
	// Optional. The height of the clipped image	
	// The x coordinate where to place the image on the canvas	
	// The y coordinate where to place the image on the canvas	
	// Optional. The width of the image to use (stretch or reduce the image)	
	// Optional. The height of the image to use (stretch or reduce the image)
		
	for(var i = 0; i < 3; i++)
	{
		context.drawImage(this.image, 
			this.sourcePositions[i].x,  	 	this.sourcePositions[i].y, 
			this.sourceDimensions[i].x, 	 	this.sourceDimensions[i].y,
			this.destinationPositions[i].x + x, this.destinationPositions[i].y + y, 
			this.destinationDimensions[i].x, 	this.destinationDimensions[i].y);
	}			
}