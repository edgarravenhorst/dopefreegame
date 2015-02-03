var scrollbar;
var scrollInitialized = false;

function initScrollbar(elem){
    var windowW = window.innerWidth;

		if (windowW > 950 && !scrollInitialized) {
			scrollbar = $(elem).jScrollPane({
				hideFocus :true
			}).data().jsp;
			scrollInitialized = true;
		}

		if (windowW < 950 && scrollInitialized){
			scrollbar.destroy();
			scrollInitialized = false;
		}
	}
