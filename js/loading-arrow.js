"use strict"

$(document).ready(function(){

// fucntion loading spinner
      $(".loader").fadeOut(1500);
      $('.content').fadeIn(1500);

// function arrow start
      $(window).scroll(function(){
        if($(window).scrollTop()>300){
          $('.arrow-up').fadeIn(250);
        }
        else{
          $('.arrow-up').fadeOut(250);
        }
      });
      $('.arrow-up').click(function(){
        $('html,body').animate(
          {scrollTop:0},400
          );
      });

      $(document).ready(function(){
        var container = $("#imageContainer");
        var image = container.find("img");
        var imageWidth = image.width();
        var imageHeight = image.height();
        var containerWidth = container.width();
        var containerHeight = container.height();
        var scale = 1;
        var translateX = 0;
        var translateY = 0;

        container.on("mouseenter", function (e) {
          var offsetX = (e.pageX - container.offset().left) - containerWidth/2;
          var offsetY = (e.pageY - container.offset().top) - containerHeight/2;
          var distance = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
          scale = 1 + distance/100;

          translateX += (imageWidth*scale - imageWidth*scale/1.1)/2;
          translateY += (imageHeight*scale - imageHeight*scale/1.1)/2;

          image.css({
            transform: "translate3d(" + translateX + "px, " + translateY + "px, 0) scale(" + scale + ")"
          });
        });
        container.on("mouseleave", function (e) {
          var offsetX = (e.pageX - container.offset().left) - containerWidth/2;
          var offsetY = (e.pageY - container.offset().top) - containerHeight/2;
          var distance = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
          scale = 1 + distance/100;

          translateX += (imageWidth*scale - imageWidth*scale/1.1)/2;
          translateY += (imageHeight*scale - imageHeight*scale/1.1)/2;

          image.css({
            transform: "translate3d(" + translateX + "px, " + translateY + "px, 0) scale(" + scale + ")"
          });
        });
      });
// function arrow end

});
