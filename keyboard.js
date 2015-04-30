var Keyboard = function()
{
	var self = this;
	
	window.addEventListener('keydown', function(evt) { self.onKeyDown(evt); }, false);
	window.addEventListener('keyup', function(evt) { self.onKeyUp(evt); }, false);
	
	this.keyListeners = new Array();
	this.keys = new Array();
	
	this.KEY_SHIFT = 16;
	this.KEY_SPACE = 32;
	
	this.KEY_LEFT = 37;
	this.KEY_UP = 38;
	this.KEY_RIGHT = 39;
	this.KEY_DOWN = 40;
	
	this.KEY_A = 65;
	this.KEY_D = 68;
	this.KEY_S = 83;
	this.KEY_W = 87;
	
	this.KEY_backspace 		= 8;
	this.KEY_tab			= 9;
	this.KEY_enter			= 13;
	this.KEY_shift			= 16;
	this.KEY_ctrl			= 17;
	this.KEY_alt			= 18;
	this.KEY_pause			= 19;
	this.KEY_capsLock		= 20;
	this.KEY_escape			= 27;
	this.KEY_pageUp			= 33;
	this.KEY_pageDown		= 34;
	this.KEY_end			= 35;
	this.KEY_home			= 36;
	this.KEY_leftArrow		= 37;
	this.KEY_upArrow		= 38;
	this.KEY_rightArrow		= 39;
	this.KEY_downArrow		= 40;
	this.KEY_insert			= 45;
	this.KEY_delet 			= 46;
	this.KEY_0				= 48;
	this.KEY_1				= 49;
	this.KEY_2				= 50;
	this.KEY_3				= 51;
	this.KEY_4				= 52;
	this.KEY_5				= 53;
	this.KEY_6				= 54;
	this.KEY_7				= 55;
	this.KEY_8				= 56;
	this.KEY_9				= 57;
	this.KEY_a				= 65;
	this.KEY_b				= 66;
	this.KEY_c				= 67;
	this.KEY_d				= 68;
	this.KEY_e				= 69;
	this.KEY_f				= 70;
	this.KEY_g				= 71;
	this.KEY_h				= 72;
	this.KEY_i				= 73;
	this.KEY_j				= 74;
	this.KEY_k				= 75;
	this.KEY_l				= 76;
	this.KEY_m				= 77;
	this.KEY_n				= 78;
	this.KEY_o				= 79;
	this.KEY_p				= 80;
	this.KEY_q				= 81;
	this.KEY_r				= 82;
	this.KEY_s				= 83;
	this.KEY_t				= 84;
	this.KEY_u				= 85;
	this.KEY_v				= 86;
	this.KEY_w				= 87;
	this.KEY_x				= 88;
	this.KEY_y				= 89;
	this.KEY_z				= 90;
	this.KEY_leftWindowKey	= 91;
	this.KEY_rightWindowKey	= 92;
	this.KEY_selectKey		= 93;
	this.KEY_numpad0		= 96;
	this.KEY_numpad1		= 97;
	this.KEY_numpad2		= 98;
	this.KEY_numpad3		= 99;
	this.KEY_numpad4		= 100;
	this.KEY_numpad5		= 101;
	this.KEY_numpad6		= 102;
	this.KEY_numpad7		= 103;
	this.KEY_numpad8		= 104;
	this.KEY_numpad9		= 105;
	this.KEY_multiply		= 106;
	this.KEY_add			= 107;
	this.KEY_subtract		= 109;
	this.KEY_decimalPoint	= 110;
	this.KEY_divide			= 111;
	this.KEY_f1				= 112;
	this.KEY_f2				= 113;
	this.KEY_f3				= 114;
	this.KEY_f4				= 115;
	this.KEY_f5				= 116;
	this.KEY_f6				= 117;
	this.KEY_f7				= 118;
	this.KEY_f8				= 119;
	this.KEY_f9				= 120;
	this.KEY_f10			= 121;
	this.KEY_f11			= 122;
	this.KEY_f12			= 123;
	this.KEY_numLock		= 144;
	this.KEY_scrollLock		= 145;
	this.KEY_semiColon		= 186;
	this.KEY_equalSign		= 187;
	this.KEY_comma			= 188;
	this.KEY_dash			= 189;
	this.KEY_period			= 190;
	this.KEY_forwardSlash	= 191;
	this.KEY_graveAccent	= 192;
	this.KEY_openBracket	= 219;
	this.KEY_backSlash		= 220;
	this.KEY_closeBraket	= 221;
	this.KEY_singleQuote	= 222;
};

Keyboard.prototype.onKeyDown = function(evt)
{
	this.keys[evt.keyCode] = true;
};

Keyboard.prototype.onKeyUp = function(evt)
{
	this.keys[evt.keyCode] = false;
};

Keyboard.prototype.isKeyDown = function(keyCode)
{
	return this.keys[keyCode];
}