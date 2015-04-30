var Mouse = function()
{
	var self = this;
	
	window.addEventListener('mousemove', function(evt) { self.onMouseUpdate(evt); }, false);
	window.addEventListener('mouseenter', function(evt) { self.onMouseUpdate(evt); }, false);
	window.addEventListener('onmousedown', function(evt) { self.onMouseDown(evt); }, false);
	window.addEventListener('onmouseup', function(evt) { self.onMouseUp(evt); }, false);
	
	var x = 0;
	var y = 0;
	
	var LEFTMOUSEDOWN = false;
	var MIDDLEMOUSEDOWN = false;
	var RIGHTMOUSEDOWN = false;
	
	var LEFTMOUSEBUTTON = 0;
	var MIDDLEMOUSEBUTTON = 1;
	var RIGHTMOUSEBUTTON = 2;
}

Mouse.prototype.onMouseUpdate = function(evt)
{
	this.x = evt.pageX;
	this.y = evt.pageY;
}

Mouse.prototype.onMouseDown = function(evt)
{
	if(evt.button == LEFTMOUSEBUTTON)
	{
		LEFTMOUSEDOWN = true;
	}
}

Mouse.prototype.onMouseUp = function(evt)
{
	if(evt.button == 0)
	{
		LEFTMOUSEDOWN = false;
	}
}

Mouse.prototype.getMouseX = function()
{
	return this.x;
}

Mouse.prototype.getMouseY = function()
{
	return this.y;
}

Mouse.prototype.isMouseButtonDown = function(mouseButton)
{
	if(mouseButton == LEFTMOUSEBUTTON)
		return LEFTMOUSEDOWN;
	else if(mouseButton == MIDDLEMOUSEBUTTON)
		return MIDDLEMOUSEDOWN;
	else if(mouseButton == RIGHTMOUSEBUTTON)
		return RIGHTMOUSEDOWN;
	else 
		return undefined;
}