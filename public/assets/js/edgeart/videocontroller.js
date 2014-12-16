var VControl = function(){

	this.currentvid = '';
	this.videos;

	this.init = function(){		
		this.preload('p1');
		//this.preload('thijs');
	};

	this.preload = function(name){
		
		this.videos = Array(
			'https://s3-us-west-2.amazonaws.com/dopefreegame/videos/'+name+'/antwoord.mp4',
			'https://s3-us-west-2.amazonaws.com/dopefreegame/videos/'+name+'/antwoord_a.mp4',
			'https://s3-us-west-2.amazonaws.com/dopefreegame/videos/'+name+'/antwoord_b.mp4',
			'https://s3-us-west-2.amazonaws.com/dopefreegame/videos/'+name+'/antwoord_c.mp4',
			'https://s3-us-west-2.amazonaws.com/dopefreegame/videos/'+name+'/antwoord_d.mp4',
			'https://s3-us-west-2.amazonaws.com/dopefreegame/videos/'+name+'/antwoord_e.mp4',
			'https://s3-us-west-2.amazonaws.com/dopefreegame/videos/'+name+'/verhaal.mp4'			
		);
		
		for(var i=0; i<this.videos.length; i++){
	
			var obj,source;
			//console.log(i);
			obj = document.createElement('video');
			$(obj).attr('id','video'+i);
			$(obj).attr('muted', 'muted');
			$(obj).attr('autostart', 'autostart');
			$(obj).attr('preload', 'auto');
			$(obj).attr('style', 'display:none;');
			source = document.createElement('source');
			$(source).attr('type', 'video/mp4');
			$(source).attr('src', this.videos[i]);
			

			$(obj).append(source);
			$("#dilemma-"+name+" #video-container").append(obj);
			obj.play();	
			//console.log(i,name);
			this.load(i,name);
			//console.log(name);
		}
	};
	
	this.load = function(i,name){
		video = Array();
		video[i] = $('#video'+i).get(0);

			
		video[i].oncanplay = function() {
			console.log(name + " : " + (i+1) + " : " +(this.videos.length));
			if((i+1) == (this.videos.length)){
				console.log('done pre-loading'); 
			}
			
		}.bind(this);
		
		
	};

	this.play = function (id){

	};

	this.pause = function (id){

	};

};

var vControl = new VControl();
vControl.init();

