var canvas = document.getElementById('carousel');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var totalFrames = 359;
var loadedFrames = 1;
var currentFrame = 0;
var frames = Array();
var swipeEaseHandler;
var startScrollTime;
var toFrameInterval;
var closestPersonDistance;
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


alert(quality);

var currentPerson = 0;

var personFrames = Array(0, 72, 144, 216, 288);

var Frame = function(src){
	this.image = new Image();
	this.src = src;
	//frames.push(this);

	this.image.onload = function(){
	    loadedFrames++;
	    if (loadedFrames == totalFrames){

	    	$('.dilemma').hide();
			$('.dilemma .summery').hide();
			$('.dilemma .question').hide();

	    	render(0);
	    	$('#carousel').swipe({excludedElements:"", swipeStatus:swipeHandler , triggerOnTouchLeave:true, threshold:null});
	    	$('#loading-overlay').fadeOut();
	    }
	};
	this.image.src = this.src;
};

function imagesLoaded(){
	$.each(frames, function(i, frame){
		$('#container').append("<figure class='frame'>");
		$('#container').append( $(this.image) );
    	$('#container').append("</figure>");
	});
}

function render(frame){
	if (frame > totalFrames) currentFrame = 0;
	if (frame < 0) currentFrame = totalFrames;
	context.clearRect ( 0 , 0 , canvas.width, canvas.height );
	if (frames[frame]) context.drawImage(frames[frame].image, 0, (window.innerHeight-(window.innerWidth/16) * 9), window.innerWidth, (window.innerWidth/16) * 9);
}

function getClosestPerson(){
	closestDiff = 999;
	closestPersonFrame = 0;
	$.each(personFrames , function(i, personFrame){
		if (personFrame < currentFrame)
			diff = currentFrame-personFrame;
		else diff = personFrame-currentFrame;

		if (diff <= closestDiff) {
			closestDiff = diff;
			closestPersonFrame = personFrame;
			currentPerson = i;
		}
	});

	closestPersonDistance = closestDiff;
	return closestPersonFrame;
}

function toNextPerson(){
	currentPerson++;
	if (currentPerson > 4) currentPerson = 0;
	toFrame(personFrames[currentPerson]);
}

function toPreviousPerson(){
	console.log();
	currentPerson--;
	if (currentPerson < 0) currentPerson = 4;
	toFrame(personFrames[currentPerson]);
}

function toFrame(frame){
	$('.label').fadeOut();
	//getClosestPerson();
	distance = frame-currentFrame;
	speed = distance;

	if(frame > currentFrame) distance = frame-currentFrame;
    if(frame < currentFrame) distance = currentFrame-frame;

	clearInterval(toFrameInterval);
	toFrameInterval = setInterval(function(){
	    speed = distance/10;

	   	if(frame > currentFrame){
	   		distance -= Math.ceil(speed);
        	currentFrame += Math.ceil(speed);
        }
        if(frame < currentFrame){
        	distance -= Math.ceil(speed);
        	currentFrame -= Math.ceil(speed);
        }

		render(currentFrame);

	    if (currentFrame == frame){
	    	$('.person-select button').removeClass('active');
	    	$('.person-select .person'+(currentPerson+1)).addClass('active');
	    	$('#game-interface #label-p'+(currentPerson+1)).fadeIn();
	    	clearInterval(toFrameInterval);
	    }


    }, 1000/60);
}

function swipeHandler(event, phase, direction, distance) {

	if(direction == 'up' || direction == 'down')
		return;

	var tempFrame;
    if (phase == "start"){
		clearInterval(swipeEaseHandler);
        startScrollTime = new Date();
    }

    if (distance > 20){
    $('.label').fadeOut(100);

    if(direction == 'left')
     	tempFrame = currentFrame + Math.floor(distance/10);
    if(direction == 'right')
        tempFrame = currentFrame - Math.floor(distance/10);

	if(tempFrame)render(tempFrame);
    if (phase == "end"){
     	var timeInt = new Date()-startScrollTime;
        var scrollEase_dx = (distance/timeInt)*(1.2/(timeInt/1000));

        swipeEaseHandler = setInterval(function(){

        	scrollEase_dx *= 0.95;
        	if(direction == 'left')
		       	 currentFrame += Math.floor(scrollEase_dx);
		    if(direction == 'right')
		         currentFrame -= Math.floor(scrollEase_dx);

        	if (scrollEase_dx < 1){
        		toFrame(getClosestPerson());
        		clearInterval(swipeEaseHandler);
        	}


        	render(currentFrame);

        }, 1000/60);

        currentFrame = tempFrame;
    }
}
}

var i;
for(i=1; i<totalFrames; i++){

	var str = i.toString();
    if (str.length < 5){
	    zeros = '00000';
	    zeros = zeros.substring(0, 5-str.length);
	    str = zeros + str;
	}

    var src = 'assets/images/carousel/'+ quality +'-quality/PNG Test_' + str + '.jpg';
    frames.push(new Frame(src));
    toFrame(0);
}
window.scrollTo(0,1);
$(document).ready(function(){
	$('#game-interface .person-select button').click(function(){
		var frame = $(this).attr('data-frame');
		$.each(personFrames ,function(i,personFrame){
			if (frame == personFrame) currentPerson = i;
		});
		toFrame(frame);
	});

	$('#game-interface .btn-next').click(toNextPerson);
	$('#game-interface .btn-previous').click(toPreviousPerson);
});

window.onresize = function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	render(currentFrame);
};
