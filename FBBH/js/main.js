
function main() {

(function () {
   'use strict';
   

   // Testimonial Slider
  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 5
            }, 900);
            return false;
          }
        }
      });

    /*====================================
    Show Menu on Book
    ======================================*/
    $(window).bind('scroll', function() {


        videoHandle();



    });

    $(function()
    {
        videoHandle();
    });


    var prevScroll=0;
    function videoHandle()
    {


        if(Math.abs(prevScroll-$(window).scrollTop())<=5)
        {
            return;
        }

        prevScroll=$(window).scrollTop();

        var windowToTop=$(window).scrollTop();

        var wHeight=$(window).height();

        var aboutHeight=$("#about").offset().top+$("#about").height()-100;

        var achivementsHeight=$("#achivements").offset().top+$("#achivements").height()-100;

/*
        console.log("windowToTop"+windowToTop);
        console.log("wHeight"+wHeight);
        console.log("aboutHeight"+aboutHeight);
        console.log("achivementsHeight"+achivementsHeight);*/

        if(windowToTop<=wHeight)
        {


            for(var i=0;i<$(".video-col").length;i++)
            {
                 if(!$(".video-col")[i].paused)
                 {
                     $(".video-col")[i].pause()
                 }
            }


            if($(".video-col")[0].paused)
            {
                $(".video-col")[0].play();
            }

        }
        else if(windowToTop>wHeight&&windowToTop<=aboutHeight)
        {

            for(var i=0;i<$(".video-col").length;i++)
            {
                if(!$(".video-col")[i].paused)
                {
                    $(".video-col")[i].pause()
                }
            }

            if($(".video-col")[1].paused)
            {
                $(".video-col")[1].play();
            }


        }
        else if(windowToTop>wHeight&&windowToTop<=achivementsHeight)
        {

            for(var i=0;i<$(".video-col").length;i++)
            {
                if(!$(".video-col")[i].paused)
                {
                    $(".video-col")[i].pause()
                }
            }

            if($(".video-col")[2].paused)
            {
                $(".video-col")[2].play();
            }


        }
        else
        {
            for(var i=0;i<$(".video-col").length;i++)
            {
                if(!$(".video-col")[i].paused)
                {
                    $(".video-col")[i].pause()
                }
            }
        }



    }


    $('body').scrollspy({
        target: '.navbar-default',
        offset: 80
    })

	// ****************************************************************
// counterUp
// ****************************************************************

	$(document).ready(function( $ ) {
		if($("span.count").length > 0){	
			$('span.count').counterUp({
					delay: 10, // the delay time in ms
			time: 1000 // the speed time in ms
			});
		}
	});



}());


}
main();