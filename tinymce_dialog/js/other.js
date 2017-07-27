function onload_other() {
	// Note: All function declarations must preceed a call to that function.

	// Create an object to hold other ID to make available
	// to all functions and events.
	window.otherObject = {
		url: '',
		responsive: ''
	};
	//alert('hello other');
	function lgrriw_Other_ParseURL( otherURL, otherObject ){
		// The purpose of this function is to extract the
		// other ID by parsing variations in URL syntax
		if( typeof otherURL !== 'undefined' && otherURL !== '' ){
			otherParameters["border"] = '0';
			// Strip out all URL path variations
			var work = otherURL;
			// Extract src attribute vale from iframe if embed code was pasted
			work = lgrriw_GetURLFromEmbedCode( work );
			if( otherURL !== work ){
				otherObject.url = work;
				$( '#other_url', jq_context ).val(work);
				otherParameters['other_url'] = work;
			}
			work = work.replace("https:","");
			work = work.replace("http:","");
			otherObject.url = work;
			lgrriw_PreviewEmbedCode('other_item');
		}
	}
	
	// Turn off autocomplete on all textboxes so they
	// don't appear on top of mouseover dropdown lists
	$( '.textbox', jq_context ).attr('autocomplete', 'off');
	$( '.textbox_center', jq_context ).attr('autocomplete', 'off');

	$( "#other_url", jq_context ).on( 'change keyup paste', function() {
		lgrriw_Other_ParseURL( $(this).val(), otherObject );
		otherParameters["other_url"] = otherObject.url;
		lgrriw_PreviewEmbedCode('other_item');
	}); // end of #other_url
	$( "#other_url", jq_context ).keypress(function(evt) {
		lgrriw_MakeReadOnlyWithClipboard( evt );
	});
	$( "#other_protocol div", jq_context ).click(function() {
		otherParameters["other_protocol"] = $(this).text().toLowerCase();
		lgrriw_PreviewEmbedCode('other_item');
	});
	// Optional other Parameters are in an accociative array where the key
	// is the actual other parameter name and the value is the actual other
	// parameter value
	$( "#other_border div", jq_context ).click(function() {
		if( $(this).text() == 'None'){
			otherParameters["border"] = '0';
		}
		else{
			otherParameters["border"] = $(this).text().replace("Tiny","1px").replace("Small","2px").replace("Medium","3px").replace("Large","4px");
		}
		
		lgrriw_PreviewEmbedCode('other_item');
	});

	$( "#other_bordercolor", jq_context ).on( 'input', function() {
		if( $(this).val() == '#00ff00'){
			otherParameters["bordercolor"] = '#00ff00';
		}
		else{
			otherParameters["bordercolor"] = $(this).val();
		}
		lgrriw_PreviewEmbedCode('other_item');
	});
	$( "#other_fullscreen", jq_context ).on( 'change keyup paste', function() {
		var allowFullScreen = "on";
		if( !( $(this).attr('checked') ) ){
			allowFullScreen = "off";
		}
		if( allowFullScreen == 'on'){
			delete otherParameters["fs"];
		}
		else{
			otherParameters["fs"] = '0';
		}
		lgrriw_PreviewEmbedCode('other_item');
	});
	$( "#other_aspectratio div", jq_context ).click(function() {
		if($(this).text() == '16:9' ){
			delete otherParameters['aspectratio'];
		}
		else{
			otherParameters['aspectratio'] = "4:3";
		}
		lgrriw_PreviewEmbedCode('other_item');
	});

}

function lgrriw_ResolveDefaultOtherSettings( otherParameters ){
		var otherPath = '://player.other.com/video/';
		// Set defasult aspectratio
		var aspectRatio = otherParameters['aspectratio'];
		if( typeof aspectRatio == 'undefined' ){
			aspectRatio = '16:9';
		}
		// Full Screen Default?
		var fullScreen = otherParameters['fs'];
		var allowFullScreen ='';
		if( typeof fullScreen == 'undefined' ){
			allowFullScreen = ' allowfullscreen="allowfullscreen"';
			delete otherParameters['fs'];
		}
		else{
			// Defaluts to allowfullscreen if fs not specified for video only
			if( fullScreen == '0'){
				allowFullScreen = '';
			}
			else{
				allowFullScreen = ' allowfullscreen="allowfullscreen"';
				delete otherParameters['fs'];
			}
		}
		
		var responsiveWrapper = ''; // Outer div
		var border = '';
		var scrolling = '';
		var bordercolor = otherParameters["bordercolor"];
		if( typeof bordercolor == 'undefined'){
			bordercolor = '#00ff00';
		}
	
		if( typeof otherParameters["border"] !== 'undefined' ){
			border = "border: "+otherParameters["border"]+" solid "+bordercolor+"; ";
		}
	
		if( otherParameters["scrolling"] == 'yes' ){
			scrolling = ' scrolling="yes"';
		}
		if( aspectRatio == '16:9' ){
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"][lgrriw_iframe'+scrolling+' style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+otherParameters['other_protocol'].toLowerCase()+":"+otherParameters['other_url'];
		}
		else{
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"][lgrriw_iframe'+scrolling+' style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+otherParameters['other_protocol'].toLowerCase()+":"+otherParameters['other_url'];
		}
		// Concatinate all optional parameters starting in array at item #3
		// to create the other Player's parameters.
		parameterCount = Object.keys(otherParameters).length;
		var optionalParameters = '';
		var optionalParameterDelimeter = '';
		var isFirstOptionalParameter = true;  // First parameter gets ? delimeter
		if( parameterCount > 2 ){
			for (var key in otherParameters) {
				// Ignore any key that contains a value not related to
				// the other's Player parameters, thos keys are used for
				// html div and iframe element attributes
				if( key != 'other_protocol' && key != 'other_url' && key != 'fs' && key != 'aspectratio' && key != 'border' && key != 'bordercolor' && key != 'scrolling' && key != 'other_height' && key != 'other_width' && key != 'other_type' ){
					if( isFirstOptionalParameter == true ){
						isFirstOptionalParameter = false;
						optionalParameterDelimeter = "?"; // First parameter
					}
					else{
						optionalParameterDelimeter = "&"; // Subsequent parameters
					}
					optionalParameters += optionalParameterDelimeter + key + "=" + otherParameters[key];
				}
			}
		}
		else{
		}
		if( typeof otherParameters["other_url"] == 'undefined' ){
			$( '.preview_content', jq_context ).val('');
		}
		else{
			$( '.preview_content', jq_context ).val(responsiveWrapper+optionalParameters+'"][/lgrriw_iframe][/lgrriw_div]');
		}

}
