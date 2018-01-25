
/**
 * Created by tuyao on 2018/1/5.
 */


$(function(){
    $(window).load(function(){
        $(window).bind('scroll resize', function(){
            var $this = $(this);
            var $this_Top=$this.scrollTop();

            //當高度小於100時，關閉區塊
            if($this_Top < 700){
                $('#top-bar').stop().animate({top:"-65px"});
            }
            if($this_Top > 700){
                $('#top-bar').stop().animate({top:"0px"});

            }
        }).scroll();
    });



    //写入cookie
    var productObj=
    {
        ID: 2, //產品ID
        Description: "Love秋冬．東京+橫濱 3~14天", //產品名稱
        AdultPrice: "35,568", //單品下成人最低價格
        AvailableTime:"2016/07/01~2016/09/30"
    };
    var productList=[];
    if(localStorage.productListLocalStorage)
    {
        productList=JSON.parse(localStorage.productListLocalStorage);
    }

    var cunzaiFlag=0;
    for(var i=0;i<productList.length;i++)
    {
        if(productObj.ID==productList[i].ID)
        {
            cunzaiFlag=1;
            break;
        }
    }
    if(cunzaiFlag==0)
    {
        productList.push(productObj);
    }


    localStorage.productListLocalStorage=JSON.stringify(productList);




});


//倒计时开抢
var putawayTime="2018/01/15 08:00:00";  //上架时间



function leftTimer(timeStr){

    var timestampStart=new Date(timeStr).getTime();

    var timestampNow=new Date().getTime();

    var leftTime=timestampStart-timestampNow; //计算剩余的毫秒数

    var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
    var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
    var millisecond  = parseInt(leftTime % 1000, 10);//计算剩余的毫秒
    days = checkTime(days);
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    millisecond = checkTime(millisecond);

    if(days==0&&hours==0&&minutes==0&&seconds==0&&millisecond==0)
    {
        clearInterval(timerId);
    }

    document.getElementById("timer").innerHTML = days+" 天 " + hours+" 時 " + minutes+" 分 "+seconds+" 秒 <span class='millisecond'>"+millisecond+"</span>";
}

var timerId=setInterval("leftTimer(putawayTime)",1);

function checkTime(i){ //将0-9的数字前面加上0，例1变为01
    if(i<10&&i>=0)
    {
        i = "0" + i;
    }
    else if(i<0)
    {
        i=0;
    }
    return i;
}



var galleryTop1;
var galleryThumbs1;

$(".view-big").click(function()
{
    $(".swiper-modal").show();

    if(!galleryTop1)
    {
        galleryTop1 = new Swiper('.gallery-top-modal', {
            nextButton: '.swiper-next-modal',
            prevButton: '.swiper-prev-modal',
            spaceBetween: 10,
            loop:true,
            loopedSlides: 8, //looped slides should be the same
        });
        galleryThumbs1 = new Swiper('.gallery-thumbs-modal', {
            nextButton: '.next-btn-modal',
            prevButton: '.prev-btn-modal',
            spaceBetween: 5,
            slidesPerView: 'auto',
            touchRatio: 0.2,
            loop:true,
            loopedSlides: 8, //looped slides should be the same
            slideToClickedSlide: true
        });
        galleryTop1.params.control = galleryThumbs1;
        galleryThumbs1.params.control = galleryTop1;
    }


});

$(".swiper-modal .close").click(function()
{
    $(".swiper-modal").hide();

});


$("body").on("click",".map-operate .open",function()
{
    console.log("open");
    $(this).parent().parent().addClass("active");
    $(this).hide();
    $(this).next().show()

});

$("body").on("click",".map-operate .close",function()
{
    console.log("close");
    $(this).hide();
    $(this).prev().show()
    $(this).parent().parent().removeClass("active");
});



//顶部下拉
$("#topmenu .first-topitem").mouseover(function()
{
    $(this).find(".xiala-col").show();
}).mouseout(function()
{
    $(this).find(".xiala-col").hide();
});



$(document).ready(function(){
    $("#textclose").click(function(){
        $("#textshow").remove();
    });
});


baguetteBox.run('.baguetteBoxThree', {
    animation: 'fadeIn',
});

var galleryTop = new Swiper('.gallery-top-page', {
    nextButton: '.swiper-next-page',
    prevButton: '.swiper-prev-page',
    spaceBetween: 10,
    loop:true,
    loopedSlides: 5, //looped slides should be the same
});
var galleryThumbs = new Swiper('.gallery-thumbs-page', {
    nextButton: '.next-btn-page',
    prevButton: '.prev-btn-page',
    spaceBetween: 5,
    slidesPerView: 'auto',
    loop:true,
    touchRatio: 0.2,

    loopedSlides: 5, //looped slides should be the same
    slideToClickedSlide: true
});
galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;



$('article').readmore({
    moreLink: '<div style="text-align:center"><img style="width:15px;margin-right:5px;" src="images/readmore.png"/><a href="#">看完整資訊</a></div>',
    lessLink: '<div style="text-align:center"><img style="width:15px;margin-right:5px;" src="images/readmore2.png"/><a href="#">收合</a></div>',
    collapsedHeight: 350,
    speed: 500
});


function toggleFunc(E) {
    E.preventDefault();
    box = document.querySelector('.box');
    var orgHeight = parseInt(box.style.height, 10);
    box.style.height = (orgHeight > 50) ? "30px": box.scrollHeight + "px";
}


if($(".tagbox-col").height()>34)
{
    $(".toggle-tag").show();
}

$(".toggle-tag").click(function()
{

    $(".tagbox").toggleClass("active");

});


//播放视频
$(".play-control").click(function()
{
    $(this).hide();
    $(this).parent().find("video").attr("controls","controls");
    $(this).parent().find("video")[0].play();
});


//加入收藏 取消收藏
$(".shoucang").click(function()
{
    if($(this).hasClass("active"))
    {
        $(this).removeClass("active");

    }
    else
    {
        $(this).addClass("active");

        var describeText=$('.describe-text').text();
        var priceText=$(".price-text").text();

        $("#silderitemList").prepend('<div class="silderitem">'+
            '<div class="sildertitle">自由行</div>'+
            '<div style="min-height:70px;border-bottom:1px solid #f1f1f1;">'+
            describeText+'<br>'+
            '適用期間：2016/07/01~2016/09/30'+
            '</div>'+
            '<div style="line-height:40px;text-align:right;">每人 <span style="color:#e10500;font-size:20px;vertical-align:baseline;">'+priceText+'</span> 起</div>'+
            '</div>');

        $("#sildermenu").attr("checked","checked");
    }

});


//列印
$("#shenfenTextCol").change(function()
{

    $("#calendar03").show();
    $(".bottom-btn").show();

});

//详细操作
$("#qingjingColList").on("click",".product-top .detail-btn",function()
{

    $(this).parent().parent().hide();
    $(this).parent().parent().next().show();

});

$("#qingjingColList").on("click",".product-select .detail-btn",function()
{

    $(this).parent().parent().prev().show();
    $(this).parent().parent().hide();

})

//取消功能
$("#qingjingColList").on("click",".quxiao-btn-col",function()
{

    $(this).parent().parent().parent().parent().find(".detail-btn").removeClass("active");
    $(this).parent().parent().parent().find(".xuanze-text").text("請選擇");

    $(this).parent().parent().parent().parent().find(".identity-list").empty();


});
















