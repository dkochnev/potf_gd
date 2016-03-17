$(document).ready(function(){
  var isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)


  if(!isMobile){ // Disable sticky header for mobile devices

    var topBarHeight = 0; //$(".top-bar").height();
    var farewellHeight = $(".farewell").height();
    var stickyNavbarHeight = $(".sticky-header").height();
    var stickyHeader = $(".sticky-header");
    var divider = $(".sticky-header .divider");

    $(window).scroll(function(){ // Scroll Event

      var docViewTop = $(window).scrollTop();

      var backgroundOpacity =  (docViewTop - farewellHeight) / (stickyNavbarHeight - topBarHeight);
      console.log( backgroundOpacity )
      if (backgroundOpacity >= 1.0) {
        backgroundOpacity = 1.0;
      } else if (backgroundOpacity <= 0.0) {
        backgroundOpacity = 0.0;
      }

      stickyHeader.css("background-color", "rgba(255, 255, 255, "+backgroundOpacity+")");
      divider.css("opacity", backgroundOpacity);

      var footerTopOffset = $("footer").offset().top;
      var windowBottomScroll = docViewTop + $(window).height();

      if((topBarHeight+farewellHeight) >= docViewTop){
        stickyHeader.css("margin-top", (topBarHeight+farewellHeight-docViewTop)+"px");
      } else if(windowBottomScroll >= footerTopOffset){
        stickyHeader.css("margin-top", -(windowBottomScroll-footerTopOffset)+"px");

      } else {
        stickyHeader.css("margin-top", "auto");
      }

      stickyHeader.css("display", "block");
      // console.log("background-color: " + $(".sticky-header").css("background-color"));

    });
  } else {
    var stickyHeader = $(".sticky-header");
    stickyHeader.css("display", "block");
  }

});