function onload_brightcove() {
	// Note: All function declarations must preceed a call to that function.

	// Create an object to hold brightcove ID to make available
	// to all functions and events.
	//alert('in brightcove.js');
	window.brightcoveObject = {
		id: ''
	};
	function lgrriw_Brightcove_ParseURL( brightcoveID, brightcoveObject ){
		// The purpose of this function is to extract the
		// brightcove ID by parsing variations in URL syntax
		if( typeof brightcoveID !== 'undefined' && brightcoveID !== '' ){
			brightcoveParameters["border"] = '0';
			//// Strip out all URL path variations
			var work = brightcoveID;
			// Check if pasted id has a youtube domain
			if( work.indexOf('//players.brightcove.net/') > -1 ){
				// This is a brightcove domain
			}
			else{
				$('#brightcove_id').val('');
				alert("The code you pasted: "+brightcoveID+" is not Brightcove's!!! Please try again");
				return;
			}
			// Extract src attribute vale from iframe if embed code was pasted
			work = lgrriw_GetURLFromEmbedCode( work );
			if( brightcoveID !== work ){
				brightcoveObject.id = work;
				$( '#brightcove_id', jq_context ).val(work);
				brightcoveParameters['brightcove_id'] = work;
			}
			work = work.replace("https:","");
			work = work.replace("http:","");
			// Get the brightcove ID
			var arraySplit = work.split("&");
			brightcoveObject.id = arraySplit[0];
			//brightcoveObject.id = brightcoveID;
			lgrriw_PreviewEmbedCode('brightcove_item');
		}
	}
	
	// Turn off autocomplete on all textboxes so they
	// don't appear on top of mouseover dropdown lists
	$( '.textbox', jq_context ).attr('autocomplete', 'off');
	$( '.textbox_center', jq_context ).attr('autocomplete', 'off');

	$( "#brightcove_id", jq_context ).on( 'input', function() {
		lgrriw_Brightcove_ParseURL( $(this).val(), brightcoveObject );
		brightcoveParameters["brightcove_id"] = brightcoveObject.id;
		lgrriw_PreviewEmbedCode('brightcove_item');
	});
	$( "#brightcove_id", jq_context ).keypress(function(evt) {
		lgrriw_MakeReadOnlyWithClipboard( evt );
	});
	$( "#brightcove_protocol div", jq_context ).click(function() {
		brightcoveParameters["brightcove_protocol"] = $(this).text().toLowerCase();
		lgrriw_PreviewEmbedCode('brightcove_item');
	});
	// Optional brightcove Parameters are in an accociative array where the key
	// is the actual brightcove parameter name and the value is the actual brightcove
	// parameter value
	$( "#brightcove_border div", jq_context ).click(function() {
		if( $(this).text() == 'None'){
			brightcoveParameters["border"] = '0';
		}
		else{
			brightcoveParameters["border"] = $(this).text().replace("Tiny","1px").replace("Small","2px").replace("Medium","3px").replace("Large","4px");
		}
		
		lgrriw_PreviewEmbedCode('brightcove_item');
	});

	$( "#brightcove_bordercolor", jq_context ).on( 'change keyup paste', function() {
		if( $(this).val() == '#00ff00'){
			brightcoveParameters["bordercolor"] = '#00ff00';
		}
		else{
			brightcoveParameters["bordercolor"] = $(this).val();
		}
		lgrriw_PreviewEmbedCode('brightcove_item');
	});

	$( "#brightcove_autoplay", jq_context ).on( 'change keyup paste', function() {
		var autoPlay = "on";
		if( !( $(this).attr('checked') ) ){
			autoPlay = "off";
		}
		if( autoPlay == 'off'){
			delete brightcoveParameters["autoplay"];
		}
		else{
			brightcoveParameters["autoplay"] = '1';
		}
		lgrriw_PreviewEmbedCode('brightcove_item');
	});
	$( "#brightcove_fullscreen", jq_context ).on( 'change keyup paste', function() {
		var allowFullScreen = "on";
		if( !( $(this).attr('checked') ) ){
			allowFullScreen = "off";
		}
		if( allowFullScreen == 'on'){
			brightcoveParameters["fs"] = '1';
		}
		else{
			delete brightcoveParameters["fs"];
		}
		lgrriw_PreviewEmbedCode('brightcove_item');
	});
	$( "#brightcove_aspectratio div", jq_context ).click(function() {
		if($(this).text() == '16:9' ){
			delete brightcoveParameters['aspectratio'];
		}
		else{
			brightcoveParameters['aspectratio'] = "4:3";
		}
		lgrriw_PreviewEmbedCode('brightcove_item');
	});
}

function lgrriw_ResolveDefaultBrightcoveSettings( brightcoveParameters ){
		//alert('Brightcove 3');
		var brightcovePath = '://player.brightcove.com/video/';
		// Set defasult aspectratio
		var aspectRatio = brightcoveParameters['aspectratio'];
		if( typeof aspectRatio == 'undefined' ){
			aspectRatio = '16:9';
		}
		// Full Screen Default?
		var fullScreen = brightcoveParameters["fs"];
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
		var bordercolor = brightcoveParameters["bordercolor"];
		if( typeof bordercolor == 'undefined'){
			bordercolor = '#00ff00';
		}
	
		if( typeof brightcoveParameters["border"] !== 'undefined' ){
			border = "border: "+brightcoveParameters["border"]+" solid "+bordercolor+"; ";
		}
		
		if( aspectRatio == '16:9' ){
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"][lgrriw_iframe style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+brightcoveParameters['brightcove_protocol'].toLowerCase()+":"+brightcoveParameters['brightcove_id'];
		}
		else{
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"][lgrriw_iframe style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+brightcoveParameters['brightcove_protocol'].toLowerCase()+":"+brightcoveParameters['brightcove_id'];
		}
		// Concatinate all optional parameters starting in array at item #3
		// to create the brightcove Player's parameters.
		parameterCount = Object.keys(brightcoveParameters).length;
		var optionalParameters = '';
		var optionalParameterDelimeter = '';
		var isFirstOptionalParameter = true;  // First parameter gets ? delimeter
		if( parameterCount > 2 ){
			for (var key in brightcoveParameters) {
				// Ignore any key that contains a value not related to
				// the brightcove's Player parameters, thos keys are used for
				// html div and iframe element attributes
				if( key != 'brightcove_protocol' && key != 'brightcove_id' && key != 'fs' && key != 'aspectratio' && key != 'border' && key != 'bordercolor' ){
					if( isFirstOptionalParameter == true ){
						isFirstOptionalParameter = false;
						optionalParameterDelimeter = "?"; // First parameter
					}
					else{
						optionalParameterDelimeter = "&"; // Subsequent parameters
					}
					optionalParameters += optionalParameterDelimeter + key + "=" + brightcoveParameters[key];
				}
			}
		}
		else{
		}
		if( typeof brightcoveParameters["brightcove_id"] == 'undefined' ){
			$( '.preview_content', jq_context ).val('');
		}
		else{
			$( '.preview_content', jq_context ).val(responsiveWrapper+optionalParameters+'"][/lgrriw_iframe][/lgrriw_div]');
		}

}
