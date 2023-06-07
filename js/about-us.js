"use strict"

$(document).ready(function(){

// function serious consider
 $('p').hover(function(){
   $('.Applicants').toggleClass('serious-js');
 });

 // function reminder
 var action="click";
 var speed="600";

 $('li.q').on(action, function() {
       $(this).next()
           .slideToggle(speed)
               .siblings('li.a')
                   .slideUp();
   });


});
