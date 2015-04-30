var UI_BLUE = 0;
var UI_GREEN = 1;
var UI_GREY = 2;
var UI_RED = 3;
var UI_YELLOW = 4;

var STATE_NORMAL = 0;
var STATE_HOVER = 1;
var STATE_CLICKED = 2;

var Button = function(color)
{
	this.x = 50;
	this.y = 50;
	this.width = 250;
	this.height = 180;
	
	this.color = color;	
	this.state = STATE_NORMAL;
	
	this.normal = new NinePatch("./uipack/PNG/blue_button06.png", 10, 10, 250, 180);
}

Button.prototype.draw = function()
{
	switch(this.state)
	{
		case(STATE_NORMAL):
		this.normal.draw(this.x, this.y);
		break;
	}
}

Button.prototype.onLoaded = function()
{
	this.normal.onLoaded();
}