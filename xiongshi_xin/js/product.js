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


//情景1
function initFirstScene($container,$qingjingModal)
{

    var qingjing1SelectIndex;
    var qingjing1Index;
    var $selectInfoObj;
    $(".changjing-col").on("click",".select-info-first",function()
    {
        qingjing1Index=parseInt($(this).attr("data-index1"));
        qingjing1SelectIndex=parseInt($(this).attr("data-index2"));
        $selectInfoObj=$(this);

        var dateListCol=sceneJson[qingjing1Index].selectList[qingjing1SelectIndex].dateList;
        initCalendarInfo($qingjingModal.find(".calendarCol1"),dateListCol);

    });


    $qingjingModal.find(".calendarCol1").clndr({
        template: $('#calendarTemplate').html(),
        clickEvents: {
            onMonthChange: function () {

                var dateListCol=sceneJson[qingjing1Index].selectList[qingjing1SelectIndex].dateList;
                initCalendarInfo($qingjingModal.find(".calendarCol1"),dateListCol);


            },
            click: function(target){

                if($(target.element).hasClass("active"))
                {
                    var dateStr=target.date.format("YYYY-MM-DD");
                    console.log(dateStr);
                    $selectInfoObj.find("span").text(dateStr);
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





}


//情景10
function initTenthScene($container,$qingjingModal)
{

    var qingjing1SelectIndex;
    var qingjing1Index;
    var $selectInfoObj;
    $(".changjing-col").on("click",".select-info-first",function()
    {
        qingjing1Index=parseInt($(this).attr("data-index1"));
        qingjing1SelectIndex=parseInt($(this).attr("data-index2"));
        $selectInfoObj=$(this);

        var dateListCol=sceneJson[qingjing1Index].DiscountCombine[qingjing1SelectIndex].dateList;
        initCalendarInfo($qingjingModal.find(".calendarCol1"),dateListCol);

    });


    $qingjingModal.find(".calendarCol1").clndr({
        template: $('#calendarTemplate').html(),
        clickEvents: {
            onMonthChange: function () {

                var dateListCol=sceneJson[qingjing1Index].DiscountCombine[qingjing1SelectIndex].dateList;
                initCalendarInfo($qingjingModal.find(".calendarCol1"),dateListCol);


            },
            click: function(target){

                if($(target.element).hasClass("active"))
                {
                    var dateStr=target.date.format("YYYY-MM-DD");
                    console.log(dateStr);
                    $selectInfoObj.find("span").text(dateStr);
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





}


//情景2
function initSecondScene($container,$qingjingModal,isMustBuy,optionList)
{


    var selectHtml="";
    for(var i=0;i<optionList.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList[i].id+"'>"+optionList[i].name+"</option>";

    }

    $qingjingModal.find(".xuanxiangText").append(selectHtml);


    //联动
    $qingjingModal.find(".xuanxiangText").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($qingjingModal.find(".changciText").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);
        initPrice();
    });


    $qingjingModal.find(".changciText").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initIdentitySelect(optionId);
        initPrice();

    });

    $qingjingModal.find(".shenfenText").change(function()
    {

        initPrice();

    });

    function initIdentitySelect(optionId2)
    {


        var optionId1=parseInt($qingjingModal.find(".xuanxiangText").val()-1);



        $qingjingModal.find(".shenfenText").empty();
        var identityHtml="";
        for(var i=0;i<optionList[optionId1].time[optionId2].identity.length;i++)
        {
            identityHtml=identityHtml+"<option value='"+optionList[optionId1].time[optionId2].identity[i].id+"'>"+optionList[optionId1].time[optionId2].identity[i].name+"</option>"
        }
        $qingjingModal.find(".shenfenText").append(identityHtml);
    }


    function initTimeSelect(optionId)
    {
        $qingjingModal.find(".changciText").empty();
        var timeHtml="";
        for(var i=0;i<optionList[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList[optionId].time[i].id+"'>"+optionList[optionId].time[i].name+"</option>"
        }
        $qingjingModal.find(".changciText").append(timeHtml);
    }

    initTimeSelect(0);
    initIdentitySelect(0);



    $qingjingModal.find(".calendarCol2").clndr({
        template: $('#calendarTemplate').html(),
        clickEvents: {
            onMonthChange: function () {

                initPrice();

            },
            click: function(target){

                if($(target.element).hasClass("active"))
                {
                    var dateStr=target.date.format("YYYY-MM-DD");

                    var qingjing2Text=$qingjingModal.find(".xuanxiangText option:selected").text()+"，"+$qingjingModal.find(".changciText option:selected").text()+"，"+dateStr;

                    var priceText=$(target.element).find(".price-text").text();

                    if(priceText)
                    {
                        qingjing2Text=qingjing2Text+"，"+priceText;
                    }

                    $container.find(".qingjing2Text").text(qingjing2Text);


                    $container.find(".detail-btn").addClass("active");

                    var optionId1=parseInt($qingjingModal.find(".xuanxiangText").val())-1;
                    var optionId2=parseInt($qingjingModal.find(".changciText").val())-1;
                    var optionId3=parseInt($qingjingModal.find(".shenfenText").val())-1;

                    var priceList=optionList[optionId1].time[optionId2].identity[optionId3].pricelist;

                    var identity_list=priceList[parseInt($(target.element).attr("data-id"))-1].identity_list;

                    identityListInit($container,identity_list,isMustBuy);



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

        var optionId1=parseInt($qingjingModal.find(".xuanxiangText").val())-1;
        var optionId2=parseInt($qingjingModal.find(".changciText").val())-1;
        var optionId3=parseInt($qingjingModal.find(".shenfenText").val())-1;

        var priceList=optionList[optionId1].time[optionId2].identity[optionId3].pricelist;


        console.log(priceList);

        initCalendarInfo($qingjingModal.find(".calendarCol2"),priceList);

    }

    initPrice();


}



//情景3

function initScene3($container,$qingjingModal,isMustBuy3,optionList3)
{


    var selectHtml="";
    for(var i=0;i<optionList3.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList3[i].id+"'>"+optionList3[i].name+"</option>";

    }
    $qingjingModal.find(".xuanxiangText3").append(selectHtml);

    //联动
    $qingjingModal.find(".xuanxiangText3").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($qingjingModal.find(".changciText3").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);
        initPrice();
    });


    $qingjingModal.find(".changciText3").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initIdentitySelect(optionId);
        initPrice();

    });

    $qingjingModal.find(".shenfenText3").change(function()
    {

        initPrice();

    });

    function initIdentitySelect(optionId2)
    {

        var optionId1=parseInt($qingjingModal.find(".xuanxiangText3").val()-1);


        $qingjingModal.find(".shenfenText3").empty();
        var identityHtml="";
        for(var i=0;i<optionList3[optionId1].time[optionId2].identity.length;i++)
        {
            identityHtml=identityHtml+"<option value='"+optionList3[optionId1].time[optionId2].identity[i].id+"'>"+optionList3[optionId1].time[optionId2].identity[i].name+"</option>"
        }
        $qingjingModal.find(".shenfenText3").append(identityHtml);
    }


    function initTimeSelect(optionId)
    {
        $("#changciText3").empty();
        var timeHtml="";
        for(var i=0;i<optionList3[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList3[optionId].time[i].id+"'>"+optionList3[optionId].time[i].name+"</option>"
        }
        $qingjingModal.find(".changciText3").append(timeHtml);
    }

    initTimeSelect(0);
    initIdentitySelect(0);



    $container.find(".calendarCol3").clndr({
        template: $('#calendarTemplate').html(),
        clickEvents: {
            onMonthChange: function () {

                initPrice();

            },
            click: function(target){

                if($(target.element).hasClass("active"))
                {
                    var dateStr=target.date.format("YYYY-MM-DD");

                    var qingjing2Text=$qingjingModal.find(".xuanxiangText3 option:selected").text()+"，"+$qingjingModal.find(".changciText3 option:selected").text()+"，"+dateStr;

                    var priceText=$(target.element).find(".price-text").text();

                    if(priceText)
                    {
                        qingjing2Text=qingjing2Text+"，"+priceText;
                    }

                    $container.find(".qingjing3Text").text(qingjing2Text);

                    $container.find(".detail-btn").addClass("active");

                    var optionId1=parseInt($qingjingModal.find(".xuanxiangText3").val())-1;
                    var optionId2=parseInt($qingjingModal.find(".changciText3").val())-1;
                    var optionId3=parseInt($qingjingModal.find(".shenfenText3").val())-1;

                    var priceList=optionList3[optionId1].time[optionId2].identity[optionId3].pricelist;

                    var identity_list=priceList[parseInt($(target.element).attr("data-id"))-1].identity_list;

                    identityListInit($container,identity_list,isMustBuy3);



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

        var optionId1=parseInt($qingjingModal.find(".xuanxiangText3").val())-1;
        var optionId2=parseInt($qingjingModal.find(".changciText3").val())-1;
        var optionId3=parseInt($qingjingModal.find(".shenfenText3").val())-1;

        var priceList=optionList3[optionId1].time[optionId2].identity[optionId3].pricelist;


        console.log(priceList);

        initCalendarInfo($container.find(".calendarCol3"),priceList);

    }

    initPrice();


}


//情景4
function initScene4($container,$qingjingModal,isMustBuy4,optionList4)
{


    var selectHtml="";
    for(var i=0;i<optionList4.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList4[i].id+"'>"+optionList4[i].name+"</option>";

    }

    $qingjingModal.find(".xuanxiangText4").append(selectHtml);


    //联动
    $qingjingModal.find(".xuanxiangText4").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($qingjingModal.find(".changciText4").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);
        initPrice();
    });


    $qingjingModal.find(".changciText4").change(function()
    {
        var optionId=parseInt($(this).val()-1);

        initPrice();

    });



    function initTimeSelect(optionId)
    {
        $qingjingModal.find(".changciText4").empty();
        var timeHtml="";
        for(var i=0;i<optionList4[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList4[optionId].time[i].id+"'>"+optionList4[optionId].time[i].name+"</option>"
        }
        $qingjingModal.find(".changciText4").append(timeHtml);
    }

    initTimeSelect(0);




    $container.find(".calendarCol4").clndr({
        template: $('#calendarTemplate').html(),
        clickEvents: {
            onMonthChange: function () {

                initPrice();

            },
            click: function(target){

                if($(target.element).hasClass("active"))
                {
                    var dateStr=target.date.format("YYYY-MM-DD");

                    var qingjing2Text=$qingjingModal.find(".xuanxiangText4 option:selected").text()+"，"+$qingjingModal.find(".changciText4 option:selected").text()+"，"+dateStr;

                    var priceText=$(target.element).find(".price-text").text();

                    if(priceText)
                    {
                        qingjing2Text=qingjing2Text+"，"+priceText;
                    }

                    $container.find(".qingjing4Text").text(qingjing2Text);

                    $container.find(".detail-btn").addClass("active");

                    var optionId1=parseInt($qingjingModal.find(".xuanxiangText4").val())-1;
                    var optionId2=parseInt($qingjingModal.find(".changciText4").val())-1;


                    var priceList=optionList4[optionId1].time[optionId2].pricelist;

                    var identity_list=priceList[parseInt($(target.element).attr("data-id"))-1].identity_list;

                    identityListInit($container,identity_list,isMustBuy4);



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

        var optionId1=parseInt($qingjingModal.find(".xuanxiangText4").val())-1;
        var optionId2=parseInt($qingjingModal.find(".changciText4").val())-1;

        var priceList=optionList4[optionId1].time[optionId2].pricelist;


        console.log(priceList);

        initCalendarInfo($container.find(".calendarCol4"),priceList);

    }

    initPrice();


}

//情景5
function initScene5($container,$qingjingModal,isMustBuy5,optionList5)
{


    var selectHtml="";
    for(var i=0;i<optionList5.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList5[i].id+"'>"+optionList5[i].name+"</option>";

    }

    $qingjingModal.find(".xuanxiangText5").append(selectHtml);


    //联动
    $qingjingModal.find(".xuanxiangText5").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($qingjingModal.find(".changciText5").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);
    });


    $qingjingModal.find(".changciText5").change(function()
    {
        var optionId=parseInt($(this).val()-1);

    });

    $qingjingModal.find(".querenBtn5").click(function()
    {

        var optionId1=parseInt($qingjingModal.find(".xuanxiangText5").val())-1;
        var optionId2=parseInt($qingjingModal.find(".changciText5").val())-1;

        var identity_list=optionList5[optionId1].time[optionId2].identity_list;

        identityListInit($container,identity_list,isMustBuy5);

        $container.find(".xuanze-text").text($qingjingModal.find(".xuanxiangText6 option:selected").text()+"，"+$qingjingModal.find(".changciText6 option:selected").text());
        $container.find(".detail-btn").addClass("active");



    });




    function initTimeSelect(optionId)
    {
        $qingjingModal.find(".changciText4").empty();
        var timeHtml="";
        for(var i=0;i<optionList5[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList5[optionId].time[i].id+"'>"+optionList5[optionId].time[i].name+"</option>"
        }
        $qingjingModal.find(".changciText5").append(timeHtml);
    }

    initTimeSelect(0);





}

//情景6

function initScene6($container,$qingjingModal,isMustBuy6,optionList6)
{


    var selectHtml="";
    for(var i=0;i<optionList6.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList6[i].id+"'>"+optionList6[i].name+"</option>";

    }

    $qingjingModal.find(".xuanxiangText6").append(selectHtml);


    //联动
    $qingjingModal.find(".xuanxiangText6").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);


    });


    $qingjingModal.find(".querenBtn6").click(function()
   {

       var optionId1=parseInt($qingjingModal.find(".xuanxiangText6").val())-1;
       var optionId2=parseInt($qingjingModal.find(".changciText6").val())-1;

       var identity_list=optionList6[optionId1].time[optionId2].identity_list;

       $container.find(".xuanze-text").text($qingjingModal.find(".xuanxiangText6 option:selected").text()+"，"+$qingjingModal.find(".changciText6 option:selected").text());
       $container.find(".detail-btn").addClass("active");
       identityListInit($container,identity_list,isMustBuy6);



   });



    function initTimeSelect(optionId)
    {
        $qingjingModal.find(".changciText6").empty();
        var timeHtml="";
        for(var i=0;i<optionList6[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList6[optionId].time[i].id+"'>"+optionList6[optionId].time[i].name+"</option>"
        }
        $qingjingModal.find(".changciText6").append(timeHtml);
    }

    initTimeSelect(0);



}


function initScene9($container,$qingjingModal,isMustBuy9,optionList9)
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


    $qingjingModal.find(".countryList").append(countryListHtml);


    var selectHtml="";
    for(var i=0;i<optionList9.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList9[i].id+"'>"+optionList9[i].name+"</option>";

    }

    $qingjingModal.find(".xuanxiangText9").append(selectHtml);

    //联动
    $qingjingModal.find(".xuanxiangText9").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($qingjingModal.find(".changciText9").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);
        initPrice();
    });


    $qingjingModal.find(".changciText9").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initIdentitySelect(optionId);
        initPrice();

    });

    $qingjingModal.find(".shenfenText9").change(function()
    {

        initPrice();

    });

    function initIdentitySelect(optionId2)
    {

        var optionId1=parseInt($qingjingModal.find(".xuanxiangText9").val()-1);


        $qingjingModal.find(".shenfenText9").empty();
        var identityHtml="";
        for(var i=0;i<optionList9[optionId1].time[optionId2].identity.length;i++)
        {
            identityHtml=identityHtml+"<option value='"+optionList9[optionId1].time[optionId2].identity[i].id+"'>"+optionList9[optionId1].time[optionId2].identity[i].name+"</option>"
        }
        $qingjingModal.find(".shenfenText9").append(identityHtml);
    }


    function initTimeSelect(optionId)
    {
        $qingjingModal.find(".changciText9").empty();
        var timeHtml="";
        for(var i=0;i<optionList9[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList9[optionId].time[i].id+"'>"+optionList9[optionId].time[i].name+"</option>"
        }
        $qingjingModal.find(".changciText9").append(timeHtml);
    }

    initTimeSelect(0);
    initIdentitySelect(0);



    $container.find(".calendarCol9").clndr({
        template: $('#calendarTemplate').html(),
        clickEvents: {
            onMonthChange: function () {

                initPrice();

            },
            click: function(target){

                if($(target.element).hasClass("active"))
                {
                    var dateStr=target.date.format("YYYY-MM-DD");

                    var qingjing2Text=$qingjingModal.find(".xuanxiangText9 option:selected").text()+"，"+$qingjingModal.find(".changciText9 option:selected").text()+"，"+dateStr;

                    var priceText=$(target.element).find(".price-text").text();

                    if(priceText)
                    {
                        qingjing2Text=qingjing2Text+"，"+priceText;
                    }

                    $qingjingModal.find(".qingjing9Text").text(qingjing2Text);


                    var optionId1=parseInt( $qingjingModal.find(".xuanxiangText9").val())-1;
                    var optionId2=parseInt( $qingjingModal.find(".changciText9").val())-1;
                    var optionId3=parseInt( $qingjingModal.find(".shenfenText9").val())-1;

                    var priceList=optionList9[optionId1].time[optionId2].identity[optionId3].pricelist;

                    var identity_list=priceList[parseInt($(target.element).attr("data-id"))-1].identity_list;

                    identityListInit($container,identity_list,isMustBuy9);



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

        var optionId1=parseInt($qingjingModal.find(".xuanxiangText9").val())-1;
        var optionId2=parseInt($qingjingModal.find(".changciText9").val())-1;
        var optionId3=parseInt($qingjingModal.find(".shenfenText9").val())-1;

        var priceList=optionList9[optionId1].time[optionId2].identity[optionId3].pricelist;


        console.log(priceList);

        initCalendarInfo($container.find(".calendarCol9"),priceList);

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
        id:1,
        ProductBaseID:'T00001',
        type:1,
        title:'白馬市極光奇景3日之旅1',
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
                "IDKind" : 0,
                minvalue:1,
                ismultiple:1,
                cad:495,
                twd:500,
                stock:9
            },
            {
                id:2,
                "IDKind" : 1,
                minvalue:1,
                ismultiple:0,
                cad:395,
                twd:400,
                stock:20
            }
        ]

    },
    {
        id:2,
        ProductBaseID:'T00002',
        type:1,
        title:'白馬市極光奇景3日之旅1',
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
                "IDKind" : 0,
                minvalue:1,
                ismultiple:1,
                cad:495,
                twd:500,
                stock:9
            },
            {
                id:2,
                "IDKind" : 1,
                minvalue:1,
                ismultiple:0,
                cad:395,
                twd:400,
                stock:20
            }
        ]

    },
    {
        id:3,
        ProductBaseID:'T00003',
        type:2,
        title:'白馬市極光奇景3日之旅白馬市2',
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$89",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:9,
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
        id:4,
        ProductBaseID:'T00004',
        type:3,
        title:'白馬市極光奇景3日之旅白馬市3',
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-04",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-05",
                                        price: "$439",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                "IDKind" : 1,
                                                minvalue:1,
                                                stock:10,
                                                cad:405,
                                                twd:500,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                "IDKind" : 0,
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
        id:5,
        ProductBaseID:'T00005',
        type:4,
        title:'白馬市極光奇景3日之旅白馬市4',
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
                        pricelist: [
                            {
                                id:1,
                                date: "2018-02-10",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 0,
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
                                date: "2018-02-02",
                                price: "$48239",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 1,
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
                                date: "2018-02-03",
                                price: "$4339",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 2,
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
                                date: "2018-02-04",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 3,
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
                                date: "2018-02-05",
                                price: "$439",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 1,
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
                                date: "2018-02-06",
                                price: "$39",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 0,
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
                        name: "08:00",
                        pricelist: [
                            {
                                id:1,
                                date: "2018-02-10",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 0,
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
                                date: "2018-02-02",
                                price: "$48239",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 1,
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
                                date: "2018-02-03",
                                price: "$4339",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 2,
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
                                date: "2018-02-04",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 3,
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
                                date: "2018-02-05",
                                price: "$439",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 1,
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
                                date: "2018-02-06",
                                price: "$39",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 0,
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
                name:"选项2",
                time:[
                    {
                        id:1,
                        name: "07:00",
                        pricelist: [
                            {
                                id:1,
                                date: "2018-02-10",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 0,
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
                                date: "2018-02-02",
                                price: "$48239",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 1,
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
                                date: "2018-02-03",
                                price: "$4339",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 2,
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
                                date: "2018-02-04",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 3,
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
                                date: "2018-02-05",
                                price: "$439",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 1,
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
                                date: "2018-02-06",
                                price: "$39",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 0,
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
                        name: "08:00",
                        pricelist: [
                            {
                                id:1,
                                date: "2018-02-10",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 0,
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
                                date: "2018-02-02",
                                price: "$48239",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 1,
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
                                date: "2018-02-03",
                                price: "$4339",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 2,
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
                                date: "2018-02-04",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 3,
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
                                date: "2018-02-05",
                                price: "$439",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 1,
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
                                date: "2018-02-06",
                                price: "$39",
                                identity_list:[
                                    {
                                        id:1,
                                        "IDKind" : 0,
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
        id:6,
        ProductBaseID:'T00006',
        type:5,
        title:'白馬市極光奇景3日之旅白馬市5',
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
                        identity_list:[
                            {
                                id:1,
                                "IDKind" : 0,
                                minvalue:1,
                                stock:10,
                                ismultiple:1,  //表示倍数购买
                                cad:504,
                                twd:605,
                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                            },
                            {
                                id:2,
                                "IDKind" : 1,
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
                        name: "08:00",
                        identity_list:[
                            {
                                id:1,
                                "IDKind" : 2,
                                minvalue:1,
                                stock:10,
                                ismultiple:1,  //表示倍数购买
                                cad:504,
                                twd:605,
                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                            },
                            {
                                id:2,
                                "IDKind" : 3,
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
                name:"选项2",
                time:[
                    {
                        id:1,
                        name: "07:00",
                        identity_list:[
                            {
                                id:1,
                                "IDKind" : 0,
                                minvalue:1,
                                stock:10,
                                ismultiple:1,  //表示倍数购买
                                cad:504,
                                twd:605,
                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                            },
                            {
                                id:2,
                                "IDKind" : 1,
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
                        name: "08:00",
                        identity_list:[
                            {
                                id:1,
                                "IDKind" : 2,
                                minvalue:1,
                                stock:10,
                                ismultiple:1,  //表示倍数购买
                                cad:504,
                                twd:605,
                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                            },
                            {
                                id:2,
                                "IDKind" : 3,
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
        id:7,
        ProductBaseID:'T00007',
        type:6,
        title:'白馬市極光奇景3日之旅白馬市6',
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
                        identity_list:[
                            {
                                id:1,
                                "IDKind" : 0,
                                minvalue:1,
                                stock:10,
                                ismultiple:1,  //表示倍数购买
                                cad:504,
                                twd:605,
                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                            },
                            {
                                id:2,
                                "IDKind" : 1,
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
                        name: "08:00",
                        identity_list:[
                            {
                                id:1,
                                "IDKind" : 2,
                                minvalue:1,
                                stock:10,
                                ismultiple:1,  //表示倍数购买
                                cad:504,
                                twd:605,
                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                            },
                            {
                                id:2,
                                "IDKind" : 3,
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
                name:"选项2",
                time:[
                    {
                        id:1,
                        name: "07:00",
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
                        name: "08:00",
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

                    }
                ]
            }
        ]
    },
    {
        id:8,
        ProductBaseID:'T00008',
        type:7,
        title:'威秀電影券*2+餐飲券*1+屏東海生館*2',
        price:1919,
        isMustBuy:0,
        isSingleSell:0,
        identityList:[
            {
                id:1,
                "IDKind" : 0,
                minvalue:1,
                ismultiple:1,
                cad:495,
                twd:500,
                stock:20,
                tip:'测试测试'
            },
            {
                id:2,
                "IDKind" : 1,
                minvalue:1,
                ismultiple:0,
                cad:395,
                twd:400,
                stock:20,
                tip:'测试测试'
            },
            {
                id:2,
                "IDKind" : 2,
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
        id:9,
        ProductBaseID:'T00009',
        type:8,
        title:'威秀電影券*2+餐飲券*1+屏東海生館*2',
        price:1919,
        isMustBuy:0,
        isSingleSell:0,
        identityList:[
            {
                id:1,
                "IDKind" : 1,
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
        id:10,
        ProductBaseID:'T000010',
        type:9,
        title:'歐洲任選3國火車通行證彈性火車票',
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
                                        date: "2018-02-10",
                                        price: "$839",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:2,
                                        date: "2018-02-02",
                                        price: "$48239",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:3,
                                        date: "2018-02-03",
                                        price: "$4339",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
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
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字'
                                            }
                                        ]
                                    },
                                    {
                                        id:6,
                                        date: "2018-02-06",
                                        price: "$39",
                                        identity_list:[
                                            {
                                                id:1,
                                                IDKind:0,
                                                minvalue:1,
                                                stock:10,
                                                ismultiple:1,  //表示倍数购买
                                                tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                            },
                                            {
                                                id:2,
                                                minvalue:1,
                                                IDKind:1,
                                                stock:9,
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
        id:11,
        ProductBaseID:'T000011',
        type:10,
        DiscountName:'白馬市極光奇景3日之旅11',
        DiscountID:"C123456789",
        DiscountCombine:[
            {
                id:1,
                "ProductBaseID" : "T1801000001",
                "ProductBaseName" : "單品名稱1",
                "ClassCode" : "FJKD",
                "ClassName" : "测试",
                "IDKind" : 1,
                "Quantity" : 2,
                "BookingNeedDate" : true,
                dateList:[
                    {
                        id:1,
                        date: "2018-02-10",
                    },
                    {
                        id:2,
                        date: "2018-02-11",
                    },
                    {
                        id:3,
                        date: "2018-02-12",
                    }
                ],
            },
            {
                id:2,
                "ProductBaseID" : "T1801000002",
                "ProductBaseName" : "單品名稱2",
                "ClassCode" : "FJKD",
                "ClassName" : "测试",
                "IDKind" : 0,
                "Quantity" : 3,
                "BookingNeedDate" : true,
                dateList:[
                    {
                        id:1,
                        date: "2018-02-10",
                    },
                    {
                        id:2,
                        date: "2018-02-11",
                    },
                    {
                        id:3,
                        date: "2018-02-02",
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

        $("#qingjingColList").append('<div id="qingjingCol'+i+'">'+
            '<div class="changjing-col" data-id="'+sceneJson[i].ProductBaseID+'" data-type="1">'+
            ' <div class="product-top">'+
            '<div class="product-title"><span class="product-title-text"></span></div>'+
            ' <div class="product-tag-list"></div>'+
            ' <div style="float:right;" class="detail-btn-col">'+
            '<button class="detail-btn"  type="button">'+
            '<span class="detail-btn-col detail-btn-close">詳細 <span>▼</span></span>'+
            '<span class="gouxuan-btn-col">已選 <span>√</span></span>'+
            ' <span class="quxiao-btn-col">取消 <span>×</span></span>'+
            '</button>'+
            '</div>'+
            ' <div style="clear:both;"></div>'+
            '</div>'+
            ' <div class="product-select">'+
            '<div class="product-title"><span class="product-title-text"></span></div>'+
            ' <div class="product-tag-list"></div>'+
            '<div style="float:right;" class="detail-btn-col">'+
            '<button class="detail-btn"  type="button">'+
            '<span class="detail-btn-col detail-btn-close">詳細 <span>▼</span></span>'+
            '<span class="gouxuan-btn-col">已選 <span>√</span></span>'+
            '<span class="quxiao-btn-col">取消 <span>×</span></span>'+
            ' </button>'+
            '</div>'+
            '<div style="clear:both;"></div>'+
            ' <div class="qingjing1">'+
            ' </div>'+
            '<div style="margin-top:30px;margin-left:-5px;margin-right:-5px;" class="clearfix identity-list-col" >'+
            '<div class="clearfix identity-list"></div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div  style="display:none;" class="mobile-dialog" id="qingjingColModal'+i+'">'+
            '<div class="title-col clearfix">'+
            '<div class="line"></div>'+
            '<div class="back-col" data-fancybox-close=""><img src="images/icon27.png"></div>'+
            '<div class="text">請選擇</div>'+
            '</div>'+
            '<div>'+
            '<div class="calendar-main calendarCol1">'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>');

        sceneInfoInit($("#qingjingCol"+i),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        for(var j=0;j<sceneJson[i].selectList.length;j++)
        {
            $("#qingjingCol"+i).find(".qingjing1").append('<div style="margin-top:10px;">'+
                '<div style="margin:10px 0;" >'+sceneJson[i].selectList[j].title+'</div>'+
            '<div class="select-info select-info-first selectInfo'+j+'" style="width:200px;"  data-index1="'+i+'" data-index2="'+j+'" data-fancybox="" data-src="#qingjingColModal'+i+'" >使用日期：<span>請選擇</span></div>');
        }

        initFirstScene($("#qingjingCol"+i),$("#qingjingColModal"+i));

        identityListInit($("#qingjingCol"+i),sceneJson[i].identityList,sceneJson[i].isMustBuy);






    }

    if(sceneJson[i].type==2)  //情景2
    {

        $("#qingjingColList").append('<div id="qingjingCol'+i+'">'+
        '<div  class="changjing-col" data-id="'+sceneJson[i].ProductBaseID+'" data-type="2">'+
            '<div class="product-top">'+
            '<div class="product-title">'+
            ' <span class="product-title-text"></span>'+
            '<span class="product-title-price"></span>'+
            ' </div>'+
            ' <div class="product-tag-list"></div>'+
            ' <div style="float:right;" class="detail-btn-col">'+
            ' <button class="detail-btn"  type="button">'+
            '<span class="detail-btn-col">詳細 <span>▼</span></span>'+
            ' <span class="gouxuan-btn-col">已選 <span>√</span></span>'+
            ' <span class="quxiao-btn-col">取消 <span>×</span></span>'+
            ' </button>'+
            ' </div>'+
            '<div style="clear:both;"></div>'+
            '</div>'+
            ' <div class="product-select">'+
            ' <div class="product-title">'+
            ' <span class="product-title-text"></span>'+
            '<span class="product-title-price"></span>'+
            ' </div>'+
        '<div class="product-tag-list"></div>'+
        ' <div style="float:right;" class="detail-btn-col">'+
        ' <button class="detail-btn"  type="button">'+
        ' <span class="detail-btn-col">詳細 <span>▼</span></span>'+
        ' <span class="gouxuan-btn-col">已選 <span>√</span></span>'+
        '<span class="quxiao-btn-col">取消 <span>×</span></span>'+
        ' </button>'+
        ' </div>'+
        ' <div style="clear:both;"></div>'+
        ' <div style="margin-top:10px;">'+
        ' <div class="select-info dateContent"  data-fancybox data-src="#qingjingColModal'+i+'" href="javascript:;">'+
        ' 選項<font style="color:red;">*</font> <span class="xuanze-text qingjing2Text">請選擇</span>'+
        ' </div>'+
        ' </div>'+
        ' <div style="margin-top:10px;margin-left:-5px;margin-right:-5px;" class="clearfix identity-list-col">'+
        '<div class="clearfix identity-list">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="step-modal mobile-dialog" style="display:none;" id="qingjingColModal'+i+'">'+
        '<div class="title-col clearfix">'+
        '<div class="line"></div>'+
        '<div class="back-col" data-fancybox-close=""><img src="images/icon27.png"></div>'+
        '<div class="text">請選擇</div>'+
        ' </div>'+
        ' <div class="calendar-col">'+
        ' <div style="margin-bottom:20px;">'+
        ' <div style="float:left;width:320px;" class="pro-select-mainl">'+
        '  <span class="pro-select-col" style="width:320px;">'+
        '<span style="position: absolute;left:6px;display: inline-block;top:2px;">選項<font style="color:red;">*</font></span>'+
        ' <select name="select7" class="xuanxiangText"  style="width:318px;height:24px;border:0;padding-left:40px;">'+
        ' </select>'+
        ' </span>'+
        '  </div>'+
        ' <div style="float:left;width:166px;margin-left:5px;" class="pro-select-mainl">'+
        ' <span class="pro-select-col" >'+
        ' <span style="position: absolute;left:6px;display: inline-block;top:2px;">場次<font style="color:red;">*</font></span>'+
        ' <select name="select7" class="changciText"  style="width:164px;height:24px;padding-left:40px;border:0;">'+
        ' </select>'+
        ' </span>'+
        ' </div>'+
        ' <div style="float:left;width:166px;margin-left:5px;" class="pro-select-mainl">'+
        ' <span class="pro-select-col">'+
        ' <span style="position: absolute;left:6px;display: inline-block;top:2px;">身分<font style="color:red;">*</font></span>'+
        ' <select name="select7" class="shenfenText"  style="width:164px;height:24px;padding-left:40px;border:0;">'+
        ' </select>'+
        '</span>'+
        '</div>'+
        '   <div style="clear:both;"></div>'+
        '   </div>'+
        '   <div class="calendar-main calendarCol2">'+
        '   </div>'+
        '   </div>'+
        '   </div>'+
        '   </div>');


        sceneInfoInit($("#qingjingCol"+i),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        initSecondScene($("#qingjingCol"+i),$("#qingjingColModal"+i),sceneJson[i].isMustBuy,sceneJson[i].optionList);
    }


    if(sceneJson[i].type==3)  //情景3
    {


        $("#qingjingColList").append('<div id="qingjingCol'+i+'">'+
            ' <div  class="changjing-col" data-id="'+sceneJson[i].ProductBaseID+'" data-type="3">'+
            '<div class="product-top">'+
            '<div class="product-title">'+
            '<span class="product-title-text"></span>'+
            '<span class="product-title-price"></span>'+
            '</div>'+
            '<div class="product-tag-list"></div>'+
            '<div style="float:right;" class="detail-btn-col">'+
            '<button class="detail-btn"  type="button">'+
            '<span class="detail-btn-col">詳細 <span>▼</span></span>'+
            '<span class="gouxuan-btn-col">已選 <span>√</span></span>'+
            '<span class="quxiao-btn-col">取消 <span>×</span></span>'+
            '</button>'+
            ' </div>'+
            '<div style="clear:both;"></div>'+
            '</div>'+
            '<div class="product-select">'+
        '<div class="product-title">'+
        ' <span class="product-title-text"></span>'+
        ' <span class="product-title-price"></span>'+
        ' </div>'+
        ' <div class="product-tag-list"></div>'+
        ' <div style="float:right;" class="detail-btn-col">'+
        ' <button class="detail-btn"  type="button">'+
        ' <span class="detail-btn-col">詳細 <span>▼</span></span>'+
        '<span class="gouxuan-btn-col">已選 <span>√</span></span>'+
        '<span class="quxiao-btn-col">取消 <span>×</span></span>'+
        ' </button>'+
        ' </div>'+
        ' <div style="clear:both;"></div>'+
        ' <div style="margin-top:10px;">'+
        ' <div class="select-info"  data-fancybox data-src="#qingjingColModal'+i+'" href="javascript:;">'+
        ' 選項<font style="color:red;">*</font> <span class="xuanze-text qingjing3Text">請選擇</span>'+
        ' </div>'+
        ' </div>'+
        '<div style="margin-top:10px;margin-left:-5px;margin-right:-5px;" class="clearfix identity-list-col">'+
        ' <div class="clearfix identity-list">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="step-modal mobile-dialog" style="display:none;" id="qingjingColModal'+i+'">'+
        '<div class="title-col clearfix">'+
        '<div class="line"></div>'+
        '<div class="back-col" data-fancybox-close=""><img src="images/icon27.png"></div>'+
        '<div class="text">請選擇</div>'+
        '</div>'+
        '<div class="calendar-col">'+
        ' <div style="margin-bottom:20px;">'+
        ' <div style="float:left;width:320px;" class="pro-select-mainl">'+
        ' <span class="pro-select-col" style="width:320px;">'+
        ' <span style="position: absolute;left:6px;display: inline-block;top:2px;">選項<font style="color:red;">*</font></span>'+
        '<select name="select7" class="xuanxiangText3"  style="width:318px;height:24px;border:0;padding-left:40px;">'+
        ' </select>'+
        '</span>'+
        '</div>'+
        '<div style="float:left;width:166px;margin-left:5px;" class="pro-select-mainl">'+
        '<span class="pro-select-col">'+
        '<span style="position: absolute;left:6px;display: inline-block;top:2px;">場次<font style="color:red;">*</font></span>'+
        '<select name="select7" class="changciText3"  style="width:164px;height:24px;padding-left:40px;border:0;">'+
        '</select>'+
        ' </span>'+
        '</div>'+
        '<div style="float:left;width:166px;margin-left:5px;" class="pro-select-mainl">'+
        '<span class="pro-select-col">'+
        ' <span style="position: absolute;left:6px;display: inline-block;top:2px;">身分<font style="color:red;">*</font></span>'+
        ' <select name="select7" class="shenfenText3"  style="width:164px;height:24px;padding-left:40px;border:0;">'+
        '</select>'+
        '</span>'+
        '</div>'+
        '<div style="clear:both;"></div>'+
        '</div>'+
        '<div class="calendar-main calendarCol3">'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>');


        sceneInfoInit($("#qingjingCol"+i),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);


        initScene3($("#qingjingCol"+i),$("#qingjingColModal"+i),sceneJson[i].isMustBuy,sceneJson[i].optionList);

    }


    if(sceneJson[i].type==4)  //情景4
    {
        $("#qingjingColList").append('<div id="qingjingCol'+i+'">'+
            '<div  class="changjing-col" data-id="'+sceneJson[i].ProductBaseID+'" data-type="4">'+
            '<div class="product-top">'+
            '<div class="product-title">'+
            '<span class="product-title-text"></span>'+
            '<span class="product-title-price"></span>'+
            '</div>'+
            ' <div class="product-tag-list"></div>'+

            '<div style="float:right;" class="detail-btn-col">'+
            ' <button class="detail-btn"  type="button">'+

            '<span class="detail-btn-col">詳細 <span>▼</span></span>'+

            '<span class="gouxuan-btn-col">已選 <span>√</span></span>'+

            '<span class="quxiao-btn-col">取消 <span>×</span></span>'+


            '</button>'+
            '</div>'+
            '<div style="clear:both;"></div>'+
            '</div>'+
            ' <div class="product-select">'+
            '<div class="product-title">'+
            '<span class="product-title-text"></span>'+
            ' <span class="product-title-price"></span>'+
            '</div>'+
            '<div class="product-tag-list"></div>'+
            '<div style="float:right;" class="detail-btn-col">'+
        ' <button class="detail-btn"  type="button">'+

        '<span class="detail-btn-col">詳細 <span>▼</span></span>'+

        '<span class="gouxuan-btn-col">已選 <span>√</span></span>'+

        '<span class="quxiao-btn-col">取消 <span>×</span></span>'+
        ' </button>'+
        ' </div>'+

        '<div style="clear:both;"></div>'+
        '<div style="margin-top:10px;">'+
        ' <div class="select-info" data-fancybox data-src="#qingjingColModal'+i+'" href="javascript:;">'+
        '選項<font style="color:red;">*</font> <span class="xuanze-text qingjing4Text">請選擇</span>'+
        '</div>'+
        '</div>'+
        '<div style="margin-top:10px;margin-left:-5px;margin-right:-5px;" class="clearfix identity-list-col">'+
        '<div class="clearfix identity-list">'+


        '</div>'+

        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="step-modal mobile-dialog" style="display:none;" id="qingjingColModal'+i+'">'+
        '<div class="title-col clearfix">'+
        ' <div class="line"></div>'+
        ' <div class="back-col" data-fancybox-close=""><img src="images/icon27.png"></div>'+
        ' <div class="text">請選擇</div>'+
        '</div>'+
        '<div class="calendar-col">'+
        ' <div style="margin-bottom:20px;">'+
        ' <div style="float:left;width:320px;" class="pro-select-mainl">'+
        ' <span class="pro-select-col" style="width:320px;">'+
        '  <span style="position: absolute;left:6px;display: inline-block;top:2px;">選項<font style="color:red;">*</font></span>'+
        '  <select name="select7" class="xuanxiangText4"  style="width:318px;height:24px;border:0;padding-left:40px;">'+
        ' </select>'+
        ' </span>'+
        ' </div>'+
        '<div style="float:left;width:166px;margin-left:5px;" class="pro-select-mainl">'+
        ' <span class="pro-select-col">'+
        ' <span style="position: absolute;left:6px;display: inline-block;top:2px;">場次<font style="color:red;">*</font></span>'+
        ' <select name="select7" class="changciText4"  style="width:164px;height:24px;padding-left:40px;border:0;">'+
        ' </select>'+
        ' </span>'+
        ' </div>'+
    ' <div style="clear:both;"></div>'+
    ' </div>'+
    ' <div class="calendar-main calendarCol4">'+
    ' </div>'+
    ' </div>'+
    ' </div>'+
    ' </div>');

        sceneInfoInit($("#qingjingCol"+i),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        initScene4($("#qingjingCol"+i),$("#qingjingColModal"+i),sceneJson[i].isMustBuy,sceneJson[i].optionList);
    }


    if(sceneJson[i].type==5)  //情景5
    {

        $("#qingjingColList").append(' <div id="qingjingCol'+i+'">'+
            '<div class="changjing-col" data-id="'+sceneJson[i].ProductBaseID+'" data-type="5">'+
            '<div class="product-top">'+
            '<div class="product-title">'+
            '<span class="product-title-text"></span>'+
            '<span class="product-title-price"></span>'+
            '</div>'+
            '<div class="product-tag-list"></div>'+
            '<div style="float:right;">'+
            ' <button class="detail-btn" type="button"> <span class="detail-btn-col">詳細 <span>▼</span></span> <span class="gouxuan-btn-col">已選 <span>√</span></span> <span class="quxiao-btn-col">取消 <span>&times;</span></span> </button>'+
            '</div>'+
            '<div style="clear:both;"></div>'+
            ' </div>'+
            '<div class="product-select">'+
            '<div class="product-title">'+
            '<span class="product-title-text"></span>'+
            '<span class="product-title-price"></span>'+
            '</div>'+
            '<div class="product-tag-list"></div>'+
            '<div style="float:right;" class="detail-btn-col">'+
            '<button class="detail-btn" type="button"> <span class="detail-btn-col">詳細 <span>▼</span></span> <span class="gouxuan-btn-col">已選 <span>√</span></span> <span class="quxiao-btn-col">取消 <span>&times;</span></span> </button>'+
            '</div>'+
        ' <div style="clear:both;"></div>'+
        '<div style="margin-top:10px;">'+
        ' <div class="select-info" data-fancybox="" data-src="#qingjingColModal'+i+'" href="javascript:;">'+
        ' 選項'+
        '<font style="color:red;">*</font>'+
        '<span class="qingjing5Text xuanze-text">請選擇</span>'+
        '</div>'+
        ' </div>'+
        ' <div style="margin-top:10px;margin-left:-5px;margin-right:-5px;" class="clearfix identity-list-col">'+
        '<div class="clearfix identity-list">'+
        ' </div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '<div class="step-modal mobile-dialog" style="display:none;" id="qingjingColModal'+i+'">'+
        '<div class="title-col clearfix">'+
        '<div class="line"></div>'+
        '<div class="back-col" data-fancybox-close="">'+
        '<img src="images/icon27.png" />'+
        '</div>'+
        ' <div class="text">'+
        ' 請選擇'+
        '</div>'+
        '</div>'+
        '<div class="calendar-col">'+
        ' <div style="margin-bottom:20px;">'+
        '<div style="float:left;width:320px;" class="pro-select-mainl">'+
        '<span class="pro-select-col" style="width:320px;"> <span style="position: absolute;left:6px;display: inline-block;top:2px;">選項<font style="color:red;">*</font></span> <select name="select7" class="xuanxiangText5" style="width:318px;height:24px;border:0;padding-left:40px;"> </select> </span>'+
        '</div>'+
        '<div style="float:left;width:166px;margin-left:5px;" class="pro-select-mainl">'+
        '<span class="pro-select-col"> <span style="position: absolute;left:6px;display: inline-block;top:2px;">場次<font style="color:red;">*</font></span> <select name="select7" class="changciText5" style="width:164px;height:24px;padding-left:40px;border:0;"> </select> </span>'+
        '</div>'+
        '<div style="clear:both;"></div>'+
        '</div>'+
        '<div class="bottom-btn" style="display: block;">'+
        '<button type="button" class="left-btn" data-fancybox-close="">取消</button>'+
        '<button type="button" class="right-btn querenBtn5" data-fancybox-close="" >确认</button>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>');

        sceneInfoInit($("#qingjingCol"+i),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        initScene5($("#qingjingCol"+i),$("#qingjingColModal"+i),sceneJson[i].isMustBuy,sceneJson[i].optionList);
    }


    if(sceneJson[i].type==6)  //情景6
    {


        $("#qingjingColList").append('<div id="qingjingCol'+i+'">'+
            '<div class="changjing-col" data-id="'+sceneJson[i].ProductBaseID+'" data-type="6">'+
            ' <div class="product-top">'+
            ' <div class="product-title">'+
            ' <span class="product-title-text"></span>'+
            ' <span class="product-title-price"></span>'+
            '  </div>'+
            '  <div class="product-tag-list"></div>'+
            '  <div style="float:right;" class="detail-btn-col">'+
            ' <button class="detail-btn" type="button"> <span class="detail-btn-col">詳細 <span>▼</span></span> <span class="gouxuan-btn-col">已選 <span>√</span></span> <span class="quxiao-btn-col">取消 <span>&times;</span></span> </button>'+
        ' </div>'+
        ' <div style="clear:both;"></div>'+
        ' </div>'+
        ' <div class="product-select">'+
        ' <div class="product-title">'+
        '<span class="product-title-text"></span>'+
        '<span class="product-title-price"></span>'+
        '</div>'+
        ' <div class="product-tag-list"></div>'+
        ' <div style="float:right;" class="detail-btn-col">'+
        ' <button class="detail-btn" type="button"> <span class="detail-btn-col">詳細 <span>▼</span></span> <span class="gouxuan-btn-col">已選 <span>√</span></span> <span class="quxiao-btn-col">取消 <span>&times;</span></span> </button>'+
    ' </div>'+
        '<div style="clear:both;"></div>'+
        ' <div style="margin-top:10px;">'+
        ' <div class="select-info" data-fancybox="" data-src="#qingjingColModal'+i+'" href="javascript:;">'+
        ' 選項'+
        '<font style="color:red;">*</font>'+
        '<span class="qingjing6Text xuanze-text">請選擇</span>'+
        '</div>'+
        '</div>'+
        ' <div style="margin-top:10px;margin-left:-5px;margin-right:-5px;" class="clearfix identity-list-col">'+
        ' <div class="clearfix identity-list">'+
        ' </div>'+
        ' </div>'+
        ' </div>'+
        ' </div>'+
        ' <div class="step-modal mobile-dialog" style="display:none;" id="qingjingColModal'+i+'">'+
        ' <div class="title-col clearfix">'+
        ' <div class="line"></div>'+
        ' <div class="back-col" data-fancybox-close="">'+
        ' <img src="images/icon27.png" />'+
        ' </div>'+
        '<div class="text">'+
        ' 請選擇'+
        ' </div>'+
        ' </div>'+
        '<div class="calendar-col">'+
        '<div style="margin-bottom:20px;">'+
        '<div style="float:left;width:320px;" class="pro-select-mainl">'+
        '<span class="pro-select-col" style="width:320px;"> <span style="position: absolute;left:6px;display: inline-block;top:2px;">選項<font style="color:red;">*</font></span> <select name="select7" class="xuanxiangText6" style="width:318px;height:24px;border:0;padding-left:40px;"> </select> </span>'+
        ' </div>'+
        ' <div style="float:left;width:166px;margin-left:5px;" class="pro-select-mainl">'+
        ' <span class="pro-select-col"> <span style="position: absolute;left:6px;display: inline-block;top:2px;">場次<font style="color:red;">*</font></span> <select name="select7" class="changciText6" style="width:164px;height:24px;padding-left:40px;border:0;"> </select> </span>'+
    ' </div>'+
        '<div style="clear:both;"></div>'+
        ' </div>'+
        '<div class="bottom-btn" style="display: block;">'+
        '<button type="button" class="left-btn" data-fancybox-close="">取消</button>'+
        '<button type="button" class="right-btn querenBtn6" data-fancybox-close="" >确认</button>'+
        '</div>'+
        '</div>'+
        ' </div>'+
        '</div>');


        sceneInfoInit($("#qingjingCol"+i),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        initScene6($("#qingjingCol"+i),$("#qingjingColModal"+i),sceneJson[i].isMustBuy,sceneJson[i].optionList);
    }

    if(sceneJson[i].type==7)  //情景7
    {

        $("#qingjingColList").append('<div id="qingjingCol'+i+'" class="changjing-col" data-id="'+sceneJson[i].ProductBaseID+'" data-type="7">'+
            '<div class="product-top">'+
            '<div class="product-title">'+
            '<span class="product-title-text"></span>'+
            '<span class="product-title-price"></span>'+
            '</div>'+
            '<div class="product-tag-list"></div>'+
            '<div style="float:right;" class="detail-btn-col">'+
            '<button class="detail-btn" type="button"> <span class="detail-btn-col">詳細 <span>▼</span></span> <span class="gouxuan-btn-col">已選 <span>√</span></span> <span class="quxiao-btn-col">取消 <span>&times;</span></span> </button>'+
            '</div>'+
            '<div style="clear:both;"></div>'+
            ' </div>'+
            ' <div class="product-select">'+
            ' <div class="product-title">'+
            ' <span class="product-title-text"></span>'+
            ' <span class="product-title-price"></span>'+
            ' </div>'+
            ' <div class="product-tag-list"></div>'+
            ' <div style="float:right;" class="detail-btn-col">'+
            '<button class="detail-btn" type="button"> <span class="detail-btn-col">詳細 <span>▼</span></span> <span class="gouxuan-btn-col">已選 <span>√</span></span> <span class="quxiao-btn-col">取消 <span>&times;</span></span> </button>'+
            ' </div>'+
            ' <div style="clear:both;"></div>'+
            ' <div style="margin-top:10px;margin-left:-5px;margin-right:-5px;" class="clearfix identity-list-col">'+
            ' <div class="clearfix identity-list">'+
            ' </div>'+
            ' </div>'+
            ' </div>'+
            '</div>');

        sceneInfoInit($("#qingjingCol"+i),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        identityListInit($("#qingjingCol"+i),sceneJson[i].identityList,sceneJson[i].isMustBuy);
    }


    if(sceneJson[i].type==8)  //情景8
    {

        $("#qingjingColList").append(' <div id="qingjingCol'+i+'" class="changjing-col" data-id="'+sceneJson[i].ProductBaseID+'" data-type="8">'+
            '<div class="product-top">'+
            '<div class="product-title">'+
            '<span class="product-title-text"></span>'+
            '<span class="product-title-price"></span>'+
            ' </div>'+
            '<div class="product-tag-list"></div>'+
            ' <div style="float:right;" class="detail-btn-col">'+
            '<button class="detail-btn" type="button"> <span class="detail-btn-col">詳細 <span>▼</span></span> <span class="gouxuan-btn-col">已選 <span>√</span></span> <span class="quxiao-btn-col">取消 <span>&times;</span></span> </button>'+
            '</div>'+
            '<div style="clear:both;"></div>'+
            '</div>'+
            '<div class="product-select">'+
            ' <div class="product-title">'+
            '<span class="product-title-text"></span>'+
            ' <span class="product-title-price"></span>'+
            ' </div>'+
            '<div class="product-tag-list"></div>'+
            '<div style="float:right;" class="detail-btn-col">'+
            '<button class="detail-btn" type="button"> <span class="detail-btn-col">詳細 <span>▼</span></span> <span class="gouxuan-btn-col">已選 <span>√</span></span> <span class="quxiao-btn-col">取消 <span>&times;</span></span> </button>'+
            ' </div>'+
            ' <div style="clear:both;"></div>'+
            ' <div style="margin-top:10px;margin-left:-5px;margin-right:-5px;" class="clearfix identity-list-col">'+
            '<div class="clearfix identity-list">'+
            '</div>'+
            '</div>'+
            ' </div>'+
            ' </div>');

        sceneInfoInit($("#qingjingCol"+i),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);

        identityListInit($("#qingjingCol"+i),sceneJson[i].identityList,sceneJson[i].isMustBuy);
    }


    if(sceneJson[i].type==9)  //情景9
    {

        $("#qingjingColList").append('<div id="qingjingCol'+i+'">'+
            ' <div class="changjing-col" data-id="'+sceneJson[i].ProductBaseID+'" data-type="9">'+
            '<div class="product-top">'+
            '<div class="product-title">'+
            '<span class="product-title-text"></span>'+
            ' <span class="product-title-price"></span>'+
            ' </div>'+
            ' <div class="product-tag-list"></div>'+
            ' <div style="float:right;" class="detail-btn-col">'+
            ' <button class="detail-btn" type="button"> <span class="detail-btn-col">詳細 <span>▼</span></span> <span class="gouxuan-btn-col">已選 <span>√</span></span> <span class="quxiao-btn-col">取消 <span>&times;</span></span> </button>'+
            '</div>'+
            ' <div style="clear:both;"></div>'+
            '</div>'+
            ' <div class="product-select">'+
            ' <div class="product-title">'+
            '<span class="product-title-text"></span>'+
            ' <span class="product-title-price"></span>'+
            ' </div>'+
            '<div class="product-tag-list"></div>'+
            '<div style="float:right;" class="detail-btn-col">'+
            ' <button class="detail-btn" type="button"> <span class="detail-btn-col detail-btn-close">詳細 <span>▼</span></span> <span class="gouxuan-btn-col">已選 <span>√</span></span> <span class="quxiao-btn-col">取消 <span>&times;</span></span> </button>'+
            ' </div>'+
        ' <div style="clear:both;"></div>'+
        '<div style="margin-top:10px;">'+
        '<div class="select-info" data-fancybox="" data-src="#qingjingColModal'+i+'" href="javascript:;" >'+
        '選項'+
        ' <font style="color:red;">*</font> 請選擇'+
        ' </div>'+
        ' </div>'+
        ' <div style="margin-top:10px;margin-left:-5px;margin-right:-5px;" class="clearfix identity-list-col">'+
        ' <div class="clearfix identity-list">'+
        ' </div>'+
        ' </div>'+
        ' </div>'+
        ' </div>'+
        ' <div class="step-modal mobile-dialog" style="display: none;" id="qingjingColModal'+i+'">'+
        ' <div class="title-col clearfix">'+
        ' <div class="line"></div>'+
        '<div class="back-col" data-fancybox-close="">'+
        '<img src="images/icon27.png" />'+
        '</div>'+
        ' <div class="text">'+
        ' 請選擇'+
        ' </div>'+
        ' </div>'+
        ' <input style="width:578px;" class="countryInput" data-value="" type="text" placeholder="選擇國家*  請選擇n項" />'+
        ' <div class="select-country">'+
        ' <ul class="country-list clearfix countryList">'+
        ' </ul>'+
        ' <div class="map-col">'+
        ' <span class="map-operate"> <span class="open"> <img src="images/imgClose.png" /> </span> <span class="close" style="display: none;"> <img src="images/imgOpen.png" /> </span> </span>'+
        '<img src="data/map.png" />'+
        '</div>'+
        '</div>'+
        ' <div class="calendar-col" style="display: none;">'+
        ' <div style="margin-bottom:20px;">'+
        ' <div style="float:left;width:320px;" class="pro-select-mainl">'+
        ' <span class="pro-select-col" style="width:320px;"> <span style="position: absolute;left:6px;display: inline-block;top:2px;">選項<font style="color:red;">*</font></span> <select name="select7" class="xuanxiangText9" style="width:318px;height:24px;border:0;padding-left:40px;"> </select> </span>'+
        ' </div>'+
        ' <div style="float:left;width:166px;margin-left:5px;" class="pro-select-mainl">'+
        ' <span class="pro-select-col"> <span style="position: absolute;left:6px;display: inline-block;top:2px;">場次<font style="color:red;">*</font></span> <select name="select7" class="changciText9" style="width:164px;height:24px;padding-left:40px;border:0;"> </select> </span>'+
        ' </div>'+
        ' <div style="float:left;width:166px;margin-left:5px;" class="pro-select-mainl">'+
        ' <span class="pro-select-col"> <span style="position: absolute;left:6px;display: inline-block;top:2px;">身分<font style="color:red;">*</font></span> <select name="select7" class="shenfenText9" style="width:164px;height:24px;padding-left:40px;border:0;"></select> </span>'+
        ' </div>'+
        ' <div style="clear:both;"></div>'+
        ' </div>'+
        '<div class="calendar-main calendarCol9">'+
        ' </div>'+
        ' </div>'+
        '</div>'+
        '</div>');

        sceneInfoInit($("#qingjingCol"+i),sceneJson[i].title,sceneJson[i].isDiscounts,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);


        initScene9($("#qingjingCol"+i),$("#qingjingColModal"+i),sceneJson[i].isMustBuy,sceneJson[i].optionList);

    }


    if(sceneJson[i].type==10)  //情景10
    {

        $("#qingjingColList").append('<div id="qingjingCol'+i+'">'+
            '<div class="changjing-col" data-id="'+sceneJson[i].DiscountID+'" data-type="10">'+
            ' <div class="product-top">'+
            '<div class="product-title"><span class="product-title-text"></span></div>'+
            ' <div class="product-tag-list"></div>'+
            ' <div style="float:right;" class="detail-btn-col">'+
            '<button class="detail-btn"  type="button">'+
            '<span class="detail-btn-col detail-btn-close">詳細 <span>▼</span></span>'+
            '<span class="gouxuan-btn-col">已選 <span>√</span></span>'+
            ' <span class="quxiao-btn-col">取消 <span>×</span></span>'+
            '</button>'+
            '</div>'+
            ' <div style="clear:both;"></div>'+
            '</div>'+
            ' <div class="product-select">'+
            '<div class="product-title"><span class="product-title-text"></span></div>'+
            ' <div class="product-tag-list"></div>'+
            '<div style="float:right;" class="detail-btn-col">'+
            '<button class="detail-btn"  type="button">'+
            '<span class="detail-btn-col detail-btn-close">詳細 <span>▼</span></span>'+
            '<span class="gouxuan-btn-col">已選 <span>√</span></span>'+
            '<span class="quxiao-btn-col">取消 <span>×</span></span>'+
            ' </button>'+
            '</div>'+
            '<div style="clear:both;"></div>'+
            ' <div class="qingjing1">'+
            ' </div>'+
            '<div style="margin-top:30px;margin-left:-5px;margin-right:-5px;" class="clearfix identity-list-col" >'+
            '<div class="clearfix identity-list"></div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div  style="display:none;" class="mobile-dialog" id="qingjingColModal'+i+'">'+
            '<div class="title-col clearfix">'+
            '<div class="line"></div>'+
            '<div class="back-col" data-fancybox-close=""><img src="images/icon27.png"></div>'+
            '<div class="text">請選擇</div>'+
            '</div>'+
            '<div>'+
            '<div class="calendar-main calendarCol1">'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>');

        sceneInfoInit($("#qingjingCol"+i),sceneJson[i].DiscountName,1,sceneJson[i].isMustBuy,sceneJson[i].isSingleSell,sceneJson[i].price);



        for(var j=0;j<sceneJson[i].DiscountCombine.length;j++)
        {

            $("#qingjingCol"+i).find(".qingjing1").append('<div style="margin-top:10px;" data-code="'+sceneJson[i].DiscountCombine[j].ClassCode+'">'+
                '<div style="margin:10px 0;" >'+sceneJson[i].DiscountCombine[j].ProductBaseName+'-'+sceneJson[i].DiscountCombine[j].ClassName+'</div>'+
                '<div class="select-info select-info-first selectInfo'+j+'" style="width:200px;" data-class="'+sceneJson[i].DiscountCombine[j].ClassCode+'"  data-index1="'+i+'" data-index2="'+j+'" data-fancybox="" data-src="#qingjingColModal'+i+'" >使用日期：<span>請選擇</span></div>');
        }

        initTenthScene($("#qingjingCol"+i),$("#qingjingColModal"+i));

        identityListInitTenth($("#qingjingCol"+i),sceneJson[i].DiscountCombine,sceneJson[i].isMustBuy);


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
            cadHtml='<div><span style="text-decoration:line-through;">CAD '+identityList[i].cad+'</span><br><span style="color:#e10500;">TWD '+identityList[i].twd+'</span></div>';
        }


        if((identityList[i].minvalue>0)&&isMustBuy)
        {
            shenfenColText=shenfenColText+identityList[i].name+identityList[i].minvalue+"位、";
        }



        var identityListName="";

        if(identityList[i].IDKind==0)
        {
            identityListName="成人";
        }
        else if(identityList[i].IDKind==1)
        {
            identityListName="學生";
        }
        else if(identityList[i].IDKind==2)
        {
            identityListName="老人";
        }
        else if(identityList[i].IDKind==3)
        {
            identityListName="孩童";
        }
        else if(identityList[i].IDKind==4)
        {
            identityListName="嬰幼兒";
        }


        identity_list_html=identity_list_html+'<div class="col-xs-3 col-sm-3 col-md-3 identity-col">'+
            '<div>'+
            '<span style="vertical-align:middle;margin-right:5px;">'+identityListName+'</span>'+tipHtml+
            '</div>'+cadHtml+
            '<div style="margin-top:10px;">'+
            '<span class="minus-text" style="border:1px solid #dddddd;padding:2px 12px 3px 10px;background:#f7f7f7;color:#000;">-</span><span class="value1" style="vertical-align:initial;">'+
            '<input class="middle-text" data-idkind="'+identityList[i].IDKind+'" type="text" size="3" style="height:24px;text-align:center;" data-stock="'+identityList[i].stock+'" data-multiple="'+identityList[i].ismultiple+'" data-minvalue="'+identityList[i].minvalue+'" value="'+identityList[i].minvalue+'">'+
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

//优惠组合选择数量
function identityListInitTenth($changjingCol,identityList,isMustBuy)
{
    var identity_list_html="";
    var shenfenColText="";
    var identity_name_html="";


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
            cadHtml='<div><span style="text-decoration:line-through;">CAD '+identityList[i].cad+'</span><br><span style="color:#e10500;">TWD '+identityList[i].twd+'</span></div>';
        }

        var identityListName="";

        if(identityList[i].IDKind==0)
        {
            identityListName="成人";
        }
        else if(identityList[i].IDKind==1)
        {
            identityListName="學生";
        }
        else if(identityList[i].IDKind==2)
        {
            identityListName="老人";
        }
        else if(identityList[i].IDKind==3)
        {
            identityListName="孩童";
        }
        else if(identityList[i].IDKind==4)
        {
            identityListName="嬰幼兒";
        }

        identity_name_html=identity_name_html+'<span class="identity-text" style="margin-right:10px;">'+identityListName+'×<span class="quantity" data-idkind="'+identityList[i].IDKind+'" data-count="'+identityList[i].Quantity+'">'+identityList[i].Quantity+'</span></span>';

    }


    identity_list_html='<div class="col-xs-6 col-sm-6 col-md-6 identity-col">'+
        '<div>'+
        '<span style="vertical-align:middle;margin-right:5px;">'+identity_name_html+'</span>'+tipHtml+
        '</div>'+cadHtml+
        '<div style="margin-top:10px;">'+
        '<span class="minus-text-col" style="border:1px solid #dddddd;padding:2px 12px 3px 10px;background:#f7f7f7;color:#000;">-</span><span class="value1" style="vertical-align:initial;">'+
        '<input class="middle-text-col" type="text" size="3" style="height:24px;text-align:center;"  value="1">'+
        '</span>'+
        '<span class="plus-text-col" style="border:1px solid #dddddd;padding:2px 12px 3px 10px;background:#f7f7f7;color:#000;">+</span>'+
        '</div>'+
        '</div>';


    $changjingCol.find(".identity-list").empty();
    $changjingCol.find(".identity-list").append(identity_list_html);


}


$(".menushop").click(function()
{

    var jsonList=[];

    var jsonList1=[];

    $(".changjing-col").each(function()
    {


        var typeStr=$(this).attr("data-type");
        var $changjingDomObj=$(this);

        if(typeStr=="10")
        {


            $changjingDomObj.find(".quantity").each(function(index)
            {

                var changjingObj1={};

                changjingObj1.IDKind=$(this).attr("data-idkind");
                changjingObj1.Quantity==$(this).text();

                changjingObj1.DateList=[];



                changjingObj1.Class=$changjingDomObj.find(".select-info-first").eq(index).attr("data-class");


                $changjingDomObj.find(".select-info-first").each(function()
                {
                    var dateObj={};
                    var dateStr=$(this).find("span").text();

                    if(dateStr!="請選擇")
                    {
                        dateObj.Date=dateStr;
                    }
                    else {
                        dateObj.Date=null;
                    }

                    changjingObj1.DateList.push(dateObj);

                });



                changjingObj1.DiscountID=$changjingDomObj.attr("data-id");
                changjingObj1.type=$changjingDomObj.attr("data-type");

                jsonList1.push(changjingObj1);


            });




        }
        else {

            $changjingDomObj.find(".identity-col").each(function()
            {

                var changjingObj={};
                changjingObj.ProductBaseID=$changjingDomObj.attr("data-id");
                changjingObj.type=$changjingDomObj.attr("data-type");

                if($changjingDomObj.attr("data-type")=="1")
                {
                    changjingObj.DateList=[];
                    $changjingDomObj.find(".select-info-first").each(function()
                    {

                        var dateObj={};
                        var dateStr=$(this).find("span").text();

                        if(dateStr!="請選擇")
                        {
                            dateObj.Date=dateStr;
                        }
                        else {
                            dateObj.Date=null;
                        }

                        changjingObj.DateList.push(dateObj);

                    });

                }
                if(typeStr=="2"||typeStr=="3"||typeStr=="4"||typeStr=="5"||typeStr=="6"||typeStr=="9")
                {

                    changjingObj.Class=$changjingDomObj.find(".xuanze-text").text().split("，")[0];
                    changjingObj.Event=$changjingDomObj.find(".xuanze-text").text().split("，")[1];
                    changjingObj.Date=$changjingDomObj.find(".xuanze-text").text().split("，")[2];
                }
                else{
                    changjingObj.Class=null;
                    changjingObj.Event=null;
                    changjingObj.Date=null;
                }


                changjingObj.IDKind=$(this).find(".middle-text").attr("data-idkind");
                changjingObj.Quantity=$(this).find(".middle-text").val();

                jsonList.push(changjingObj);

            });


        }


    });


    $("#jsonNormal").val(JSON.stringify(jsonList));
    $("#jsonDiscount").val(JSON.stringify(jsonList));

    console.log(JSON.stringify(jsonList));
    //console.log(JSON.stringify(jsonList1));

    //$("#formCol").submit();

});



//优惠组合人数加和减运算
$("body").on("click",".minus-text-col",function()
{

    var prevNum=parseInt($(this).parent().find(".middle-text-col").val());


    if(prevNum>1)
    {
        prevNum--;

        $(this).parent().find(".middle-text-col").val(prevNum);


        $(this).parent().parent().parent().find(".quantity").each(function()
        {

            $(this).text(parseInt($(this).attr("data-count"))*prevNum);

        });


    }



});
$("body").on("click",".plus-text-col",function()
{

    var prevNum=parseInt($(this).parent().find(".middle-text-col").val());

    prevNum++;

    if(prevNum<=10)
    {
        $(this).parent().find(".middle-text-col").val(prevNum);
        $(this).parent().parent().parent().find(".quantity").each(function()
        {

            $(this).text(parseInt($(this).attr("data-count"))*prevNum);

        });
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

            $(".countryInput").attr("data-value",$(".countryInput").attr("data-value")+"、"+$(this).next().text());

        }
        else
        {

            if($(this).prop("checked"))
            {
                if($(this).parent().parent().find("input:checked").length>1)
                {
                    $(this).parent().parent().find("input").removeAttr("checked");
                    $(this).prop("checked","checked");
                    var countryListStr=$(".countryInput").attr("data-value").split("、");
                    if(countryListStr.length>0)
                    {
                        countryListStr.pop();
                    }
                    $(".countryInput").attr("data-value",countryListStr.join("、")+"、"+$(this).next().text());
                }
                else
                {
                    $(".countryInput").attr("data-value",$(".countryInput").attr("data-value")+"、"+$(this).next().text());
                }



            }
            else {

                var countryListStr=$(".countryInput").attr("data-value").split("、");
                if(countryListStr.length>0)
                {
                    countryListStr.pop();
                }
                $(".countryInput").attr("data-value",countryListStr.join("、"));



            }


            $(".calendar-col").show();
        }

    if($(".countryInput").attr("data-value"))
    {
        $(".countryInput").val($(".countryInput").attr("data-value").substring(1))
    }


});


$(".mobile-product .mible-title").click(function()
{
        $(this).toggleClass("active");
        $(this).next().toggle();

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

    $(".countryList").empty();
    $(".countryList").append(countryCheckHtml);


}





















































