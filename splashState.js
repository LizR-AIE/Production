
var SplashState = function() 
{
	this.prototype = BaseState;
	this.splashTimer = 3;
}

SplashState.prototype.load = function() 
{
	
}

SplashState.prototype.unload = function() 
{
	
}

SplashState.prototype.update = function(dt) 
{
	this.splashTimer -= dt;
	//if( keyboard.isKeyDown( keyboard.KEY_SPACE ) == true )
	if(this.splashTimer <= 0)
	{
		//stateManager.switchState( new MenuState() );
		stateManager.switchState( new GameState() );
	}
}

SplashState.prototype.draw = function() 
{
	context.font="72px KenFuture";	
	context.fillStyle = "#FF0";	
	var width =  context.measureText("SPLASH SCREEN").width;
	context.fillText("SPLASH SCREEN", SCREEN_WIDTH/2 - width/2, SCREEN_HEIGHT/2);		
	
	context.font="72px KenFuture";	
	context.fillStyle = "#FF0";	
	width =  context.measureText("YAY !!!").width;
	context.fillText("YAY !!!", SCREEN_WIDTH/2 - width/2, SCREEN_HEIGHT/2 + 80);	
}

SplashState.prototype.reset = function()
{
	this.splashTimer = 3;
}