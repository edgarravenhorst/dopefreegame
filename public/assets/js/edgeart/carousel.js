var Carousel = function(canvasID){

	this.canvas = document.getElementById(canvasID);
	this.context = this.canvas.getContext('2d');

	this.frameCount = 359;
	this.framesLoaded = 1;
	this.currentFrame = 0;

	this.breakpoints = Array(0, 72, 144, 216, 288);
	this.currentBreakpoint = 0;

	this.easingInterval;

	this.frames = Array();

	this.preloadStatus = 'loading';
	this.preloadPercent = 0;

	this.imageQuality = 'high';

	this.init = function (){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.imageQuality = this.getImageQuality();

		this.initFrames();

		$('#game-interface .btn-next').bind("click touchend", this.toNextBreakpoint.bind(this));
		$('#game-interface .btn-previous').bind("click touchend", this.toPrevBreakpoint.bind(this));
		$('body').swipe({excludedElements:"", swipeStatus:this.onSwipeHandler.bind(this) , triggerOnTouchLeave:true, threshold:null});

		window.onresize = function(){
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
			this.render(this.currentFrame);
		}.bind(this);

		$('#game-interface .person-select button').bind("click touchend", function(e){
			var frame = $(e.currentTarget).attr('data-frame');
			$.each(this.breakpoints ,function(i , breakpoint){
				if (frame == breakpoint) this.currentBreakpoint = i;
			}.bind(this));
			this.gotoAndPlay(frame);
		}.bind(this));
	};


	this.onSwipeHandler = function(event, phase, direction, distance){
		if(direction == 'up' || direction == 'down')
		return;

	    if (phase == "start"){
			clearInterval(this.easingInterval);
	        startScrollTime = new Date();
	        startframe = this.currentFrame;
	    }

	    if (distance > 20){
		    $('.label').fadeOut(100);

		    if(direction == 'left')
		     	tempFrame = startframe + Math.floor(distance/10);
		    if(direction == 'right')
		        tempFrame = startframe - Math.floor(distance/10);

			if(tempFrame) this.render(tempFrame);


		    if (phase == "end"){
		     	var timeInt = new Date()-startScrollTime;
		        var scrollEase_dx = (distance/timeInt)*(1.2/(timeInt/1000));

		        this.easingInterval = setInterval(function(){

		        	scrollEase_dx *= 0.95;

		        	if (scrollEase_dx < 1){
		        		this.gotoAndPlay(this.closestBreakpoint());
		        		clearInterval(this.easingInterval);
		        	}

		        	if(direction == 'left')
				       	tempFrame += Math.floor(scrollEase_dx);
				    if(direction == 'right')
				        tempFrame -= Math.floor(scrollEase_dx);

		        	this.render(tempFrame);

		        }.bind(this), 1000/60);
		    }
		}
	};

	this.render = function(frame){
		if (frame > this.frameCount) frame = frame-this.frameCount;
		else if (frame < 0) frame = this.frameCount+frame;
		this.currentFrame = frame;

		this.context.clearRect ( 0 , 0 , this.canvas.width, this.canvas.height );
		if (this.frames[frame]) this.context.drawImage(this.frames[frame].image, 0, (window.innerHeight-(window.innerWidth/16) * 9), window.innerWidth, (window.innerWidth/16) * 9);
	};

	this.closestBreakpoint = function(){
		var closestDiff = 999;
		var closestbreakpoint = 0;
		var diff = 0;
		$.each(this.breakpoints , function(i, breakpoint){

			if (breakpoint < this.currentFrame)
				 diff = this.currentFrame-breakpoint;
			else diff = breakpoint-this.currentFrame;

			if (diff <= closestDiff) {
				closestDiff = diff;
				if (i == 0 && closestDiff > this.frameCount-this.currentFrame) closestDiff = this.frameCount-this.currentFrame;
				this.currentBreakpoint = closestbreakpoint = i;
			}
		}.bind(this));

		return this.breakpoints[closestbreakpoint];
	};

	this.gotoAndPlay = function(frame){
		$('.label').fadeOut();

		var distance;
		var startframe = this.currentFrame;
		var endframe = frame;
		var speed = frame-startframe;

		dist1 = endframe-startframe;
		dist2 = (dist1 > this.frameCount/2) ? dist1 - this.frameCount : this.frameCount + dist1;

		if (Math.abs(dist1) > Math.abs(dist2)) distance = dist2;
		if (Math.abs(dist2) > Math.abs(dist1)) distance = dist1;

		clearInterval(this.toFrameInterval);
		this.toFrameInterval = setInterval(function(){
		    speed = distance/10;

		   	if(distance < 0){
	        	startframe += Math.floor(speed);
	        	distance -= Math.floor(speed);
	        }
	        if(distance > 0){
	        	startframe += Math.ceil(speed);
	        	distance -= Math.ceil(speed);
	        }

			if (startframe == 359) startframe = 0;
		    if (distance == 0){
		    	$('.person-select button').removeClass('active');
		    	$('.person-select .person'+(this.currentBreakpoint+1)).addClass('active');
		    	$('#game-interface #label-p'+(this.currentBreakpoint+1)).fadeIn();
		    	clearInterval(this.toFrameInterval);
		    }

		    this.render(startframe);
	    }.bind(this), 1000/60);
	};

	this.toNextBreakpoint = function(){
		this.currentBreakpoint++;
		if (this.currentBreakpoint > 4) this.currentBreakpoint = 0;
		this.gotoAndPlay(this.breakpoints[this.currentBreakpoint]);
	};

	this.toPrevBreakpoint = function(){
		this.currentBreakpoint--;
		if (this.currentBreakpoint < 0) this.currentBreakpoint = 4;
		this.gotoAndPlay(this.breakpoints[this.currentBreakpoint]);
	};

	this.initFrames = function(){
		var i;
		for(i=1; i<this.frameCount; i++){

			var num = i.toString();
		    if (num.length < 5){
			    zeros = '00000';
			    zeros = zeros.substring(0, 5-num.length);
			    num = zeros + num;
			}

		    var src = 'assets/images/carousel/'+ this.imageQuality +'-quality/PNG Test_' + num + '.jpg';
		    this.frames.push(new Frame(src));
		    this.gotoAndPlay(0);
		}
	};

	this.getImageQuality = function() {
		var quality = 'high';

		if (window.innerWidth < 1500) {
			quality = 'medium';
		}
		if (window.innerWidth < 950) {
			quality = 'low';
		}
		if (window.innerWidth < 750) {
			quality = 'mobile';
		}
		return quality;
	};
};

var Frame = function(src){
	this.image = new Image();
	this.src = src;

	this.image.onload = function(){
	    carousel.framesLoaded++;
	    carousel.preloadPercent = Math.ceil((carousel.framesLoaded/carousel.frameCount)*100);
	    app.updateLoadingStatus();
	};
	this.image.src = this.src;
};

var carousel = new Carousel('carousel');
var initCarousel = function(){
	carousel.init();
};
