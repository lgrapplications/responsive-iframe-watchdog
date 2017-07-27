function onload_youtube() {
	// Note: All function declarations must preceed a call to that function.

	// Create an object to hold YouTube ID and Optional Playlist
	//  to make availableto all functions and events.
	window.youtubeObject = {
		id: '',
		playlist: ''
	};

	function lgrriw_YouTube_ParseURL( youtubeID, youtubeObject ){
		// The purpose of this function is to extract the
		// youtube ID and an optional Playlist by parsing
		// variations in URL syntax
		// Example YouTube URL: https://www.youtube.com/watch?v=VjhmQSX62pQ&feature=youtu.be
		
		if( typeof youtubeID !== 'undefined' && youtubeID !== '' ){
			var work = youtubeID;
			// Check if pasted id has a youtube domain
			if( work.indexOf('//www.youtube.com/') > -1 || work.indexOf('//youtube.com/') > -1  || work.indexOf('//youtu.be/') > -1 ){
				// This is a youtube domain
			}
			else if( work.indexOf('/') == -1 ){
				// This is a potential youtube bare ID
			}
			else{
				$('#youtube_id').val('');
				alert("The code you pasted: "+youtubeID+" is not YouTube's!!! Please try again");
				return;
			}
			// Extract src attribute value from iframe if embed code was pasted
			work = lgrriw_GetURLFromEmbedCode( work );
			//// Check to see if this is a valid domain
			//if( !lgrriw_IsValidDomain( work ) ) {
			//	return false;
			//}
			// Make sure it is not empty
			if( youtubeID !== work ){
				youtubeObject.id = work;
				$( '#youtube_id', jq_context ).val(work);
				youtubeParameters['youtube_id'] = work;
			}
			// Strip out all URL path variations
			youtubeParameters["border"] = '0';
			work = work.replace("https://www.youtube.com/watch?v=","");
			work = work.replace("http://www.youtube.com/watch?v=","");
			work = work.replace("//www.youtube.com/watch?v=","");
			work = work.replace("www.youtube.com/watch?v=","");
			work = work.replace("youtube.com/watch?v=","");
			
			work = work.replace("https://www.youtube.com/embed/","");
			work = work.replace("http://www.youtube.com/embed/","");
			work = work.replace("//www.youtube.com/embed/","");
			work = work.replace("www.youtube.com/embed/","");
			work = work.replace("youtube.com/embed/","");
			
			work = work.replace("https://youtu.be/watch?v=","");
			work = work.replace("http://youtu.be/watch?v=","");
			work = work.replace("//youtu.be/watch?v=","");
			work = work.replace("youtu.be/watch?v=","");
			
			work = work.replace("https://youtu.be/","");
			work = work.replace("http://youtu.be/","");
			work = work.replace("//youtu.be/","");
			work = work.replace("youtu.be/","");
			// If a playlist was specified replace the ? with &
			// to avoid conflicts with defaulted parameters
			work = work.replace("?list=","&list=");
			var arraySplit = work.split("&");
			youtubeObject.id = arraySplit[0];
			// Search for playlist
			delete youtubeObject.playlist;
			delete youtubeParameters['list'];
			if( arraySplit.length > 1 ){
				for (i = 1; i < arraySplit.length; i++) { 
					if( arraySplit[i].indexOf('list=') > -1 ){
						// Found Playlist
						youtubeObject.playlist = arraySplit[i];
						break;
					}
				}
			}
			lgrriw_PreviewEmbedCode('youtube_item');
		}
	}
	
	// Turn off autocomplete on all textboxes so they
	// don't appear on top of mouseover dropdown lists
	$( '.textbox', jq_context ).attr('autocomplete', 'off');
	$( '.textbox_center', jq_context ).attr('autocomplete', 'off');

	$( "#youtube_id", jq_context ).on( 'input', function() {
		//alert('youtube change keyup paste new');
		lgrriw_YouTube_ParseURL( $(this).val(), youtubeObject );
		youtubeParameters["youtube_id"] = youtubeObject.id;
		lgrriw_PreviewEmbedCode('youtube_item');
	});
	$( "#youtube_id", jq_context ).keypress(function(evt) {
		lgrriw_MakeReadOnlyWithClipboard( evt );
	});
	$( "#youtube_protocol div", jq_context ).click(function() {
		youtubeParameters["youtube_protocol"] = $(this).text().toLowerCase();
		lgrriw_PreviewEmbedCode('youtube_item');
	});
	// Optional YouTube Parameters are in an accociative array where the key
	// is the actual YouTube parameter name and the value is the actual YouTube
	// parameter value
	$( "#youtube_border div", jq_context ).click(function() {
		if( $(this).text() == 'None'){
			youtubeParameters["border"] = '0';
		}
		else{
			youtubeParameters["border"] = $(this).text().replace("Tiny","1px").replace("Small","2px").replace("Medium","3px").replace("Large","4px");
		}
		
		lgrriw_PreviewEmbedCode('youtube_item');
	});

	$( "#youtube_bordercolor", jq_context ).on( 'change keyup paste', function() {
		if( $(this).val() == '#00ff00'){
			youtubeParameters["bordercolor"] = '#00ff00';
		}
		else{
			youtubeParameters["bordercolor"] = $(this).val();
		}
	//alert("bordercolor = "+youtubeParameters["bordercolor"]); // Got it here
		lgrriw_PreviewEmbedCode('youtube_item');
	});

	$( "#youtube_autoplay", jq_context ).on( 'change keyup paste', function() {
		var autoPlay = "on";
		if( !( $(this).attr('checked') ) ){
			autoPlay = "off";
		}
		if( autoPlay == 'off'){
			delete youtubeParameters["autoplay"];
		}
		else{
			youtubeParameters["autoplay"] = '1';
		}
		lgrriw_PreviewEmbedCode('youtube_item');
	});
	$( "#youtube_fullscreen", jq_context ).on( 'change keyup paste', function() {
		var allowFullScreen = "on";
		if( !( $(this).attr('checked') ) ){
			allowFullScreen = "off";
		}
		//alert(allowFullScreen);
		if( allowFullScreen == 'on'){
			delete youtubeParameters["fs"];
		}
		else{
			youtubeParameters["fs"] = '0';
		}
		lgrriw_PreviewEmbedCode('youtube_item');
	});
	$( "#youtube_showinfo", jq_context ).on( 'change keyup paste', function() {
		var showInfo = "on";
		if( !( $(this).attr('checked') ) ){
			showInfo = "off";
		}
		if( showInfo == 'on'){
			delete youtubeParameters["showinfo"];
		}
		else{
			youtubeParameters["showinfo"] = '0';
		}
		lgrriw_PreviewEmbedCode('youtube_item');
	});
	$( "#youtube_showrelated", jq_context ).on( 'change keyup paste', function() {
		var showRelated = "on";
		if( !( $(this).attr('checked') ) ){
			showRelated = "off";
		}
		if( showRelated == 'off'){
			youtubeParameters["rel"] = '0';
		}
		else{
			delete youtubeParameters["rel"];
		}
		lgrriw_PreviewEmbedCode('youtube_item');
	});
	$( "#youtube_showannotations", jq_context ).on( 'change keyup paste', function() {
		var showAnnotations = "on";
		if( !( $(this).attr('checked') ) ){
			showAnnotations = "off";
		}
		if( showAnnotations == 'off'){
			youtubeParameters["iv_load_policy"] = '3';
		}
		else{
			delete youtubeParameters["iv_load_policy"];
		}
		lgrriw_PreviewEmbedCode('youtube_item');
	});
	$( "#youtube_aspectratio div", jq_context ).click(function() {
		if($(this).text() == '16:9' ){
			delete youtubeParameters['aspectratio'];
		}
		else{
			youtubeParameters['aspectratio'] = "4:3";
		}
		lgrriw_PreviewEmbedCode('youtube_item');
	});
	
	$( '.dropdown_item', jq_context ).click(function() {
        //alert($(this).text());
		$(this).parent().css("display", "none");
		$(this).parent().css("z-index", "-1");
    	//$('.dropdown_content', jq_context).css("display", "none");
        $(this).parent().children().removeClass('active');
        $(this).addClass('active');
        $(this).parent().parent().children().first().text($(this).text());
		//alert($(this).parent().parent().children().first().text());
    });
    $( '.dropdown', jq_context ).mouseover(function() {
       // alert($(this).text());
		$(this).find('.dropdown_content', jq_context).css("display", "block");
		$(this).find('.dropdown_content', jq_context).css("z-index", "999");
    	//$('.dropdown_content', jq_context).css("display", "block");
    });
    $( '.dropdown', jq_context ).mouseleave(function() {
        //alert($(this).text());
		$(this).find('.dropdown_content', jq_context).css("display", "none");
		$(this).find('.dropdown_content', jq_context).css("z-index", "888");
    	//$('.dropdown_content', jq_context).css("display", "none");
    });
	
	$( "#youtube_videoquality div", jq_context ).click(function() {
		if( $(this).text() == '720p'){
			delete youtubeParameters["vq"];
		}
		else{
			youtubeParameters["vq"] = $(this).text().replace("240p","small").replace("360p","medium").replace("480p","large").replace("720p","hd720").replace("1080p","hd1080");
		}
		
		lgrriw_PreviewEmbedCode('youtube_item');
	});
	
	$( "#youtube_start", jq_context ).on( 'change keyup paste', function() {
		if( $(this).val() == ''){
			delete youtubeParameters["start"];
		}
		else{
			youtubeParameters["start"] = $(this).val().replace("off","0").replace("on","1");
		}
		lgrriw_PreviewEmbedCode('youtube_item');
	});
	$( "#youtube_end", jq_context ).on( 'change keyup paste', function() {
		if( $(this).val() == ''){
			delete youtubeParameters["end"];
		}
		else{
			youtubeParameters["end"] = $(this).val().replace("off","0").replace("on","1");
		}
		lgrriw_PreviewEmbedCode('youtube_item');
	});
}

function lgrriw_ResolveDefaultYoutubeSettings( youtubeParameters ){
		//alert('youtubeParameters["youtube_id"] = '+youtubeParameters["youtube_id"]);
		//alert('hello = '+window.youtubeObject.playlist);
		if( typeof window.youtubeObject.playlist !== 'undefined'){
			youtubeParameters["list"] = window.youtubeObject.playlist.replace("list=","");
		}
		var youtubePath = '://www.youtube.com/embed/';
		//var youtubePath = '://youtu.be/embed/'; // Can't get short syntax redirect to work on playlists
		// Set defasult aspectratio
		var aspectRatio = youtubeParameters['aspectratio'];
		if( typeof aspectRatio == 'undefined' ){
			aspectRatio = '16:9';
		}
		
		// Full Screen Default?
		var fullScreen = youtubeParameters['fs'];
		var allowFullScreen ='';
		if( typeof fullScreen == 'undefined' ){
			allowFullScreen = ' allowfullscreen="allowfullscreen"';
			delete youtubeParameters['fs'];
		}
		else{
			// YouTube defaluts to allowfullscreen if fs not specified
			if( fullScreen == '0'){
				allowFullScreen = '';
			}
			else{
				allowFullScreen = ' allowfullscreen="allowfullscreen"';
				delete youtubeParameters['fs'];
			}
		}
		
		var responsiveWrapper = '';
		var border = '';
		var bordercolor = youtubeParameters["bordercolor"];
		if( typeof bordercolor == 'undefined'){
			bordercolor = '#00ff00';
		}
		
		if( typeof youtubeParameters["border"] !== 'undefined' ){
			border = "border: "+youtubeParameters["border"]+" solid "+bordercolor+"; ";
		}
		
		if( aspectRatio == '16:9' ){
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"][lgrriw_iframe style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+youtubeParameters['youtube_protocol'].toLowerCase()+youtubePath+youtubeParameters['youtube_id'];
			//alert('16:9');
		}
		else{
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"][lgrriw_iframe style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+youtubeParameters['youtube_protocol'].toLowerCase()+youtubePath+youtubeParameters['youtube_id'];
			//alert('4:3');
		}
		// Concatinate all optional parameters starting in array at item #3
		parameterCount = Object.keys(youtubeParameters).length;
		var optionalParameters = '';
		var optionalParameterDelimeter = '';
		var isFirstOptionalParameter = true;
			//alert(youtubeParameters['showinfo']);
			//alert(youtubeParameters.list);
		//delete youtubeParameters["bordercolor"];
		//delete youtubeParameters["border"];
		if( parameterCount > 2 ){
			for (var key in youtubeParameters) {
				if( key != 'youtube_protocol' && key != 'youtube_id' && key != 'aspectratio' && key != 'border'  && key != 'bordercolor' ){
					if( isFirstOptionalParameter == true ){
						isFirstOptionalParameter = false;
						optionalParameterDelimeter = "?";
					}
					else{
						optionalParameterDelimeter = "&";
					}
					optionalParameters += optionalParameterDelimeter + key + "=" + youtubeParameters[key];
					//alert(optionalParameters);
				}
			}
		}
		else{
		}
		//alert(optionalParameters);
		if( typeof youtubeParameters["youtube_id"] == 'undefined' ){
			$( '.preview_content', jq_context ).val('');
		}
		else{
			$( '.preview_content', jq_context ).val(responsiveWrapper+optionalParameters+'"][/lgrriw_iframe][/lgrriw_div]');
		}
		//alert('hello');

}
