$(document).ready(function(){
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

	$('.dilemma').on('click', '.btn-continue.active' ,function(){
		$('#score-overlay').css('z-index', 'none');
		$('#score-overlay').toggleClass('visible');
		$('.question .inner').css('padding-left', '0px');
		$(this).closest('.dilemma').delay(700).fadeOut('fast',function(){
			$('.dilemma .summery').hide();
			$('.dilemma .question').hide();
			$('#score-overlay').css('z-index', '-1');

			if($('.person-select button.finished').length == 5) {
				alert('Einde van de game, de game wordt automatisch gereset nu');
				$.get( "resetsubmission", function( data ) {
					console.log('reload')
				 	window.location.reload(true);
				}, 'json');
			}
		});
	});

	$('.dilemma .btn-close').click(function(e){
		$(this).closest('.dilemma').fadeOut(function(){
			$('.dilemma .summery').hide();
			$('.dilemma .question').hide();
		});
	});

	$('.dilemma .btn-start-challenge').click(function(e){
		$(this).closest('.dilemma').find('.summery').fadeOut();
		
		// play the video
		var video = $("#main-video").get(0);
		video.play();
		
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
		
		
			
			$("#video-container #video-controls").show();
			$("#video-container #load-bar").show();
			
			// controls
			var playButton = document.getElementById("play-pause");
  			var muteButton = document.getElementById("mute");
			var seekBar = document.getElementById("seek-bar");
			var skipbtn = document.getElementById("skip-btn");
			// pay/pause button
			playButton.addEventListener("click", function() {
			  if (video.paused == true) {
			    video.play();			
			    playButton.innerHTML = '<img src="assets/images/video/pause-btn.png"/>';
			  } 
			  else {	
			    video.pause();			
			    playButton.innerHTML = '<img src="assets/images/video/play-btn.png"/>';
			  }
			});   

			// skip button
			skipbtn.addEventListener("click", function() {
				finishVideo();
			});
            
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
					
			video.addEventListener("timeupdate", function() {
			  var value = (100 / video.duration) * video.currentTime;
			  
			  var time = video.currentTime;
				var minutes = Math.floor(time / 60);   
				var seconds = Math.floor(time); 
			  
			  // calculate one percent first 			  
			  var percent = (video.duration/100);
			  // set current percent
			  var currentPercent = Math.round((value/percent)*100)/100;
			  $("#load-bar #loader").css('width',currentPercent+"%");
			  
			  // setting the time
			  $("#time-indicator").html(minutes+":"+seconds);
			  // duratie totaal
			  var totalMinutes = Math.floor(video.duration / 60);   
			  var totalSeconds = Math.floor(video.duration-(video.duration-(totalMinutes*60))); 
			  $("#time-duration").html("/" + totalMinutes+":"+totalSeconds);
			});	
			
			
		function finishVideo(){
			
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
			// if the video is ended show in background;
			video.pause();
			video.currentTime = 0;
			$("#video-container #load-bar").hide();
			$("#video-container #video-controls").hide();
			$("#video-container video").css('z-index',1);
			$('.dilemma .question').fadeIn();
			
		}
		
		
		// when the video ends
		$("#main-video").get(0).onended = function(e) {
			finishVideo();
		};
	});

	$('.label').click(function(){
		var personID = $(this).attr('data-person');
		$('#dilemma-p'+personID+' .summery').show();
		$('#dilemma-p'+personID).fadeIn();
		// video
		$("video").width('100%');
		$("video").height('100%');
		$("#video-container").fadeIn();		
		$("#video-container #video-controls").hide();
		$("#video-container #load-bar").hide();
	});

	$(window).click(function(){
		//$('#score-overlay').toggleClass('visible');
	});
});
