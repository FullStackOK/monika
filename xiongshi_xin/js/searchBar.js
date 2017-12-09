//右边工具栏操作
$(".silderlist .silderlistbtn").click(function()
{
    var indexValue=$(this).index();
    if(indexValue==0)
    {
        $("#browseNoRecord").hide();
        $("#shoucangList").show();
        $("#pcShareCol").hide();
    }
    else if(indexValue==1)
    {

        $("#browseNoRecord").show();
        $("#shoucangList").hide();
        $("#pcShareCol").hide();

    }
    else if(indexValue==2)
    {
        $("#browseNoRecord").hide();
        $("#shoucangList").hide();
        $("#pcShareCol").show();
    }

});

if(localStorage.productListLocalStorage)
{
    var productHtml="";
    var getProductList=JSON.parse(localStorage.productListLocalStorage);
    for(var i=0;i<getProductList.length;i++)
    {
        productHtml=productHtml+'<div class="silderitem">'+
            '<div class="menu2">'+
            '<span></span>'+
            '<span></span>'+
            ' </div>'+
            '<div class="sildertitle">當地遊</div>'+
            '<div style="min-height:70px;border-bottom:1px solid #f1f1f1;">'+getProductList[i].Description+
            ' <br>'+
            '適用期間：'+getProductList[i].AvailableTime+
            ' </div>'+
            ' <div style="line-height:40px;text-align:right;">每人 <span style="color:#e10500;font-size:20px;vertical-align:baseline;">$35,568</span> 起</div>'+
            '</div>';

    }

    $("#browseNoRecord").append(productHtml);



}
else {
    $("#browseNoRecord").append('<img src="images/add/browseNoRecord.png">');
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


$(".select-list-col .city-list .no-child .title-text").live("click",function()
{


    $(".select-list-col .city-list .title-text").removeClass("active");
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







