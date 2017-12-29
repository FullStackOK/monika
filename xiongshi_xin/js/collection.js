/**
 * Created by tuyao on 2017/12/28.
 */


var dataList=[
    {
        STFN_Code: 'AA0001',
        ID : 1,
        Description : '日本東京五日遊',
        Image : 'images/c2.png',
        AddTime : '2017/12/25',
        AdultPrice : 5000.0000,
        StudentPrice : 4000.0000,
        ElderPrice : 4000.0000,
        ChildPrice : 3000.0000,
        BabyPrice : 2000.0000,
        Price: 0
    },
    {
        STFN_Code: 'AA0001',
        ID : 2,
        Description : '台灣環島行1',
        Image : 'images/c2.png',
        AddTime : '2017/12/26',
        AdultPrice : 0,
        StudentPrice : 0,
        ElderPrice : 0,
        ChildPrice : 0,
        BabyPrice : 0,
        Price: 5000.0000
    },
    {
        STFN_Code: 'AA0001',
        ID : 3,
        Description : '台灣環島行2',
        Image : 'images/c2.png',
        AddTime : '2017/12/27',
        AdultPrice : 0,
        StudentPrice : 0,
        ElderPrice : 0,
        ChildPrice : 0,
        BabyPrice : 0,
        Price: 5000.0000
    },
    {
        STFN_Code: 'AA0001',
        ID : 4,
        Description : '台灣環島行3',
        Image : 'images/c2.png',
        AddTime : '2017/12/28',
        AdultPrice : 0,
        StudentPrice : 0,
        ElderPrice : 0,
        ChildPrice : 0,
        BabyPrice : 0,
        Price: 5000.0000
    },
    {
        STFN_Code: 'AA0001',
        ID : 5,
        Description : '台灣環島行4',
        Image : 'images/c2.png',
        AddTime : '2017/12/29',
        AdultPrice : 0,
        StudentPrice : 0,
        ElderPrice : 0,
        ChildPrice : 0,
        BabyPrice : 0,
        Price: 5000.0000
    },
    {
        STFN_Code: 'AA0001',
        ID : 6,
        Description : '台灣環島行5',
        Image : 'images/c2.png',
        AddTime : '2017/10/01',
        AdultPrice : 0,
        StudentPrice : 0,
        ElderPrice : 0,
        ChildPrice : 0,
        BabyPrice : 0,
        Price: 5000.0000
    },
    {
        STFN_Code: 'AA0001',
        ID : 7,
        Description : '台灣環島行6',
        Image : 'images/c2.png',
        AddTime : '2017/10/02',
        AdultPrice : 0,
        StudentPrice : 0,
        ElderPrice : 0,
        ChildPrice : 0,
        BabyPrice : 0,
        Price: 5000.0000
    },
    {
        STFN_Code: 'AA0001',
        ID : 8,
        Description : '台灣環島行7',
        Image : 'images/c2.png',
        AddTime : '2017/10/02',
        AdultPrice : 0,
        StudentPrice : 0,
        ElderPrice : 0,
        ChildPrice : 0,
        BabyPrice : 0,
        Price: 5000.0000
    },
    {
        STFN_Code: 'AA0001',
        ID : 9,
        Description : '台灣環島8行',
        Image : 'images/c2.png',
        AddTime : '2017/10/02',
        AdultPrice : 0,
        StudentPrice : 0,
        ElderPrice : 0,
        ChildPrice : 0,
        BabyPrice : 0,
        Price: 5000.0000
    },
    {
        STFN_Code: 'AA0001',
        ID : 10,
        Description : '台灣環島9行',
        Image : 'images/c2.png',
        AddTime : '2017/10/02',
        AdultPrice : 0,
        StudentPrice : 0,
        ElderPrice : 0,
        ChildPrice : 0,
        BabyPrice : 0,
        Price: 5000.0000
    },
    {
        STFN_Code: 'AA0001',
        ID : 11,
        Description : '台灣環島行10',
        Image : 'images/c2.png',
        AddTime : '2017/12/24',
        AdultPrice : 1000,
        StudentPrice : 0,
        ElderPrice : 0,
        ChildPrice : 0,
        BabyPrice : 0,
        Price: 5000.0000
    },
    {
        STFN_Code: 'AA0001',
        ID : 12,
        Description : '台灣環島行11',
        Image : 'images/c2.png',
        AddTime : '2017/09/24',
        AdultPrice : 0,
        StudentPrice : 0,
        ElderPrice : 0,
        ChildPrice : 0,
        BabyPrice : 0,
        Price: 5000.0000
    }
];


dataList.sort(function(a,b){
    return parseInt(b.AddTime.split("/").join(""))- parseInt(a.AddTime.split("/").join(""));
});

console.log(dataList);


var pageSize=1; //每页显示1条记录

var initPagination = function() {
    var num_entries =dataList.length ;

    $("#allCount").text(num_entries);

    // 创建分页
    $("#pageCol").pagination(num_entries, {
        num_edge_entries: 1, //边缘页数
        num_display_entries: 5, //主体页数
        callback: pageselectCallback,
        items_per_page: pageSize,
        prev_text: "&nbsp;",
        next_text: "下一頁"
    });

};

initPagination();

function pageselectCallback(page_index, jq){


    $("#pageAll").text(Math.ceil(dataList.length/pageSize));
    $("#pageNow").text(page_index+1);

    var startPage=pageSize*page_index;
    var endPage=pageSize*(page_index+1);

    if(endPage>=dataList.length)
        endPage=dataList.length;

    var html="";
    for(var i=startPage;i<endPage;i++)
    {
        html=html+'<div class="grid-item">'+
            '<div class="item">'+
            '<div class="menu" data-id="'+dataList[i].ID+'">'+
            '<span></span>'+
            '<span></span>'+
            '</div>'+
            '<div class="item_img" style="background-image: url('+dataList[i].Image+');">'+
            '<div class="btn1"><img src="images/icon26.png"/></div>'+
            '</div>'+
            '<div class="item_date">收藏日期：'+dataList[i].AddTime+'</div>'+
            ' <div class="item_title">'+dataList[i].Description+'</div>'+
            '<div class="item_ct">'+
            '<div class="item_price">$'+dataList[i].AdultPrice+'</div>'+
            '<div class="item_btn"><input style="width:20px;height:20px;vertical-align:text-top;background:#fff;" type="checkbox" name="sSts" value="1" > 加入比較</div>'+
            '<div class="clearboth"></div>'+
            '</div>'+
            '</div>'+
            '</div>';

    }
    $("#gridCol").empty();
    $("#gridCol").append(html);



}


$("#pageCount").change(function()
{
    pageSize=$(this).val();
    $("#pageCol").empty();
    initPagination();
});


//排序
$("#sortCol").change(function()
{

    if($(this).val()=="0")
    {
        dataList.sort(function(a,b){
            return parseInt(b.AddTime.split("/").join(""))- parseInt(a.AddTime.split("/").join(""));
        });
    }
    else if($(this).val()=="1")
    {
        dataList.sort(function(a,b){
            return a.AdultPrice- b.AdultPrice;
        });
    }
    else
    {
        dataList.sort(function(a,b){
            return b.AdultPrice- a.AdultPrice;
        });
    }

    console.log(dataList);

    $("#pageCol").empty();
    initPagination();


});



//删除
$("#gridCol").on("click",".menu",function()
{


    var dataId=$(this).attr("data-id");
    var indexValue=parseInt(dataId)-1;

    console.log(dataId)

    var r=confirm("是否移除收藏？")
    if (r==true)
    {
        $(this).parent().parent().remove();
    }

    dataList.splice(indexValue,1);

    $("#pageCol").empty();
    initPagination();


});














