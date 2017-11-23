$("#scrollTop").click(function () {
    $('html,body').animate({ scrollTop: '0px' }, 800);
});



$(".right-menu").click(function()
{
    if($(this).hasClass("active"))
    {
        $(this).removeClass("active");
        $(".menu").slideUp();
    }
    else {
        $(this).addClass("active");
        $(".menu").slideDown();
    }


});