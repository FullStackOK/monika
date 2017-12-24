/**
 * Created by tuyao on 2017/12/21.
 */
var TWList= {
        '_TPE': '台北',
        '_TAO': '桃園'
};

var TWAreaList={
    '_TPE':{
        '_ZZ':'中正区',
        '_SS':'松山区'
    },
    '_TAO':{
        '_BD':'八德区',
        '_LZ':'芦竹区'
    }

}

//自取地址
var takeAddressList=[
    {
        id:'1',
        code:'_TPE',
        name:'台北',
        address_detail:[
            {
                id:'1',
                detail:'台北市瑞湖街111號2樓1'
            },
            {
                id:'2',
                detail:'台北市瑞湖街111號2樓2'
            }
        ]
    },
    {
        id:'2',
        code:'_TAO',
        name:'桃園',
        address_detail:[
            {
                id:'1',
                detail:'桃園瑞湖街111號2樓1'
            },
            {
                id:'2',
                detail:'桃園瑞湖街111號2樓2'
            }
        ]
    }
]

var takeAddressCityHtml="";
for(var i=0;i<takeAddressList.length;i++)
{
    takeAddressCityHtml=takeAddressCityHtml+'<option value="'+takeAddressList[i].id+'">'+takeAddressList[i].name+'</option>';
}
$("#select71").append(takeAddressCityHtml);

$("#select71").change(function()
{
    var takeAddressCityDetailHtml="";

    var indexValue=parseInt($("#select71").val())-1;

    for(var i=0;i<takeAddressList[indexValue].address_detail.length;i++)
    {
        takeAddressCityDetailHtml=takeAddressCityDetailHtml+'<option>'+takeAddressList[indexValue].address_detail[i].detail+'</option>'
    }

    $("#select72").empty();
    $("#select72").append(takeAddressCityDetailHtml);

});


//旅客资料
var textList=[
    "愛我別走~~~快填完嚕♥",
    "還差一點，加油",
    "你真的快填完了啦",
    "都走到這裡了，填完好嗎",
    "有耐心的人才能得到他期待的",
    "留給我幾分鐘，我給你全世界",
    "小編沒梗了跪求大大填完",
    "天將降大任於斯人也，必先勞其筋骨苦其心志…",
    "天將降大任於斯人也…你懂的"
]

var indexValue = Math.floor((Math.random()*textList.length));

$("#lvkeZiliao").text(textList[indexValue]);



//校验
$.validator.setDefaults({
    submitHandler: function() {

        if($(".form-error-active").length==0)
        {

            clearLocalStorage();
            alert("請確認資料是否填寫齊全");
        }
        else {
            $("html,body").animate({scrollTop: ($($(".form-error-active")[0]).offset().top-80)}, 500);
        }

    }
});

$("#basicForm").validate({
    errorClass: "form-error",
    errorPlacement: function (error, element) {

        $(element).parent().parent().append(error);
    }
});



$("#nextBtn").click(function()
{

    verifyFunc();

    $("#basicForm").submit();


});


//同联络人
$(".tonglianluo").change(function()
{

    if($(this).prop("checked"))
    {
        var $objParent=$(this).parent().parent().parent().parent();
        $objParent.find(".zhongwen-name").val($("#name").val());

        $objParent.find(".mobile-text").val($("#mobile").val());


    }

});

//只填写分机
$("#fenji").on("input",function()
{

    fenjiFunc();

});

function fenjiFunc()
{
    if(($("#quma").val()==""||$("#dianhua").val()=="")&&$("#fenji").val()!="")
    {
        $("#fenji").addClass("form-error-input");
        if( $("#fenji").parent().parent().find(".form-error-active").length>0)
        {
            $("#fenji").parent().parent().find(".form-error-active").text("請輸入完整電話");
        }
        else
        {
            $("#fenji").parent().parent().append("<label class='form-error-active'>請輸入完整電話</label>");
        }

    }
    else {
        $("#fenji").removeClass("form-error-input");
        $("#fenji").parent().parent().find(".form-error-active").remove();
    }
}


//中文和英文名两者必须填写一个
function nameVerify()
{

    $(".traveller-col").each(function()
    {

        if($(this).find(".zhongwen-name").val()==""&&($(this).find(".english-name1").val()==""||$(this).find(".english-name2").val()==""))
        {
            console.log($(this).find(".zhongwen-name"));
            $(this).find(".zhongwen-name").addClass("form-error-input");

            if( $(this).find(".zhongwen-name").parent().parent().find(".form-error-active").length>0)
            {
                $(this).find(".zhongwen-name").parent().parent().find(".form-error-active").text("英文姓名兩者擇一必填");
            }
            else {
                $(this).find(".zhongwen-name").parent().parent().append('<label class="form-error-active">英文姓名兩者擇一必填</label>');
            }

        }
        else {

            $(this).find(".zhongwen-name").removeClass("form-error-input");
            $(this).find(".zhongwen-name").parent().next().removeClass("form-error-active");
        }

    });
}

//勾选郵寄
function youjiFunc()
{
    if($("#option51").prop("checked"))
    {
        if($("#shouji1").val()!=""||($("#dianhua").val()!=""&&$("#dianhua").val()!=""&&$("#fenji").val()!=""))
        {

            $("#shouji1").removeClass("form-error-input");
            $("#shouji1").parent().parent().remove("form-error-active");

        }
        else
        {
            $("#shouji1").addClass("form-error-input");
            if( $("#shouji1").parent().parent().find(".form-error-active").length>0)
            {
                $("#shouji1").parent().parent().find(".form-error-active").text("手機與電話兩者擇一必填");
            }
            else
            {
                $("#shouji1").parent().parent().append("<label class='form-error-active'>手機與電話兩者擇一必填</label>");
            }
        }
    }
}


function verifyFunc()
{

    $("form input[allInput]").each(function()
    {
        allInputFunc($(this));
    });

    nameVerify();
    youjiFunc();
    fenjiFunc();

}



$(".zhongwen-name").on("input",function()
{

    if($(this).val()!="")
    {
        $(this).removeClass("form-error-input");
        $(this).parent().parent().find(".form-error-active").remove();
    }

});



$(".calendar").on("input",function()
{

    var $obj=$(this);

    if($(this).val()[0]=="0"||$(this).val()[0]=="1")
    {
        if($(this).val().length==4&&$(this).val()[3]<=3)
        {
            $(this).val(new Date().getFullYear()+$(this).val());
        }
    }


});


//定时保存功能
$( "#basicForm" ).sisyphus();

//清楚缓存
function clearLocalStorage()
{
    for(var i in localStorage) {

        //console.log(localStorage[i])

        if(localStorage[i].toString().indexOf("basicForm")>-1)
        {
            localStorage[i]="";
        }
    }
}


//初始化城市和地区选择
var cityHtml="";
for(i in TWList)
{
    cityHtml=cityHtml+"<option value='"+i+"'>"+TWList[i]+"</option>"
}
$("#citySelect").append(cityHtml);


$("#citySelect").change(function()
{
    var selectValue=$("#citySelect option:selected").val();
    var selectHtml="";
    for(i in TWAreaList[selectValue])
    {
        selectHtml=selectHtml+'<option value="'+i+'">'+TWAreaList[selectValue][i]+'</option>';
    }
    $("#diquSelect").empty();
    $("#diquSelect").append(selectHtml);


});

//国籍
var CountryArrList=[];
for(i in CountryArr)
{
    CountryArrList.push(CountryArr[i]+'-'+i.slice(1));
}


$(".nationality").on("input",function()
{
    if($(this).val().trim().length<=0)
    {
        $(this).parent().find(".select-country-list").hide();
    }
    else {


        var CountryHtml="";
        var inputValue=$(this).val();
        for(var i=0;i<CountryArrList.length;i++)
        {
            if(CountryArrList[i].indexOf(inputValue)>-1)
            {

                var countryStr=CountryArrList[i].replace(inputValue,"<span class='red-text'>"+inputValue+"</span>");
                CountryHtml=CountryHtml+'<li>'+countryStr+'</li>';

            }

        }


        $(this).parent().find(".select-country-list ul").empty();
        if(CountryHtml=="")
        {
            CountryHtml="<div style='text-align: center;'>很抱歉，找不到符合的項目</div>";
        }
        $(this).parent().find(".select-country-list ul").append(CountryHtml);


        $(this).parent().find(".select-country-list").show();
    }
});

$(".select-list-close").click(function()
{

    $(this).parent().hide();

});

$(".select-country-list ul").on("click","li",function()
{
    $(this).parent().parent().prev().val($(this).text());
    $(this).parent().parent().hide();
});


//点击国籍外面消失
document.onclick =function(e){
    var target = e.target;
    var parentStr=$(target).parents('.nationality-col').length;
    if(parentStr<=0)
    {
        $(".select-country-list").hide();
    }

}

//超過 60 分鐘後
var timeCount=1;
setInterval(function()
{
    timeCount++;
    if(timeCount==54*60)
    {
        alert("「溫馨提醒：您已在此頁面停留超過 55 分鐘，請盡速完成資料填寫，系統將於 5 分鐘後登出，需要再次登入會員才可繼續填寫 旅客資料，謝謝！」");
    }


    if(timeCount>=60*60)
    {
        alert("已经超過60分鐘！");
        window.location.reload();
    }
},1000)