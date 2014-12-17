var PControl = function(){

	this.currentvid = '';
	this.container = $('body #ajaxContainer');

	this.init = function(){

		this.initForms();

		$(document).on("click", "a", function(e){
			url = $(e.currentTarget).attr('href');
			this.load(url);
		}.bind(this));
	};

	this.load = function(url){
		$.get(url, function(data){
			$('body #ajaxContainer').empty().append(data);
			$(window).resize();
		});
	};

	this.initForms = function (){
		$(document).on("submit", "form", function(e){
		    e.preventDefault();
			$postdata = $(this).serialize();
			var posting = $.post($(this).attr('action'), $postdata, function(data){
				$('body #ajaxContainer').empty().append(data);
				$(window).resize();
			});
		});
	};
};

var pControl = new PControl();
pControl.init();