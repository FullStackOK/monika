//右边工具栏操作

$("#shoucangList .silderitem .menu2").live("click",function()
{
    $(this).parent().remove();

    if($("#shoucangList .silderitem").length==0)
    {
        $("#shoucangListCol").hide();
        $("#shoucangList").append('<div class="right-no-data"><img src="images/add/browseNoRecord.png"><div>您尚未開始收藏產品</div></div>');
    }

});


$("#browseNoRecord .silderitem .menu2").live("click",function()
{
    $(this).parent().remove();

    if($("#browseNoRecord .silderitem").length==0)
    {
        $("#browseNoRecord").append('<div class="right-no-data"><img src="images/add/browseNoRecord.png"><div>您尚未開始瀏覽產品</div></div>');
    }

});



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
    $("#browseNoRecord").append('<div class="right-no-data"><img src="images/add/browseNoRecord.png"><div>您尚未開始瀏覽產品</div></div>');
}


