var AControl = function(){

    this.A_audio = Array();
    this.isMuted = false;

    this.init = function(){

        $.each($('audio'), function(i, elem){

            var jQ_elem = $(elem);
            var audioObj = {
                id:jQ_elem.attr('id'),
                isPlaying:elem.autoplay,
                loop:elem.loop,
                autoplay:elem.autoplay,
                elem:elem
            }
             this.A_audio.push(audioObj);

        }.bind(this));

        $('.mute-btn').on('click touchend', this.toggleMute.bind(this));
    };

    this.play = function(id){
        if (!isMuted) {
            //play audio file;
        }
    }

    this.setMute = function(val){
        this.isMuted = val

        $.each(this.A_audio, function (i, audioObj){
            var audioElem = document.getElementById(audioObj.id);
            if (this.isMuted) audioElem.pause();
            else audioElem.play();

        }.bind(this));

        if (this.isMuted) $('.mute-btn').addClass('muted')
        else  $('.mute-btn').removeClass('muted')
    }

    this.toggleMute = function(e){
        this.isMuted = !this.isMuted;
        this.setMute(this.isMuted);
    }


    this.init();
};

var audioControl = new AControl();
