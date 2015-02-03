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

        $('#game-interface .label').on('click touchend', this.showDilemma.bind(this));

        //tijdelijk: Reset de game wanneer alles beantwoord is.

        if($('.person-select button.finished').length >= 0) {
            console.log('/finish')
            pControl.load('finish');
            //alert('Einde van de game, de game wordt automatisch gereset nu');
            //$.get( "resetsubmission", function( data ) {

            //}, 'json');
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
            //this.onDilemmaDone.bind(this);
            //this.currentDilemma.hide(this.onDilemmaDone.bind(this));
        }.bind(this), 3000);
    };

    this.updateLoadingStatus = function(status) {

        videosPercent = vControl.preloadPercent;
        imagesPercent = carousel.preloadPercent;

        if (!videosPercent) videosPercent = 0;
        if (!imagesPercent) imagesPercent = 0;

        //videosPercent = 100;
        this.loadedPercent = Math.floor((videosPercent+imagesPercent)/2);
        if ( this.loadedPercent == 100 ){
            carousel.render(0);
            $('#loading-overlay').fadeOut();
        }
        $('#loading-overlay .counter').html(this.loadedPercent);
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
        answer1: this.videocontainer.find('.answer1'),
        answer2: this.videocontainer.find('.answer2'),
        answer3: this.videocontainer.find('.answer3'),
        answer4: this.videocontainer.find('.answer4'),
        answer5: this.videocontainer.find('.answer5'),
        ending: this.videocontainer.find('.answer')
    };
    this.currentVideo;

    this.init = function(){
        this.hide();
        this.closeButton.bind("click touchend", this.hide.bind(this));
        this.answers.bind("click touchend", this.checkAnswer.bind(this));
        this.summery.startbutton.bind("click touchend", this.startChallenge.bind(this));

        if (this.isFinished) this.finish();
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
            if(data.success) {
                var score = ('0' + data.result.answerscore).slice(-2);
                app.showScoreFlag(score);
                this.question.find('.inner').css('padding-left', '150px');
                this.hidePart(this.question);
                this.videos.main.hide();

                if(answerID == 1) this.videos.answer1.show();
                if(answerID == 2) this.videos.answer2.show();
                if(answerID == 3) this.videos.answer3.show();
                if(answerID == 4) this.videos.answer4.show();
                if(answerID == 5) this.videos.answer5.show();

                vControl.play(this.id, 'answer'+answerID).onended = function(){
                    this.videos.answer1.hide();
                    this.videos.answer2.hide();
                    this.videos.answer3.hide();
                    this.videos.answer4.hide();
                    this.videos.answer5.hide();
                    this.videos.ending.show();
                    vControl.play(this.id, 'answer').onended = function(){
                        this.hide();
                    }.bind(this);
                }.bind(this);
            }else{
                //alert('deze vraag is al beantwoord');
            }
            this.finish();
        }.bind(this), 'json');
    };

    this.startChallenge = function(e){
        this.hidePart(this.summery);
        vControl.play(this.id, 'main').onended = function(){
            this.showPart(this.question);
        }.bind(this);
    };

    this.show = function() {
        this.videocontainer.show();
        this.videos.main.show();
        this.source.fadeIn(400, function(){
            this.summery.addClass('visible');
        }.bind(this));
    };

    this.hide = function(onCompleteFunc) {
        if(vControl.currentVideo) {
            $.each(vControl.videos, function(i, video){
                video.elem.pause();
                video.elem.currentTime = 0;
            });
        }
        if (typeof(onCompleteFunc) != "function") onCompleteFunc = function(e){};

        this.source.fadeOut(400, function(){
            this.summery.show();
            this.question.hide();
            this.videocontainer.hide();
            this.summery.removeClass('finished');
            this.question.removeClass('visible');
            app.scoreFlag.css('z-index', '-1');

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
        element.removeClass('visible');
        element.addClass('finished');
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
