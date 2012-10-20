var videogetter;
(function($){
	videogetter = function() {
		var yt_key = 'AI39si5L5vjhQIEHX5djKr_V6TxvyTGEaubSklcGdph3tkNjH7KwrTAcmQ7X4ZqZy-lvdRpMhCYa73ZTqLmu6ZUE9vHk3LjRvg';	
		var orderby = 'viewCount';
		var base_url = 'https://gdata.youtube.com/feeds/api/videos?key='+yt_key+'&alt=json&orderby='+orderby;
		var radius_cutoff = 1000;
		var radius_start = 10;
		var video_target = $('#video');

		var messages = {
			'youtube_error' : 'Youtube Error',
			'no_videos_found' : 'No videos found',
			'no_video_id_found' : 'No Video ID found'
		};

		var updateVideo = function(params) {
			params.callback = function(video) {
				if (video && video.id) {
					var video_id = video.id['$t'].split('/').pop();
					
					displayVideo(video_target,video_id);
				} else {
					alert(messages.no_video_id_found);
				}
			}
			get(params);
		}

		var displayVideo = function(element,id) {
			var iframe = '<iframe class="youtube-player" type="text/html" src="http://www.youtube.com/embed/'+id+'" frameborder="0">';
			$(element).html(iframe);
		}
		
		var get = function(params) {
			if (! params.radius) { params.radius = radius_start; }
			console.log('Our radius: '+params.radius);
			var url = base_url+'&location='+params.lat+','+params.lon+'&location-radius='+params.radius+'km';
			
			$.get(url,{},function(data){
				console.log('get');
				if (typeof(data)=='object') {
					console.log('object');
					if (data.feed) {
						console.log('feed');
						if (data.feed.entry && data.feed.entry.length) {
							console.log('entry found');
							params.callback(data.feed.entry[0]);
						} else {
							console.log('no entry found');
							// We haven't found any videos within our radius. Double the radius and try again.
							params.radius *= 2;
							if (params.radius >= radius_cutoff) {
								alert(messages.no_videos_found);	
								console.log(data);
							} else {
								console.log('continue to get');
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
			get : get,
			displayVideo : displayVideo,
			updateVideo : updateVideo
		}
	}();
})(jQuery);