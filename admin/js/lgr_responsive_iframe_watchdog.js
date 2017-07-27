var domain_list = $("#domain_list").text();
$(".domains").each(function(index, element) {
	//return;
	//alert($(this));
	var found = domain_list.indexOf(element.innerHTML);
	if( found == -1 ){
		$inRed = "<span style='color: red; background-color: yellow;'>"+$(this).text()+"</span>";
		$(this).html($inRed);
	}
	else{
		$inGreen = "<span style='color: green;'>"+$(this).text()+"</span>";
		$(this).html($inGreen);
		// Remove row if not in list
		if( domain_list.indexOf($(this).text()) !== -1 ){
			var httpColumn = $(this).siblings(".http_message")[0];
			//alert(httpColumn);
			var spanHTTP = httpColumn.childNodes[0];
			//alert('hello');
			var httpMessage = spanHTTP.innerHTML;
			//alert(httpMessage);
			if( httpMessage !== "HTTP not allowed" ){
				//alert(httpMessage);
				$(this).parent().remove();
			}
		}
	}	
});

// Add to trusted list button
$(".insert").click(function(){
	var domainName = $(this).parent().siblings(".domains")[0];
	//alert(count(domainName.childNodes));
	var span = domainName.childNodes[0];
	//alert(span.innerHTML);
	var domain_list = $("#domain_list").text();
	var found = domain_list.indexOf(span.innerHTML);
	if( found == -1 ){
		//domain was not found so add it and delete all rows containing same domain name
		$("#domain_list").text($("#domain_list").text()+span.innerHTML+"\n")
		$(".domains").each(function(index, element) {
		var httpColumn = $(this).siblings(".http_message")[0];
		//alert(httpColumn);
		var spanHTTP = httpColumn.childNodes[0];
		//alert('hello');
		var httpMessage = spanHTTP.innerHTML;
		//alert(httpMessage);
			//var foundSameName = domain_list.indexOf($(this).children("span").text());
			if( span.innerHTML == $(this).children("span").text() ){
			//alert(span.innerHTML+' = '+$(this).children("span").text());
				if( httpMessage !== "HTTP not allowed" ){
					//alert(httpMessage);
					$(this).parent().remove();
				}
				//alert($(this).parent());
			}
		});
	}

});

// Update Violation Count
setInterval(function(){
	var numberOfViolations = $('.ctable tr').length - 1;
	if( numberOfViolations <= 0 ){
		$('.violation_count').html('<strong>Congratulations! You have no untrusted domains for embeds</strong>');
	}
	else{
		$('.violation_count').html(numberOfViolations);
	}
}, 500);
