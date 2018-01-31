//js绑定键盘
document.onkeydown=function(e){
    e=window.event||e;
    switch(e.keyCode){
        case 38: //向上键
            console.log("top");
            var div = document.getElementById('selectCityList');
            div.scrollTop = div.scrollTop-25;

            var listCol= document.getElementById('keywordCol');
            listCol.scrollTop = listCol.scrollTop-25;

            break;
        case 40: //向下键
            console.log("down");

            var div = document.getElementById('selectCityList');
            div.scrollTop = div.scrollTop+25;

            var listCol= document.getElementById('keywordCol');
            listCol.scrollTop = listCol.scrollTop+25;



            break;
        default:
            break;
    }
}



/**
 * Created by Administrator on 2017/11/18.
 */


$("#selectListCol input").focus(function()
{

    if($(".select-list-col2").is(":hidden"))
    {
        $(".select-list-col").show();
    }


});


$(".select-list-close").click(function()
{

    $(".select-list-col").hide();

});


$(".select-list-close2").click(function()
{

    $(".select-list-col2").hide();

});

$(".select-list-close3").click(function()
{

    $(".xiala-list").hide();

});



$(".select-list-close4").click(function()
{

    $(".select-list-col4").hide();

});

$(".select-list-col2 ul li").click(function()
{

    $("#selectListCol input").val($(this).text());
    $(".select-list-col").hide();
    $(".select-list-col2").hide();

});

$(".select-list-col2 ul li").live("click",function()
{

    var cityStr=$(this).attr("data-city");
    var cityStrValue=$(this).attr("data-city-value");
    var countryStr=$(this).attr("data-country");
    var countryStrValue=$(this).attr("data-country-value");


    if(!cityStr)
    {
        cityStr="";
        $("#selectListCol input").val(countryStrValue);
    }
    else {
        $("#selectListCol input").val(cityStrValue+"-"+countryStrValue);
    }

    $("#selectListCol input").attr("data-city",cityStr);
    $("#selectListCol input").attr("data-value",countryStr);

    $(this).closest(".select-list-col2").parent().find(".input-close").show();

    $(this).closest(".select-list-col2").hide();

});


$(".input-close").click(function()
{
    $(this).hide();
    $(this).parent().find("input").val("");
});


$("#selectListCol input").on("input",function()
{


    if($(this).val().trim().length<=0)
    {
        $(".select-list-col").show();
        $(".select-list-col2").hide();
    }
    else {

        //selectCityList
        var html="";
        var inputValue=$(this).val().trim();

        var countValue=0;
        for(var i=0;i<allCityCountryList.length;i++)
        {
            if(countValue>=10)
            {
                break;
            }
            if(allCityCountryList[i].name.indexOf(inputValue)>-1)
            {
                countValue++;
                var countryStr=allCityCountryList[i].name.replace(inputValue,"<span class='red-text'>"+inputValue+"</span>");
                html=html+'<li data-country="'+i+'" data-country-value="'+allCityCountryList[i].name+'" >'+countryStr+'</li>';
            }

        }

        $("#selectCityList").empty();
        if(html=="")
        {
            html="<div style='text-align: center;'>很抱歉，找不到符合的項目</div>";
        }
        $("#selectCityList").append(html);


        $(".select-list-col").hide();
        $(".select-list-col2").show();
    }

});


$(".select-list-col .city-list li>span").click(function()
{

    if($(this).hasClass("disabled"))
    {
        return;
    }

    $(".select-list-col .city-list li>span").removeClass("active");
    $(this).addClass("active");

    $("#selectListCol input").val($(this).text());
    $(".select-list-col").hide();


});

//种类
$("#mainselectCity").click(function()
{
    var countryValue=$("#selectListCol input").attr("data-value");
    var cityValue=$("#selectListCol input").attr("data-city");

    if(!cityValue)
    {
        var searchCitySpecies=countryValue;
    }
    else {
        var searchCitySpecies=cityValue;
    }

    if(searchCitySpecies)
    {
        $(".xiala-list input[type=checkbox]").each(function()
        {


            if(!(ClassArr[searchCitySpecies].indexOf($(this).val())>-1))
            {
                $(this).prop("disabled","disabled");
            }
        });
    }


    $(".xiala-list").show();
});

$(".xiala-list input").click(function()
{

    var countryValue=$("#selectListCol input").attr("data-value");

    if(!countryValue)
    {
        alert("請先選擇國家/城市");
        return false;
        $(this).removeAttr("checked");
    }




    var textStr="";
    var codeStr="";
    $(".xiala-list input[type=checkbox]:checked").each(function()
    {
        textStr=textStr+","+$(this).parent().text().trim();
        codeStr=codeStr+","+$(this).val();
    });

    textStr=textStr.substr(1,textStr.length-1);
    codeStr=codeStr.substr(1,textStr.length-1);

    $("#mainselectCity").text(textStr);
    $("#mainselectCity").attr("data-value",codeStr);

});




for(var i in vLine){
    if (vLine.hasOwnProperty(i)) { //filter,只输出man的私有属性

        $(".select-list-tab").append('<span data-id="'+i+'">'+vLine[i]+'</span>');

    };
}



$(".select-list-tab span").eq(0).addClass("active");
$(".select-list-col .title-col span").text($(".select-list-tab span").eq(0).text());

getCityList($(".select-list-tab span").eq(0).attr("data-id"));

function getCityList(zhou)
{

    var html="";
    for(var i in vLinetravel[zhou])
    {

        if(i!="_")
        {

            html=html+'<li class="has-child"><div class="title-text" data-value="'+i+'"><span class="title-text-col"><span class="ic ic-ln x12 productreferf"></span>'+vLinetravel[zhou][i]+'</span></div><div class="child-list">';

            for(var j in vLinewebarea[i])
            {
                if(j!="_") {
                    html = html + '<div><span data-value="' + j + '">' + vLinewebarea[i][j] + '</span></div>';
                }
            }

            html=html+'</div></li>';
        }

    }
    $("#cityList").empty();
    $("#cityList").append(html);
}


$(".select-list-col .city-list li .child-list>div").live("click",function()
{
    var dataValue=$(this).attr("data-value");

    console.log(dataValue);

    if(dataValue!="_")
    {
        $("#selectListCol input").val($(this).parent().prev().text()+"-"+$(this).text());
        $("#selectListCol input").attr("data-city",$(this).attr("data-value"));
    }
    else {
        $("#selectListCol input").val($(this).parent().prev().text());
    }

    $("#selectListCol input").attr("data-value",$(this).parent().prev().attr("data-value"));

    $(this).closest(".select-list-col").parent().find(".input-close").show();

    $(this).closest(".select-list-col").hide();


});


$(".in-search-bt").click(function()
{
    var cityValue=$("#selectListCol input").attr("data-city");
    var countryValue=$("#selectListCol input").attr("data-value");

    if(!countryValue)
    {
        alert("目的地需必填！")
        return;
    }

    if(!cityValue)
    {
        cityValue="";
    }


    if(!countryValue)
    {
        countryValue="";
    }

    if(countryValue)
    {
        countryValue=countryValue.substr(1,countryValue.length-1);
    }



        //修改搜索URL和参数
        window.open("https://www.liontravel.com/webet/webetse01.aspx?sCountry="+countryValue+"&sCity="+cityValue+"&sEtkind1="+$('#mainselectCity').attr("data-value")+"&sEtkind="+$('#mainselectCity').attr("data-value")+"&sName="+$(".search-keyword-col input").val());
});

$(".select-list-tab span").click(function()
{

    $(".select-list-tab span").removeClass("active");
    $(this).addClass("active");
    $(".select-list-col .title-col span").text($(this).text());
    getCityList($(this).attr("data-id"));

});


$(".select-list-col .city-list .title-text-col").live("click",function()
{

    $(".select-list-col .city-list .title-text-col").removeClass("active");
    $(this).addClass("active");
    $("#selectListCol input").val($(this).text());
    $("#selectListCol input").attr("data-value",$(this).attr("data-value"));


});


//关键字json

var KeywordArr=
{
    '_TPE' : {
        'ProductName' : '產品名稱1,產品名稱2,產品名稱3',
        'ProducKeyword' : 'Keyword1,Keyword2,Keyword3',
        'Administrative_Region' : '中山區,大安區,信義區',
        'MRT' : '中山國中捷運站,台北車站捷運站,晴光市場捷運站',
        'Shopping_District ' : '中山商圈,台北車站商圈,晴光商圈'
    },
    '_TAO' : {
        'ProductName' : '產品名稱1,產品名稱2',
        'ProducKeyword' : 'Keyword1,Keyword2',
        'Administrative_Region' : '產品行政區1,產品行政區2',
        'MRT' : '中山國中捷運站,台北車站捷運站',
        'Shopping_District ' : '中山商圈,台北車站商圈'
    },
    '_TYO' : {
        'ProductName' : '產品名稱1,產品名稱2,產品名稱3,產品名稱4,產品名稱5',
        'ProducKeyword' : 'Keyword1,Keyword2,Keyword3,Keyword4,Keyword5',
        'Administrative_Region' : '中山區,大安區,信義區,中正區,內湖區',
        'MRT' : '中山國中捷運站,台北車站捷運站,晴光市場捷運站,中正紀念堂捷運站,西湖捷運站',
        'Shopping_District ' : '中山商圈,台北車站商圈,晴光商圈,中正紀念堂商圈,內湖科學園區商圈'
    },
    '_OSA' : {
        'ProductName' : '產品名稱1,產品名稱2,產品名稱3,產品名稱4,產品名稱5',
        'ProducKeyword' : 'Keyword1,Keyword2,Keyword3,Keyword4,Keyword5',
        'Administrative_Region' : '中山區,大安區,信義區,中正區,內湖區',
        'MRT' : '中山國中捷運站,台北車站捷運站,晴光市場捷運站,中正紀念堂捷運站,西湖捷運站',
        'Shopping_District ' : '中山商圈,台北車站商圈,晴光商圈,中正紀念堂商圈,內湖科學園區商圈'
    }
};


$(".search-keyword-col input").on("input",function()
{

    if($("#selectListCol input").val()=="")
    {
        alert("請先選擇國家/城市");
        $(".search-keyword-col input").val("");
        return;
    }


    var keywordList=KeywordArr[$("#selectListCol input").attr("data-city")];

    var inputValue=$(this).val();





    $("#keywordCol").empty();
    if(keywordList["ProductName"])
    {
        var ProductName=keywordList["ProductName"].split(",");
        for(var i=0;i<ProductName.length;i++)
        {
            if(ProductName[i].indexOf(inputValue)>-1)
            {
                var keywordHtml=ProductName[i].replace(inputValue,"<span class='red-text'>"+inputValue+"</span>");
                if($("#keywordCol li").length>=10)
                {
                    break;
                }
                $("#keywordCol").append('<li>'+keywordHtml+'</li>');
            }
        }
    }

    if(keywordList["ProducKeyword"])
    {
        var ProductName=keywordList["ProducKeyword"].split(",");
        for(var i=0;i<ProductName.length;i++)
        {
            if(ProductName[i].indexOf(inputValue)>-1)
            {
                var keywordHtml=ProductName[i].replace(inputValue,"<span class='red-text'>"+inputValue+"</span>");
                if($("#keywordCol li").length>=10)
                {
                    break;
                }
                $("#keywordCol").append('<li>'+keywordHtml+'</li>');
            }
        }
    }

    if(keywordList["Administrative_Region"])
    {
        var ProductName=keywordList["Administrative_Region"].split(",");
        for(var i=0;i<ProductName.length;i++)
        {
            if(ProductName[i].indexOf(inputValue)>-1)
            {
                var keywordHtml=ProductName[i].replace(inputValue,"<span class='red-text'>"+inputValue+"</span>");
                if($("#keywordCol li").length>=10)
                {
                    break;
                }
                $("#keywordCol").append('<li>'+keywordHtml+'</li>');
            }
        }
    }

    if(keywordList["MRT"])
    {
        var ProductName=keywordList["MRT"].split(",");
        for(var i=0;i<ProductName.length;i++)
        {
            if(ProductName[i].indexOf(inputValue)>-1)
            {
                var keywordHtml=ProductName[i].replace(inputValue,"<span class='red-text'>"+inputValue+"</span>");
                if($("#keywordCol li").length>=10)
                {
                    break;
                }
                $("#keywordCol").append('<li>'+keywordHtml+'</li>');
            }
        }
    }

    if(keywordList["Shopping_District"])
    {
        var ProductName=keywordList["Shopping_District"].split(",");
        for(var i=0;i<ProductName.length;i++)
        {
            if(ProductName[i].indexOf(inputValue)>-1)
            {
                var keywordHtml=ProductName[i].replace(inputValue,"<span class='red-text'>"+inputValue+"</span>");
                if($("#keywordCol li").length>=10)
                {
                    break;
                }
                $("#keywordCol").append('<li>'+keywordHtml+'</li>');
            }
        }
    }


    if( $("#keywordCol li").length==0)
    {
        $(".select-list-col4 .no-data").show();
        $(".select-list-col4 .has-data").hide();
    }
    else {
        $(".select-list-col4 .no-data").hide();
        $(".select-list-col4 .has-data").show();
    }



    $(".select-list-col4").show();
});

$(".select-list-col4 .bottom").click(function()
{

    var cityValue=$("#selectListCol input").attr("data-city");
    var countryValue=$("#selectListCol input").attr("data-value");

    if(!cityValue)
    {
        cityValue="";
    }


    if(!countryValue)
    {
        countryValue="";
    }

    if(countryValue)
    {
        countryValue=countryValue.substr(1,countryValue.length-1);
    }
    window.open("https://www.liontravel.com/webet/webetse01.aspx?sCountry="+countryValue+"&sCity="+cityValue+"&sEtkind1="+$('#mainselectCity').attr("data-value")+"&sEtkind="+$('#mainselectCity').attr("data-value")+"&sName="+$(".search-keyword-col input").val());


});

$(".select-list-col4 li").live("click",function()
{
    $(".search-keyword-col input").val($(this).text());
    $(".select-list-col4").hide();

});


//目的地外面点击消失
document.onclick =function(e){
    var target = e.target;
    var parentStr=$(target).parents('.select-list').length;
    if(parentStr<=0)
    {
        $(".select-list-col").hide();
    }

    var parentStr2=$(target).parents('.mainselectCity').length;
    if(parentStr2<=0)
    {
        $(".xiala-list").hide();
    }


    var parentStr2=$(target).parents('.search-keyword-col').length;
    if(parentStr2<=0)
    {
        $(".select-list-col4").hide();
    }




}



//模糊查询列表
var allCityCountryList=[];
for(var i in vLine)
{
    for(var j in vLinetravel[i])
    {
        if(j!="_")
        {

            var allCountryObj={};
            allCountryObj.code1=j;
            allCountryObj.code2=i;
            allCountryObj.name=vLinetravel[i][j]+"-"+vLine[i];
            allCityCountryList.push(allCountryObj);

            for(var k in vLinewebarea[j])
            {
                if(k!="_")
                {
                    var allCityCountryObj={};
                    allCityCountryObj.code1=k;
                    allCityCountryObj.code2=j;
                    allCityCountryObj.name=vLinewebarea[j][k]+"-"+vLinetravel[i][j];
                    allCityCountryList.push(allCityCountryObj);
                }


            }
        }

    }
}






