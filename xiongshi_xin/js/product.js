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
var putawayTime="2018/01/05 08:00:00";  //上架时间



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

    document.getElementById("timer").innerHTML = days+" 天 " + hours+" 時 " + minutes+" 分 "+seconds+" 秒 <span class='millisecond'>"+millisecond+"</span>";
}

setInterval("leftTimer(putawayTime)",1);

function checkTime(i){ //将0-9的数字前面加上0，例1变为01
    if(i<10)
    {
        i = "0" + i;
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

    var optionList= [
        {
        id:1,
        name:"选项1",
        time:[
            {
            id:1,
            name: "07:00",
            identity:[
                {
                    id:1,
                    name:"成人",
                    pricelist: [
                        {
                            id:1,
                            date: "2018-01-01",
                            price: "$839",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:1,  //表示倍数购买
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:1,  //表示倍数购买
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:2,
                            date: "2018-01-02",
                            price: "$48239",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:3,
                                    ismultiple:1,  //表示倍数购买
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,  //表示倍数购买
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:3,
                            date: "2018-01-03",
                            price: "$4339",
                            identity_list:[
                                {
                                    id:1,
                                    name:'',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                }

                            ]
                        },
                        {
                            id:4,
                            date: "2018-01-04",
                            price: "$839",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:5,
                            date: "2018-01-05",
                            price: "$439",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:6,
                            date: "2018-01-06",
                            price: "$39",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        }

                    ]
                },
                {
                    id:2,
                    name:"儿童",
                    pricelist: [
                        {
                            id:1,
                            date: "2018-02-01",
                            price: "$1839",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:2,
                            date: "2018-02-02",
                            price: "$239",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:3,
                            date: "2018-02-03",
                            price: "$48339",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:4,
                            date: "2018-02-04",
                            price: "$839",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:5,
                            date: "2018-02-05",
                            price: "$439",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:6,
                            date: "2018-02-06",
                            price: "$639",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        }

                    ]
                },
                {
                    id:3,
                    name:"老人",
                    pricelist: [
                        {
                            id:1,
                            date: "2018-02-01",
                            price: "$1839",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:2,
                            date: "2018-02-02",
                            price: "$239",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:3,
                            date: "2018-02-03",
                            price: "$48339",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:4,
                            date: "2018-02-04",
                            price: "$839",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:5,
                            date: "2018-02-05",
                            price: "$439",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:6,
                            date: "2018-02-06",
                            price: "$639",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        }

                    ]
                }

            ]

            },
            {
                id:2,
                name: "08:00",
                identity:[
                    {
                        id:1,
                        name:"成人",
                        pricelist: [
                            {
                                id:1,
                                date: "2018-01-01",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:1,  //表示倍数购买
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:1,  //表示倍数购买
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:2,
                                date: "2018-01-02",
                                price: "$48239",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:3,
                                        ismultiple:1,  //表示倍数购买
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,  //表示倍数购买
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:3,
                                date: "2018-01-03",
                                price: "$4339",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:4,
                                date: "2018-01-04",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:5,
                                date: "2018-01-05",
                                price: "$439",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:6,
                                date: "2018-01-06",
                                price: "$39",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            }

                        ]
                    },
                    {
                        id:2,
                        name:"儿童",
                        pricelist: [
                            {
                                id:1,
                                date: "2018-02-01",
                                price: "$1839",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:2,
                                date: "2018-02-02",
                                price: "$239",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:3,
                                date: "2018-02-03",
                                price: "$48339",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:4,
                                date: "2018-02-04",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:5,
                                date: "2018-02-05",
                                price: "$439",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:6,
                                date: "2018-02-06",
                                price: "$639",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            }

                        ]
                    },
                    {
                        id:3,
                        name:"老人",
                        pricelist: [
                            {
                                id:1,
                                date: "2018-02-01",
                                price: "$1839",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:2,
                                date: "2018-02-02",
                                price: "$239",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:3,
                                date: "2018-02-03",
                                price: "$48339",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:4,
                                date: "2018-02-04",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:5,
                                date: "2018-02-05",
                                price: "$439",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:6,
                                date: "2018-02-06",
                                price: "$639",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            }

                        ]
                    }

                ]

            }
        ]
        },
        {
            id:2,
            name:"选项2",
            time:[
                {
                    id:1,
                    name: "09:00",
                    identity:[
                        {
                            id:1,
                            name:"成人",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-01-01",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-01-02",
                                    price: "$48239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:3,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-01-03",
                                    price: "$4339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-01-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-01-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-01-06",
                                    price: "$39",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            id:2,
                            name:"儿童",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-02-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-02-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            id:3,
                            name:"老人",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-02-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-02-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        }

                    ]

                },
                {
                    id:2,
                    name: "10:00",
                    identity:[
                        {
                            id:1,
                            name:"成人",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-01-01",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-01-02",
                                    price: "$48239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:3,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-01-03",
                                    price: "$4339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-01-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-01-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-01-06",
                                    price: "$39",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            id:2,
                            name:"儿童",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-02-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-02-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            id:3,
                            name:"老人",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-02-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-02-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        }

                    ]

                }
            ]
        },
        {
            id:3,
            name:"选项3",
            time:[
                {
                    id:1,
                    name: "10:00",
                    identity:[
                        {
                            id:1,
                            name:"成人",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-01-01",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-01-02",
                                    price: "$48239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:3,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-01-03",
                                    price: "$4339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-01-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-01-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-01-06",
                                    price: "$39",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            id:2,
                            name:"儿童",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-02-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-02-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            id:3,
                            name:"老人",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-02-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-02-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        }

                    ]

                },
                {
                    id:2,
                    name: "11:00",
                    identity:[
                        {
                            id:1,
                            name:"成人",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-01-01",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-01-02",
                                    price: "$48239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:3,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-01-03",
                                    price: "$4339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-01-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-01-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-01-06",
                                    price: "$39",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            id:2,
                            name:"儿童",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-02-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-02-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            id:3,
                            name:"老人",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-02-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-02-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                }

                            ]
                        }

                    ]

                }
            ]
        }
    ];


    var selectHtml="";
    for(var i=0;i<optionList.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList[i].id+"'>"+optionList[i].name+"</option>";

    }

    $("#xuanxiangText").append(selectHtml);


    //联动
    $("#xuanxiangText").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($("#changciText").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);
        initPrice();
    });


    $("#changciText").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initIdentitySelect(optionId);
        initPrice();

    });

    $("#shenfenText").change(function()
    {

        initPrice();

    });

    function initIdentitySelect(optionId2)
    {

        var optionId1=parseInt($("#xuanxiangText").val()-1);


        $("#shenfenText").empty();
        var identityHtml="";
        for(var i=0;i<optionList[optionId1].time[optionId2].identity.length;i++)
        {
            identityHtml=identityHtml+"<option value='"+optionList[optionId1].time[optionId2].identity[i].id+"'>"+optionList[optionId1].time[optionId2].identity[i].name+"</option>"
        }
        $("#shenfenText").append(identityHtml);
    }


    function initTimeSelect(optionId)
    {
        $("#changciText").empty();
        var timeHtml="";
        for(var i=0;i<optionList[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList[optionId].time[i].id+"'>"+optionList[optionId].time[i].name+"</option>"
        }
        $("#changciText").append(timeHtml);
    }

    initTimeSelect(0);
    initIdentitySelect(0);



    function initPrice()
    {

        var optionId1=parseInt($("#xuanxiangText").val())-1;
        var optionId2=parseInt($("#changciText").val())-1;
        var optionId3=parseInt($("#shenfenText").val())-1;

        var priceList=optionList[optionId1].time[optionId2].identity[optionId3].pricelist;


        var yearMoth=$("#calendar04 .ic__year").attr("data-value");

        console.log("yearMoth"+yearMoth);
        console.log(priceList);

        $("#calendar04 .ic__day .price-text").text("");
        for(var i=0;i<priceList.length;i++)
        {

            if(priceList[i].date.indexOf(yearMoth)>-1)
            {

                console.log(yearMoth);

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
        console.log("prev");
        initPrice();
    }

    function ic__next()
    {
        console.log("next");
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

            $(".detail-btn1").addClass("active");

            var optionId1=$("#xuanxiangText").val()-1;
            var optionId2=$("#changciText").val()-1;
            var optionId3=$("#shenfenText").val()-1;

            var priceList=optionList[optionId1].time[optionId2].identity[optionId3].pricelist;

            var priceText;
            var priceIndex=-1;
            for(var i=0;i<priceList.length;i++)
            {
                if(date.substr(0,10)==priceList[i].date)
                {
                    priceText=priceList[i].price;

                    priceIndex=i;

                }
            }


            var identity_list_html="";
            var shenfenColText="";
            if(priceIndex!=-1)
            {

                for(var i=0;i<priceList[priceIndex].identity_list.length;i++)
                {

                    if(priceList[priceIndex].identity_list[i].name)
                    {
                        shenfenColText=shenfenColText+priceList[priceIndex].identity_list[i].name+priceList[priceIndex].identity_list[i].minvalue+"位、";
                    }
                    else
                    {
                        shenfenColText=shenfenColText+priceList[priceIndex].identity_list[i].minvalue+"位";
                    }


                    if((shenfenColText.indexOf("、")>-1)&&(i==priceList[priceIndex].identity_list.length-1))
                    {
                        shenfenColText=shenfenColText.substring(0,shenfenColText.length-1);
                    }

                    identity_list_html=identity_list_html+'<div class="col-xs-3 col-sm-3 col-md-3 identity-col">'+
                        '<div>'+
                        '<span style="vertical-align:middle;margin-right:5px;">'+priceList[priceIndex].identity_list[i].name+'</span>'+
                        '<span class="text-hover"><img src="images/icon10.png"/>'+
                        '<div  class="talkbox">'+priceList[priceIndex].identity_list[i].tip+'</div>'+
                        '</span>'+
                        '</div>'+
                        '<div style="margin-top:10px;">'+
                        '<span class="minus-text" style="border:1px solid #dddddd;padding:2px 12px 3px 10px;background:#f7f7f7;color:#000;">-</span><span class="value1" style="vertical-align:initial;">'+
                        '<input class="middle-text" type="text" size="3" style="height:24px;text-align:center;" data-multiple="'+priceList[priceIndex].identity_list[i].ismultiple+'" data-minvalue="'+priceList[priceIndex].identity_list[i].minvalue+'" value="'+priceList[priceIndex].identity_list[i].minvalue+'">'+
                        '</span>'+
                        '<span class="plus-text" style="border:1px solid #dddddd;padding:2px 12px 3px 10px;background:#f7f7f7;color:#000;">+</span>'+
                        '</div>'+
                        '</div>';
                }
            }

            $("#shenfenColText").text(shenfenColText);

            $(".identity-list .identity-col").remove();
            $(".identity-list").prepend(identity_list_html);

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


$(".detail-btn-col").click(function()
{

    $(this).parent().parent().parent().next().toggle();
    $(this).toggleClass("open");
    $(this).parent().parent().parent().toggleClass("active");

});


$(".quxiao-btn-col").click(function()
{

    $(this).parent().removeClass("active");
    $(this).parent().parent().parent().parent().find(".select02").html('選項<font style="color:red;">*</font> 請選擇');

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


//人数加和减运算
$("body").on("click",".minus-text",function()
{

    var prevNum=parseInt($(this).parent().find(".middle-text").val());

    var prevValue=parseInt($(this).parent().find(".middle-text").attr("data-minvalue"));

    var isMultiple=$(this).parent().find(".middle-text").attr("data-multiple");

    if(prevNum>1)
    {
        if(isMultiple=="1")
        {
            prevNum=prevNum-prevValue;
        }
        else {
            prevNum--;
        }

        if(prevNum==1)
        {
            $(this).parent().find(".middle-text").val(prevNum);
        }
        else {
            $(this).parent().find(".middle-text").val(prevNum+"位");
        }

    }



});
$("body").on("click",".plus-text",function()
{

    var prevNum=parseInt($(this).parent().find(".middle-text").val());

    var prevValue=parseInt($(this).parent().find(".middle-text").attr("data-minvalue"));

    var isMultiple=$(this).parent().find(".middle-text").attr("data-multiple");



           if(isMultiple=="1")
           {
               prevNum=prevNum+prevValue;
           }
           else {
               prevNum++;
           }

        if(prevNum<=10)
        {
           $(this).parent().find(".middle-text").val(prevNum+"位");
         }



});



//列印
$("#shenfenTextCol").change(function()
{

    $("#calendar03").show();
    $(".bottom-btn").show();

});



//国家选择json
var proCountryList=[
    {
        id:1,
        name:'荷比盧',
        child:[
            {
                id:1,
                name:'德國',
                child:[
                    {
                        id:1,
                        name:'義大利'
                    },
                    {
                        id:2,
                        name:'愛爾蘭'
                    }
                ]
            },
            {
                id:2,
                name:'義大利'
            },
            {
                id:3,
                name:'西班牙'
            },
            {
                id:4,
                name:'瑞士'
            }

        ]
    },
    {
        id:2,
        name:'法國',
        child:[
            {
                id:1,
                name:'斯洛伐克'
            },
            {
                id:2,
                name:'義大利'
            },
            {
                id:3,
                name:'西班牙'
            },
            {
                id:4,
                name:'瑞士'
            }

        ]
    },
    {
        id:3,
        name:'奧地利',
        child:[
            {
                id:1,
                name:'希臘'
            },
            {
                id:2,
                name:'義大利'
            },
            {
                id:3,
                name:'西班牙'
            },
            {
                id:4,
                name:'瑞士'
            }

        ]
    }
]

//国家选择操作
var countryListHtml="";

for(var i=0;i<proCountryList.length;i++)
{
    var childList=[];
    var hasChild=0;
    if(proCountryList[i].child)
    {
        childList=proCountryList[i].child;
        hasChild=1;
    }

    childList=JSON.stringify(childList);

    countryListHtml=countryListHtml+'<li><input type="checkbox" class="child-level" data-level="1" data-child="'+hasChild+'" data-id="'+proCountryList[i].id+'"  /><label>'+proCountryList[i].name+'</label><span class="child-list" style="display: none;">'+childList+'</span></li>';
}


$("#countryList").append(countryListHtml);


$("body").on("click",".child-level",function()
{

    if($(this).attr("data-child")=="1")
    {
        var dataLevel=parseInt($(this).attr("data-level"))+1;
        var proCountryListTemp=JSON.parse($(this).parent().find(".child-list").text());
        getChildList(dataLevel,proCountryListTemp);
    }
    else
    {
        $(".calendar-col").show();
    }

   if($("#countryInput").val()=="")
   {
       $("#countryInput").val($("#countryInput").val()+$(this).next().text());
   }
    else {
       $("#countryInput").val($("#countryInput").val()+"、"+$(this).next().text());
   }



});

function getChildList(dataLevel,proCountryListTemp)
{

    var countryCheckHtml="";


    console.log(proCountryListTemp);

    for(var i=0;i<proCountryListTemp.length;i++)
    {
        var childList=[];
        var hasChild=0;
        if(proCountryListTemp[i].child)
        {
            childList=proCountryListTemp[i].child;
            hasChild=1;
        }

        childList=JSON.stringify(childList);
        countryCheckHtml=countryCheckHtml+'<li><input type="checkbox" class="child-level" data-level="'+dataLevel+'" data-child="'+hasChild+'" data-id="'+proCountryListTemp[i].id+'" /><label>'+proCountryListTemp[i].name+'</label><span class="child-list" style="display: none;">'+childList+'</span></li>';;
    }

    $("#countryList").empty();
    $("#countryList").append(countryCheckHtml);


}





















































