var SpriteOnSheet = function()
{
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.name = "";
}

var SpriteSheet = function(spriteSheetName)
{
	this.URL = "./SpriteSheets/" + spriteSheetName + ".png";
	this.jsonURL = "./SpriteSheets/" + spriteSheetName + ".json"
	this.list = []
	
	
}