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
					  var totalMinutes = Math.floor(video.duration / 60);   
					  var totalSeconds = Math.floor(video.duration-(video.duration-(totalMinutes*60))); 
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
		
		var anwser = $(".answers li.checked").attr("data-id");
		
		$("video").attr('src','https://s3-us-west-2.amazonaws.com/dopefreegame/videos/antwoord+'+anwser+'+-+thijs_YouTube_1080p.mp4');
		$("video").get(0).play();
		$("#video-container").fadeIn();
		$(".content").hide();
		$("#score-overlay").hide();
		
		// als het antwoord gespeeld heeft
		$("video").get(0).onended = function(e) {
			$("video").get(0).pause();
			$("video").attr('src','https://s3-us-west-2.amazonaws.com/dopefreegame/videos/antwoord+-+thijs_YouTube_1080p.mp4');
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

	$('.dilemma .btn-start-challenge').click(function(e){
		$(this).closest('.dilemma').find('.summery').fadeOut();
		
			// play the video	
			video.src="https://s3-us-west-2.amazonaws.com/dopefreegame/videos/verhaal+-+thijs_YouTube_1080p.mp4";
			//enterFullscreen();
			video.play();	
			$("#video-container #video-controls").show();
			$("#video-container #load-bar").show();
			
			controlsInit('basic');	
		
		// when the video ends
		$("#main-video").get(0).onended = function(e) {
			finishBasicVideo();
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
		$("#video-container video").css('z-index',333333);
		$("#video-container #video-controls").hide();
		$("#video-container #load-bar").hide();
	});

	$(window).click(function(){
		//$('#score-overlay').toggleClass('visible');
	});
});
