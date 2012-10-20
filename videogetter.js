var videogetter;
(function($){
	videogetter = function() {
		var yt_key = 'AI39si5L5vjhQIEHX5djKr_V6TxvyTGEaubSklcGdph3tkNjH7KwrTAcmQ7X4ZqZy-lvdRpMhCYa73ZTqLmu6ZUE9vHk3LjRvg';	
		var orderby = 'viewCount';
		var base_url = 'https://gdata.youtube.com/feeds/api/videos?key='+yt_key+'&alt=json&orderby='+orderby;

		var messages = {
			'youtube_error' : 'Youtube Error',
			'no_videos_found' : 'No videos found'
		};
		
		var get = function(params) {
			var url = $.get(base_url+'&location='+params.lat+','+params.lon+'&location-radius='+params.radius+'km',{},function(data){
				//feed entry 0
				if (typeof(data)=='object') {
					if (data.feed && data.feed.entry && data.feed.entry.length) {

					} else {
						alert(messages.no_videos_found);	
					}
				} else {
					alert(messages.youtube_error);
				}
			});
		}
		return {
			get : get
		}
	}();
})(jQuery);

