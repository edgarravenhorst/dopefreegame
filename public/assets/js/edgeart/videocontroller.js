var VControl = function(){

    this.personCount = 5;

    this.videos = []

    this.videosToPreload = [];
    this.preloadedCount = 0;

    this.amazonURL = 'https://s3-us-west-2.amazonaws.com/dopefreegame/videos/';

    this.init = function(){
        this.setupVideoData();
    }

    this.setupVideoData = function(){

        for(var i=1; i< (this.personCount+1); i++){
            pid = 'p'+i;
            this.amazonURL += pid + '/';

            var videoObj = {
                id: pid,
                videodata: [
                    {name: 'main', url: this.amazonURL+"verhaal.mp4", preload:true},
                    {name: 'answer', url: this.amazonURL+"antwoord.mp4", preload:false},
                    {name: 'answer1', url: this.amazonURL+"antwoord_a.mp4", preload:false},
                    {name: 'answer2', url: this.amazonURL+"antwoord_b.mp4", preload:false},
                    {name: 'answer3', url: this.amazonURL+"antwoord_c.mp4", preload:false},
                    {name: 'answer4', url: this.amazonURL+"antwoord_d.mp4", preload:false},
                    {name: 'answer5', url: this.amazonURL+"antwoord_e.mp4", preload:false}
                ]
            };

            $.each(videoObj.videodata, function(i, videoData){
                var videoObj = this.createVideoTag(pid, videoData);
                if(videoData.preload){
                    this.videosToPreload.push(videoObj);
                }
            }.bind(this))
        }
    }

    this.preloadVideo = function(videoObject, onCompleteFunc ){

        videoObject.addEventListener("canplay", function(e){



        }.bind(this))

    }

    this.getVideo = function(){
        var selectedVideo;
        $.each(this.videos, function(i, video){
            if (video.id == pid && video.name == name)
                selectedVideo = video
        });
        return selectedVideo
    }

    this.createVideoTag = function(id, videoData){

        var obj,source;
        obj = document.createElement('video');
        $(obj).attr('class',videoData.name);
        $(obj).attr('muted', 'muted');
        $(obj).attr('width', '100%');
        $(obj).attr('height', 'auto');
        $(obj).attr('preload', 'none');
        //$(obj).attr('autoplay', 'true');
        $(obj).attr('style', 'display:none;');
        source = document.createElement('source');
        $(source).attr('type', 'video/mp4');
        $(source).attr('src',videoData.url);
        $(obj).append(source);

        $("#dilemma-"+id+" .videocontainer").append(obj);
        this.videos.push(obj);
    }

}














/*

var VControl = function(){

    this.persons = 5;
    this.videosToPreload = 0;
    this.checkCounter = 0;
    this.preloadPercent;
    this.debug = false;
    this.videos = Array();
    this.controls = $('#video-controls');
    this.currentVideo;

    this.init = function(){
        for(var i=1; i<(this.persons+1);i++){
            this.initVideos('p'+i);
        }

        $('#video-controls #skip-btn').on('click touchend', function(){
            //console.log(this.currentVideo);
            this.currentVideo.elem.currentTime = this.currentVideo.elem.duration;
        }.bind(this));
        //$('#game-interface .label').on('click touchend', this.showDilemma.bind(this));
        //$('#game-interface .label').on('click touchend', this.showDilemma.bind(this));

    };

    this.initVideos = function(pid){

        console.log("PID: "+pid);

        this.amazonURL = 'https://s3-us-west-2.amazonaws.com/dopefreegame/videos/'+pid+'/';

        this.videoObj = {
            id: pid,
            videodata: [
                {name: 'main', url: this.amazonURL+"verhaal.mp4", preload:true},
                {name: 'answer', url: this.amazonURL+"antwoord.mp4", preload:false},
                {name: 'answer1', url: this.amazonURL+"antwoord_a.mp4", preload:false},
                {name: 'answer2', url: this.amazonURL+"antwoord_b.mp4", preload:false},
                {name: 'answer3', url: this.amazonURL+"antwoord_c.mp4", preload:false},
                {name: 'answer4', url: this.amazonURL+"antwoord_d.mp4", preload:false},
                {name: 'answer5', url: this.amazonURL+"antwoord_e.mp4", preload:false}
            ]
        };

        $.each(this.videoObj.videodata, function(i,video){
            this.createVideoTag(pid,video.name,video.url,video.preload);
            if(video.preload && this.debug==false){
                this.videosToPreload++;
                this.preload(pid,video.name);
            }
            else{
                //this.preloadPercent = 100;
                //app.updateLoadingStatus();
            }
        }.bind(this))
    }

    this.preload = function(id, name){

        var videoObject = $('#dilemma-'+id+' video.'+name).get(0);
        videoObject.addEventListener("canplay", function(){
            console.log(videoObject)
            this.videos.push({
                id:id,
                name:name,
                elem:videoObject
            });

            videoObject.pause();
            videoObject.currentTime = 0;

            videoObject.ontimeupdate = function(e) {
                var timeInMinutes = this.formatTime(e.currentTarget.currentTime);
                this.controls.find('#time-indicator').text(timeInMinutes);
            }.bind(this);
            this.checkCounter++;
            this.preloadPercent = (this.checkCounter/this.videosToPreload) * 100;
            console.log(Math.ceil(this.preloadPercent)+'%');
            app.updateLoadingStatus();
        }.bind(this));
        //videoObject.oncanplay = function() {


        //
        //}.bind(this);
    }

    this.formatTime = function(seconds) {
        minutes = Math.floor(seconds / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }

    this.createVideoTag = function(id,name,url,preload){

        var obj,source;
        obj = document.createElement('video');
        $(obj).attr('class',name);
        $(obj).attr('muted', 'muted');
        $(obj).attr('width', '100%');
        $(obj).attr('height', 'auto');

        if(id=='p4'){
            console.log(id)
            $(obj).attr('preload', 'none');
        }else{
            $(obj).attr('preload', 'none');}
        //$(obj).attr('autoplay', 'true');
        $(obj).attr('style', 'display:none;');
        source = document.createElement('source');
        $(source).attr('type', 'video/mp4');
        $(source).attr('src',url);

        $(obj).append(source);
        $("#dilemma-"+id+" .videocontainer").append(obj);
        //if(preload)
        obj.play();
    }

    this.play = function(id, name) {
        var pid = 'p'+id;
        var videoObj = {};
        var videoElem;

        $.each(this.videos, function(i, video){
            if (video.id == pid && video.name == name) {
                video.elem.play();
                video.elem.muted = false;
                audioControl.setMute(true);
                videoElem = video.elem;
                videoObj = video;
            }
        });

        this.controls.find('#time-duration').text(' - ' + this.formatTime(videoElem.duration));
        this.currentVideo = videoObj;

        return videoElem;
    }

    this.pause = function(id, name){
        var pid = 'p'+id;
        var videoElem;

        $.each(this.videos, function(i, video){
            if (video.id == pid && video.name == name) {
                video.elem.pause();
                video.elem.muted = true;
                audioControl.setMute(false);
                videoElem = video.elem;
            }
        });

        return videoElem;
    }

    this.reset = function(id, name){
        var pid = 'p'+id;
        var videoElem;

        $.each(this.videos, function(i, video){
            if (video.id == pid && video.name == name) {
                video.elem.currentTime = 0;
                videoElem = video.elem;
            }
        });

        return videoElem;
    }
};
*/
var vControl = new VControl();
vControl.init();

