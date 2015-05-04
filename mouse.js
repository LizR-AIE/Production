var Mouse = function()
{
	var self = this;
	
	canvas.addEventListener('mousemove', 	function(evt) { self.onMouseUpdate	(evt); }, false);
	//window.addEventListener('mouseenter', 	function(evt) { self.onMouseUpdate	(evt); }, false);
	canvas.addEventListener('onmousedown', 	function(evt) { self.onMouseDown	(evt); }, false);
	canvas.addEventListener('onmouseup', 	function(evt) { self.onMouseUp		(evt); }, false);
	
	this.x = 0;
	this.y = 0;
	
	this.LEFTMOUSEDOWN = false;
	this.MIDDLEMOUSEDOWN = false;
	this.RIGHTMOUSEDOWN = false;
	
	this.LEFTMOUSEBUTTON = 0;
	this.MIDDLEMOUSEBUTTON = 1;
	this.RIGHTMOUSEBUTTON = 2;
	
	this.rect = canvas.getBoundingClientRect();
}

Mouse.prototype.onMouseUpdate = function(evt)
{
	if(evt.offsetX) {
        this.x = evt.offsetX;
        this.y = evt.offsetY;
    }
    else if(evt.layerX) {
        this.x = evt.layerX;
        this.y = evt.layerY;
    }
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