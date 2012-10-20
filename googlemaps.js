var codeAddress;
(function(){

	var geocoder;
	var map;
	
	geocoder = new google.maps.Geocoder();
	codeAddress = function(params) {
		var lat = parseFloat(params.lat);
		var lng = parseFloat(params.lng);
		var latlng = new google.maps.LatLng(lat, lng);
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
	    	params.callback(result);
	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}
	


})();