function onload_vimeo() {
	// Note: All function declarations must preceed a call to that function.

	// Create an object to hold Vimeo ID to make available
	// to all functions and events.
	window.vimeoObject = {
		id: ''
	};
	function lgrriw_Vimeo_ParseURL( vimeoID, vimeoObject ){
		// The purpose of this function is to extract the
		// vimeo ID by parsing variations in URL syntax
		if( typeof vimeoID !== 'undefined' && vimeoID !== '' ){
			var work = vimeoID;
			// Check if pasted id has a vimeo domain
			if( work.indexOf('//player.vimeo.com/') > -1 || work.indexOf('//vimeo.com/') > -1 ){
				// This is a vimeo domain
			}
			else if( work.indexOf('/') == -1 ){
				// This is a potential vimeo bare ID
			}
			else{
				$('#vimeo_id').val('');
				alert("The code you pasted: "+vimeoID+" is not Vimeo's!!! Please try again");
				return;
			}
			// Extract src attribute vale from iframe if embed code was pasted
			work = lgrriw_GetURLFromEmbedCode( work );
			if( vimeoID !== work ){
				vimeoObject.id = work;
				$( '#vimeo_id', jq_context ).val(work);
				vimeoParameters['vimeo_id'] = work;
			}
			// Strip out all URL path variations
			vimeoParameters["border"] = '0';
			work = work.replace("https://player.vimeo.com/video/","");
			work = work.replace("http://player.vimeo.com/video/","");
			work = work.replace("//player.vimeo.com/video/","");
			work = work.replace("player.vimeo.com/video/","");

			work = work.replace("https://vimeo.com/","");
			work = work.replace("http://vimeo.com/","");
			work = work.replace("//vimeo.com/","");
			work = work.replace("vimeo.com/","");
			
			work = work.replace("?","&");
			// Get the Vimeo ID
			var arraySplit = work.split("&");
			vimeoObject.id = arraySplit[0];
			lgrriw_PreviewEmbedCode('vimeo_item');
		}
	}
	
	// Turn off autocomplete on all textboxes so they
	// don't appear on top of mouseover dropdown lists
	$( '.textbox', jq_context ).attr('autocomplete', 'off');
	$( '.textbox_center', jq_context ).attr('autocomplete', 'off');

	$( "#vimeo_id", jq_context ).on( 'input', function() {
		lgrriw_Vimeo_ParseURL( $(this).val(), vimeoObject );
		vimeoParameters["vimeo_id"] = vimeoObject.id;
		lgrriw_PreviewEmbedCode('vimeo_item');
	});
	$( "#vimeo_id", jq_context ).keypress(function(evt) {
		lgrriw_MakeReadOnlyWithClipboard( evt );
	});
	$( "#vimeo_protocol div", jq_context ).click(function() {
		vimeoParameters["vimeo_protocol"] = $(this).text().toLowerCase();
		lgrriw_PreviewEmbedCode('vimeo_item');
	});
	// Optional vimeo Parameters are in an accociative array where the key
	// is the actual vimeo parameter name and the value is the actual vimeo
	// parameter value
	$( "#vimeo_border div", jq_context ).click(function() {
		if( $(this).text() == 'None'){
			vimeoParameters["border"] = '0';
		}
		else{
			vimeoParameters["border"] = $(this).text().replace("Tiny","1px").replace("Small","2px").replace("Medium","3px").replace("Large","4px");
		}
		
		lgrriw_PreviewEmbedCode('vimeo_item');
	});

	$( "#vimeo_bordercolor", jq_context ).on( 'change keyup paste', function() {
		if( $(this).val() == '#00ff00'){
			vimeoParameters["bordercolor"] = '#00ff00';
		}
		else{
			vimeoParameters["bordercolor"] = $(this).val();
		}
		lgrriw_PreviewEmbedCode('vimeo_item');
	});

	$( "#vimeo_autoplay", jq_context ).on( 'change keyup paste', function() {
		var autoPlay = "on";
		if( !( $(this).attr('checked') ) ){
			autoPlay = "off";
		}
		if( autoPlay == 'off'){
			delete vimeoParameters["autoplay"];
		}
		else{
			vimeoParameters["autoplay"] = '1';
		}
		lgrriw_PreviewEmbedCode('vimeo_item');
	});
	$( "#vimeo_fullscreen", jq_context ).on( 'change keyup paste', function() {
		var allowFullScreen = "on";
		if( !( $(this).attr('checked') ) ){
			allowFullScreen = "off";
		}
		if( allowFullScreen == 'on'){
			vimeoParameters["fs"] = '1';
		}
		else{
			delete vimeoParameters["fs"];
		}
		lgrriw_PreviewEmbedCode('vimeo_item');
	});
	$( "#vimeo_showtitle", jq_context ).on( 'change keyup paste', function() {
		var showTitle = "on";
		if( !( $(this).attr('checked') ) ){
			showTitle = "off";
		}
		if( showTitle == 'on'){
			delete vimeoParameters["title"];
		}
		else{
			vimeoParameters["title"] = '0';
		}
		lgrriw_PreviewEmbedCode('vimeo_item');
	});
	$( "#vimeo_showportraiticon", jq_context ).on( 'change keyup paste', function() {
		var showPortrait = "on";
		if( !( $(this).attr('checked') ) ){
			showPortrait = "off";
		}
		if( showPortrait == 'on'){
			delete vimeoParameters["portrait"];
		}
		else{
			vimeoParameters["portrait"] = '0';
		}
		lgrriw_PreviewEmbedCode('vimeo_item');
	});
	$( "#vimeo_loop", jq_context ).on( 'change keyup paste', function() {
		var loopVideo = "on";
		if( !( $(this).attr('checked') ) ){
			loopVideo = "off";
		}
		if( loopVideo == 'off'){
			delete vimeoParameters["loop"];
		}
		else{
			vimeoParameters["loop"] = '1';
		}
		lgrriw_PreviewEmbedCode('vimeo_item');
	});
	$( "#vimeo_showbyline", jq_context ).on( 'change keyup paste', function() {
		var showByline = "on";
		if( !( $(this).attr('checked') ) ){
			showByline = "off";
		}
		if( showByline == 'on'){
			delete vimeoParameters["byline"];
		}
		else{
			vimeoParameters["byline"] = '0';
		}
		lgrriw_PreviewEmbedCode('vimeo_item');
	});
	$( "#vimeo_aspectratio div", jq_context ).click(function() {
		if($(this).text() == '16:9' ){
			delete vimeoParameters['aspectratio'];
		}
		else{
			vimeoParameters['aspectratio'] = "4:3";
		}
		lgrriw_PreviewEmbedCode('vimeo_item');
	});

}

function lgrriw_ResolveDefaultVimeoSettings( vimeoParameters ){
		//alert('vimeoParameters["vimeo_id"] = '+vimeoParameters["vimeo_id"]);
		if( typeof window.vimeoObject.playlist !== 'undefined'){
			vimeoParameters["list"] = window.vimeoObject.playlist.replace("list=","");
		}
		var vimeoPath = '://player.vimeo.com/video/';
		// Set defasult aspectratio
		var aspectRatio = vimeoParameters['aspectratio'];
		if( typeof aspectRatio == 'undefined' ){
			aspectRatio = '16:9';
		}
		// Full Screen Default?
		var fullScreen = vimeoParameters["fs"];
		var allowFullScreen ='';
		if( typeof fullScreen == 'undefined' ){
			allowFullScreen = '';
		}
		else{
			if( fullScreen == '0'){
				allowFullScreen = '';
			}
			else{
				allowFullScreen = ' allowfullscreen="allowfullscreen"';
			}
		}
		
		var responsiveWrapper = ''; // Outer div
		var border = '';
		var bordercolor = vimeoParameters["bordercolor"];
		if( typeof bordercolor == 'undefined'){
			bordercolor = '#00ff00';
		}
	
		if( typeof vimeoParameters["border"] !== 'undefined' ){
			border = "border: "+vimeoParameters["border"]+" solid "+bordercolor+"; ";
		}
		
		if( aspectRatio == '16:9' ){
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"][lgrriw_iframe style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+vimeoParameters['vimeo_protocol'].toLowerCase()+vimeoPath+vimeoParameters['vimeo_id'];
		}
		else{
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"][lgrriw_iframe style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+vimeoParameters['vimeo_protocol'].toLowerCase()+vimeoPath+vimeoParameters['vimeo_id'];
		}
		// Concatinate all optional parameters starting in array at item #3
		// to create the Vimeo Player's parameters.
		parameterCount = Object.keys(vimeoParameters).length;
		var optionalParameters = '';
		var optionalParameterDelimeter = '';
		var isFirstOptionalParameter = true;  // First parameter gets ? delimeter
		if( parameterCount > 2 ){
			for (var key in vimeoParameters) {
				// Ignore any key that contains a value not related to
				// the Vimeo's Player parameters, thos keys are used for
				// html div and iframe element attributes
				if( key != 'vimeo_protocol' && key != 'vimeo_id' && key != 'fs' && key != 'aspectratio' && key != 'border' && key != 'bordercolor' ){
					if( isFirstOptionalParameter == true ){
						isFirstOptionalParameter = false;
						optionalParameterDelimeter = "?"; // First parameter
					}
					else{
						optionalParameterDelimeter = "&"; // Subsequent parameters
					}
					optionalParameters += optionalParameterDelimeter + key + "=" + vimeoParameters[key];
				}
			}
		}
		else{
		}
		if( typeof vimeoParameters["vimeo_id"] == 'undefined' ){
			$( '.preview_content', jq_context ).val('');
		}
		else{
			$( '.preview_content', jq_context ).val(responsiveWrapper+optionalParameters+'"][/lgrriw_iframe][/lgrriw_div]');
		}

}
