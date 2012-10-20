(function($){
	videomap.gamepad = function(){
		var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
		var gamepad;
		

		var gamepadSupport = {
			/**
			 * Starts a polling loop to check for gamepad state.
			 */
			startPolling: function() {
			  // Don't accidentally start a second loop, man.
			  if (!gamepadSupport.ticking) { 
			    gamepadSupport.ticking = true;
			    gamepadSupport.tick();
			  }
			},

			/**
			 * Stops a polling loop by setting a flag which will prevent the next
			 * requestAnimationFrame() from being scheduled.
			 */
			stopPolling: function() {
			  gamepadSupport.ticking = false;
			},

			/**
			 * A function called with each requestAnimationFrame(). Polls the gamepad
			 * status and schedules another poll.
			 */  
			tick: function() {
			  gamepadSupport.pollStatus();
			  gamepadSupport.scheduleNextTick();
			},

			scheduleNextTick: function() {
			  // Only schedule the next frame if we haven't decided to stop via
			  // stopPolling() before.
			  if (gamepadSupport.ticking) {
			    if (window.requestAnimationFrame) {
			      window.requestAnimationFrame(gamepadSupport.tick);
			    } else if (window.mozRequestAnimationFrame) {
			      window.mozRequestAnimationFrame(gamepadSupport.tick);
			    } else if (window.webkitRequestAnimationFrame) {
			      window.webkitRequestAnimationFrame(gamepadSupport.tick);
			    }
			    // Note lack of setTimeout since all the browsers that support
			    // Gamepad API are already supporting requestAnimationFrame().
			  }    
			},

			/**
			 * Checks for the gamepad status. Monitors the necessary data and notices
			 * the differences from previous state (buttons for Chrome/Firefox, 
			 * new connects/disconnects for Chrome). If differences are noticed, asks 
			 * to update the display accordingly. Should run as close to 60 frames per 
			 * second as possible.
			 */
			pollStatus: function() {
				console.log('poll');
				gamepad = navigator.webkitGetGamepads()[0];

				
				var axes = {
					0 : gamepad.axes[0],
					1 : gamepad.axes[1]
				};

				$('#sidebar').html('0: ' + axes[0] + ', 1 : ' + axes[1]);
			  // (Code goes here.)
			},
		};

		console.log(gamepadSupport);
		gamepadSupport.startPolling();

		return {

		}
	}();
})(jQuery)

