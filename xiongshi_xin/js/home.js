
$(document).ready(function(){


    $(".main_visual").hover(function(){
        $("#btn_prev,#btn_next").fadeIn()
    },function(){
        $("#btn_prev,#btn_next").fadeOut()
    });

    $dragBln = false;

    $(".main_image").touchSlider({
        flexible : true,
        speed : 200,
        btn_prev : $("#btn_prev"),
        btn_next : $("#btn_next"),
        paging : $(".flicking_con a"),
        counter : function (e){
            $(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
        }
    });

    $(".main_image").bind("mousedown", function() {
        $dragBln = false;
    });

    $(".main_image").bind("dragstart", function() {
        $dragBln = true;
    });

    $(".main_image a").click(function(){
        if($dragBln) {
            return false;
        }
    });

    timer = setInterval(function(){
        $("#btn_next").click();
    }, 5000);

    $(".main_visual").hover(function(){
        clearInterval(timer);
    },function(){
        timer = setInterval(function(){
            $("#btn_next").click();
        },5000);
    });

    $(".main_image").bind("touchstart",function(){
        clearInterval(timer);
    }).bind("touchend", function(){
        timer = setInterval(function(){
            $("#btn_next").click();
        }, 5000);
    });

});


var data = [
    {
        "name": "常用",
        "city": [
            {"cityName": "南京", "cityNumber": "001", "selected": true},
            {"cityName": "上海", "cityNumber": "002"},
            {"cityName": "苏州", "cityNumber": "003", "selected": true}
        ]
    },

    {
        "name": "全部",
        "city": [
            {"cityName": "遊程", "cityNumber": "001"},
            {"cityName": "租車/包車", "cityNumber": "002"},
            {"cityName": "交通票卡", "cityNumber": "003"},
            {"cityName": "體驗活動", "cityNumber": "004"},
            {"cityName": "美食餐廳", "cityNumber": "005"},
            {"cityName": "電影/文化展演", "cityNumber": "006"},
            {"cityName": "接送服務", "cityNumber": "007"},
            {"cityName": "SPA&溫泉", "cityNumber": "008"},
            {"cityName": "景區/樂園", "cityNumber": "009"},
            {"cityName": "網路活動", "cityNumber": "010"},
            {"cityName": "戶外活動", "cityNumber": "011"},
            {"cityName": "水上活動", "cityNumber": "012"},
            {"cityName": "空中活動", "cityNumber": "013"},
            {"cityName": "住宿/休憩卷", "cityNumber": "014"}
        ]
    }
];


//传入的参数
var slidownSelectOptionse1 = {
    el: 'aaaaaa',//容器名称
    type: 'double',//插件类型
    width: '70px',//宽度
    height: 'auto',//高度
    background: '#ffffff',//默认背景色
    color: '#999999',//默认字体颜色
    selectBackground: '#fff',//选中背景色
    selectColor: '#000',//选中字体颜色
    show: 'false',//是否展开
    content: '不限',//默认要显示的内容
    data: data//数据
}

//调用方法
$(document).ready(function () {
    rltTools.slidownSelect(slidownSelectOptionse1)
})


var Data1=[
    {"11":"美國(US)-紐約-NEW YORK(NYC)-拉瓜地拉瓜地拉-LGLGA NEWYORK(LGA)"},
    {"12":"美國(US)-紐約-NEW YORK(NYC)-拉瓜地拉瓜地拉-LGLGA NEWYORK(LGA)"},
    {"11":"美國(US)-紐約-NEW YORK(NYC)-拉瓜地拉瓜地拉-LGLGA NEWYORK(LGA)"},
    {"12":"美國(US)-紐約-NEW YORK(NYC)-拉瓜地拉瓜地拉-LGLGA NEWYORK(LGA)"},
];
$('#cityDanXuan').hsCheckData({
    isShowCheckBox: false, //默认为false
    data: Data1
});
var Data2=[
    {"11":"遊程"},
    {"12":"租車/包車"},
    {"11":"交通票卡"},
    {"12":"體驗活動"},
    {"11":"美食餐廳"},
    {"12":"電影/文化展演"},
    {"11":"接送服務"},
    {"12":"SPA&溫泉"},
    {"11":"景區/樂園"},
    {"12":"網路活動"},
    {"11":"戶外活動"},
    {"12":"水上活動"},
    {"11":"空中活動"},
    {"12":"住宿/休憩卷"},
];
$('#cityDuoXuan').hsCheckData({
    isShowCheckBox: true, //默认为false
    minCheck: 3,//默认为0，不限最少选择个数
    maxCheck: 6,//默认为0，不限最多选择个数
    data: Data2
});



$("#shareCol").click(function()
{
    $(".find-div-body").toggle();
});


$("#mainList .collection label").click(function()
{

    $("#sildermenu").prop("checked","checked");

    $("#silderitemList").prepend('<div class="silderitem">					<div class="menu2" id="thisNode">						<span></span>						<span></span>					</div>					<div class="sildertitle">测试测试</div>					<div style="min-height:70px;border-bottom:1px solid #f1f1f1;">						Love秋冬．東京+橫濱 3~14天<br>						適用期間：2016/07/01~2016/09/30					</div>					<div style="line-height:40px;text-align:right;">每人<span style="color:#e10500;font-size:20px;vertical-align:baseline;">$35,568</span> 起</div>				</div>');


    $("#shoucangListCol").show();
    $("#shoucangList .right-no-data").remove();


});


$("#menuCol").click(function()
{

    if($("body").hasClass("active"))
    {
        $("body").removeClass("active");
        $(".left-menu-col").hide();

    }
    else
    {
        $("body").addClass("active");
        $(".left-menu-col").show();
    }

});

$("#rightMenuCol").click(function()
{
    if($("body").hasClass("right-active"))
    {
        $("body").removeClass("right-active");
        $(".right-menu-col").hide();

    }
    else
    {
        $("body").addClass("right-active");
        $(".right-menu-col").show();
    }
});


$("#mobileSearch").click(function()
{
    $(".titlebar").addClass("active");
});

$("#bottomSearchBtn").click(function()
{
    $(".titlebar").removeClass("active");
});

$(".titlebar .back-col").click(function()
{
    $(".titlebar").removeClass("active");
});

