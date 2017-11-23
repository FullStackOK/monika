

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






