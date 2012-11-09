(function($){
	videomap.gamepad = function(){
		var gamepadSupportAvailable = !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
		var gamepad;
		
		// Variables to store our position from the last polling cycle
		var lastAxes = {"x": 0, "y": 0};

		// How many steps are included across our movement
		var steps = {"x": 40, "y":30};
		// What are the bounding geographical coordinates of our region
		var boundingCoordinates = { "top": 49, "bottom" : 33, "left" : -123, "right": -73};

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
				// flag for if the position changed
				var positionChanged = false;
				// Measure our axes
				var axes = {
					"x" : gamepad.axes[0],
					"y" : gamepad.axes[1]
				};
				// If we've moved at least a full step, let's let us know we need to change the video
				if (Math.abs(axes.x - lastAxes.x) > (2 / steps.x)){
					positionChanged = true;
					lastAxes.x = axes.x; // Remember our value for next time
					console.log("lastAxes.x: " + lastAxes.x);
				}
				if (Math.abs(axes.y - lastAxes.y) > (2 / steps.y)){
					positionChanged = true;
					lastAxes.y = axes.y; // Remember our value for next time
				}

				// If the video needs changing, do that
				if (positionChanged){
					// Normalize our position, since our axes are from -1 to 1
					var normalizedX = (axes.x + 1) / 2;
					//var normalizedY = (axes.y + 1) / 2;
					var normalizedY = (-axes.y + .6) * 2;// Modified b/c I don't want to mess with UnoJoy code right now
					var newLat = boundingCoordinates.bottom + ( normalizedY * (boundingCoordinates.top - boundingCoordinates.bottom));
					var newLon = boundingCoordinates.left + ( normalizedX * (boundingCoordinates.right - boundingCoordinates.left));
					videomap.videogetter.updateVideo({lat: newLat, lon: newLon});
					console.log("newLon: " + newLon + ", newLat: " + newLat);
				}
				//$('#sidebar').html('0: ' + axes.x + ', 1 : ' + axes.y);
			},
		};

		console.log(gamepadSupport);
		gamepadSupport.startPolling();

		return {

		}
	}();
})(jQuery)

