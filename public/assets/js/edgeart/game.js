var Application = function(){
	window.scrollTo(0,1);

	this.carousel = carousel;

	this.currentDilemma = -1;
	this.dilemmaCount = 5;
	this.dilemmas = Array();
	this.currentDilemma;

	this.scoreFlag = $('#score-overlay');
	this.scoreFlag.css('z-index', '-1');

	this.init = function(){
		$.each($('.dilemma'), function(i, htmlobj){
			var id = $(htmlobj).attr('data-id');
			this.dilemmas[id] = new Dilemma(id, htmlobj);
		}.bind(this));

		$('#game-carousel').on('click', this.showDilemma.bind(this));
		$('#game-interface .label').on('click', this.showDilemma.bind(this));

		//tijdelijk: Reset de game wanneer alles beantwoord is.

		if($('.person-select button.finished').length == 5) {
			alert('Einde van de game, de game wordt automatisch gereset nu');
			$.get( "resetsubmission", function( data ) {
				window.location.reload(true);
			}, 'json');
		}
	};

	this.showDilemma = function(id) {
		var id = this.carousel.currentBreakpoint+1;
		this.currentDilemma = this.dilemmas[id];
		this.currentDilemma.show();
	};

	this.showScoreFlag = function(score){
		this.scoreFlag.find('.points').html(score);
		this.scoreFlag.addClass('visible');

		var scoreFlagTimeOut = setTimeout(function(){
			this.scoreFlag.removeClass('visible');
			this.currentDilemma.hide(this.onDilemmaDone.bind(this));
		}.bind(this), 3000);
	};

	this.onDilemmaDone = function(){
		this.scoreFlag.css('z-index', '-1');
	};
};

var Dilemma = function(id, htmlobj){
	this.source = $(htmlobj);
	this.id = id;

	this.summery = this.source.find('.summery');
	this.summery.startbutton = this.summery.find('.btn-start-challenge');

	this.videocontainer = this.source.find('.videocontainer');

	this.question = this.source.find('.question');
	this.answers = this.question.find('li');
	this.selectedAnswer;

	this.closeButton = this.source.find('.btn-close');
	this.isFinished = this.source.hasClass('finished');

	this.videos = {
		main: this.videocontainer.find('.video6'),
		answer1: this.videocontainer.find('.video0'),
		answer2: this.videocontainer.find('.video1'),
		answer3: this.videocontainer.find('.video2'),
		answer4: this.videocontainer.find('.video3'),
		answer5: this.videocontainer.find('.video4'),
		ending: this.videocontainer.find('.video5')
	};

	this.init = function(){
		this.hide();
		this.closeButton.click(this.hide.bind(this));
		this.answers.click(this.checkAnswer.bind(this));
		this.summery.startbutton.click(this.startChallenge.bind(this));

		if (this.isFinished) this.finish();
	};

	this.checkAnswer = function(e){
		this.selectedAnswer = $(e.currentTarget);
		this.answers.removeClass('checked');
		this.selectedAnswer.addClass('checked');

		var continuebtn = this.question.find('.btn-continue');
		continuebtn.addClass('active');
		continuebtn.click(this.sendAnswer.bind(this));
	};

	this.sendAnswer = function(e){
		var answerID = this.selectedAnswer.attr('data-id');

		$.get( "submit/" + this.id + "/" + answerID, function( data ) {
			console.log(this.id, answerID, data);
			var score = ('0' + data.result.answerscore).slice(-2);
			app.showScoreFlag(score);
			this.question.find('.inner').css('padding-left', '150px');
			this.finish();
		}.bind(this), 'json');
	};

	this.startChallenge = function(e){
		this.hidePart(this.summery);

		//tijdelijk:
		this.showPart(this.question);

		//Mathijs jij kan hiermee werken??
		this.playVideo(this.videos.main);
	};

	this.show = function() {
		this.summery.show();
		this.videocontainer.show();
		this.videos.main.show();
		this.source.fadeIn(400);
	};

	this.hide = function(onCompleteFunc) {
		console.log(onCompleteFunc);
		if (typeof(onCompleteFunc) != "function") onCompleteFunc = function(e){};

		this.source.fadeOut(400, function(){
			this.summery.hide();
			this.question.hide();
			this.videocontainer.hide();
			onCompleteFunc();
		}.bind(this));
	};

	this.showPart = function(element, onCompleteFunc) {
		if (!onCompleteFunc) onCompleteFunc = function(e){};
		element.fadeIn(400, onCompleteFunc);
	};

	this.hidePart = function(element, onCompleteFunc) {
		if (!onCompleteFunc) onCompleteFunc = function(e){};
		element.fadeOut(400, onCompleteFunc);
	};

	this.playVideo = function(elem){

	};

	this.finish = function(){
		this.finished = true;
		this.source.addClass('finished');
		$('.person-select .person'+ this.id).addClass('finished');
	};

	this.init();
};

var app = new Application();
app.init();

/*
$(document).ready(function(){

	var video = $("#main-video").get(0);
	var currentProcent = 0;

	// controls
	var playButton = document.getElementById("play-pause");
	var muteButton = document.getElementById("mute");
	var skipbtn = document.getElementById("skip-btn");

	$.each($('.dilemma.finished'), function(i, dilemma){
		$('.person-select .person'+ $(dilemma).attr('data-id')).addClass('finished');
	});

	$('.label').hide();
	$('#label-p1').show();
	$('#score-overlay').css('z-index', '-1');

	$('.question .answers li').click(function(){
		$(this).parent().find('li').removeClass('checked');
		$(this).addClass('checked');
		$(this).closest('.inner').css('padding-left', '150px');
		$('#score-overlay').toggleClass('visible');
		$(this).closest('.content').find('.btn-continue').addClass('active');

		var questionID = $(this).closest('.question').attr('data-id');
		var answerID = $(this).attr('data-id');

		$.get( "submit/" + questionID + "/" + answerID, function( data ) {
		 	$('#score-overlay .points').html(('0' + data.result.answerscore).slice(-2));
		 	$('.person-select .person'+ questionID).addClass('finished');
		}, 'json');

	});

	// pay/pause button
		//playButton.addEventListener("click", function() {
		 // if (video.paused == true) {
		  //  video.play();
		   // playButton.innerHTML = '<img src="assets/images/video/pause-btn.png"/>';
		  //}
		  //else {
		   // video.pause();
		   // playButton.innerHTML = '<img src="assets/images/video/play-btn.png"/>';
		 // }
		//});

	    // mute button
	    muteButton.addEventListener("click", function() {
		  if (video.muted == false) {
		    video.muted = true;
		    muteButton.innerHTML = '<img src="assets/images/video/no-mute-btn.png"/>';
		  }
		  else {
		    video.muted = false;
		   muteButton.innerHTML = '<img src="assets/images/video/mute-btn.png"/>';
		  }
		});


	function controlsInit(type){

			// skip button
			skipbtn.addEventListener("click", function() {
				if(type=="basic")
					finishBasicVideo();
				else
					finishAnswerVideo();
			});


			video = $("video").get(0);

			video.onloadedmetadata= function() {
				video.currentTime = 0;
				currentPercent = 0;
				$("#load-bar #loader").css('width',"0%");

				video.addEventListener("timeupdate", function() {

					var value = (100 / video.duration) * video.currentTime;

					var time = video.currentTime;
					var minutes = Math.floor(time / 60);
					var seconds = Math.floor(time);

					  // calculate one percent first
					  var percent = (video.duration/100);

					  // set current percent
					  currentPercent =value/percent;

					  //console.log(currentPercent+"%");
					  $("#load-bar #loader").css('width',currentPercent+"%");

					  // setting the time
					  $("#time-indicator").html(minutes+":"+seconds);
					  // duratie totaal
					  // if there is more than a minute
					  if(video.duration > 60){
						  var totalMinutes = Math.floor(video.duration / 60);
						  var totalSeconds = Math.floor(video.duration-(video.duration-(totalMinutes*60)));
					  }
					  else{
					  	totalMinutes = 00;
					  	totalSeconds = Math.floor(video.duration);
					  }
					  $("#time-duration").html("/" + totalMinutes+":"+totalSeconds);
				});

			};



		}

		function finishAnswerVideo(){

			$('#score-overlay').css('z-index', 'none');
				$('#score-overlay').toggleClass('visible');
				$('.question .inner').css('padding-left', '0px');

			  	$('.dilemma').delay(700).fadeOut('fast',function(){

					$('.dilemma .summery').hide();
					$('.dilemma .question').hide();

					$('#score-overlay').css('z-index', '-1');

					if($('.person-select button.finished').length == 5) {
						alert('Einde van de game, de game wordt automatisch gereset nu');
						$.get( "resetsubmission", function( data ) {
							$("#video-container").hide();
							console.log('reload');
						 	window.location.reload(true);
						}, 'json');
					}

				});

				$("#video-container").fadeOut();
		}


		function finishBasicVideo(){
			//exitFullscreen();
			// if the video is ended show in background;
			video.currentTime = 0;
			video.pause();
			$("#video-container #load-bar").hide();
			$("#video-container #video-controls").hide();
			$("#video-container video").css('z-index',1);
			$('.dilemma .question').fadeIn();

		}

		function exitFullscreen(){
			// exit fullscreen API
			if (document.exitFullscreen) {
			    document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
			    document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
			    document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
			    document.msExitFullscreen();
			}
		}

		function enterFullscreen(){
			// fullscreen API
			var v = document.getElementById("video-container");
			if (v.requestFullscreen) {
			    v.requestFullscreen();
			} else if (v.webkitRequestFullscreen) {
			    v.webkitRequestFullscreen();
			} else if (v.mozRequestFullScreen) {
			    v.mozRequestFullScreen();
			} else if (v.msRequestFullscreen) {
			    v.msRequestFullscreen();
			}
		}


	$('.dilemma').on('click', '.btn-continue.active' ,function(){

		// video antwoord
		var anwser = $(".answers li.checked").attr("data-id");
		//$("video").attr('src','https://s3-us-west-2.amazonaws.com/dopefreegame/videos/thijs/antwoord_'+anwser+'.mp4');
		//$("video").get(0).play();
		//$("#video-container").fadeIn();
		$(".content").hide();
		$("#score-overlay").hide();

		// als het antwoord gespeeld heeft gaan we verder met het hele antwoord
		$("video").get(0).onended = function(e) {
			$("video").get(0).pause();
			$("video").attr('src','https://s3-us-west-2.amazonaws.com/dopefreegame/videos/thijs/antwoord.mp4');
			$("#load-bar").show();
			$("#video-controls").show();
			controlsInit('answer');
			$("video").get(0).play();
			$("video").get(0).onended = function(e) {
				//exitFullscreen();
				finishAnswerVideo();
			};
		};

	});

	$('.dilemma .btn-close').click(function(e){
		$(this).closest('.dilemma').fadeOut(function(){
			$('.dilemma .summery').hide();
			$('.dilemma .question').hide();
		});
	});


	// start challenge
	$('.dilemma .btn-start-challenge').click(function(e){
		$(this).closest('.dilemma').find('.summery').fadeOut();

			// play the video
			//$("video").attr('src',"https://s3-us-west-2.amazonaws.com/dopefreegame/videos/thijs/verhaal.mp4");
			//enterFullscreen();
			//$("video").get(0).play();
			//$("#video-container #video-controls").show();
			//$("#video-container #load-bar").show();

			controlsInit('basic');

		// when the video ends
		//$("#main-video").get(0).onended = function(e) {
			//finishBasicVideo();
		//};
	});

	$('.label').click(function(){
		var personID = $(this).attr('data-person');
		$('#dilemma-p'+personID+' .summery').show();
		$('#dilemma-p'+personID).fadeIn();
		$('.content').show();
		// video
		//$("video").width('100%');
		//$("video").height('100%');
		//$("#video-container").fadeIn();
		//$("#video-container video").css('z-index',333333);
		//$("#video-container #video-controls").hide();
		//$("#video-container #load-bar").hide();
		//video.currentTime = 0;
	});

	$(window).click(function(){
		//$('#score-overlay').toggleClass('visible');
	});
});
*/

