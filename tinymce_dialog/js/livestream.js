function onload_livestream() {
	// Note: All function declarations must preceed a call to that function.

	// Create an object to hold livestream ID to make available
	// to all functions and events.
	//alert('in livestream.js');
	window.livestreamObject = {
		id: ''
	};
	function lgrriw_Livestream_ParseURL( livestreamID, livestreamObject ){
		// The purpose of this function is to extract the
		// livestream ID by parsing variations in URL syntax
		if( typeof livestreamID !== 'undefined' && livestreamID !== '' ){
			livestreamParameters["border"] = '0';
			// Strip out all URL path variations
			var work = livestreamID;
			// Check if pasted id has a youtube domain
			if( work.indexOf('//www.livestream.com/') > -1 || work.indexOf('//livestream.com/') > -1 ){
				if( work.indexOf('<iframe')  != -1 ){
					// This is a livestream domain and embed code
				}
				else{
					$('#livestream_id').val('');
					alert("The code you pasted: "+livestreamID+" is not Livestream's embed code!!! Please try again");
					return;
				}
			}
			else{
				$('#livestream_id').val('');
				alert("The code you pasted: "+livestreamID+" is not Livestream's!!! Please try again");
				return;
			}
			// Extract src attribute vale from iframe if embed code was pasted
			work = lgrriw_GetURLFromEmbedCode( work );
			livestreamObject.id = work;
			$( '#livestream_id', jq_context ).val(work);
			livestreamParameters['livestream_id'] = work;
			work = work.replace("https:","");
			work = work.replace("http:","");
			// Strip out all player parameters
			var arraySplit = work.split("?");
			livestreamObject.id = arraySplit[0];
			livestreamParameters['livestream_id'] = livestreamObject.id;
			//alert('livestreamObject.id ParseURL='+livestreamObject.id);
			//$('#livestream_id').val(livestreamObject.id);
			//alert('livestreamObject.id='+livestreamObject.id);
			//livestreamObject.id = livestreamID;
			//alert('1');
			//lgrriw_PreviewEmbedCode('livestream_item');
			//$('#livestream_id').trigger('change');
			//alert('2');
		}
	}
	
	// Turn off autocomplete on all textboxes so they
	// don't appear on top of mouseover dropdown lists
	$( '.textbox', jq_context ).attr('autocomplete', 'off');
	$( '.textbox_center', jq_context ).attr('autocomplete', 'off');

	//$( "#livestream_id", jq_context ).on( 'change keyup paste', function() {
	$( "#livestream_id", jq_context ).on( 'input', function() {
		//alert('change='+$(this).val());
		//alert('livestreamObject.id='+livestreamObject.id);
		lgrriw_Livestream_ParseURL( $(this).val(), livestreamObject );
		livestreamParameters["livestream_id"] = livestreamObject.id;
			//alert('3');
		lgrriw_PreviewEmbedCode('livestream_item');
			//alert('4');
	});
	$( "#livestream_id", jq_context ).keypress(function(evt) {
		lgrriw_MakeReadOnlyWithClipboard( evt );
	});
	$( "#livestream_protocol div", jq_context ).click(function() {
		livestreamParameters["livestream_protocol"] = $(this).text().toLowerCase();
		lgrriw_PreviewEmbedCode('livestream_item');
	});
	// Optional livestream Parameters are in an accociative array where the key
	// is the actual livestream parameter name and the value is the actual livestream
	// parameter value
	$( "#livestream_border div", jq_context ).click(function() {
		if( $(this).text() == 'None'){
			livestreamParameters["border"] = '0';
		}
		else{
			livestreamParameters["border"] = $(this).text().replace("Tiny","1px").replace("Small","2px").replace("Medium","3px").replace("Large","4px");
		}
		
		lgrriw_PreviewEmbedCode('livestream_item');
	});

	$( "#livestream_bordercolor", jq_context ).on( 'change keyup paste', function() {
		if( $(this).val() == '#00ff00'){
			livestreamParameters["bordercolor"] = '#00ff00';
		}
		else{
			livestreamParameters["bordercolor"] = $(this).val();
		}
		lgrriw_PreviewEmbedCode('livestream_item');
	});
	
	$( "#livestream_showinfo", jq_context ).on( 'change keyup paste', function() {
		var showInfo = "on";
		if( !( $(this).attr('checked') ) ){
			showInfo = "off";
		}
		if( showInfo == 'on'){
			delete livestreamParameters["enableInfoAndActivity"];
		}
		else{
			livestreamParameters["enableInfoAndActivity"] = 'false';
		}
		lgrriw_PreviewEmbedCode('livestream_item');
	});

	$( "#livestream_autoplay", jq_context ).on( 'change keyup paste', function() {
		var autoPlay = "on";
		if( !( $(this).attr('checked') ) ){
			autoPlay = "off";
		}
		if( autoPlay == 'off'){
			livestreamParameters["autoPlay"] = 'false';
		}
		else{
			delete livestreamParameters["autoPlay"];
		}
		lgrriw_PreviewEmbedCode('livestream_item');
	});
	
	$( "#livestream_fullscreen", jq_context ).on( 'change keyup paste', function() {
		var allowFullScreen = "on";
		if( !( $(this).attr('checked') ) ){
			allowFullScreen = "off";
		}
		if( allowFullScreen == 'on'){
			livestreamParameters["fs"] = '1';
		}
		else{
			delete livestreamParameters["fs"];
		}
		lgrriw_PreviewEmbedCode('livestream_item');
	});
	$( "#livestream_aspectratio div", jq_context ).click(function() {
		if($(this).text() == '16:9' ){
			delete livestreamParameters['aspectratio'];
		}
		else{
			livestreamParameters['aspectratio'] = "4:3";
		}
		lgrriw_PreviewEmbedCode('livestream_item');
	});
}

function lgrriw_ResolveDefaultLivestreamSettings( livestreamParameters ){
		var livestreamPath = '://player.livestream.com/video/';
		// Set defasult aspectratio
		var aspectRatio = livestreamParameters['aspectratio'];
		if( typeof aspectRatio == 'undefined' ){
			aspectRatio = '16:9';
		}
		// Full Screen Default?
		var fullScreen = livestreamParameters["fs"];
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
		var bordercolor = livestreamParameters["bordercolor"];
		if( typeof bordercolor == 'undefined'){
			bordercolor = '#00ff00';
		}
	
		if( typeof livestreamParameters["border"] !== 'undefined' ){
			border = "border: "+livestreamParameters["border"]+" solid "+bordercolor+"; ";
		}
		
		if( aspectRatio == '16:9' ){
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;"][lgrriw_iframe style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+livestreamParameters['livestream_protocol'].toLowerCase()+":"+livestreamParameters['livestream_id'];
		}
		else{
			responsiveWrapper = '[lgrriw_div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;"][lgrriw_iframe style="'+border+'position: absolute; top: 0; left: 0; width: 100%; height: 100%;"'+allowFullScreen+' src="'+livestreamParameters['livestream_protocol'].toLowerCase()+":"+livestreamParameters['livestream_id'];
		}
		// Concatinate all optional parameters starting in array at item #3
		// to create the livestream Player's parameters.
		parameterCount = Object.keys(livestreamParameters).length;
		var optionalParameters = '';
		var optionalParameterDelimeter = '';
		var isFirstOptionalParameter = true;  // First parameter gets ? delimeter
		if( parameterCount > 2 ){
			for (var key in livestreamParameters) {
				// Ignore any key that contains a value not related to
				// the livestream's Player parameters, thos keys are used for
				// html div and iframe element attributes
				if( key != 'livestream_protocol' && key != 'livestream_id' && key != 'fs' && key != 'aspectratio' && key != 'border' && key != 'bordercolor' ){
					if( isFirstOptionalParameter == true ){
						isFirstOptionalParameter = false;
						optionalParameterDelimeter = "?"; // First parameter
					}
					else{
						optionalParameterDelimeter = "&"; // Subsequent parameters
					}
					optionalParameters += optionalParameterDelimeter + key + "=" + livestreamParameters[key];
				}
			}
		}
		else{
		}
		if( typeof livestreamParameters["livestream_id"] == 'undefined' ){
			$( '.preview_content', jq_context ).val('');
		}
		else{
			$( '.preview_content', jq_context ).val(responsiveWrapper+optionalParameters+'"][/lgrriw_iframe][/lgrriw_div]');
		}

}

