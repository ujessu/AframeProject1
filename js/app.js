$(document).ready(function() {
// var aframeparticle = require('aframe-particle-system-component');
////---------- CONSTANTS
	var CONSTANTS = {
		API_KEY: "709b6234721f968e57dd7cc4e61a1469",
		BASE_URL: "http://api.openweathermap.org/data/2.5/weather",
		GOOGLE_URL:"https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAhAF8TYcKRz0GxKFJM3zzKWtgZ7PvWy3s",


//arrays of weather icons displayed on wunderground and what i will display. structured so i can move them around, make more display options later
		// showCloud: ["cloudy", "mostlycloudy", "partlycloudy", "cloudy"],
		// showGray: ["fog", "hazy", "unknown"], //fix unknown later
		// showRain: ["chancerain", "chancesleet", "chancetstorms", "sleet", "rain", "tstorms"],
		// showSnow: ["chanceflurries", "chancesnow", "flurries", "snow"],
		// showSun: ["clear", "mostlysunny", "partlysunny", "sunny"],

//arrays of weather icons displayed on OPENWEATHERMAP and what i will display. structured so i can move them around, make more display options later
		showCloud: ["02d", "02n", "03d", "03n", "04d", "04n"],
		showGray: ["50d", "50n"],
		showRain: ["09d", "09n", "10d", "10n", "11d", "11n"],
		showSnow: ["13d", "13n"],
		showSun: ["01d", "01n"],

		skyIs: ""
	};



////components

	AFRAME.registerComponent('do-something', {
	  init: function () {
	    var sceneEl = this.el;
	  }
	});

////---------- APP
	var App = {
		init: function() {
			App.bindEvents();
		},


////---------- BIND EVENTS
		bindEvents: function() {
		 $("#box1").click(function(){
			 App.googleLocation();
			});

//sydney http://openweathermap.org/help/city_list.txt
			$("#cylinder1").click(function(){
				App.openWeathermap(-33.867851, 151.207321);
			 });


				// 	App.webDetect();
				// 	App.parseJson();
		},


////---------- THE ACTUAL DOING

//find out where user is based on browser

		googleLocation: function(){
			var API_KEY = "AIzaSyAhAF8TYcKRz0GxKFJM3zzKWtgZ7PvWy3s";
			var tryAPIGeolocation = function() {
				jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key="+API_KEY, function(pos) {
					console.log('latitude', pos.location.lat);
					console.log('longitude', pos.location.lng);
					var latitude = pos.location.lat;
					var longitude = pos.location.lng;
					App.openWeathermap(latitude, longitude);
			  })
			  .fail(function(err) {
			    alert("API Geolocation error! \n\n"+err);
			  });
			};
			tryAPIGeolocation();
		},

// //this is the old web detect function. doesn't work b/c of some sort of deprecation
// 		webDetect: function() {
// 			navigator.geolocation.getCurrentPosition(function(pos) {
// 			console.log('latitude', pos.coords.latitude);
// 			console.log('longitude', pos.coords.longitude);
// 			var latitude = pos.coords.latitude;
// 			var longitude = pos.coords.longitude;
// 			});
//
// 			App.wundergroundIt(latitude, longitude);
//
// },
//
// 		wundergroundIt: function(latitude, longitude){
// 				$.ajax({
// 				url : "http://api.wunderground.com/api/341eced3dbad667b/geolookup/conditions/q/" + latitude + "," + longitude +".json",
// 				dataType : "jsonp",
// 				success : function(parsed_json) {
// 								var location = parsed_json.location.city;
// 								var icon = parsed_json.current_observation.icon;
// 								console.log("icon is" + icon);
// 								App.showWhat(location, icon);
// 						}
// 				});
// },

		openWeathermap: function(latitude, longitude){
			var baseURL =
					"http://api.openweathermap.org/data/2.5/weather";
			var API_KEY = "709b6234721f968e57dd7cc4e61a1469";
			var request = $.ajax(baseURL, {
					data: {
							lat: latitude,
							lon: longitude,
							appid: API_KEY
					},
					dataType: "json"
			});

			request.done(function(response) {
					var location = response.name;
					var icon = response.weather[0].icon;
					App.showWhat(location, icon);
				});


		},

		//WUNDERGROUND PARSING -- KEPT ON HITTING API LIMITS SO SAIMON SAID COULD GO BACK TO OPENWEATHERMAP
		// parseJson: function(){
		// 	$.ajax({
		// 		// need to get this out of cedar rapids!!
  	// 	url : "http://api.wunderground.com/api/341eced3dbad667b/geolookup/conditions/q/IA/Cedar_Rapids.json",
		//   dataType : "jsonp",
		// 	success : function(parsed_json) {
		// 				  var location = parsed_json.location.city;
		// 				  // var temp_f = parsed_json.current_observation.temp_f;
		// 					var icon = parsed_json.current_observation.icon;
		// 					console.log("icon is" + icon);
		// 					App.showWhat(location, icon);
		//   		}
  	// 	});
		// },

		showWhat: function(location, icon){
					if (CONSTANTS.showCloud.indexOf(icon) >= 0) {
						skyIs = "#showCloud";
					} else if (CONSTANTS.showGray.indexOf(icon) >= 0) {
						skyIs = "#showCloud";
					} else if (CONSTANTS.showRain.indexOf(icon) >= 0) {
						skyIs = "#showCloud";
					} else if (CONSTANTS.showSnow.indexOf(icon) >= 0) {
						skyIs = "#showDark";
					} else if (CONSTANTS.showSun.indexOf(icon) >= 0) {
						skyIs = "#showSun";
					} else {
					alert("I dunno. You should call a friend in " + location + " to find out!");
					}

					$('#sky').attr('src',skyIs);
					console.log("Current weather in " + location + " is " + icon + " so I am setting the sky to " + skyIs);
		}

};

///----------App init
	App.init();
});
