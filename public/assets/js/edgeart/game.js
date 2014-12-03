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
		$(this).closest('.dilemma').find('.question').fadeIn();
	});

	$('.label').click(function(){
		var personID = $(this).attr('data-person');
		$('#dilemma-p'+personID+' .summery').show();
		$('#dilemma-p'+personID).fadeIn();
	});

	$(window).click(function(){
		//$('#score-overlay').toggleClass('visible');
	});
});
