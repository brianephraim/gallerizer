;(function(global){
	// UglifyJS define hack.  Used for unit testing.
	if (typeof APP_NOW === 'undefined') {
	  APP_NOW = function () {
	    return +new Date();
	  };
	}

	if (typeof APPS === 'undefined') {
	  var global = (function(){return this;})();
	}


	//!!!!!!!!!!!!!!!!!!!!!!!!!!!
	//EXPECTS <whatev class="catSlides"></whatev> in the DOM
	var app = function($,gallerizer){
		$(function() {//DOCUMENT READY

			var catSlides = new gallerizer({
			  	$container:$('.catSlides'),
			  	imagesObjectArray:[
			  		{
			  			full:'images/803864926_1375572583.jpg',
			  			thumb:'images/803864926_1375572583-thmb.png'
			  		},
			  		{
			  			full:'images/cats-animals-kittens-background-us.jpg',
			  			thumb:'images/cats-animals-kittens-background-us-thmb.png'
			  		},
			  		{
			  			full:'images/Cute-Kitten-kittens-16122946-1280-800.jpg',
			  			thumb:'images/Cute-Kitten-kittens-16122946-1280-800-thmb.png'
			  		},
			  		{
			  			full:'images/Persian_Kittens.jpg',
			  			thumb:'images/Persian_Kittens-thmb.png'
			  		}
			  	]
			});
			console.log(catSlides)
		});
		return 'Hi i am return app';
	};


	if (typeof exports === 'object') {
		// nodejs
		module.exports = app($,gallerizer);
	} else if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jQuery','gallerizer'],function(){ 
			return app.apply(null,arguments);
		});
	} else if (typeof global.app === 'undefined') {
		// Browser: Make `Tweenable` globally accessible.
		global.app = app($,gallerizer);
	}



})(this);


