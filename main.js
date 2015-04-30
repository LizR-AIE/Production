var canvas = document.getElementById("gameCanvas");
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

//-------------------- Don't modify anything above here

//--------------------
// Variables
//--------------------
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var DEBUG = 0;		// set to 0 to turn off drawing debug information

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var keyboard = new Keyboard();
//var background = new Background(BACKGROUNDCOLOR_DARKPURPLE);

var stateManager = new StateManager();

stateManager.pushState( new SplashState() );

// load the texture that we will use to as a tiled backgrounds
var background = {}
background.image = document.createElement("img");
background.image.src = "./Downloads/spaceshooter/Backgrounds/darkPurple.png";
background.width = 256;
background.height = 256;

// create an array to hold all of the instances of the backgrounds texture
var backgrounds = [];

// populate the backgrounds array with the backgrounds texture
for(var y = 0; y < (SCREEN_HEIGHT / background.height)+1; y++)
{
	backgrounds[y] = [];
	for(var x = 0; x < (SCREEN_WIDTH / background.width)+1; x++)
	{
		backgrounds[y][x] = new Vector2();
		backgrounds[y][x].x = x * background.width;
		backgrounds[y][x].y = (y-1) * background.height;
		//console.log(backgrounds[y][x].y);
	}
}
console.log(backgrounds.length);
//--------------------
// Functions
//--------------------


function run()
{
	context.fillStyle = "#ccc";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
	
	for(var y = 0; y < (SCREEN_HEIGHT / background.height)+1; y++)
	{
		for(var x = 0; x < (SCREEN_WIDTH / background.width)+1; x++)
		{
			backgrounds[y][x].y += 50 * deltaTime;
			if(backgrounds[y][x].y > SCREEN_HEIGHT)
			{
				backgrounds[y][x].y -= (background.height * 5)
			}
		}
	}
	
	
	//background.update(deltaTime);
	stateManager.update(deltaTime);
	
	// first we draw the background so that it is below everything else
	for(var y = 0; y < (SCREEN_HEIGHT / background.height)+1; y++)
	{
		for(var x = 0; x < (SCREEN_WIDTH / background.width)+1; x++)
		{
			context.drawImage(background.image, backgrounds[y][x].x, backgrounds[y][x].y);
		}
	}
	
	//background.draw();
	stateManager.draw();
			
	if(DEBUG == 1)
	{	
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