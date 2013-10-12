var gallerizer = (function(){
	var obj = function(options){
		var self = this;
		this.$container = options.$container;
		this.$container.addClass('gallerizer');
		this.$app = $('<div class="stage"></div>');
		this.$container.append(this.$app);
		this.slideObjectArray = options.imagesObjectArray;
		this.dyingSlideObject = null;
		this.currentSlideObject = null;
		this.currentSlideIndex = 0;
		this.largestSlideHeight = 0;

		//Setup controls
		this.$previousControl = $('<div class="control previousControl"></div>');
		this.$previousControl.data('incAmount',-1)
		this.$nextControl = $('<div class="control nextControl"></div>');
		this.$nextControl.data('incAmount',1)
		this.$controls = this.$previousControl.add(this.$nextControl);
		this.$container.append(this.$previousControl).append(this.$nextControl);
		this.controlHeight = this.$nextControl.height();
		this.$container.on('click','.control',function(){
			var incAmount = $(this).data('incAmount');
			if(incAmount === 1){
				self.currentSlideIndex = self.currentSlideIndex >= self.slideObjectArray.length-1 ? 0 : self.currentSlideIndex + 1;
			} else {
				self.currentSlideIndex = self.currentSlideIndex <= 0 ? self.slideObjectArray.length-1 : self.currentSlideIndex - 1;
			}
			self.generateSlide(self.slideObjectArray[self.currentSlideIndex],'');
		})

		//Setup thumbs
		this.thumbSize = 75;
		this.thumbPanelMargin = 14;
		this.$container.css({'padding-bottom':(this.thumbSize+this.thumbPanelMargin)+'px'})
		this.$thumbPanel = $('<div class="thumbPanel"></div>');
		this.$container.append(this.$thumbPanel);
		this.$thumbs = $();
		for(var i=0,l=this.slideObjectArray.length;i<l;i++){
			this.slideObjectArray[i].index = i
			this.slideObjectArray[i].$thumb = $('<div class="thumb"><img src="'+ this.slideObjectArray[i].thumb +'" /><div class="border"></div></div>');
			this.slideObjectArray[i].$thumb.data('slideObject',this.slideObjectArray[i]);
			this.$thumbs = this.$thumbs.add(this.slideObjectArray[i].$thumb);
		}
		this.$thumbPanel.append(this.$thumbs)
		this.$thumbPanel.on('click','.thumb',function(){
			var slideObject = $(this).data('slideObject');
			self.currentSlideIndex = slideObject.index;
			self.generateSlide(slideObject,'');

		})

		//intial templating
		this.generateSlide(this.slideObjectArray[0],'instant');
		this.$app.on('click','.slide',function(){
			self.currentSlideIndex = self.currentSlideIndex >= self.slideObjectArray.length-1 ? 0 : self.currentSlideIndex + 1;
			self.generateSlide(self.slideObjectArray[self.currentSlideIndex],'');
		})
	  
	};
	obj.prototype.cssAnimationer = function(cssTransObj){
		cssTransObj.target.on("animationend webkitAnimationEnd oanimationend MSAnimationEnd",function(event){
			if(cssTransObj.target.is($(event.target))){//a selector of more than one jqueryObject might be passed.  Also, there could be transitions on child element (like buttons) and child element transitions trigger the callback.  So this conditional confirms that it's the targeted element itself that gets listened to and this works for a selector of multiple elements.
				cssTransObj.target.off('animationend webkitAnimationEnd oanimationend MSAnimationEnd');
				cssTransObj.callback(cssTransObj.target);
				cssTransObj.target.css('-webkit-animation','')	
			}
		})
	}
	obj.prototype.generateSlide = function(slideObject,state){
			var self = this;
			this.dyingSlideObject = this.currentSlideObject;
			this.currentSlideObject = slideObject;
			slideObject.$thumb.addClass('selected');
				if(self.dyingSlideObject !== null){
					self.dyingSlideObject.$thumb.removeClass('selected');
				}
			if(typeof slideObject.$el !== 'undefined'){
				slideObject.$el.remove();
			}

		  	slideObject.$el = $('<div class="slide" style="opacity:0;"><img src="'+ slideObject.full +'" /></div>');
		  	slideObject.$img = slideObject.$el.find('img');
			this.$app.append(slideObject.$el);

			slideObject.$img.on('load',function(){
				self.currentSlideObject.height = slideObject.$img.outerHeight();
				if(self.currentSlideObject.height > self.largestSlideHeight){
					self.largestSlideHeight = self.currentSlideObject.height;
				} else {
					self.$container.css({'padding-bottom':(self.thumbSize+self.thumbPanelMargin) + (self.largestSlideHeight - self.currentSlideObject.height)+'px'})
				}
				
				self.$container.height(self.currentSlideObject.height)
				self.$controls.css({
					'-webkit-transform':'translate3d(0,'+(self.currentSlideObject.height/2 - self.controlHeight/2)+'px,0)'
				})
				self.$thumbPanel.css({
					'-webkit-transform':'translate3d(0,'+(self.currentSlideObject.height + self.thumbPanelMargin)+'px,0)'
				})

				if(state !== 'instant'){
					self.cssAnimationer({
				  		target: slideObject.$el,
				  		callback:function(x){
					  		slideObject.$el.removeClass('incoming');
					  	}
					})
					slideObject.$el.css({'opacity':''}).addClass('incoming');
					if(self.dyingSlideObject !== null){
						
						self.cssAnimationer({
					  		target: self.dyingSlideObject.$img,
					  		callback:function(){
						  		self.dyingSlideObject.$el.remove()
						  	}
						})
						self.dyingSlideObject.$el.addClass('outgoing');

					}
				} else {
					slideObject.$el.css({'opacity':''});
					if(self.dyingSlideObject !== null){
						self.dyingSlideObject.$el.remove()
					}
				}	
			})
	};
	return obj;
})();
$(function(){
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
});
