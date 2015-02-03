var PControl = function(){

	this.currentvid = '';
	this.container = $('body #ajaxContainer');
    this.currentURL;
    this.currentForm;

	this.init = function(){

		this.initForms();

		$(document).on("click", "a", function(e){
			url = $(e.currentTarget).attr('href');
            console.log(this.currentURL != url);
            if(!this.currentURL || this.currentURL != url){
                this.currentURL = url;
                this.load(url);
            }

		}.bind(this));
	};

	this.load = function(url){
        this.container.fadeOut( 500, function(){
            $.get(url, function(data){
                $('body #ajaxContainer').empty().append(data);
                $(window).resize();
               $('body #ajaxContainer').fadeIn();
            }.bind(this));

        });

	};

	this.initForms = function (){
		$(document).on("submit", "form", function(e){
            e.preventDefault();
            //console.log(this.currentForm != e.target);
            if(!this.currentForm || this.currentForm != e.target){
                this.currentForm = e.target;

                $postdata = $(this).serialize();
                var posting = $.post($(this).attr('action'), $postdata, function(data){
                    $('body #ajaxContainer').empty().append(data);
                    $(window).resize();
                });
            }
		});
	};
};

var pControl = new PControl();
pControl.init();
