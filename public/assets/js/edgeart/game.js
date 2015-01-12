var Application = function(){
	window.scrollTo(0,1);

	this.carousel = carousel;

	this.dilemmaCount;
	this.dilemmas = Array();
	this.currentDilemma;

	this.scoreFlag = $('#score-overlay');
	this.scoreFlag.css('z-index', '-1');
	this.loadedPercent = 0;

	this.init = function(){
		$.each($('.dilemma'), function(i, htmlobj){
			var id = $(htmlobj).attr('data-id');
			this.dilemmas[id] = new Dilemma(id, htmlobj);
		}.bind(this));

		this.dilemmaCount = this.dilemmas.length;

		//$('#carousel').on('click', this.showDilemma.bind(this));
		$('#game-interface .label').on('click touchend', this.showDilemma.bind(this));

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

	this.updateLoadingStatus = function(status) {

		videosPercent = vControl.preloadPercent;
		imagesPercent = carousel.preloadPercent;

		if (!videosPercent) videosPercent = 0;
		if (!imagesPercent) imagesPercent = 0;

		this.loadedPercent = Math.floor((videosPercent+imagesPercent)/2);
		if ( this.loadedPercent == 100 ){
			carousel.render(0);
	    	$('#loading-overlay').fadeOut();
	    }
		$('#loading-overlay .counter').html(this.loadedPercent);
		console.log('loaded', this.loadedPercent, "%");

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
		main: this.videocontainer.find('.main'),
		answer1: this.videocontainer.find('.answer_a'),
		answer2: this.videocontainer.find('.answer_b'),
		answer3: this.videocontainer.find('.answer_c'),
		answer4: this.videocontainer.find('.answer_d'),
		answer5: this.videocontainer.find('.answer_e'),
		ending: this.videocontainer.find('.answer')
	};
	this.currentVideo;

	this.init = function(){
		this.hide();
		this.closeButton.bind("click touchend", this.hide.bind(this));
		this.answers.bind("click touchend", this.checkAnswer.bind(this));
		this.summery.startbutton.bind("click touchend", this.startChallenge.bind(this));

		if (this.isFinished) this.finish();
		console.log(this);
	};

	this.checkAnswer = function(e){
		this.selectedAnswer = $(e.currentTarget);
		this.answers.removeClass('checked');
		this.selectedAnswer.addClass('checked');

		//click event killen of checken of die al bestaat.
		var continuebtn = this.question.find('.btn-continue');
		continuebtn.addClass('active');
		continuebtn.bind("click touchend", this.sendAnswer.bind(this));
	};

	this.sendAnswer = function(e){
		var answerID = this.selectedAnswer.attr('data-id');

		$.get( "submit/" + this.id + "/" + answerID, function( data ) {
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
		if(this.currentVideo) this.currentVideo.get(0).pause();
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
		//console.log(elem.get(0));
		this.currentVideo = elem;
		elem.get(0).play();
		elem.get(0).attr('mute', 'false');
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
