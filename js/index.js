"use strict"

$(document).ready(function(){

// function about us
$(".about-us").mouseover(function(){
    $(".HKRS-js").css("color", "#e2881c");
  });
  $(".about-us").mouseout(function(){
    $(".HKRS-js").css("color", "black");
  });

// function News scroll start
jQuery.fn.liScroll = function(settings) {
  settings = jQuery.extend({
    travelocity: 0.04
    }, settings);
    return this.each(function(){
        var $strip = jQuery(this);
        $strip.addClass("newsticker")
        var stripHeight = 1;
        $strip.find("li").each(function(i){
          stripHeight += jQuery(this, i).outerHeight(true);
        });
        var $mask = $strip.wrap("<div class='mask'></div>");
        var $tickercontainer = $strip.parent().wrap("<div class='tickercontainer'></div>");
        var containerHeight = $strip.parent().parent().height();
        $strip.height(stripHeight);
        var totalTravel = stripHeight;
        var defTiming = totalTravel/settings.travelocity;

        function scrollnews(spazio, tempo){
        $strip.animate({top: '-='+ spazio}, tempo, "linear", function(){$strip.css("top", containerHeight); scrollnews(totalTravel, defTiming);});
        }
        scrollnews(totalTravel, defTiming);
        $strip.hover(function(){
          jQuery(this).stop();
        },

        function(){
          var offset = jQuery(this).offset();
          var residualSpace = offset.top + stripHeight;
          var residualTime = residualSpace/settings.travelocity;
          scrollnews(residualSpace, residualTime);
        });
    });
};

$(function(){
    $("ul#newsroll").liScroll();
})
// function News scroll end

// function adoption start
$(function () {
    $(".Adoptionscroll").bootstrapNews({
        newsPerPage: 2,
        autoplay: true,
  pauseOnHover:true,
        direction: 'up',
        newsTickerInterval: 2500,
        onToDo: function () {
            //console.log(this);
        }
    });
});

if (typeof Object.create !== 'function') {
    //Douglas Crockford inheritance function
    Object.create = function (obj) {
        function F() { };
        F.prototype = obj;
        return new F();
    };
}

(function ($, w, d, undefined) {

    var NewsBox = {

        init: function ( options, elem ) {
            //cache the references
            var self = this;
            self.elem = elem;
            self.$elem = $( elem );

            self.newsTagName = self.$elem.find(":first-child").prop('tagName');
            self.newsClassName = self.$elem.find(":first-child").attr('class');

            self.timer = null;
            self.resizeTimer = null; // used with window.resize event
            self.animationStarted = false;
            self.isHovered = false;


            if ( typeof options === 'string' ) {
                //string was passed
                if(console) {
                    console.error("String property override is not supported");
                }
                throw ("String property override is not supported");
            } else {
                //object was passed
                //extend user options overrides
                self.options = $.extend( {}, $.fn.bootstrapNews.options, options );

                self.prepareLayout();


                //autostart animation
                if(self.options.autoplay) {
                    self.animate();
                }

                if ( self.options.navigation ) {
                    self.buildNavigation();
                }

                //enable users to override the methods
                if( typeof self.options.onToDo === 'function') {
                    self.options.onToDo.apply(self, arguments);
                }

            }
        },

        prepareLayout: function() {
            var self = this;

            //checking mouse position

            $(self.elem).find('.'+self.newsClassName).on('mouseenter', function(){
                self.onReset(true);
            });

            $(self.elem).find('.'+self.newsClassName).on('mouseout', function(){
                self.onReset(false);
            });

            //set news visible / hidden
            $.map(self.$elem.find(self.newsTagName), function(newsItem, index){
                if(index > self.options.newsPerPage - 1) {
                    $(newsItem).hide();
                } else {
                    $(newsItem).show();
                }
            });

            //prevent user to select more news that it actualy have

            if( self.$elem.find(self.newsTagName).length < self.options.newsPerPage ) {
                self.options.newsPerPage = self.$elem.find(self.newsTagName).length;
            }

            //get height of the very first self.options.newsPerPage news
            var height = 0;

            $.map(self.$elem.find(self.newsTagName), function( newsItem, index ) {
                if ( index < self.options.newsPerPage ) {
                    height = parseInt(height) + parseInt($(newsItem).height()) + 10;
                }
            });

            $(self.elem).css({"overflow-y": "hidden", "height": height});

            //recalculate news box height for responsive interfaces
            $( w ).resize(function() {
                if ( self.resizeTimer !== null ) {
                    clearTimeout( self.resizeTimer );
                }
                self.resizeTimer = setTimeout( function() {
                  self.prepareLayout();
                }, 200 );
            });

        },

        findPanelObject: function() {
            var panel = this.$elem;

            while ( panel.parent() !== undefined ) {
                panel = panel.parent();
                if ( panel.parent().hasClass('panel') ) {
                    return panel.parent();
                }
            }

            return undefined;
        },

        buildNavigation: function() {
            var panel = this.findPanelObject();
            if( panel ) {
                var nav = '<ul class="pagination pull-right" style="margin: 0px;">' +
                             '<li><a href="#" class="prev"><span class="glyphicon glyphicon-chevron-down"></span></a></li>' +
                             '<li><a href="#" class="next"><span class="glyphicon glyphicon-chevron-up"></span></a></li>' +
                           '</ul><div class="clearfix"></div>';


                var footer = $(panel).find(".panel-footer")[0];
                if( footer ) {
                    $(footer).append(nav);
                } else {
                    $(panel).append('<div class="panel-footer">' + nav + '</div>');
                }

                var self = this;
                $(panel).find('.prev').on('click', function(ev){
                    ev.preventDefault();
                    self.onPrev();
                });

                $(panel).find('.next').on('click', function(ev){
                    ev.preventDefault();
                    self.onNext();
                });

            }
        },

        onStop: function() {

        },

        onPause: function() {
            var self = this;
            self.isHovered = true;
            if(this.options.autoplay && self.timer) {
                clearTimeout(self.timer);
            }
        },

        onReset: function(status) {
            var self = this;
            if(self.timer) {
                clearTimeout(self.timer);
            }

            if(self.options.autoplay) {
                self.isHovered = status;
                self.animate();
            }
        },

        animate: function() {
            var self = this;
            self.timer = setTimeout(function() {

                if ( !self.options.pauseOnHover ) {
                    self.isHovered = false;
                }

                if (! self.isHovered) {
                     if(self.options.direction === 'up') {
                        self.onNext();
                     } else {
                        self.onPrev();
                     }
                }
            }, self.options.newsTickerInterval);
        },

        onNext: function() {
            var self = this;

            if ( self.animationStarted ) {
                return false;
            }

            self.animationStarted = true;

            var html = '<' + self.newsTagName + ' style="display:none;" class=' + self.newsClassName + '>' + $(self.$elem).find(self.newsTagName).first().html() + '</' + self.newsTagName + '>';
            $(self.$elem).append(html);

            $(self.$elem).find(self.newsTagName).first().slideUp(self.options.animationSpeed, function(){
                $(this).remove();
            });

            $(self.$elem).find(self.newsTagName +':nth-child(' + parseInt(self.options.newsPerPage + 1) + ')').slideDown(self.options.animationSpeed, function(){
                self.animationStarted = false;
                self.onReset(self.isHovered);
            });

            $(self.elem).find('.'+self.newsClassName).on('mouseenter', function(){
                self.onReset(true);
            });

            $(self.elem).find('.'+self.newsClassName).on('mouseout', function(){
                self.onReset(false);
            });
        }
    };

    $.fn.bootstrapNews = function ( options ) {
        //enable multiple DOM object selection (class selector) + enable chaining like $(".class").bootstrapNews().chainingMethod()
        return this.each( function () {

            var newsBox = Object.create( NewsBox );

            newsBox.init( options, this );
            //console.log(newsBox);

        });
    };

})(jQuery, window, document);
// function adoption end

// function for news and adoption loop
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{

  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');

}

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if(window.scrollY > 60){
    document.querySelector('#scroll-top').classList.add('active');
  }else{
    document.querySelector('#scroll-top').classList.remove('active');
  }

}

function loader(){
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut();

});
