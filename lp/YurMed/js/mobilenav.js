
	var state = 'none';
	
	function showhide(layer_ref) {
	
	if (state == 'block') {
	state = 'none';
	$(".menuToggle").html("Show Menu<img src='img/icon-navigation.png' width='23' height='13'>");
	}
	else {
	state = 'block';
	// Make the content div fade in
	$("#show_menu").hide();
	$('#show_menu').fadeIn(200);
	$('#show_menu').slideDown(200);
	
	$(".menuToggle").html("Close Menu <img src='img/icon-closenav.png' width='13' height='13'>");
	}
	if (document.all) { //IS IE 4 or 5 (or 6 beta)
	eval( "document.all." + layer_ref + ".style.display = state");
	}
	if (document.layers) { //IS NETSCAPE 4 or below
	document.layers[layer_ref].display = state;
	}
	if (document.getElementById &&!document.all) {
	hza = document.getElementById(layer_ref);
	hza.style.display = state;
	}
	}