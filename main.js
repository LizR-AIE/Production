var canvas = document.getElementById("gameCanvas");
canvas.style.cursor = "url('./Downloads/UI/uipack-space/PNG/cursor_pointerFlat.png'), auto";

var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

Array.prototype.update = function(deltaTime)
{
	for(var i = 0; i < this.length; i++)
	{
		this[i].update(deltaTime);
	}
}

Array.prototype.draw = function()
{
	for(var i = 0; i < this.length; i++)
	{
		this[i].draw();
	}
}

Array.prototype.checkLasers = function()
{
	for(var i = 0; i < this.length; i++)
	{
		if(	this[i].position.x < 0 ||
			this[i].position.x > SCREEN_WIDTH ||
			this[i].position.y < 0 ||
			this[i].position.y > SCREEN_HEIGHT)
		{
			this.splice(i, 1);
			break;
		}
	}
}

//-------------------- Don't modify anything above here

//--------------------
// Variables
//--------------------
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

// set to 0 to turn off drawing debug information
var DEBUG = 0;	

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var keyboard = new Keyboard();
var mouse = new Mouse();
var stateManager = new StateManager();
var background = new Background(BACKGROUNDCOLOR_BLUE);

stateManager.pushState( new SplashState() );

//--------------------
// Functions
//--------------------
function drawFPS(dt)
{
	if(DEBUG == 0)
		return;
	
	// update the frame counter 
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}		
	
	// draw the FPS
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 5, 20, 100);
}

function run()
{	
	var deltaTime = getDeltaTime();
		
	background.update(deltaTime);
	stateManager.update(deltaTime);
		
	background.draw();
	stateManager.draw();
	
	drawFPS(deltaTime);	
}

//-------------------- Don't modify anything below here


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);