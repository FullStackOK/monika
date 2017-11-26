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
});

$(document).ready(function(){
    $(".talkbox").hide();
});



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
                loopedSlides: 5, //looped slides should be the same
            });
            galleryThumbs1 = new Swiper('.gallery-thumbs-modal', {
                nextButton: '.next-btn-modal',
                prevButton: '.prev-btn-modal',
                spaceBetween: 5,
                slidesPerView: 8,
                touchRatio: 0.2,
                loop:true,
                loopedSlides: 5, //looped slides should be the same
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

    $("body").on("click","#countryList li input",function()
    {
      $(".calendar-col").show();

    });



$("#calendar03").ionCalendar({
    lang: 'zh-cn'
});



//手机日期控件
function getCountDays() {

    var curDate = new Date();

    var curMonth = curDate.getMonth();

    curDate.setMonth(curMonth + 1);

    curDate.setDate(0);

    return curDate.getDate();

}

var dayCount=getCountDays();

function getEvryDay(){
    var dayArry=[];
    for (var k = 1; k <= dayCount; k++) {
        dayArry.push(k);
    }
    return dayArry;
}


$("#dateList").append();


$("#mobileSelectCountry").click(function()
{

    $("#selectCountryModal").show();

});

$("#mobileSelectDate").click(function()
{
    $("#selectDateModal").show();
});


$("#closeSelectCountry").click(function()
{
    $("#selectCountryModal").hide();
});


$("#closeSelectDate").click(function()
{

    $("#selectDateModal").hide();

});


//pc日期控件添加价格

    var priceList=[
        {
            date:"2017-11-01",
            price:"$4839"
        },
        {
            date:"2017-11-02",
            price:"$48239"
        },
        {
            date:"2017-11-03",
            price:"$48339"
        },
        {
            date:"2017-11-04",
            price:"$839"
        },
        {
            date:"2017-11-05",
            price:"$439"
        },
        {
            date:"2017-12-06",
            price:"$4839"
        }
    ]


    function initPrice()
    {

        var yearMoth=$("#calendar04 .ic__year").attr("data-value");

        for(var i=0;i<priceList.length;i++)
        {

            console.log(yearMoth);

            if(priceList[i].date.indexOf(yearMoth)>-1)
            {
                var dayColText=parseInt(priceList[i].date.split("-")[2]);
                var priceText=priceList[i].price;

                $("#calendar04 .ic__day").each(function()
                {
                    if(parseInt(dayColText)==$(this).find("div").eq(0).text())
                    {
                        $(this).find("div").eq(1).text(priceText);
                    }
                });

            }
        }


    }



    function ic__prev()
    {
        initPrice();
    }

    function ic__next()
    {
        initPrice();
    }


$(".select02").click(function()
{
    initPrice();
});



//顶部下拉
$("#topmenu .first-topitem").mouseover(function()
{
    $(this).find(".xiala-col").show();
}).mouseout(function()
{
    $(this).find(".xiala-col").hide();
});


$(function(){

    $("#calendar04").ionCalendar({
        lang: 'zh-cn',
        onClick:function(date)
        {
            console.log(date);
            $("#dateCol").val(date.substr(0,10));
            $("#dateContent").text(date.substr(0,10));

            var priceText;
            for(var i=0;i<priceList.length;i++)
            {
                if(date.substr(0,10)==priceList[i].date)
                {
                    priceText=priceList[i].price;
                }
            }

            $("#priceCol").val(priceText);
            $("#shenfenCol").val($("#shenfenText").val());
            $("#changciCol").val($("#changciText").val());
            $("#xuanxiangCol").val($("#xuanxiangText").val());
            $(".fancybox-close-small")[0].click();

        }
    });

    $(".menushop").click(function()
    {
        window.location.href="confirm.html?class="+ $("#xuanxiangCol").val()+"&event="+$("#priceCol").val()+"&idkind="+$("#shenfenCol").val()+"&usedate="+$("#dateCol").val()+"&adult="+$("#adult").val()+"&child="+$("#child").val();
    });


});


$('.value-plus1').on('click', function(){
    var divUpd = $(this).parent().find('.value1 input'), newVal = parseInt(divUpd.val(), 10)+1+"位";
    divUpd.val(newVal);
});

$('.value-minus1').on('click', function(){
    var divUpd = $(this).parent().find('.value1 input'), newVal = parseInt(divUpd.val(), 10)-1+"位";
    if(newVal>=1) divUpd.val(newVal);
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
    slidesPerView: 6,
    touchRatio: 0.2,
    loop:true,
    loopedSlides: 5, //looped slides should be the same
    slideToClickedSlide: true
});
galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;

$(function(){
    $("#calendar02").ionCalendar({
        lang: 'zh-cn',
        onClick:function()
        {

            $("#productSelect").empty();

            var dateValue1=$("#calendarSelect1").val();
            var dateValue2=$("#calendarSelect2").val();
            var dateValue3=$("#calendarSelect3").val();
            var dateValue4=$(this).find("div").eq(1).text();

            $("#productSelect").empty();
            $("#productSelect").append("<option>"+dateValue1+","+dateValue2+","+dateValue3+"."+dateValue4+"</option>")

        }
    });

    $("#calendarMobile").ionCalendar({
        lang: 'zh-cn'
    });



});

$('article').readmore({
    moreLink: '<div style="text-align:center"><img style="width:15px;margin-right:5px;" src="images/readmore.png"/><a href="#">看完整資訊</a></div>',
    lessLink: '<div style="text-align:center"><img style="width:15px;margin-right:5px;" src="images/readmore2.png"/><a href="#">收合</a></div>',
    collapsedHeight: 350,
    speed: 500
});

var toggleNode = document.querySelector('.toggle');

toggleNode.addEventListener("click", toggleFunc);

function toggleFunc(E) {
    E.preventDefault();
    box = document.querySelector('.box');
    var orgHeight = parseInt(box.style.height, 10);
    box.style.height = (orgHeight > 50) ? "30px": box.scrollHeight + "px";
}




$(function(){
    // 先取得 #abgne-110223 及 ul, li 及 .caption 元素
    // 並預設先顯示第幾個, 還有動畫速度
    var $block = $('#abgne-110223'),
        $wrap = $block.find('.swiper-container'),
        $ul = $wrap.find('.swiper-wrapper'),
        $li = $ul.find('.swiper-slide'),
        $caption = $block.find('.caption'),
        _default = 0,
        _width = $wrap.width(),
        animateSpeed = 400;

    // 先把 ul 的寬度設成 li 數量 x $wrap 的寬
    //$ul.width(_width * $li.length);
    // 如果 .arrows 中的 a 被點擊時
    $block.find('.arrows').delegate('div', 'click', function(event){
        // 先找出 .selected 的元素後移掉該樣式
        var $selected = $li.filter('.swiper-slide-active').removeClass('swiper-slide-active'),
        // 找出目前顯示的元素是第幾個
            _index = $li.index($selected);

        // 依點擊的是上一張或下一張來切換
        _index = (event.target.className == 'swiper-button-prev' ? _index - 1 + $li.length : _index + 1) % $li.length;
        //$ul.animate({
        //	left: _index * _width * -1
        //}, animateSpeed);
        // 改變標題
        $caption.hide().html($li.eq(_index).addClass('swiper-slide-active').find('img').attr('alt')).fadeIn(animateSpeed);

        return false;
    });

    // 先顯示預設的
    //$ul.css('left', _default * _width * -1);
    $caption.html($li.eq(_default).addClass('swiper-slide-active').find('img').attr('alt'));

    $block.find('div').focus(function(){
        this.blur();
    });


    //鼠标悬浮样式
    $(".hover-text").mouseover(function()
    {
        $(this).find(".talkbox").show();
    }).mouseout(function()
    {
        $(this).find(".talkbox").hide();
    });

    //加入收藏样式
    $(".shoucang").click(function()
    {
        $(this).toggleClass("active");
    });


});






