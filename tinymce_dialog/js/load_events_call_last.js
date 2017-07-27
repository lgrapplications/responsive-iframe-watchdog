function addLoadEvent(func) {
	// This function makes sure that all js files fire an
	// window.onload event.  The only requirement is that
	// you must call it last in the html header in the format:
	// <script type="text/javascript" src="load_events_call_last.js">
	var first_onload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
		if (first_onload) {
			first_onload();
		}
		func();
		}
	}
}
// Now for each js file you must add a new event handler
// calling  the js file's container function
addLoadEvent(onload_youtube);
addLoadEvent(onload_vimeo);
addLoadEvent(onload_livestream);
addLoadEvent(onload_brightcove);
addLoadEvent(onload_dailymotion);
addLoadEvent(onload_other);
addLoadEvent(onload_html);









