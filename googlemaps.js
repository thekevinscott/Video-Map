// I'm assuming that this (function(){code})() notation means
//  'Execute this block'
//  but it actually is used to set up a closure for these functions.
(function(){

	var geocoder;
	var map;
	
	geocoder = new google.maps.Geocoder();
	videomap.codeAddress = function(params) {
		
		var latlng = new google.maps.LatLng(params.lat, params.lon);
		console.log(latlng);
		geocoder.geocode({'latLng': latlng},function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	    	var result; 
	    	if (results.length) {
	    		if (results.length > 1) {
	    			result = results[1].formatted_address;
	    		} else {
	    			result = result.shift().formatted_address;
	    		}	
	    	}
        else
          console.log ("results.length didn't exist..")
	    	params.callback(result);
	    } else {
	    	params.callback(result);
	      console.log('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}
	


})();