$(document).ready(function(){
  var isScrolledIntoView = function(elem) {
      var docViewTop = $(window).scrollTop() - 100;
      var docViewBottom = docViewTop + $(window).height() + 100;

      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();

      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    };

  var appPreViewScrolledIntoWindow = function(elem) {
      var docViewTop = $(window).scrollTop() - 100;
      var elemTop = $(elem).offset().top;

      return (elemTop >= docViewTop);
  };

  var enableVideos = function(){
    $(".feature-video").each(function(i, video){
        if(isScrolledIntoView(video)){
          if(video.paused){
            video.play();
          }
        }else{
          video.pause();
        }
      });
  };

  $(".app-preview").each(function(i, video){
    video.volume = 0.5;

    $(video).bind("ended", function(){
      this.src = this.src;
    });

    $(video).bind("click", function(){
      this.pause();
      this.currentTime = 0;
      this.src = this.src;
      $(this).removeClass("stoppable");

      $(this).siblings("a").each(function(i, playBtn){
        $(playBtn).show();
      });
    });
  });

  $(".app-preview, .feature-video").siblings("a").each(function(i, playBtn){
    $(playBtn).click(function(e){
      e.preventDefault();
      
      var video = $(playBtn).siblings("video")[0];
      
      var videoStopped = function(){
        video.currentTime = 0;
        $(playBtn).show();
        $(video).removeClass("stoppable");
      }

      $(video).bind("ended", videoStopped);
      $(video).bind("pause", videoStopped);

      $(playBtn).hide();
      $(video).addClass("stoppable");
      video.play();

    });
  });

  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  if(!isMobile){
    $(window).scroll(enableVideos);
    $(window).scroll();
  }else{
    $(".mobile-only").show();
  }

});
