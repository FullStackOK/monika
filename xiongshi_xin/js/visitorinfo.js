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
                detail:'台北市瑞湖街111號2樓1',
                phone:'02-87939001'

            },
            {
                id:'2',
                detail:'台北市瑞湖街111號2樓2',
                phone:'02-87939002'
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
                detail:'桃園瑞湖街111號2樓1',
                phone:'02-87939003'
            },
            {
                id:'2',
                detail:'桃園瑞湖街111號2樓2',
                phone:'02-87939004'
            }
        ]
    }
]

//台灣地區 1代表是 0代表否
var IsTaiwan=1;
if(IsTaiwan==0)
{
    $(".english-name1").attr("required","required");
    $(".english-name2").attr("required","required");
}


//產品預購 1代表后台有勾选 0代表没有勾选
var PurchaseBefore=1

if(PurchaseBefore==1)
{
    alert("本產品為預訂商品，業務將於 1-3 日內與您聯繫是否訂購成功，我們將以最快的速度為您處理，謝謝！");
}


var takeAddressCityHtml="";
for(var i=0;i<takeAddressList.length;i++)
{
    takeAddressCityHtml=takeAddressCityHtml+'<option value="'+takeAddressList[i].id+'">'+takeAddressList[i].name+'</option>';
}
$("#select71").append(takeAddressCityHtml);

$("#select71").change(function()
{
    var takeAddressCityDetailHtml="";

    if($("#select71").val())
    {
        var indexValue=parseInt($("#select71").val())-1;

        for(var i=0;i<takeAddressList[indexValue].address_detail.length;i++)
        {
            takeAddressCityDetailHtml=takeAddressCityDetailHtml+'<option data-phone="'+takeAddressList[indexValue].address_detail[i].phone+'">'+takeAddressList[indexValue].address_detail[i].detail+'</option>'
        }

        $("#select72").empty();
        $("#select72").append(takeAddressCityDetailHtml);
        $("#cityCol").text($("#select71 option:checked").text());
        $("#addressCol").text($("#select72 option").eq(0).text());
        $("#dianhuaCol").text($("#select72 option").eq(0).attr("data-phone"));
    }



});

$("#select72").change(function()
{

    $("#dianhuaCol").text($("#select72 option:checked").attr("data-phone"));

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

        if(IsTaiwan==1)
        {
            if($(this).find(".zhongwen-name").val()==""&&($(this).find(".english-name1").val()==""||$(this).find(".english-name2").val()==""))
            {

                $(this).find(".zhongwen-name").addClass("form-error-input");
                console.log($(this).find(".zhongwen-name").parent().parent().find(".form-error-active").length);

                if( $(this).find(".zhongwen-name").parent().parent().find(".form-error-active").length>0)
                {
                    $(this).find(".zhongwen-name").parent().parent().find(".form-error-active").text("中文名和英文姓名兩者擇一必填");
                }
                else {
                    $(this).find(".zhongwen-name").parent().parent().append('<label class="form-error-active">中文名和英文姓名兩者擇一必填</label>');
                }

            }
            else {


                if(!$(this).find(".zhongwen-name").parent().next().hasClass("form-error-active1"))
                {
                    $(this).find(".zhongwen-name").removeClass("form-error-input");
                    $(this).find(".zhongwen-name").parent().next().remove();
                }

            }
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


    sameNameVerify();
    nameVerify();

    youjiFunc();
    fenjiFunc();


}

//校验中文名与中文名，英文名和英文名重复问题
function sameNameVerify()
{
    $(".traveller-info").each(function()
    {
        var zhongwenNameList=[];
        $(this).find(".zhongwen-name").each(function()
        {
            zhongwenNameList.push($(this).val());
        });

        var isHasSameElementRs=isHasSameElement(zhongwenNameList);

        console.log("重复"+isHasSameElementRs);

        if(isHasSameElementRs!=-1&&$(this).find(".zhongwen-name").eq(isHasSameElementRs).val()!="")
        {
            $(this).find(".zhongwen-name").eq(isHasSameElementRs).addClass("form-error-input");

            if($(this).find(".zhongwen-name").eq(isHasSameElementRs).parent().parent().find(".form-error-active").length>0)
            {
                $(this).find(".zhongwen-name").eq(isHasSameElementRs).parent().parent().find(".form-error-active").text("不能出现重复的中文姓名");
            }
            else {
                $(this).find(".zhongwen-name").eq(isHasSameElementRs).parent().parent().append('<label class="form-error-active form-error-active1">不能出现重复的中文姓名</label>');
            }

        }
        else{
            $(this).find(".zhongwen-name").removeClass("form-error-input");
            $(this).find(".zhongwen-name").parent().parent().find(".form-error-active").remove();
        }


        var englishNameList=[];
        $(this).find(".english-name1").each(function()
        {
            englishNameList.push($(this).val()+$(this).next().val());
        });



        var isEnglishNameRs=isHasSameElement(englishNameList);



        if(isEnglishNameRs!=-1&&$(this).find(".english-name1").eq(isEnglishNameRs).val()!="")
        {
            $(this).find(".english-name1").eq(isEnglishNameRs).addClass("form-error-input");

            if($(this).find(".english-name1").eq(isEnglishNameRs).parent().parent().find(".form-error-active").length>0)
            {
                $(this).find(".english-name1").eq(isEnglishNameRs).parent().parent().find(".form-error-active").text("不能出现重复的英文姓名");
            }
            else {
                $(this).find(".english-name1").eq(isEnglishNameRs).parent().parent().append('<label class="form-error-active">不能出现重复的英文姓名</label>');
            }

        }
        else{
            $(this).find(".english-name1").removeClass("form-error-input");
            $(this).find(".english-name2").removeClass("form-error-input");
            $(this).find(".english-name1").parent().parent().find(".form-error-active").remove();
        }



    });
}

//判断数组中是否存在相同元素
function isHasSameElement (ary)
{


    var nary=ary.sort();

    for(var i=0;i<ary.length;i++){

        if (nary[i]==nary[i+1]){

            return i;

        }
        else {
            return -1;
        }

    }
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

    if($(this).val().length>0)
    {
        $(this).removeClass("form-error");
        $(this).parent().parent().find("label.form-error").remove();
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


//加入常用名單
$(".common-use").click(function()
{

    if($(this).prop("checked"))
    {

        var $parentObj=$(this).parent().parent().parent().parent().parent();

        var zhongwenName=$parentObj.find(".zhongwen-name").val();
        var calendarCol=$parentObj.find(".calendar").val();
        var sexCol=$parentObj.find(".sex-col").val();
        var nationalityCol=$parentObj.find(".nationality").val();

        var englishName1=$parentObj.find(".english-name1").val();
        var englishName2=$parentObj.find(".english-name2").val();


        if(zhongwenName==""||calendarCol==""||sexCol==""||nationalityCol=="")
        {
            alert("当前旅客资料填写完整才能加入常用名單！");
            $(this).removeAttr("checked");
            return;
        }

        if(!localStorage.nameList)
        {
            localStorage.nameList="[]";
        }

        var existFlag=0;
        var nameList=JSON.parse(localStorage.nameList);
        for(var i=0;i<nameList.length;i++)
        {
            if(nameList[i].zhongwenName==zhongwenName)
            {
                existFlag=1;
                break;
            }
        }

        if(existFlag==0)
        {
            var nameObj={};
            nameObj.zhongwenName=zhongwenName;
            nameObj.calendarCol=calendarCol;
            nameObj.sexCol=sexCol;
            nameObj.nationalityCol=nationalityCol;
            nameObj.englishName1=englishName1;
            nameObj.englishName2=englishName2;
            nameList.push(nameObj);
            localStorage.nameList=JSON.stringify(nameList);


            manifestInit();

        }




    }

});

function manifestInit()
{
    if(!localStorage.nameList)
    {
        localStorage.nameList="[]";
    }
    var nameList=JSON.parse(localStorage.nameList);

    var manifestHtml='<option value="">請選擇帶入旅客名單</option>';
    for(var i=0;i<nameList.length;i++)
    {
        manifestHtml=manifestHtml+'<option data-zhongwenName="'+nameList[i].zhongwenName+'" ' +
            'data-zhongwenName="'+nameList[i].zhongwenName+'" ' +
            'data-calendarCol="'+nameList[i].calendarCol+'"' +
            ' data-sexCol="'+nameList[i].sexCol+'" ' +
            'data-nationalityCol="'+nameList[i].nationalityCol+'" ' +
            'data-englishName1="'+nameList[i].englishName1+'" ' +
            'data-englishName2="'+nameList[i].englishName2+'">'+nameList[i].zhongwenName+'</option>'
    }
    $(".manifest").empty();
    $(".manifest").append(manifestHtml);
}

manifestInit();

//选择選擇帶入旅客名單
$(".manifest").change(function()
{

    if($(this).val())
    {

        var $parentObj=$(this).parent().parent().parent();


       $parentObj.find(".zhongwen-name").val($(this).find("option:checked").attr("data-zhongwenName"));
        $parentObj.find(".calendar").val($(this).find("option:checked").attr("data-calendarCol"));
       $parentObj.find(".sex-col").val($(this).find("option:checked").attr("data-sexCol"));
        $parentObj.find(".nationality").val($(this).find("option:checked").attr("data-nationalityCol"));

       $parentObj.find(".english-name1").val($(this).find("option:checked").attr("data-englishName1"));
        $parentObj.find(".english-name2").val($(this).find("option:checked").attr("data-englishName2"));

    }

});


$(".common-use").removeAttr("checked");





