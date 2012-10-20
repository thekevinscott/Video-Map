(function($){
	videomap.gamepad = function(){
		var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
		console.log('game pad support: ' + gamepadSupportAvailable);
		return {

		}
	}();
})(jQuery)

