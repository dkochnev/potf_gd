	function change(){
		$('#fire').fire('change',{gravity:4.5}); 
		if ($('#stop').html()!='BURN IT'){
			$('#stop').html('YOU GOT IT');
		}
		else{
			$('#stop').html('STOP');
		}
	}
	

$(document).ready( function(){
   		$('#stop').attr("href","javascript:change();");
	});


