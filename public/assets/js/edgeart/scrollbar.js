$(document).ready(function(){
	var scrollbar;
	var scrollInitialized = false;
	function onresizeFunc(){
		var windowW = window.innerWidth;

		if (windowW > 950 && !scrollInitialized) {
			scrollbar = $('.scroll-content').jScrollPane({
				hideFocus :true
			}).data().jsp;
			scrollInitialized = true;
		}

		if (windowW < 950 && scrollInitialized){
			scrollbar.destroy();
			scrollInitialized = false;
		}
	}

	window.onresize = onresizeFunc;
	onresizeFunc();
});