function onload_dailymotion() {
	// Note: All function declarations must preceed a call to that function.

	// Create an object to hold Dailymotion ID to make available
	// to all functions and events.
	window.dailymotionObject = {
		id: '',
		playlist: ''
	};

	function lgrriw_Dailymotion_ParseURL( dailymotionID, dailymotionObject ){
		// The purpose of this function is to extract the
		// dailymotion ID and an optional Playlist by parsing
		// variations in URL syntax
		if( typeof dailymotionID !== 'undefined' && dailymotionID !== '' ){
			var work = dailymotionID;
			// Check if pasted id has a dailymotion domain
			if( work.indexOf('//www.dailymotion.com/') > -1 || work.indexOf('//dailymotion.com/') > -1 ){
				// This is a dailymotion domain
			}
			else if( work.indexOf('/') == -1 ){
				// This is a potential dailymotion bare ID
			}
			else{
				$('#dailymotion_id').val('');
				alert("The code you pasted: "+dailymotionID+" is not Dailynotion's!!! Please try again");
				return;
			}
			// Extract src attribute vale from iframe if embed code was pasted
			work = lgrriw_GetURLFromEmbedCode( work );
			if( dailymotionID !== work ){
				dailymotionObject.id = work;
				$( '#dailymotion_id', jq_context ).val(work);
				dailymotionParameters['dailymotion_id'] = work;
			}
			// Strip out all URL path variations
			// Note: Playlists require Javasscripting and JSON through the API
			// therefore they will not be supported at this time.
			dailymotionParameters["border"] = '0';
			work = work.replace("https://www.dailymotion.com/embed/video/","");
			work = work.replace("http://www.dailymotion.com/embed/video/","");
			work = work.replace("//www.dailymotion.com/embed/video/","");
			work = work.replace("www.dailymotion.com/embed/video/","");
			work = work.replace("dailymotion.com/embed/video/","");

//www.dailymotion.com/embed/video/x52j2en
			
			work = work.replace("https://www.dailymotion.com/video/","");
			work = work.replace("http://www.dailymotion.com/video/","");
			work = work.replace("//www.dailymotion.com/video/","");
			work = work.replace("www.dailymotion.com/video/","");
			work = work.replace("dailymotion.com/video/","");
			// Check if a playlist was specified and deny it.
			if( work.indexOf('/playlist/') > -1 ){
				// It is a playlist
				work = work.replace("https://www.dailymotion.com/widget/jukebox?list[]=/playlist/","");
				work = work.replace("http://www.dailymotion.com/widget/jukebox?list[]=/playlist/","");
				work = work.replace("//www.dailymotion.com/widget/jukebox?list[]=/playlist/","");
				work = work.replace("www.dailymotion.com/widget/jukebox?list[]=/playlist/","");
				work = work.replace("dailymotion.com/widget/jukebox?list[]=/playlist/","");
				
				work = work.replace("https://www.dailymotion.com/playlist/","");
				work = work.replace("http://www.dailymotion.com/playlist/","");
				work = work.replace("//www.dailymotion.com/playlist/","");
				work = work.replace("www.dailymotion.com/playlist/","");
				work = work.replace("dailymotion.com/playlist/","");
				work = work.replace("?","&");
				var arraySplitPlaylist = work.split("&");
				if( arraySplitPlaylist[0].indexOf( '_' ) > -1 ){
					arraySplitPlaylist = arraySplitPlaylist[0].split("_");
				}
				dailymotionObject.playlist = arraySplitPlaylist[0];
			}
			else{
				// It is not a playlist
				work = work.replace("?","&");
				var arraySplitID = work.split("&");
				dailymotionObject.id = arraySplitID[0];
			}
			//alert('playlist = '+dailymotionObject.playlist);
			//alert('id = '+dailymotionObject.id);
			lgrriw_PreviewEmbedCode('dailymotion_item');
		}
	}
	
	// Turn off autocomplete on all textboxes so they
	// don't appear on top of mouseover dropdown lists
	$( '.textbox', jq_context ).attr('autocomplete', 'off');
	$( '.textbox_center', jq_context ).attr('autocomplete', 'off');

	$( "#dailymotion_id", jq_context ).on( 'input', function() {
		lgrriw_Dailymotion_ParseURL( $(this).val(), dailymotionObject );
		dailymotionParameters["dailymotion_id"] = dailymotionObject.id;
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	$( "#dailymotion_id", jq_context ).keypress(function(evt) {
		lgrriw_MakeReadOnlyWithClipboard( evt );
	});
	$( "#dailymotion_protocol div", jq_context ).click(function() {
		dailymotionParameters["dailymotion_protocol"] = $(this).text().toLowerCase();
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	// Optional Dailymotion Parameters are in an accociative array where the key
	// is the actual Dailymotion parameter name and the value is the actual Dailymotion
	// parameter value
	$( "#dailymotion_border div", jq_context ).click(function() {
		if( $(this).text() == 'None'){
			dailymotionParameters["border"] = '0';
		}
		else{
			dailymotionParameters["border"] = $(this).text().replace("Tiny","1px").replace("Small","2px").replace("Medium","3px").replace("Large","4px");
		}
		
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});

	$( "#dailymotion_bordercolor", jq_context ).on( 'change keyup paste', function() {
		if( $(this).val() == '#00ff00'){
			dailymotionParameters["bordercolor"] = '#00ff00';
		}
		else{
			dailymotionParameters["bordercolor"] = $(this).val();
		}
	//alert("bordercolor = "+dailymotionParameters["bordercolor"]); // Got it here
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});

	$( "#dailymotion_autoplay", jq_context ).on( 'change keyup paste', function() {
		var autoPlay = "on";
		if( !( $(this).attr('checked') ) ){
			autoPlay = "off";
		}
		if( autoPlay == 'off'){
			delete dailymotionParameters["autoplay"];
		}
		else{
			dailymotionParameters["autoplay"] = '1';
		}
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	$( "#dailymotion_fullscreen", jq_context ).on( 'change keyup paste', function() {
		var allowFullScreen = "on";
		if( !( $(this).attr('checked') ) ){
			allowFullScreen = "off";
		}
		if( allowFullScreen == 'on'){
			delete dailymotionParameters["fs"];
		}
		else{
			dailymotionParameters["fs"] = '0';
		}
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	$( "#dailymotion_videotitle", jq_context ).on( 'change keyup paste', function() {
		var showInfo = "on";
		if( !( $(this).attr('checked') ) ){
			showInfo = "off";
		}
		if( showInfo == 'off'){
			dailymotionParameters["info"] = '0';
		}
		else{
			delete dailymotionParameters["info"];
		}
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	$( "#dailymotion_showrelated", jq_context ).on( 'change keyup paste', function() {
		var showRelated = "on";
		if( !( $(this).attr('checked') ) ){
			showRelated = "off";
		}
		if( showRelated == 'off'){
			dailymotionParameters["related"] = '0';
		}
		else{
			delete dailymotionParameters["related"];
		}
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	$( "#dailymotion_sharebuton", jq_context ).on( 'change keyup paste', function() {
		var showSocial = "on";
		if( !( $(this).attr('checked') ) ){
			showSocial = "off";
		}
		if( showSocial == 'off'){
			dailymotionParameters["social"] = '0';
		}
		else{
			delete dailymotionParameters["social"];
		}
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	$( "#dailymotion_playerlogo", jq_context ).on( 'change keyup paste', function() {
		var showLogo = "on";
		if( !( $(this).attr('checked') ) ){
			showLogo = "off";
		}
		if( showLogo == 'off'){
			dailymotionParameters["logo"] = '0';
		}
		else{
			delete dailymotionParameters["logo"];
		}
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	$( "#dailymotion_mute", jq_context ).on( 'change keyup paste', function() {
		var audioMute = "on";
		if( !( $(this).attr('checked') ) ){
			audioMute = "off";
		}
		if( audioMute == 'default' || audioMute == 'off'){
			dailymotionParameters["mute"] = '0';
		}
		else{
			delete dailymotionParameters["mute"];
		}
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	$( "#dailymotion_playerhide", jq_context ).on( 'change keyup paste', function() {
		var hidePlayer = "on";
		if( !( $(this).attr('checked') ) ){
			hidePlayer = "off";
		}
		if( hidePlayer == 'off'){
			delete dailymotionParameters["chromeless"];
		}
		else{
			dailymotionParameters["chromeless"] = '1';
		}
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	$( "#dailymotion_playerbar", jq_context ).on( 'change keyup paste', function() {
		var showControls = "on";
		if( !( $(this).attr('checked') ) ){
			showControls = "off";
		}
		if( showControls == 'on'){
			delete dailymotionParameters["controls"];
		}
		else{
			dailymotionParameters["controls"] = '0';
		}
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	$( "#dailymotion_playertype div", jq_context ).click(function() {
		if( $(this).text() == 'Flash' ){
			delete dailymotionParameters['html']; // Flash
		}
		else{
			dailymotionParameters['html'] = "1"; // HTML 5
		}
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	$( "#dailymotion_aspectratio div", jq_context ).click(function() {
		if($(this).text() == '16:9' ){
			delete dailymotionParameters['aspectratio'];
		}
		else{
			dailymotionParameters['aspectratio'] = "4:3";
		}
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});
	
	
	$( "#dailymotion_videoquality div", jq_context ).click(function() {
		if( $(this).text() == '720p'){
			delete dailymotionParameters["quality"];
		}
		else{
			dailymotionParameters["quality"] = $(this).text().replace("240p","240").replace("360p","360").replace("480p","480").replace("720p","720").replace("1080p","1080").replace("1440p","1440").replace("2160p","2160");
		}
		
		lgrriw_PreviewEmbedCode('dailymotion_item');
	});

}

function lgrriw_ResolveDefaultDailymotionSettings( dailymotionParameters ){
		//alert('dailymotionParameters["dailymotion_id"] = '+dailymotionParameters["dailymotion_id"]);
		//alert('hello = '+window.dailymotionObject.playlist);
		var dailymotionPath = '';
		if( dailymotionObject.playlist !== '' ){
			var dailymotionPath = '://www.dailymotion.com/widget/jukebox?list[]=/playlist/';
			dailymotionParameters['dailymotion_id'] = dailymotionObject.playlist;
		}
		else if( dailymotionObject.id !== '' ){
			var dailymotionPath = '://www.dailymotion.com/embed/video/';
			dailymotionParameters['dailymotion_id'] = dailymotionObject.id;
		}
		//var dailymotionPath = '://youtu.be/embed/'; // Can't get short syntax redirect to work on playlists
		// Set defasult aspectratio
		var aspectRatio = dailymotionParameters['aspectratio'];
		if( typeof aspectRatio == 'undefined' ){
			aspectRatio = '16:9';
		}
		
		// Full Screen Default?
		var fullScreen = dailymotionParameters['fs'];
		var allowFullScreen ='';
		if( typeof fullScreen == 'undefined' ){
			allowFullScreen = ' allowfullscreen="allowfullscreen"';
			delete dailymotionParameters['fs'];
		}
		else{
			// Dailymotion defaluts to allowfullscreen if fs not specified
			if( fullScreen == '0'){
				allowFullScreen = '';
			}
			else{
				allowFullScreen = ' allowfullscreen="allowfullscreen"';
				delete dailymotionParameters['fs'];
			}
		}
		
		var responsiveWrapper = '';
		var border = '';
		var bordercolor = dailymotionParameters["bordercolor"];
		if( typeof bordercolor == 'undefined'){
			bordercolor = '#00ff00';
		}
		
	//alert("bordercolor = "+bordercolor);
			if( typeof dailymotionParameters["border"] !== 'undefined' ){
				border = "border: "+dailymotionParameters["border"]+" solid "+bordercolor+"; ";
			}
		
		//delete dailymotionParameters["bordercolor"];
		//delete dailymotionParameters["border"];
		if( aspectRatio == '16:9' ){
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"][lgrriw_iframe style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+dailymotionParameters['dailymotion_protocol'].toLowerCase()+dailymotionPath+dailymotionParameters['dailymotion_id'];
			//alert('16X9');
		}
		else{
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"][lgrriw_iframe style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+dailymotionParameters['dailymotion_protocol'].toLowerCase()+dailymotionPath+dailymotionParameters['dailymotion_id'];
			//alert('4X3');
		}
		// Concatinate all optional parameters starting in array at item #3
		parameterCount = Object.keys(dailymotionParameters).length;
		var optionalParameters = '';
		var optionalParameterDelimeter = '';
		var isFirstOptionalParameter = true;
			//alert(dailymotionParameters['showinfo']);
			//alert(dailymotionParameters.list);
		//delete dailymotionParameters["bordercolor"];
		//delete dailymotionParameters["border"];
		if( parameterCount > 2 ){
			for (var key in dailymotionParameters) {
				if( key != 'dailymotion_protocol' && key != 'dailymotion_id' && key != 'aspectratio' && key != 'border' && key != 'bordercolor' && key != 'fs' ){
					if( isFirstOptionalParameter == true ){
						isFirstOptionalParameter = false;
						optionalParameterDelimeter = "?";
					}
					else{
						optionalParameterDelimeter = "&";
					}
					optionalParameters += optionalParameterDelimeter + key + "=" + dailymotionParameters[key];
					//alert(optionalParameters);
				}
			}
		}
		else{
		}
		//alert(optionalParameters);
		if( typeof dailymotionParameters["dailymotion_id"] == 'undefined' ){
			$( '.preview_content', jq_context ).val('');
		}
		else{
			$( '.preview_content', jq_context ).val(responsiveWrapper+optionalParameters+'"][/lgrriw_iframe][/lgrriw_div]');
		}
		//alert('hello');

}
