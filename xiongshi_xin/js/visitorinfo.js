/**
 * Created by tuyao on 2017/12/21.
 */
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



$("#nextBtn").click(function()
{

    var verifyFlag=1;

    if($("#name").val()=="")
    {
        $("#name").addClass("form-error");
        $("#name").parent().next().addClass("form-error-active");
        verifyFlag=0;
    }
    else {
        $("#name").removeClass("form-error");
        $("#name").parent().next().removeClass("form-error-active");
    }

    var mobileCodeReg=/^[0-9]*$/;

    if($("#mobileCode").val()!="")
    {
        if(!mobileCodeReg.test($("#mobileCode").val()))
        {
            $("#mobileCode").addClass("form-error");
            $("#mobileCode").parent().next().text("國碼需要为数字");
            $("#mobileCode").parent().next().addClass("form-error-active");
            verifyFlag=0;
        }
        else {
            $("#mobileCode").removeClass("form-error");
            $("#mobileCode").parent().next().removeClass("form-error-active");
        }
    }


    var mobileReg=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

    if($("#mobile").val()=="")
    {
        $("#mobile").addClass("form-error");
        $("#mobile").parent().next().next().addClass("form-error-active");
        verifyFlag=0;
    }
    else if(!mobileReg.test($("#mobile").val()))
    {
        $("#mobile").addClass("form-error");
        $("#mobile").parent().next().next().text("請輸入正確的手機號碼");
        $("#mobile").parent().next().next().addClass("form-error-active");
        verifyFlag=0;
    }
    else {
        $("#mobile").removeClass("form-error");
        $("#mobile").parent().next().next().removeClass("form-error-active");
    }

    var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    if($("#email").val()=="")
    {
        $("#email").addClass("form-error");
        $("#email").parent().next().addClass("form-error-active");
        verifyFlag=0;
    }
    else if(!emailReg.test($("#email").val()))
    {
        $("#email").addClass("form-error");
        $("#email").parent().next().text("請輸入正確的E-mail");
        $("#email").parent().next().addClass("form-error-active");
        verifyFlag=0;
    }
    else {
        $("#email").removeClass("form-error");
        $("#email").parent().next().removeClass("form-error-active");
    }


    //校验白天和晚上电话和传真

    if($(".info-list").hasClass("active"))
    {
        if(($("#telephone1").val()!=""&&$("#telephone2").val()!=""&&$("#telephone3").val()!="")||($("#telephone4").val()!=""&&$("#telephone5").val()!=""))
        {

            $("#telephone1").parent().next().removeClass("form-error-active");
        }
        else {

            $("#telephone1").parent().next().text("白天和晚上聯絡電話必须填写一个完整的");
            $("#telephone1").parent().next().addClass("form-error-active");
            verifyFlag=0;
        }

        if(($("#telephone6").val()!=""&&$("#telephone7").val()=="")||($("#telephone6").val()==""&&$("#telephone7").val()!=""))
        {
            if($("#telephone6").val()=="")
            {
                $("#telephone6").addClass("form-error");
            }
            else {
                $("#telephone7").addClass("form-error");
            }
            $("#telephone7").parent().next().addClass("form-error-active");
            verifyFlag=0;
        }
        else {
            $("#telephone7").removeClass("form-error");
            $("#telephone6").removeClass("form-error");
            $("#telephone7").parent().next().removeClass("form-error-active");
        }
    }


    //旅客资料校验
    $(".zhongwen-name").each(function()
    {
        if($(this).val()!="")
        {
            var pattern = /^[\u4e00-\u9fa5]+$/;
            if(pattern.test($(this).val()))
            {
                $(this).removeClass("form-error");
                $(this).parent().next().removeClass("form-error-active");
            }
            else {
                $(this).addClass("form-error");
                $(this).parent().next().text("旅客中文姓名僅可輸入中文");
                $(this).parent().next().addClass("form-error-active");
                verifyFlag=0;
            }

        }

    });

    $(".nationality").each(function()
    {
        if($(this).val()=="")
        {
            $(this).addClass("form-error");
            $(this).parent().next().text("國籍必填");
            $(this).parent().next().addClass("form-error-active");
            verifyFlag=0;
        }
        else {
            $(this).removeClass("form-error");
            $(this).parent().next().removeClass("form-error-active");
        }
    });

    $(".calendar").each(function()
    {
        if($(this).val()=="")
        {
            $(this).addClass("form-error");
            $(this).parent().next().text("出生日期必填");
            $(this).parent().next().addClass("form-error-active");
            verifyFlag=0;
        }
        else {
            $(this).removeClass("form-error");
            $(this).parent().next().removeClass("form-error-active");
        }
    });


    $(".traveller-col").each(function()
    {

        if($(this).find(".zhongwen-name").val()==""&&($(this).find(".english-name1").val()==""||$(this).find(".english-name2").val()==""))
        {
            console.log($(this).find(".zhongwen-name"));
            $(this).find(".zhongwen-name").addClass("form-error");
            $(this).find(".zhongwen-name").parent().next().text("英文姓名兩者擇一必填");
            $(this).find(".zhongwen-name").parent().next().addClass("form-error-active");

            verifyFlag=0;

        }
        else {
            $(this).find(".zhongwen-name").removeClass("form-error");
            $(this).find(".zhongwen-name").parent().next().removeClass("form-error-active");
        }

    });



    if(verifyFlag==1)
    {
        clearLocalStorage();
        alert("請確認資料是否填寫齊全");
    }
    else {
        $("html,body").animate({scrollTop: ($($(".form-error-active")[0]).offset().top-80)}, 500);
    }


});

//英文姓名只能输入字母
$(".english-name1").on("input",function()
{

    var $obj=$(this);

    var reg = /^[a-z]+$/i;
    if(!reg.test($obj.val()))
    {
        $obj.val($obj.val().slice(0,($obj.val().length-1)));
    }
});

$(".english-name2").on("input",function()
{
    var $obj=$(this);
    var reg = /^[a-z]+$/i;
    if(!reg.test($obj.val()))
    {
        $obj.val($obj.val().slice(0,($obj.val().length-1)));
    }
});


//只能输入数字
$(".number-text").on("input",function()
{

    var $obj=$(this);

    var reg = /^[0-9]*$/;
    if(!reg.test($obj.val()))
    {
        $obj.val($obj.val().slice(0,($obj.val().length-1)));
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
    for(var i in localStorage) {//不使用过滤

        if(localStorage[i].indexOf("basicForm")>-1)
        {
            localStorage[i]="";
        }
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