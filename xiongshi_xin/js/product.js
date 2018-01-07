moment.locale('zh-cn');




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


//情景1日期控件
$("#calendarCol1").clndr({
    template: $('#calendarTemplate').html(),
    clickEvents: {
        onMonthChange: function () {

            initFirstScene();

        },
        click: function(target){

           if($(target.element).hasClass("active"))
           {
               var dateStr=target.date.format("YYYY-MM-DD");
               console.log(dateStr);
               $("#"+selectInfoId).find("span").text(dateStr);
           }



        },
    },

    moment: moment,
    constraints: {
        endDate: moment().add(90, 'days').format("YYYY-MM-DD"),
        startDate: moment().format("YYYY-MM-DD")
    },

    numberOfRows: 5,

    adjacentDaysChangeMonth : true,
});

function initFirstScene()
{
    var dateListCol=sceneJson[qingjing1Index].selectList[qingjing1SelectIndex].dateList;
    initCalendarInfo($("#calendarCol1"),dateListCol);
}

//添加日历可选数据
function initCalendarInfo($calendarCol,dateListCol)
{
    $calendarCol.find(".days .day").removeClass("active");
    $calendarCol.find(".days .day").removeAttr("data-fancybox-close");
    $calendarCol.find(".days .day").removeAttr("data-id");
    $calendarCol.find(".days .day .price-text").text("");
    $calendarCol.find(".days .day").each(function()
    {

        for(var i=0;i<dateListCol.length;i++)
        {
            if($(this).attr("data-str")==dateListCol[i].date)
            {
                $(this).addClass("active");
                $(this).attr("data-fancybox-close","true");
                $(this).attr("data-id",dateListCol[i].id);
                if(dateListCol[i].price)
                {
                    $(this).find(".price-text").text(dateListCol[i].price);
                }

            }
        }
    });
}

//情景2
var optionList=[];
var isMustBuy2;
function initSecondScene()
{


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



    $("#calendarCol2").clndr({
        template: $('#calendarTemplate').html(),
        clickEvents: {
            onMonthChange: function () {

                initPrice();

            },
            click: function(target){

                if($(target.element).hasClass("active"))
                {
                    var dateStr=target.date.format("YYYY-MM-DD");

                    var qingjing2Text=$("#xuanxiangText option:selected").text()+"，"+$("#changciText option:selected").text()+"，"+dateStr;

                    var priceText=$(target.element).find(".price-text").text();

                    if(priceText)
                    {
                        qingjing2Text=qingjing2Text+"，"+priceText;
                    }

                    $("#qingjing2Text").text(qingjing2Text);


                    var optionId1=parseInt($("#xuanxiangText").val())-1;
                    var optionId2=parseInt($("#changciText").val())-1;
                    var optionId3=parseInt($("#shenfenText").val())-1;

                    var priceList=optionList[optionId1].time[optionId2].identity[optionId3].pricelist;

                    var identity_list=priceList[parseInt($(target.element).attr("data-id"))-1].identity_list;

                    identityListInit($("#changjingCol2"),identity_list,isMustBuy2);



                }




            },
        },

        moment: moment,
        constraints: {
            endDate: moment().add(90, 'days').format("YYYY-MM-DD"),
            startDate: moment().format("YYYY-MM-DD")
        },

        numberOfRows: 5,

        adjacentDaysChangeMonth : true,
    });


    function initPrice()
    {

        var optionId1=parseInt($("#xuanxiangText").val())-1;
        var optionId2=parseInt($("#changciText").val())-1;
        var optionId3=parseInt($("#shenfenText").val())-1;

        var priceList=optionList[optionId1].time[optionId2].identity[optionId3].pricelist;


        console.log(priceList);

        initCalendarInfo($("#calendarCol2"),priceList);

    }

    initPrice();


}



//情景3
var optionList3=[];
var isMustBuy3;
function initScene3()
{


    var selectHtml="";
    for(var i=0;i<optionList3.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList3[i].id+"'>"+optionList3[i].name+"</option>";

    }

    $("#xuanxiangText3").append(selectHtml);

    //联动
    $("#xuanxiangText3").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($("#changciText3").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);
        initPrice();
    });


    $("#changciText3").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initIdentitySelect(optionId);
        initPrice();

    });

    $("#shenfenText3").change(function()
    {

        initPrice();

    });

    function initIdentitySelect(optionId2)
    {

        var optionId1=parseInt($("#xuanxiangText3").val()-1);


        $("#shenfenText3").empty();
        var identityHtml="";
        for(var i=0;i<optionList3[optionId1].time[optionId2].identity.length;i++)
        {
            identityHtml=identityHtml+"<option value='"+optionList3[optionId1].time[optionId2].identity[i].id+"'>"+optionList3[optionId1].time[optionId2].identity[i].name+"</option>"
        }
        $("#shenfenText3").append(identityHtml);
    }


    function initTimeSelect(optionId)
    {
        $("#changciText3").empty();
        var timeHtml="";
        for(var i=0;i<optionList3[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList3[optionId].time[i].id+"'>"+optionList3[optionId].time[i].name+"</option>"
        }
        $("#changciText3").append(timeHtml);
    }

    initTimeSelect(0);
    initIdentitySelect(0);



    $("#calendarCol3").clndr({
        template: $('#calendarTemplate').html(),
        clickEvents: {
            onMonthChange: function () {

                initPrice();

            },
            click: function(target){

                if($(target.element).hasClass("active"))
                {
                    var dateStr=target.date.format("YYYY-MM-DD");

                    var qingjing2Text=$("#xuanxiangText3 option:selected").text()+"，"+$("#changciText3 option:selected").text()+"，"+dateStr;

                    var priceText=$(target.element).find(".price-text").text();

                    if(priceText)
                    {
                        qingjing2Text=qingjing2Text+"，"+priceText;
                    }

                    $("#qingjing3Text").text(qingjing2Text);


                    var optionId1=parseInt($("#xuanxiangText3").val())-1;
                    var optionId2=parseInt($("#changciText3").val())-1;
                    var optionId3=parseInt($("#shenfenText3").val())-1;

                    var priceList=optionList3[optionId1].time[optionId2].identity[optionId3].pricelist;

                    var identity_list=priceList[parseInt($(target.element).attr("data-id"))-1].identity_list;

                    identityListInit($("#changjingCol3"),identity_list,isMustBuy3);



                }




            },
        },

        moment: moment,
        constraints: {
            endDate: moment().add(90, 'days').format("YYYY-MM-DD"),
            startDate: moment().format("YYYY-MM-DD")
        },

        numberOfRows: 5,

        adjacentDaysChangeMonth : true,
    });


    function initPrice()
    {

        var optionId1=parseInt($("#xuanxiangText3").val())-1;
        var optionId2=parseInt($("#changciText3").val())-1;
        var optionId3=parseInt($("#shenfenText3").val())-1;

        var priceList=optionList3[optionId1].time[optionId2].identity[optionId3].pricelist;


        console.log(priceList);

        initCalendarInfo($("#calendarCol3"),priceList);

    }

    initPrice();


}


//情景4
var optionList4=[];
var isMustBuy4;
function initScene4()
{


    var selectHtml="";
    for(var i=0;i<optionList4.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList4[i].id+"'>"+optionList4[i].name+"</option>";

    }

    $("#xuanxiangText4").append(selectHtml);


    //联动
    $("#xuanxiangText4").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($("#changciText4").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);
        initPrice();
    });


    $("#changciText4").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initIdentitySelect(optionId);
        initPrice();

    });

    $("#shenfenText4").change(function()
    {

        initPrice();

    });

    function initIdentitySelect(optionId2)
    {

        var optionId1=parseInt($("#xuanxiangText4").val()-1);


        $("#shenfenText4").empty();
        var identityHtml="";
        for(var i=0;i<optionList4[optionId1].time[optionId2].identity.length;i++)
        {
            identityHtml=identityHtml+"<option value='"+optionList4[optionId1].time[optionId2].identity[i].id+"'>"+optionList4[optionId1].time[optionId2].identity[i].name+"</option>"
        }
        $("#shenfenText4").append(identityHtml);
    }


    function initTimeSelect(optionId)
    {
        $("#changciText4").empty();
        var timeHtml="";
        for(var i=0;i<optionList4[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList4[optionId].time[i].id+"'>"+optionList4[optionId].time[i].name+"</option>"
        }
        $("#changciText4").append(timeHtml);
    }

    initTimeSelect(0);
    initIdentitySelect(0);



    $("#calendarCol4").clndr({
        template: $('#calendarTemplate').html(),
        clickEvents: {
            onMonthChange: function () {

                initPrice();

            },
            click: function(target){

                if($(target.element).hasClass("active"))
                {
                    var dateStr=target.date.format("YYYY-MM-DD");

                    var qingjing2Text=$("#xuanxiangText4 option:selected").text()+"，"+$("#changciText4 option:selected").text()+"，"+dateStr;

                    var priceText=$(target.element).find(".price-text").text();

                    if(priceText)
                    {
                        qingjing2Text=qingjing2Text+"，"+priceText;
                    }

                    $("#qingjing4Text").text(qingjing2Text);


                    var optionId1=parseInt($("#xuanxiangText4").val())-1;
                    var optionId2=parseInt($("#changciText4").val())-1;
                    var optionId3=parseInt($("#shenfenText4").val())-1;

                    var priceList=optionList4[optionId1].time[optionId2].identity[optionId3].pricelist;

                    var identity_list=priceList[parseInt($(target.element).attr("data-id"))-1].identity_list;

                    identityListInit($("#changjingCol4"),identity_list,isMustBuy2);



                }




            },
        },

        moment: moment,
        constraints: {
            endDate: moment().add(90, 'days').format("YYYY-MM-DD"),
            startDate: moment().format("YYYY-MM-DD")
        },

        numberOfRows: 5,

        adjacentDaysChangeMonth : true,
    });


    function initPrice()
    {

        var optionId1=parseInt($("#xuanxiangText4").val())-1;
        var optionId2=parseInt($("#changciText4").val())-1;
        var optionId3=parseInt($("#shenfenText4").val())-1;

        var priceList=optionList4[optionId1].time[optionId2].identity[optionId3].pricelist;


        console.log(priceList);

        initCalendarInfo($("#calendarCol4"),priceList);

    }

    initPrice();


}

//情景5
var optionList5=[];
var isMustBuy5;
function initScene5()
{


    var selectHtml="";
    for(var i=0;i<optionList5.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList5[i].id+"'>"+optionList5[i].name+"</option>";

    }

    $("#xuanxiangText5").append(selectHtml);


    //联动
    $("#xuanxiangText5").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($("#changciText5").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);
    });


    $("#changciText5").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initIdentitySelect(optionId);

    });

    $("#querenBtn5").click(function()
    {

        var optionId1=parseInt($("#xuanxiangText5").val())-1;
        var optionId2=parseInt($("#changciText5").val())-1;
        var optionId3=parseInt($("#shenfenText5").val())-1;

        var identity_list=optionList5[optionId1].time[optionId2].identity[optionId3].identity_list;

        identityListInit($("#changjingCol5"),identity_list,isMustBuy5);


    });

    function initIdentitySelect(optionId2)
    {

        var optionId1=parseInt($("#xuanxiangText5").val()-1);


        $("#shenfenText5").empty();
        var identityHtml="";
        for(var i=0;i<optionList5[optionId1].time[optionId2].identity.length;i++)
        {
            identityHtml=identityHtml+"<option value='"+optionList5[optionId1].time[optionId2].identity[i].id+"'>"+optionList5[optionId1].time[optionId2].identity[i].name+"</option>"
        }
        $("#shenfenText5").append(identityHtml);
    }


    function initTimeSelect(optionId)
    {
        $("#changciText4").empty();
        var timeHtml="";
        for(var i=0;i<optionList5[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList5[optionId].time[i].id+"'>"+optionList5[optionId].time[i].name+"</option>"
        }
        $("#changciText5").append(timeHtml);
    }

    initTimeSelect(0);
    initIdentitySelect(0);




}

//情景6
var optionList6=[];
var isMustBuy6;
function initScene6()
{


    var selectHtml="";
    for(var i=0;i<optionList6.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList6[i].id+"'>"+optionList6[i].name+"</option>";

    }

    $("#xuanxiangText6").append(selectHtml);


    //联动
    $("#xuanxiangText6").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($("#changciText6").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);

    });


    $("#changciText6").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initIdentitySelect(optionId);


    });

   $("#querenBtn6").click(function()
   {

       var optionId1=parseInt($("#xuanxiangText6").val())-1;
       var optionId2=parseInt($("#changciText6").val())-1;
       var optionId3=parseInt($("#shenfenText6").val())-1;

       var identity_list=optionList6[optionId1].time[optionId2].identity[optionId3].identity_list;

       identityListInit($("#changjingCol6"),identity_list,isMustBuy6);


   });

    function initIdentitySelect(optionId2)
    {

        var optionId1=parseInt($("#xuanxiangText6").val()-1);


        $("#shenfenText6").empty();
        var identityHtml="";
        for(var i=0;i<optionList6[optionId1].time[optionId2].identity.length;i++)
        {
            identityHtml=identityHtml+"<option value='"+optionList6[optionId1].time[optionId2].identity[i].id+"'>"+optionList6[optionId1].time[optionId2].identity[i].name+"</option>"
        }
        $("#shenfenText6").append(identityHtml);
    }


    function initTimeSelect(optionId)
    {
        $("#changciText6").empty();
        var timeHtml="";
        for(var i=0;i<optionList6[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList6[optionId].time[i].id+"'>"+optionList6[optionId].time[i].name+"</option>"
        }
        $("#changciText6").append(timeHtml);
    }

    initTimeSelect(0);
    initIdentitySelect(0);



}


var optionList9=[];
var isMustBuy9;
function initScene9()
{
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


    var selectHtml="";
    for(var i=0;i<optionList9.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList9[i].id+"'>"+optionList9[i].name+"</option>";

    }

    $("#xuanxiangText9").append(selectHtml);

    //联动
    $("#xuanxiangText9").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($("#changciText9").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);
        initPrice();
    });


    $("#changciText9").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initIdentitySelect(optionId);
        initPrice();

    });

    $("#shenfenText9").change(function()
    {

        initPrice();

    });

    function initIdentitySelect(optionId2)
    {

        var optionId1=parseInt($("#xuanxiangText9").val()-1);


        $("#shenfenText9").empty();
        var identityHtml="";
        for(var i=0;i<optionList9[optionId1].time[optionId2].identity.length;i++)
        {
            identityHtml=identityHtml+"<option value='"+optionList9[optionId1].time[optionId2].identity[i].id+"'>"+optionList9[optionId1].time[optionId2].identity[i].name+"</option>"
        }
        $("#shenfenText9").append(identityHtml);
    }


    function initTimeSelect(optionId)
    {
        $("#changciText9").empty();
        var timeHtml="";
        for(var i=0;i<optionList9[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList9[optionId].time[i].id+"'>"+optionList9[optionId].time[i].name+"</option>"
        }
        $("#changciText9").append(timeHtml);
    }

    initTimeSelect(0);
    initIdentitySelect(0);



    $("#calendarCol9").clndr({
        template: $('#calendarTemplate').html(),
        clickEvents: {
            onMonthChange: function () {

                initPrice();

            },
            click: function(target){

                if($(target.element).hasClass("active"))
                {
                    var dateStr=target.date.format("YYYY-MM-DD");

                    var qingjing2Text=$("#xuanxiangText9 option:selected").text()+"，"+$("#changciText9 option:selected").text()+"，"+dateStr;

                    var priceText=$(target.element).find(".price-text").text();

                    if(priceText)
                    {
                        qingjing2Text=qingjing2Text+"，"+priceText;
                    }

                    $("#qingjing9Text").text(qingjing2Text);


                    var optionId1=parseInt($("#xuanxiangText9").val())-1;
                    var optionId2=parseInt($("#changciText9").val())-1;
                    var optionId3=parseInt($("#shenfenText9").val())-1;

                    var priceList=optionList9[optionId1].time[optionId2].identity[optionId3].pricelist;

                    var identity_list=priceList[parseInt($(target.element).attr("data-id"))-1].identity_list;

                    identityListInit($("#changjingCol9"),identity_list,isMustBuy9);



                }




            },
        },

        moment: moment,
        constraints: {
            endDate: moment().add(90, 'days').format("YYYY-MM-DD"),
            startDate: moment().format("YYYY-MM-DD")
        },

        numberOfRows: 5,

        adjacentDaysChangeMonth : true,
    });


    function initPrice()
    {

        var optionId1=parseInt($("#xuanxiangText9").val())-1;
        var optionId2=parseInt($("#changciText9").val())-1;
        var optionId3=parseInt($("#shenfenText9").val())-1;

        var priceList=optionList9[optionId1].time[optionId2].identity[optionId3].pricelist;


        console.log(priceList);

        initCalendarInfo($("#calendarCol9"),priceList);

    }

    initPrice();


}

//情景json

/*说明：
isDiscounts:1, 优惠组合
isMustBuy:1,   必买
isSingleSell:1 不可单卖
stock  库存
*/

var sceneJson=[
    {
        type:1,
        title:'白馬市極光奇景3日之旅',
        isDiscounts:1,
        isMustBuy:0,
        isSingleSell:1,
        selectList:[
            {
                id:1,
                title:'迪士尼樂園門票-陸地',
                dateList:[
                    {
                        id:1,
                        date: "2018-01-10",
                    },
                    {
                        id:2,
                        date: "2018-01-11",
                    },
                    {
                        id:3,
                        date: "2018-01-12",
                    }
                ],
            },
            {
                id:2,
                title:'迪士尼樂園門票-海洋',
                dateList:[
                    {
                        id:1,
                        date: "2018-01-10",
                    },
                    {
                        id:2,
                        date: "2018-01-11",
                    },
                    {
                        id:3,
                        date: "2018-02-02",
                    }
                ]
            }
        ],
        identityList:[
            {
                id:1,
                name:'大人',
                minvalue:1,
                ismultiple:1,
                cad:495,
                twd:500,
                stock:9
            },
            {
                id:2,
                name:'儿童',
                minvalue:1,
                ismultiple:0,
                cad:395,
                twd:400,
                stock:20
            }
        ]

    },
    {
        type:2,
        title:'白馬市極光奇景3日之旅白馬市2',
        isDiscounts:1,
        isMustBuy:0,
        isSingleSell:0,
        price:3728,
        optionList:[
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
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
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
                                                stock:10,
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
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                        date: "2018-02-01",
                                        price: "$1839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                        date: "2018-02-01",
                                        price: "$1839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                        date: "2018-02-01",
                                        price: "$1839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
        ]
    },
    {
        type:3,
        title:'白馬市極光奇景3日之旅白馬市3',
        isDiscounts:1,
        isMustBuy:0,
        isSingleSell:0,
        price:3728,
        optionList:[
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
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
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
        ]
    },
    {
        type:4,
        title:'白馬市極光奇景3日之旅白馬市4',
        isDiscounts:0,
        isMustBuy:0,
        isSingleSell:0,
        optionList:[
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                        date: "2018-01-01",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
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
                                                name:'一般',
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                            }

                                        ]
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
        type:5,
        title:'白馬市極光奇景3日之旅白馬市5',
        isDiscounts:0,
        isMustBuy:0,
        isSingleSell:0,
        optionList:[
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
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'小孩',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:2,
                                name:"儿童",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    }
                                ]

                            },
                            {
                                id:3,
                                name:"老人",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
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
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:2,
                                name:"儿童",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    }
                                ]

                            },
                            {
                                id:3,
                                name:"老人",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
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
                        name: "07:00",
                        identity:[
                            {
                                id:1,
                                name:"成人",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:2,
                                name:"儿童",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    }
                                ]

                            },
                            {
                                id:3,
                                name:"老人",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
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
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:2,
                                name:"儿童",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    }
                                ]

                            },
                            {
                                id:3,
                                name:"老人",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'大人',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,  //表示倍数购买
                                        cad:504,
                                        twd:605,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
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
        type:6,
        title:'白馬市極光奇景3日之旅白馬市6',
        isDiscounts:0,
        isMustBuy:0,
        isSingleSell:0,
        optionList:[
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
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

                                    }

                                ]
                            },
                            {
                                id:2,
                                name:"儿童",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

                                    }

                                ]

                            },
                            {
                                id:3,
                                name:"老人",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

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
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

                                    }

                                ]
                            },
                            {
                                id:2,
                                name:"儿童",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

                                    }

                                ]

                            },
                            {
                                id:3,
                                name:"老人",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

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
                        name: "07:00",
                        identity:[
                            {
                                id:1,
                                name:"成人",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

                                    }

                                ]
                            },
                            {
                                id:2,
                                name:"儿童",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

                                    }

                                ]

                            },
                            {
                                id:3,
                                name:"老人",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

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
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

                                    }

                                ]
                            },
                            {
                                id:2,
                                name:"儿童",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

                                    }

                                ]

                            },
                            {
                                id:3,
                                name:"老人",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'一般',
                                        minvalue:1,
                                        stock:10,
                                        ismultiple:1,
                                        cad:405,
                                        twd:605

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
        type:7,
        title:'威秀電影券*2+餐飲券*1+屏東海生館*2',
        price:1919,
        isDiscounts:0,
        isMustBuy:0,
        isSingleSell:0,
        identityList:[
            {
                id:1,
                name:'大人',
                minvalue:1,
                ismultiple:1,
                cad:495,
                twd:500,
                stock:20,
                tip:'测试测试'
            },
            {
                id:2,
                name:'儿童',
                minvalue:1,
                ismultiple:0,
                cad:395,
                twd:400,
                stock:20,
                tip:'测试测试'
            },
            {
                id:2,
                name:'老人',
                minvalue:1,
                ismultiple:0,
                cad:395,
                twd:400,
                stock:20,
                tip:'测试测试'
            }
        ]

    },
    {
        type:8,
        title:'威秀電影券*2+餐飲券*1+屏東海生館*2',
        price:1919,
        isDiscounts:0,
        isMustBuy:0,
        isSingleSell:0,
        identityList:[
            {
                id:1,
                name:'一般',
                minvalue:1,
                ismultiple:1,
                cad:495,
                twd:500,
                stock:20,
                tip:'测试测试'
            }

        ]

    },
    {
        type:9,
        title:'歐洲任選3國火車通行證彈性火車票',
        isDiscounts:1,
        isMustBuy:0,
        isSingleSell:0,
        price:3728,
        optionList:[
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
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:9,
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
                                                stock:10,
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
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                        date: "2018-02-01",
                                        price: "$1839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                        date: "2018-02-01",
                                        price: "$1839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                        date: "2018-02-01",
                                        price: "$1839",
                                        identity_list:[
                                            {
                                                id:1,
                                                name:'大人',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
                                                stock:10,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                stock:10,
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
                                                stock:10,
                                                minvalue:1,
                                                ismultiple:0,
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                name:'儿童',
                                                minvalue:1,
                                                ismultiple:0,
                                                stock:10,
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
        ]
    }
]

for(var i=0;i<sceneJson.length;i++)
{

    if(sceneJson[i].type==1)  //情景1
    {
        sceneInfoInit($("#changjingCol1"),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        for(var j=0;j<sceneJson[i].selectList.length;j++)
        {
            $("#qingjing1").append('<div style="margin-top:10px;">'+
                '<div style="margin:10px 0;" id="secondTitle">'+sceneJson[i].selectList[j].title+'</div>'+
            '<div class="select-info select-info-first" style="width:200px;" id="selectInfo'+j+'" data-index1="'+i+'" data-index2="'+j+'" data-fancybox="" data-src="#qingjingModal1" >使用日期：<span>請選擇</span></div>');
        }


        identityListInit($("#changjingCol1"),sceneJson[i].identityList,sceneJson[i].isMustBuy);



    }

    if(sceneJson[i].type==2)  //情景2
    {

        isMustBuy2=sceneJson[i].isMustBuy;
        sceneInfoInit($("#changjingCol2"),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        optionList=sceneJson[i].optionList;
        initSecondScene();
    }


    if(sceneJson[i].type==3)  //情景3
    {

        isMustBuy3=sceneJson[i].isMustBuy;
        sceneInfoInit($("#changjingCol3"),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        optionList3=sceneJson[i].optionList;
        initScene3();
    }


    if(sceneJson[i].type==4)  //情景4
    {

        isMustBuy4=sceneJson[i].isMustBuy;
        sceneInfoInit($("#changjingCol4"),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        optionList4=sceneJson[i].optionList;
        initScene4();
    }


    if(sceneJson[i].type==5)  //情景5
    {

        isMustBuy5=sceneJson[i].isMustBuy;
        sceneInfoInit($("#changjingCol5"),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        optionList5=sceneJson[i].optionList;
        initScene5();
    }


    if(sceneJson[i].type==6)  //情景6
    {

        isMustBuy6=sceneJson[i].isMustBuy;
        sceneInfoInit($("#changjingCol6"),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        optionList6=sceneJson[i].optionList;
        initScene6();
    }

    if(sceneJson[i].type==7)  //情景7
    {

        sceneInfoInit($("#changjingCol7"),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        identityListInit($("#changjingCol7"),sceneJson[i].identityList,sceneJson[i].isMustBuy);
    }


    if(sceneJson[i].type==8)  //情景8
    {

        sceneInfoInit($("#changjingCol8"),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        identityListInit($("#changjingCol8"),sceneJson[i].identityList,sceneJson[i].isMustBuy);
    }


    if(sceneJson[i].type==9)  //情景9
    {

        isMustBuy9=sceneJson[i].isMustBuy;
        sceneInfoInit($("#changjingCol9"),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        optionList9=sceneJson[i].optionList;
        initScene9();
    }


}


//情景信息初始化
function sceneInfoInit($changjingCol,titleStr,isDiscounts,isMustBuy,isSingleSell,priceStr)
{


    $changjingCol.show();

    $changjingCol.find(".product-title-text").text(titleStr);

    if(isDiscounts)
    {
        $changjingCol.find(".product-tag-list").append('<div class="product-tag" >優惠組合</div>');
    }
    if(isMustBuy)
    {
        $changjingCol.find(".product-tag-list").append('<div class="product-tag" style="background:#66bb3c;">必買</div>');
    }
    if(isSingleSell)
    {
        $changjingCol.find(".product-tag-list").append('<div class="product-tag" >不可单卖</div>');
    }

    if(priceStr)
    {
        $changjingCol.find(".product-title-price").text('特價 $'+priceStr+' 起');
    }

}

//身份初始化
function identityListInit($changjingCol,identityList,isMustBuy)
{
    var identity_list_html="";
    var shenfenColText="";


    for(var i=0;i<identityList.length;i++)
    {

        var tipHtml=""

        if(identityList[i].tip)
        {
            tipHtml='<span class="text-hover"><img src="images/icon10.png"/><div  class="talkbox">'+identityList[i].tip+'</div></span>';
        }

        var cadHtml="";
        if(identityList[i].cad)
        {
            cadHtml='<div><span style="text-decoration:line-through;">CAD 495</span><br><span style="color:#e10500;">TWD 11,593</span></div>';
        }


        if((identityList[i].minvalue>0)&&isMustBuy)
        {
            shenfenColText=shenfenColText+identityList[i].name+identityList[i].minvalue+"位、";
        }






        identity_list_html=identity_list_html+'<div class="col-xs-3 col-sm-3 col-md-3 identity-col">'+
            '<div>'+
            '<span style="vertical-align:middle;margin-right:5px;">'+identityList[i].name+'</span>'+tipHtml+
            '</div>'+cadHtml+
            '<div style="margin-top:10px;">'+
            '<span class="minus-text" style="border:1px solid #dddddd;padding:2px 12px 3px 10px;background:#f7f7f7;color:#000;">-</span><span class="value1" style="vertical-align:initial;">'+
            '<input class="middle-text" type="text" size="3" style="height:24px;text-align:center;" data-stock="'+identityList[i].stock+'" data-multiple="'+identityList[i].ismultiple+'" data-minvalue="'+identityList[i].minvalue+'" value="'+identityList[i].minvalue+'">'+
            '</span>'+
            '<span class="plus-text" style="border:1px solid #dddddd;padding:2px 12px 3px 10px;background:#f7f7f7;color:#000;">+</span>'+
            '</div>'+
            '</div>';

    }

     if(shenfenColText.indexOf("、")>-1)
     {
     shenfenColText=shenfenColText.substring(0,shenfenColText.length-1);
     }

    $changjingCol.find(".identity-list").empty();
    $changjingCol.find(".identity-list").append(identity_list_html);

    if(isMustBuy)
    {
        $changjingCol.find(".identity-list-col").append('<div class="col-xs-24 col-sm-24 col-md-24" style="padding:10px 5px;margin-top:10px;">'+
            '※產品至少需'+shenfenColText+'，詳細內容請見「<a href="#buylimit" style="color:#0077b3;">購買限制</a>」</div>');
    }






}


var qingjing1SelectIndex;
var qingjing1Index;
var selectInfoId;
$(".changjing-col").on("click",".select-info-first",function()
{
    qingjing1Index=parseInt($(this).attr("data-index1"));
    qingjing1SelectIndex=parseInt($(this).attr("data-index2"));
    selectInfoId=$(this).attr("id");

    initFirstScene();

});








$(".select02").click(function()
{
    initPrice();
});




    $(".menushop").click(function()
    {
        window.location.href="confirm.html?class="+ $("#xuanxiangCol").val()+"&event="+$("#priceCol").val()+"&idkind="+$("#shenfenCol").val()+"&usedate="+$("#dateCol").val()+"&adult="+$("#adult").val()+"&child="+$("#child").val();
    });





$(".quxiao-btn-col").click(function()
{

    $(".detail-btn1").removeClass("active");
    $(".detail-btn1").parent().parent().parent().parent().find(".select02").html('選項<font style="color:red;">*</font> 請選擇');

});



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

        $(this).parent().find(".middle-text").val(prevNum);

    }



});
$("body").on("click",".plus-text",function()
{

    var prevNum=parseInt($(this).parent().find(".middle-text").val());

    var prevValue=parseInt($(this).parent().find(".middle-text").attr("data-minvalue"));

    var isMultiple=$(this).parent().find(".middle-text").attr("data-multiple");

    var stockValue=$(this).parent().find(".middle-text").attr("data-stock");


           if(isMultiple=="1")
           {
               prevNum=prevNum+prevValue;
           }
           else {
               prevNum++;
           }

        if(prevNum<=10&&prevNum<=stockValue)
        {
           $(this).parent().find(".middle-text").val(prevNum);
         }



});




$("body").on("click",".child-level",function()
{


        if($(this).attr("data-child")=="1")
        {
            var dataLevel=parseInt($(this).attr("data-level"))+1;
            var proCountryListTemp=JSON.parse($(this).parent().find(".child-list").text());
            getChildList(dataLevel,proCountryListTemp);

            $("#countryInput").attr("data-value",$("#countryInput").attr("data-value")+"、"+$(this).next().text());

        }
        else
        {

            if($(this).prop("checked"))
            {
                if($(this).parent().parent().find("input:checked").length>1)
                {
                    $(this).parent().parent().find("input").removeAttr("checked");
                    $(this).prop("checked","checked");
                    var countryListStr=$("#countryInput").attr("data-value").split("、");
                    if(countryListStr.length>0)
                    {
                        countryListStr.pop();
                    }
                    $("#countryInput").attr("data-value",countryListStr.join("、")+"、"+$(this).next().text());
                }
                else
                {
                    $("#countryInput").attr("data-value",$("#countryInput").attr("data-value")+"、"+$(this).next().text());
                }



            }
            else {

                var countryListStr=$("#countryInput").attr("data-value").split("、");
                if(countryListStr.length>0)
                {
                    countryListStr.pop();
                }
                $("#countryInput").attr("data-value",countryListStr.join("、"));



            }



            $(".calendar-col").show();
        }




    if($("#countryInput").attr("data-value"))
    {
        $("#countryInput").val($("#countryInput").attr("data-value").substring(1))
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





















































