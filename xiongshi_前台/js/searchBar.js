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

        for(var i in CityArr)
        {
            if(CountryArr[i].indexOf(inputValue)>-1)
            {
                var countryStr=CountryArr[i].replace(inputValue,"<span class='red-text'>"+inputValue+"</span>");
                html=html+'<li data-country="'+i+'" data-country-value="'+CountryArr[i]+'" >'+countryStr+'</li>';

                for(var j in CityArr[i])
                {
                    if(j!="_")
                    {
                        html=html+'<li data-country="'+i+'" data-country-value="'+CountryArr[i]+'"  data-city="'+j+'" data-city-value="'+CityArr[i][j]+'" >'+ CityArr[i][j]+'-'+countryStr+'</li>';
                    }

                }

            }

            for(var j in CityArr[i])
            {
                if(CityArr[i][j].indexOf(inputValue)>-1)
                {
                    var cityStr=CityArr[i][j].replace(inputValue,"<span class='red-text'>"+inputValue+"</span>");

                    html=html+'<li data-country="'+i+'" data-country-value="'+CountryArr[i]+'"  data-city="'+j+'" data-city-value="'+CityArr[i][j]+'" >'+cityStr+'-'+CountryArr[i]+'</li>';
                }

            }




        }



        $("#selectCityList").empty();
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
    $(".xiala-list").show();
});

$(".xiala-list input").click(function()
{


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




for(var i in LineArr){
    if (LineArr.hasOwnProperty(i)) { //filter,只输出man的私有属性
        $(".select-list-tab").append('<span data-id="'+i+'">'+vLine[i]+'</span>');


        //console.log(LineArr[i].length);

        /*for(var j=0;j<LineArr[i].length;j++)
        {
            console.log(CountryArr[LineArr[i][j]]);
        }*/


    };
}



$(".select-list-tab span").eq(0).addClass("active");
$(".select-list-col .title-col span").text($(".select-list-tab span").eq(0).text());

getCityList($(".select-list-tab span").eq(0).attr("data-id"));

function getCityList(zhou)
{

    var html="";
    for(var i=0;i<LineArr[zhou].length;i++)
    {


       if(CityArr[LineArr[zhou][i]])
       {
           html=html+'<li class="has-child"><div class="title-text" data-value="'+LineArr[zhou][i]+'">'+CountryArr[LineArr[zhou][i]]+'</div><div class="child-list">';
           for(var j in CityArr[LineArr[zhou][i]])
           {
               html=html+'<div data-value="'+j+'">'+CityArr[LineArr[zhou][i]][j]+'</div>'
               console.log(CityArr[j]);
           }
           html=html+'</div></li>';
       }
        else {
           html=html+'<li class="no-child"><div class="title-text" data-value="'+LineArr[zhou][i]+'">'+CountryArr[LineArr[zhou][i]]+'</div>';
       }


        html=html+"</li>";

    }
    $("#cityList").empty();
    $("#cityList").append(html);
}

$(".select-list-col .city-list .has-child").live("mouseover",function()
{
    console.log("###");
    $(this).find(".child-list").show();
}).live("mouseout",function()
{
    $(this).find(".child-list").hide();
});

$(".select-list-col .city-list li .child-list>div").live("click",function()
{
    var dataValue=$(this).attr("data-value");

    if(dataValue!="_")
    {
        $("#selectListCol input").val($(this).parent().prev().text()+"-"+$(this).text());
        $("#selectListCol input").attr("data-city",$(this).attr("data-value"));
    }
    else {
        $("#selectListCol input").val($(this).parent().prev().text());
    }

    $("#selectListCol input").attr("data-value",$(this).parent().prev().attr("data-value"));


});


$(".in-search-bt").click(function()
{
    var cityValue=$("#selectListCol input").attr("data-city");
    if(!cityValue)
    {
        cityValue="";
    }
    var countryValue=$("#selectListCol input").attr("data-value");

    if(!countryValue)
    {
        countryValue="";
    }

    if(countryValue)
    {
        countryValue=countryValue.substr(1,countryValue.length-1);
    }
        //修改搜索URL和参数
        window.location.href="https://www.liontravel.com/webet/webetse01.aspx?sCountry="+countryValue+"&sCity="+cityValue+"&sEtkind1="+$('#mainselectCity').attr("data-value")+"&sEtkind="+$('#mainselectCity').attr("data-value")+"&sName="+$(".search-keyword-col input").val();
});

$(".select-list-tab span").click(function()
{

    $(".select-list-tab span").removeClass("active");
    $(this).addClass("active");
    $(".select-list-col .title-col span").text($(this).text());
    getCityList($(this).attr("data-id"));

});


$(".select-list-col .city-list .no-child .title-text").live("click",function()
{


    $(".select-list-col .city-list .title-text").removeClass("active");
   $(this).addClass("active");
    $("#selectListCol input").val($(this).text());
    $("#selectListCol input").attr("data-value",$(this).attr("data-value"));


});


//关键字json
var keywordList=[
    {
        id:1,
        value:'上海-shagnhai-澳洲迪士尼游玩澳洲迪士尼游玩测试洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩'
    },
    {
        id:2,
        value:'上海-shagnhai-澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩'
    },
    {
        id:3,
        value:'上海-shagnhai-澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩'
    },
    {
        id:4,
        value:'上海-shagnhai-澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩'
    },
    {
        id:5,
        value:'上海-shagnhai-澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩澳洲迪士尼游玩'
    }
];


$(".search-keyword-col input").on("input",function()
{

    var inputValue=$(this).val();
    var html="";
    for(var i=0;i<keywordList.length;i++)
    {
        if(keywordList[i].value.indexOf(inputValue)>-1)
        {
            var keywordHtml=keywordList[i].value.replace(inputValue,"<span class='red-text'>"+inputValue+"</span>");
            html=html+'<li>'+keywordHtml+'</li>';
        }
    }
    $("#keywordCol").empty();
    $("#keywordCol").append(html);

    $(".select-list-col4").show();
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








