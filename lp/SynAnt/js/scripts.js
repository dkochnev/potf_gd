$(document).ready(function(){

  // Sliding quotes
  $('.carousel').carousel({
	  interval: 6000,
	});
  // Animated Hamburger	
	$('.navbar-toggle').click(function(){
		$(this).toggleClass('open');
	});
  // Sticky Header
  $(window).scroll(function(){
    if ($(this).scrollTop() > 300){
        $('.banner_fixed').addClass('hidden');
      } else {
        $('.banner_fixed').removeClass('hidden');
      }
    if ($(this).scrollTop() > 1) {
      $('#header-content').addClass('sticky_head');
    } else {
      $('#header-content').removeClass('sticky_head');
    }
    
  });
});