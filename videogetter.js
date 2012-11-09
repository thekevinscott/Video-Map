(function($){
	videomap.videogetter = function() {
	// videomap.videogetter.updateVideo({lat: 123, lon: Whatevs})
		var yt_key = 'AI39si5L5vjhQIEHX5djKr_V6TxvyTGEaubSklcGdph3tkNjH7KwrTAcmQ7X4ZqZy-lvdRpMhCYa73ZTqLmu6ZUE9vHk3LjRvg';	
		var orderby = 'viewCount';
		var base_url = 'https://gdata.youtube.com/feeds/api/videos?key='+yt_key+'&alt=json&orderby='+orderby;
		var radius_cutoff = 1000;
		var radius_start = 10;
		var video_target = $('#video');
		var address_target = $('#address');
		var views_target = $('#views');


		var messages = {
			'youtube_error' : 'Youtube Error',
			'no_videos_found' : 'No videos found',
			'no_video_id_found' : 'No Video ID found',
			'address_not_found' : 'Somewhere'
		};

		var updateVideo = function(params) {
			params.callback = function(video) {
				console.log(video);
				if (video && video.id) {
					var video_id = video.id['$t'].split('/').pop();
					
					if (video['georss$where'] && video['georss$where']['gml$Point'] && video['georss$where']['gml$Point']['gml$pos'] && video['georss$where']['gml$Point']['gml$pos']['$t']) {
						var video_geo_info = video['georss$where']['gml$Point']['gml$pos']['$t'].split(' ');
						params.lat = video_geo_info[0];
						params.lon = video_geo_info[1];
					}
					
					displayInfo(params,video);
					displayVideo(video_target,video_id);
				} else {
					alert(messages.no_video_id_found);
				}
			}
			get(params);
		}
		var displayInfo = function(params,video) {
			params.callback = function(address) {
				// If the video doesn't have an address, then display a default message/ get an address from 
				//  the latitude/longitide values we're searching by
				if (! address) {
					address = messages.address_not_found;
				}
				$(address_target).html(address);
				
				if (video && video['yt$statistics'] && video['yt$statistics']['viewCount']) {
			
					//$(views_target).html('Views: ' + video['yt$statistics']['viewCount']);	
					$(views_target).html('Views: ' + commaSeparateNumber(video['yt$statistics']['viewCount']));	
				}
				
			}
			videomap.codeAddress(params);
		}
		
		function commaSeparateNumber(val){
			while (/(\d+)(\d{3})/.test(val.toString())){
			  val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
			}
			return val;
		}

		var displayVideo = function(element,id) {
			var iframe = '<iframe class="youtube-player" type="text/html" src="http://www.youtube.com/embed/'+id+'?autoplay=1" frameborder="0">';
			$(element).html(iframe);

		}
		
		var get = function(params) {
			if (! params.radius) { params.radius = radius_start; }
			console.log('Our search radius: '+params.radius);
			var url = base_url+'&location='+params.lat+','+params.lon+'&location-radius='+params.radius+'km';
			
			$.get(url,{},function(data){
				
				if (typeof(data)=='object') {
				
					if (data.feed) {
				
						if (data.feed.entry && data.feed.entry.length) {
							
							params.callback(data.feed.entry[0]);
						} else {
							
							// We haven't found any videos within our radius. Double the radius and try again.
							params.radius *= 2;
							if (params.radius >= radius_cutoff) {
								alert(messages.no_videos_found);	
								console.log(data);
							} else {
								
								get(params);	
							}
						}

					} else {
						alert(messages.youtube_error);
						console.log(data);
						
					}
				} else {
					alert(messages.youtube_error);
					console.log(data);
				}
			});
		}
		return {
			updateVideo : updateVideo
		}
	}();
})(jQuery);