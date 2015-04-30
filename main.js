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

// AUDIO
var musicBackground;
var sfxFire;
var mute = true;

// GLOBAL
//canvas.width 	= window.innerWidth;
//canvas.height 	= window.innerHeight;
var SCREEN_WIDTH 	= canvas.width;
var SCREEN_HEIGHT 	= canvas.height;

var STATE_SPLASH 	= 0;
var STATE_MENU 		= 1;
var STATE_HIGHSCORE = 2;
var STATE_GAME 		= 3;
var STATE_OVER 		= 4;

var gameState 		= STATE_GAME;

var keyboard 		= new Keyboard();

var debug = false;
var kenFont = "36px KenFuture"
var green = "#76DD54";
var purple = "#BB54DD";
var yellow = "yellow";
var red = "red";

var buttons = [];

// SPLASH
var splashTimer = 0;
var splashInterval = 3;

// MENU
buttons.push(new Button(UI_GREY));
//console.log("SCREEN_WIDTH: " + SCREEN_WIDTH)
//console.log("SCREEN_WIDTH/2: " + SCREEN_WIDTH/2)
//console.log("buttons[0].width: " + buttons[0].width);
//console.log("buttons[0].width/2: " + buttons[0].width/2);
//console.log("(SCREEN_WIDTH / 2) - (buttons[0].width / 2): " + ((SCREEN_WIDTH / 2) - (buttons[0].width / 2)));
buttons[0].x = ((SCREEN_WIDTH / 2) - (buttons[0].width / 2));
buttons[0].y = 100;

// HIGHSCORE
var HighScore = 0;

// GAME
var MAP = { tw: 60, th: 15 };
var TILE = 35;
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

var LAYER_COUNT = 3;
var LAYER_BACKGOUND = 0;
var LAYER_PLATFORMS = 1;
var LAYER_LADDERS = 2;
var LAYER_OBJECT_ENEMIES = 3;
var LAYER_OBJECT_TRIGGERS = 4;

var METER = TILE;
var GRAVITY = METER * 9.8 * 6;
var MAXDX = METER * 10;
var MAXDY = METER * 15;
var ACCEL = MAXDX * 2;
var FRICTION = MAXDX * 6;
var JUMP = METER * 1500;

var ENEMY_MAXDX = METER * 5;
var ENEMY_ACCEL = ENEMY_MAXDX * 2;

var enemies = [];
var bullets = [];
var cells = [];
var player = new Player();

var tileset = document.createElement("img");
tileset.src = "tileset.png";

var heartImage = document.createElement("img");
heartImage.src = "heart.png";
heartImage.width = 50;
heartImage.height = 41;

var score = 0;
var lives = 3;
var worldOffsetX = 0;

// OVER


//--------------------
// Functions
//--------------------

window.onload = function()
{
	for(var i = 0; i < buttons.length; i++)
	{
		buttons[i].onLoaded();
	}
}

function initialize() 
{
	var idx = 0;
	
	// initialize the collision map
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) 
	{
		cells[layerIdx] = [];
		idx = 0;
		for(var y = 0; y < level1.layers[layerIdx].height; y++)
		{
			cells[layerIdx][y] = [];
			for(var x = 0; x < level1.layers[layerIdx].width; x++)
			{
				if(level1.layers[layerIdx].data[idx] != 0)
				{
					// for each tile we find in the layer data, we need to create 4 collisions
					// (because our collision squares are 35x35 but the tile in the
					// level are 70x70)
					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1;
				}
				else if(cells[layerIdx][y][x] != 1)
				{
					// if we haven't set this cell's value, then set it to 0 now
					cells[layerIdx][y][x] = 0;
				}
				idx++;
			}
		}
	}
	
	cells[LAYER_OBJECT_TRIGGERS] = [];
	idx = 0;
	for(var y = 0; y < level1.layers[LAYER_OBJECT_TRIGGERS].height; y++)
	{
		cells[LAYER_OBJECT_TRIGGERS][y] = [];
		for(var x = 0; x < level1.layers[LAYER_OBJECT_TRIGGERS].width; x++)
		{
			if(level1.layers[LAYER_OBJECT_TRIGGERS].data[idx] != 0)
			{
				cells[LAYER_OBJECT_TRIGGERS][y][x] = 1;  
				cells[LAYER_OBJECT_TRIGGERS][y-1][x] = 1;    
				cells[LAYER_OBJECT_TRIGGERS][y-1][x+1] = 1;  
				cells[LAYER_OBJECT_TRIGGERS][y][x+1] = 1;    
			}
			else if(level1.layers[LAYER_OBJECT_TRIGGERS].data[idx] != 1)
			{
				cells[LAYER_OBJECT_TRIGGERS][y][x] = 0;
			}
			idx++;
		}
	}
	
	// add enemies
	idx = 0;
	for(var y = 0; y < level1.layers[LAYER_OBJECT_ENEMIES].height; y++)
	{
		for(var x = 0; x < level1.layers[LAYER_OBJECT_ENEMIES].width; x++)	
		{
			if(level1.layers[LAYER_OBJECT_ENEMIES].data[idx] != 0)
			{
				var px = tileToPixel(x);
				var py = tileToPixel(y);
				var e = new Enemy(px, py);
				enemies.push(e);
			}
			idx++;
		}
	}
	if(!mute)
	{
		musicBackground = new Howl(
		{
			urls: ["background.ogg"],
			loop: true,
			buffer: true,
			volume: 0.5
		} );
		musicBackground.play();
		sfxFire = new Howl(
		{
			urls: ["fireEffect.ogg"],
			buffer: true,
			volume: 1,
			onend: function() {
				isSfxPlaying = false;
			}
		} );
	}
}

function cellAtPixelCoord(layer, x,y)
{
	if(x<0 || x>SCREEN_WIDTH)
	return 1;
	// let the player drop of the bottom of the screen (this means death)
	if(y>SCREEN_HEIGHT)
	return 0;
	return cellAtTileCoord(layer, p2t(x), p2t(y));
};

function cellAtTileCoord(layer, tx, ty)
{
	if(tx<0 || tx>=MAP.tw)
	return 1;
	// let the player drop of the bottom of the screen (this means death)
	if(ty>=MAP.th || ty < 0)
	return 0;
	return cells[layer][ty][tx];
};

function tileToPixel(tile)
{
	return tile * TILE;
};

function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
};

function bound(value, min, max)
{
	if(value < min)
	return min;
	if(value > max)
	return max;
	return value;
}

function intersects(x1, y1, w1, h1, x2, y2, w2, h2)
{
	if(	y2 + h2 < y1 ||
		x2 + w2 < x1 ||
		x2 > x1 + w1 ||
		y2 > y1 + h1)
	{
		return false;
	}
	return true;
}

function drawMap()
{
	var startX = -1;
	var maxTiles = Math.floor(SCREEN_WIDTH / TILE) + 2;
	var tileX = pixelToTile(player.position.x);
	var offsetX = TILE + Math.floor(player.position.x%TILE);

	startX = tileX - Math.floor(maxTiles / 2);

	if(startX < -1)
	{
		startX = 0;
		offsetX = 0;
	}
	if(startX > MAP.tw - maxTiles)
	{
		startX = MAP.tw - maxTiles + 1;
		offsetX = TILE;
	}
	worldOffsetX = startX * TILE + offsetX;

	for( var layerIdx=0; layerIdx < LAYER_COUNT; layerIdx++ )
	{
		for( var y = 0; y < level1.layers[layerIdx].height; y++ )
		{
			var idx = y * level1.layers[layerIdx].width + startX;
			for( var x = startX; x < startX + maxTiles; x++ )
			{
				if( level1.layers[layerIdx].data[idx] != 0 )
				{
					// the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile),
					// so subtract one from the tileset id to get the correct tile
					var tileIndex = level1.layers[layerIdx].data[idx] - 1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, (x-startX)*TILE - offsetX, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
				}
				idx++;
			}
		}
	}
}

function SplashUpdate(deltaTime)
{
	splashTimer += deltaTime;
	if(splashTimer >= splashInterval)
	{
		gameState = STATE_MENU;
		splashTimer = 0;
	}
}

function SplashDraw()
{	
	// Text
	context.fillStyle = purple;
	context.font = kenFont;
	var splashText = "Awesome HTML 5 Platformer!";
	var textMeasure = context.measureText(splashText);
	context.fillText(splashText, (SCREEN_WIDTH - textMeasure.width)/2, 64);
}

function MenuUpdate(deltaTime)
{
	
}

function MenuDraw()
{
	// Menu flavour text
	context.fillStyle = purple;
	context.font = kenFont;
	var menuText = "This is a menu";
	var textMeasure = context.measureText(menuText);
	context.fillText(menuText, (SCREEN_WIDTH - textMeasure.width)/2, 64);
	buttons.draw();
}

function HighScoreUpdate(deltaTime)
{
	
}

function HighScoreDraw()
{
	
}

function GameUpdate(deltaTime)
{
	player.update(deltaTime);
	bullets.update(deltaTime);
	enemies.update(deltaTime);
	
	for(var i = 0; i < enemies.length; i++)
	{
		if(player.isDead == false)
		{
			if(intersects(	enemies[i].position.x + (enemies[i].offset.x * 0.65),
							enemies[i].position.y + (enemies[i].offset.y * 0.75),
							enemies[i].width  + (enemies[i].offset.x * 0.65),
							enemies[i].height + (enemies[i].offset.y * 0.65),
							player.position.x + (player.offset.x * 0.65),
							player.position.y + (player.offset.y * 0.75),
							player.width  + (player.offset.x + 0.65),
							player.height + (player.offset.y + 0.65)) == true)
			{
				player.isDead = true;
			}
		}
	}
	
	var hit = false;
	for(var i = 0; i < bullets.length; i++)
	{
		if(	bullets[i].position.x - worldOffsetX < 0 || 
			bullets[i].position.x - worldOffsetX > SCREEN_WIDTH)
			{
				hit = true;
			}
		for(var j = 0; j < enemies.length; j++)
		{
			if(intersects( bullets[i].position.x, bullets[i].position.y, bullets[i].width, bullets[i].height,
 			     enemies[j].position.x, enemies[j].position.y, enemies[i].width, enemies[i].height) == true)
			{
				enemies.splice(j, 1);
				hit = true;
				score += 1;
				break;
			}
		}
		if (hit == true)
		{
			bullets.splice(i, 1);
			break;
		}
	}
	
	if(player.isDead)
		gameState = STATE_OVER;
}

function GameDraw()
{
	drawMap();				
	player.draw();
	
	enemies.draw();
	bullets.draw();
	
	context.fillStyle = "yellow";
	context.font = kenFont;
	var scoreText = "Score: " + score;
	context.fillText(scoreText, SCREEN_WIDTH - context.measureText(scoreText).width - 5, 35);
	
	for(var i=0; i<lives; i++)
	{
		context.drawImage(heartImage, 20 + ((heartImage.width+2)*i), 10);
	}
}

function OverUpdate(deltaTime)
{
	
}

function OverDraw()
{
	context.fillStyle = "#f00";		
	context.fillRect(50, 50, 50, 50);
}

function run()
{
	//canvas.width 	= window.innerWidth;
	//canvas.height 	= window.innerHeight;
	//SCREEN_WIDTH 	= canvas.width;
	//SCREEN_HEIGHT 	= canvas.height;
	
	context.fillStyle = green;
	context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	
	var deltaTime = getDeltaTime();
	
	switch(gameState)
	{
		case(STATE_SPLASH):
			SplashUpdate(deltaTime);
			SplashDraw();
			break;
		case(STATE_MENU):
			//location.reload();
			MenuUpdate(deltaTime);
			MenuDraw();
			break;
		case(STATE_HIGHSCORE):
			HighScoreUpdate(deltaTime);
			HighScoreDraw();
			break;
		case(STATE_GAME):
			GameUpdate(deltaTime);
			GameDraw();
			break;
		case(STATE_OVER):
			OverUpdate(deltaTime);
			OverDraw();
			break;
	};
}

initialize();

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