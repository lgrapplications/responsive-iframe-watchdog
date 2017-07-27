function onload_html() {
	// Note: All function declarations must preceed a call to that function.

	// Create an object to hold html ID to make available
	// to all functions and events.
	window.htmlObject = {
		url: '',
		responsive: ''
	};
	//alert('hello html');
	function lgrriw_html_ParseURL( htmlID, htmlObject ){
		// The purpose of this function is to extract the
		// html ID by parsing variations in URL syntax
		if( typeof htmlID !== 'undefined' && htmlID !== '' ){
			htmlParameters["border"] = '0';
			// Strip out all URL path variations
			var work = htmlID;
			// Extract src attribute value from iframe if embed code was pasted
			work = lgrriw_GetURLFromEmbedCode( work );
			work = work.replace("https:","");
			work = work.replace("http:","");
			htmlObject.url = work;
			lgrriw_PreviewEmbedCode('html_item');
		}
	}
	
	// Turn off autocomplete on all textboxes so they
	// don't appear on top of mouseover dropdown lists
	$( '.textbox', jq_context ).attr('autocomplete', 'off');
	$( '.textbox_center', jq_context ).attr('autocomplete', 'off');

	$( "#html_url", jq_context ).on( 'input', function() {
		lgrriw_html_ParseURL( $(this).val(), htmlObject );
		htmlParameters["html_url"] = htmlObject.url;
		lgrriw_PreviewEmbedCode('html_item');
	}); // end of #html_url
	$( "#html_protocol div", jq_context ).click(function() {
		htmlParameters["html_protocol"] = $(this).text().toLowerCase();
		lgrriw_PreviewEmbedCode('html_item');
	});
	// Optional html Parameters are in an accociative array where the key
	// is the actual html parameter name and the value is the actual html
	// parameter value
	$( "#html_border div", jq_context ).click(function() {
		if( $(this).text() == 'None'){
			htmlParameters["border"] = '0';
		}
		else{
			htmlParameters["border"] = $(this).text().replace("Tiny","1px").replace("Small","2px").replace("Medium","3px").replace("Large","4px");
		}
		
		lgrriw_PreviewEmbedCode('html_item');
	});

	$( "#html_bordercolor", jq_context ).on( 'change keyup paste', function() {
		if( $(this).val() == '#00ff00'){
			htmlParameters["bordercolor"] = '#00ff00';
		}
		else{
			htmlParameters["bordercolor"] = $(this).val();
		}
		lgrriw_PreviewEmbedCode('html_item');
	});
	$( "#html_scrolling", jq_context ).on( 'change keyup paste', function() {
		var allowScrolling = "on";
		if( !( $(this).attr('checked') ) ){
			allowScrolling = "off";
		}
		if( allowScrolling == 'off'){
			delete htmlParameters["scrolling"];
		}
		else{
			htmlParameters["scrolling"] = 'yes';
		}
		lgrriw_PreviewEmbedCode('html_item');
	});
	$( "#html_width", jq_context ).on( 'change keyup paste', function() {
		if( typeof $(this).val() == 'undefined' ||  $(this).val() == ''){
			delete htmlParameters["html_width"];
		}
		else{
			htmlParameters["html_width"] = htmlObject.url;
		}
		lgrriw_PreviewEmbedCode('html_item');
	});
	$( "#html_height", jq_context ).on( 'change keyup paste', function() {
		if( typeof $(this).val() == 'undefined' || $(this).val() == ''){
			htmlParameters["html_height"] = '810px';
		}
		else{
			htmlParameters["html_height"] = $(this).val();
		}
		lgrriw_PreviewEmbedCode('html_item');
	});

}

function lgrriw_ResolveDefaultHTMLSettings( htmlParameters ){
		var htmlPath = '://player.html.com/video/';
		
		var responsiveWrapper = ''; // Outer div
		var border = '';
		var scrolling = '';
		var bordercolor = htmlParameters["bordercolor"];
		if( typeof bordercolor == 'undefined'){
			bordercolor = '#00ff00';
		}
	
		if( typeof htmlParameters["border"] !== 'undefined' ){
			border = "border: "+htmlParameters["border"]+" solid "+bordercolor+"; ";
		}
	
		if( htmlParameters["scrolling"] == 'yes' ){
			scrolling = ' scrolling="yes"';
		}
		responsiveWrapper = '[lgrriw_iframe'+scrolling+' style="'+border+'width: '+htmlParameters["html_width"]+'; height: '+htmlParameters["html_height"]+';" src="'+htmlParameters['html_protocol'].toLowerCase()+":"+htmlParameters['html_url'];
		// Concatinate all optional parameters starting in array at item #3
		// to create the html Player's parameters.
		parameterCount = Object.keys(htmlParameters).length;
		var optionalParameters = '';
		var optionalParameterDelimeter = '';
		var isFirstOptionalParameter = true;  // First parameter gets ? delimeter
		if( parameterCount > 2 ){
			for (var key in htmlParameters) {
				// Ignore any key that contains a value not related to
				// the html's Player parameters, thos keys are used for
				// html div and iframe element attributes
				if( key != 'html_protocol' && key != 'html_url' && key != 'border' && key != 'bordercolor' && key != 'scrolling' && key != 'html_height' && key != 'html_width' ){
					if( isFirstOptionalParameter == true ){
						isFirstOptionalParameter = false;
						optionalParameterDelimeter = "?"; // First parameter
					}
					else{
						optionalParameterDelimeter = "&"; // Subsequent parameters
					}
					optionalParameters += optionalParameterDelimeter + key + "=" + htmlParameters[key];
				}
			}
		}
		else{
		}
		if( typeof htmlParameters["html_url"] == 'undefined' ){
			$( '.preview_content', jq_context ).val('');
		}
		else{
			$( '.preview_content', jq_context ).val(responsiveWrapper+optionalParameters+'"][/lgrriw_iframe]');
		}

}
