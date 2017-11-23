// JavaScript Document

$(function(){
	
	$("#goTop").click(function(){

		$("html,body").animate({scrollTop:0},900);

		//$("html,body").animate({scrollTop:0},900,"easeOutBounce");

		return false;

	});
	
	$("#goTop2").click(function(){

		$("html,body").animate({scrollTop:0},900);

		//$("html,body").animate({scrollTop:0},900,"easeOutBounce");

		return false;

	});

	$('a[href*="#section"]:not([href=#])').click(function() {

        var target = $(this.hash);

        $('html,body').animate({scrollTop: target.offset().top-85}, 1000);

        return false;

    });

	$('a[href=#buylimit]').click(function() {
        
        $('html,body').animate({scrollTop:$('#buylimit').offset().top-60}, 1000);

         return false;

    });

});