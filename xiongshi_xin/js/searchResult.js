//日期格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

var dataList=[
    {
        ID : 1,
        Description : '日本東京五日遊',
        B2CMaxPrice : 30000.0000,
        AdultPrice : 3080.0000,
        StudentPrice : 4000.0000,
        ChildPrice : 3000.0000,
        ElderPrice : 4000.0000,
        BabyPrice : 2000.0000,
        Image : 'images/pic01.png',
        Country : ["JP","KR"],
        City : [["OSA","TYO","KYO"],["SEL","CJU"]],
        ClassA : '0,1,2,3,5,7,9',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 80,
        ShowDate : '2017/10/01',
        SaleStart : '2017/12/05',
        Recommend : 'true',
        ProductBuyCount : '10',
        HaveProduct : 'true'
    },
    {
        ID : 2,
        Description : '韓國濟州島',
        B2CMaxPrice : 34567.0000,
        AdultPrice : 4600.0000,
        StudentPrice : 2000.0000,
        ChildPrice : 1000.0000,
        ElderPrice : 2000.0000,
        BabyPrice : 500.0000,
        Image : 'images/pic01.png',
        Country : ["JP","KR"],
        City : [["OSA","TYO","KYO"],["SEL","CJU"]],
        ClassA : '0,1,2,3,6,8,10',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/10/05',
        SaleStart : '2017/10/08',
        Recommend : 'false',
        ProductBuyCount : '0',
        HaveProduct : 'true'
    },
    {
        ID : 3,
        Description : '台灣輕旅行',
        B2CMaxPrice : 15000.0000,
        AdultPrice : 3000.0000,
        StudentPrice :2500.0000,
        ChildPrice : 1500.0000,
        ElderPrice : 2500.0000,
        BabyPrice : 1000.0000,
        Image : 'images/pic01.png',
        Country : ["TW"],
       City : [["TPE","TCH","KHH"]],
        ClassA : '2,4,6,8,12',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/12/03',
        SaleStart : '2017/12/17',
        Recommend : 'false',
        ProductBuyCount : '20',
        HaveProduct : 'false'
    },
    {
        ID : 4,
        Description : '台灣輕旅行1',
        B2CMaxPrice : 15000.0000,
        AdultPrice : 3000.0000,
        StudentPrice :2500.0000,
        ChildPrice : 1500.0000,
        ElderPrice : 2500.0000,
        BabyPrice : 1000.0000,
        Image : 'images/pic01.png',
        Country : ["TW"],
       City : [["TPE","TCH","KHH"]],
        ClassA : '2,4,6,8,12',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/10/03',
        SaleStart : '2017/12/17',
        Recommend : 'false',
        ProductBuyCount : '20',
        HaveProduct : 'false'
    },
    {
        ID : 5,
        Description : '台灣輕旅行1',
        B2CMaxPrice : 15000.0000,
        AdultPrice : 4200.0000,
        StudentPrice :2500.0000,
        ChildPrice : 1500.0000,
        ElderPrice : 2500.0000,
        BabyPrice : 1000.0000,
        Image : 'images/pic01.png',
        Country : ["TW"],
       City : [["TPE","TCH","KHH"]],
        ClassA : '2,4,6,8,12',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/10/03',
        SaleStart : '2017/12/17',
        Recommend : 'false',
        ProductBuyCount : '20',
        HaveProduct : 'false'
    },
    {
        ID : 6,
        Description : '台灣輕旅行1',
        B2CMaxPrice : 15000.0000,
        AdultPrice : 5000.0000,
        StudentPrice :2500.0000,
        ChildPrice : 1500.0000,
        ElderPrice : 2500.0000,
        BabyPrice : 1000.0000,
        Image : 'images/pic01.png',
        Country : ["TW"],
       City : [["TPE","TCH","KHH"]],
        ClassA : '2,4,6,8,12',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/10/03',
        SaleStart : '2017/12/17',
        Recommend : 'false',
        ProductBuyCount : '20',
        HaveProduct : 'false'
    },
    {
        ID : 7,
        Description : '台灣輕旅行1',
        B2CMaxPrice : 15000.0000,
        AdultPrice : 6000.0000,
        StudentPrice :2500.0000,
        ChildPrice : 1500.0000,
        ElderPrice : 2500.0000,
        BabyPrice : 1000.0000,
        Image : 'images/pic01.png',
        Country : ["TW"],
       City : [["TPE","TCH","KHH"]],
        ClassA : '2,4,6,8,12',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/10/03',
        SaleStart : '2017/12/17',
        Recommend : 'false',
        ProductBuyCount : '20',
        HaveProduct : 'false'
    },
    {
        ID : 8,
        Description : '台灣輕旅行1',
        B2CMaxPrice : 15000.0000,
        AdultPrice : 3000.0000,
        StudentPrice :2500.0000,
        ChildPrice : 1500.0000,
        ElderPrice : 2500.0000,
        BabyPrice : 1000.0000,
        Image : 'images/pic01.png',
        Country : ["TW"],
       City : [["TPE","TCH","KHH"]],
        ClassA : '2,4,6,8,12',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/10/03',
        SaleStart : '2017/12/17',
        Recommend : 'false',
        ProductBuyCount : '20',
        HaveProduct : 'false'
    },
    {
        ID : 9,
        Description : '台灣輕旅行1',
        B2CMaxPrice : 15000.0000,
        AdultPrice : 3000.0000,
        StudentPrice :2500.0000,
        ChildPrice : 1500.0000,
        ElderPrice : 2500.0000,
        BabyPrice : 1000.0000,
        Image : 'images/pic01.png',
        Country : ["TW"],
       City : [["TPE","TCH","KHH"]],
        ClassA : '2,4,6,8,12',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/10/03',
        SaleStart : '2017/12/17',
        Recommend : 'false',
        ProductBuyCount : '20',
        HaveProduct : 'false'
    },
    {
        ID : 10,
        Description : '台灣輕旅行1',
        B2CMaxPrice : 15000.0000,
        AdultPrice : 3000.0000,
        StudentPrice :2500.0000,
        ChildPrice : 1500.0000,
        ElderPrice : 2500.0000,
        BabyPrice : 1000.0000,
        Image : 'images/pic01.png',
        Country : ["TW"],
       City : [["TPE","TCH","KHH"]],
        ClassA : '2,4,6,8,12',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/10/03',
        SaleStart : '2017/12/17',
        Recommend : 'false',
        ProductBuyCount : '20',
        HaveProduct : 'false'
    },
    {
        ID : 11,
        Description : '台灣輕旅行1',
        B2CMaxPrice : 15000.0000,
        AdultPrice : 3000.0000,
        StudentPrice :2500.0000,
        ChildPrice : 1500.0000,
        ElderPrice : 2500.0000,
        BabyPrice : 1000.0000,
        Image : 'images/pic01.png',
        Country : ["TW"],
        City : [["TPE","TCH","KHH"]],
        ClassA : '2,4,6,8,12',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/10/03',
        SaleStart : '2017/12/17',
        Recommend : 'false',
        ProductBuyCount : '20',
        HaveProduct : 'false'
    },
    {
        ID : 12,
        Description : '台灣輕旅行1',
        B2CMaxPrice : 15000.0000,
        AdultPrice : 3000.0000,
        StudentPrice :2500.0000,
        ChildPrice : 1500.0000,
        ElderPrice : 2500.0000,
        BabyPrice : 1000.0000,
        Image : 'images/pic01.png',
        Country : ["TW"],
        City : [["TPE","TCH","KHH"]],
        ClassA : '2,4,6,8,12',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/10/03',
        SaleStart : '2017/12/17',
        Recommend : 'false',
        ProductBuyCount : '20',
        HaveProduct : 'false'
    },
    {
        ID : 13,
        Description : '台灣輕旅行1',
        B2CMaxPrice : 15000.0000,
        AdultPrice : 3000.0000,
        StudentPrice :2500.0000,
        ChildPrice : 1500.0000,
        ElderPrice : 2500.0000,
        BabyPrice : 1000.0000,
        Image : 'images/pic01.png',
        Country : ["TW"],
        City : [["TPE","TCH","KHH"]],
        ClassA : '2,4,6,8,12',
        ClassB : [[1,2,5],[1,2,3]],
        TravelTime : 60,
        ShowDate : '2017/10/03',
        SaleStart : '2017/12/17',
        Recommend : 'false',
        ProductBuyCount : '20',
        HaveProduct : 'false'
    }

];

var cityList=[];
var cityArray=[];


//获取搜索结果里面的城市列表和自动分价格范围
var priceColList=[];
for(var i=0;i<dataList.length;i++)
{
    var proCityList=[];
    for(var j=0;j<dataList[i].Country.length;j++)
    {

        for(var h=0;h<dataList[i].City[j].length;h++)
        {

            var cityObj={};
            if(!(cityList.indexOf(dataList[i].City[j][h])>-1))
            {
                cityObj.code=dataList[i].City[j][h];
                console.log(dataList[i].City);
                cityObj.name=CityArr["_"+dataList[i].Country[j]]["_"+dataList[i].City[j][h]];
                cityList.push(dataList[i].City[j][h]);
                cityArray.push(cityObj);
            }

            proCityList.push(dataList[i].City[j][h]);


        }



    }

    priceColList.push(dataList[i].AdultPrice);

    dataList[i].CityList=proCityList;

}



var maxPriceValue=Math.max.apply(null, priceColList);
var minPriceValue=Math.min.apply(null, priceColList);

console.log(maxPriceValue-minPriceValue);

var xValue=Math.round((maxPriceValue-minPriceValue)/1000)*1000;

console.log(xValue);

var cityColHtml="";
for(var i=0;i<cityArray.length;i++)
{
    cityColHtml=cityColHtml+'<div class="col-xs-12 col-sm-12 col-md-12" style="margin-top:2px;margin-bottom:2px;"><input data-type="1" style="vertical-align:middle;margin-bottom:3px;margin-right:5px;" type="checkbox" name="sSts" value="'+cityArray[i].code+'"  ><label style="font-size:14px;">'+cityArray[i].name+'</label> </div>';
}

$("#cityCol").append(cityColHtml);






//价格json
var priceList=[
    {
        id:1,
        priceText:(parseInt(xValue-1))+"以下",
        count:0
    },
    {
        id:2,
        priceText:xValue+"~"+(parseInt(xValue+999)),
        count:0
    },
    {
        id:3,
        priceText:(parseInt(xValue+1000))+"~"+(parseInt(xValue+1999)),
        count:0
    },
    {
        id:4,
        priceText:(parseInt(xValue+2000))+"~"+(parseInt(xValue+2999)),
        count:0
    },
    {
        id:5,
        priceText:(parseInt(xValue+3000))+"~"+(parseInt(xValue+3999)),
        count:0
    }
]


for(var i=0;i<dataList.length;i++)
{

    //计算是否是新品
    var stringTime = dataList[i].SaleStart+" 00:00:00";
    var dayCha =(new Date().getTime()- Date.parse(new Date(stringTime)))/(1000*3600*24);


    var time1 = new Date().Format("yyyy/MM/dd");

   if(time1>=dataList[i].ShowDate&&time1<=dataList[i].SaleStart)
   {
       dataList[i].isPrev=1;
   }
    else {
       dataList[i].isPrev=0;
   }

    if(0<=dayCha&&dayCha<=14)
    {
        dataList[i].isNew=1;
    }
    else {
        dataList[i].isNew=0;
    }

    //判断属于那个活动时间段
    if(dataList[i].TravelTime<=4)
    {
        dataList[i].timeType=1;
    }
    else if(dataList[i].TravelTime<=8&&dataList[i].TravelTime>=5)
    {
        dataList[i].timeType=2;
    }
    else if(dataList[i].TravelTime<=24&&dataList[i].TravelTime>=9)
    {
        dataList[i].timeType=31;
    }
    else if(dataList[i].TravelTime==48)
    {
        dataList[i].timeType=4;
    }
    else if(dataList[i].TravelTime>72)
    {
        dataList[i].timeType=5;
    }
    else {
        dataList[i].timeType=0;
    }


    dataList[i].ClassBStr=[];
    for(var k=0;k<dataList[i].ClassB.length;k++)
    {
        for(var n=0;n<dataList[i].ClassB[k].length;n++)
        {
            dataList[i].ClassBStr.push(dataList[i].ClassA.split(",")[k]+"-"+dataList[i].ClassB[k][n]);
        }
    }



    if(dataList[i].AdultPrice<=parseInt(xValue-1))
    {
        priceList[0].count=priceList[0].count+1;
        dataList[i].price_type=1;
    }
    else if((dataList[i].AdultPrice<=parseInt(xValue+999))&&(dataList[i].AdultPrice>=xValue))
    {
        priceList[1].count=priceList[1].count+1;
        dataList[i].price_type=2;
    }
    else if((dataList[i].AdultPrice<=parseInt(xValue+1999))&&(dataList[i].AdultPrice>=parseInt(xValue+1000)))
    {
        priceList[2].count=priceList[2].count+1;
        dataList[i].price_type=3;
    }
    else if((dataList[i].AdultPrice<=parseInt(xValue+2999))&&(dataList[i].AdultPrice>=parseInt(xValue+2000)))
    {
        priceList[3].count=priceList[3].count+1;
        dataList[i].price_type=4;
    }
    else if((dataList[i].AdultPrice<=parseInt(xValue+3999))&&(dataList[i].AdultPrice>=parseInt(xValue+3000)))
    {
        priceList[4].count=priceList[4].count+1;
        dataList[i].price_type=5;
    }

}

console.log(priceList);

var pirceColHtml="";
for(var i=0;i<priceList.length;i++)
{

    if(priceList[i].count==0)
    {
        pirceColHtml=pirceColHtml+'<div class="col-xs-24 col-sm-24 col-md-24" style="margin-top:2px;margin-bottom:2px;"><input data-type="4"  style="vertical-align:middle;margin-bottom:3px;margin-right:5px;" disabled type="checkbox" name="sSts"  value="'+priceList[i].id+'"><label style="font-size:14px;color:#999;">'+priceList[i].priceText+'('+priceList[i].count+')</label></div>';
    }
    else {
        pirceColHtml=pirceColHtml+'<div class="col-xs-24 col-sm-24 col-md-24" style="margin-top:2px;margin-bottom:2px;"><input data-type="4"  style="vertical-align:middle;margin-bottom:3px;margin-right:5px;" type="checkbox" name="sSts"  value="'+priceList[i].id+'"><label style="font-size:14px;">'+priceList[i].priceText+'('+priceList[i].count+')</label></div>';
    }


}

$("#pirceCol").append(pirceColHtml);



//种类
var categoryList=[
    {
        name:'遊程',
        id:'0',
        list:[
            {id:1,name:'半日遊',p_id:0},
            {id:2,name:'一日遊',p_id:0},
            {id:3,name:'多日遊',p_id:0},
            {id:4,name:'私人導遊',p_id:0}
        ]
    },
    {
        name:'租車/包車',
        id:'1',
        list:[
            {id:5,name:'一般客車',p_id:1},
            {id:6,name:'摩托車',p_id:1},
            {id:7,name:'露營車',p_id:1},
            {id:8,name:'包車旅遊',p_id:1}
        ]
    },
    {
        name:'交通票卡',
        id:'2',
        list:[
            {id:9,name:'觀光護照',p_id:2},
            {id:10,name:'觀光巴士',p_id:2},
            {id:11,name:'JR',p_id:2},
            {id:12,name:'歐鐵',p_id:2},
            {id:13,name:'台灣好行/好玩卡',p_id:2}
        ]
    },
    {
        name:'體驗活動',
        id:'3',
        list:[
            {id:14,name:'特色體驗',p_id:3},
            {id:15,name:'手作工藝',p_id:3},
            {id:16,name:'參觀工廠',p_id:3},
            {id:17,name:'課程教室',p_id:3}
        ]
    },
    {
        name:'美食餐廳',
        id:'4',
        list:[
            {id:18,name:'美食饗宴',p_id:4},
            {id:19,name:'品酒之旅',p_id:4},
            {id:20,name:'米其林',p_id:4},
            {id:21,name:'飯店餐券',p_id:4},
            {id:69,name:'頂級餐廳',p_id:4},
            {id:70,name:'飲料甜點',p_id:4},
            {id:71,name:'早午餐',p_id:4},
            {id:72,name:'肉食主義',p_id:4},
            {id:73,name:'中式',p_id:4},
            {id:74,name:'異國',p_id:4},
            {id:75,name:'西式',p_id:4},
            {id:76,name:'日式',p_id:4},
            {id:77,name:'火鍋',p_id:4},
            {id:78,name:'燒烤',p_id:4},
            {id:79,name:'五星美饌',p_id:4},

            {id:80,name:'品牌連鎖',p_id:4},
            {id:81,name:'食店美食',p_id:4},
            {id:82,name:'聚餐首選',p_id:4},
            {id:83,name:'主題餐廳',p_id:4},
            {id:84,name:'吃到飽',p_id:4},
            {id:85,name:'養生蔬食',p_id:4},
            {id:86,name:'輕食下午茶',p_id:4},
        ]
    },
    {
        name:'電影/文化展演',
        id:'5',
        list:[
            {id:29,name:'特色文化',p_id:5},
            {id:30,name:'遺跡/建築',p_id:5},
            {id:31,name:'戲劇',p_id:5},
            {id:32,name:'音樂',p_id:5},
            {id:33,name:'表演',p_id:5},
            {id:34,name:'美術',p_id:5},
            {id:35,name:'博物館',p_id:5},
            {id:36,name:'宗教巡禮',p_id:5},
            {id:37,name:'慶典',p_id:5},
            {id:38,name:'觀賞競賽',p_id:5},
            {id:88,name:'電影',p_id:5},
            {id:90,name:'展覽',p_id:5},
        ]
    },
    {
        name:'接送服務',
        id:'6',
        list:[
            {id:22,name:'機場接送',p_id:6},
            {id:23,name:'點對點接送',p_id:6},
            {id:24,name:'渡輪接送',p_id:6}
        ]
    },
    {
        name:'SPA&溫泉',
        id:'7',
        list:[
            {id:25,name:'溫泉泡湯',p_id:7},
            {id:26,name:'SPA按摩',p_id:7},
            {id:27,name:'桑拿',p_id:7}
        ]
    },
    {
        name:'景區/樂園',
        id:'8',
        list:[
            {id:28,name:'水族館',p_id:8},
            {id:87,name:'樂園',p_id:8},
            {id:39,name:'動物園',p_id:8},
            {id:40,name:'主題樂園',p_id:8},
            {id:41,name:'景點門票',p_id:8},
            {id:42,name:'農場/莊園',p_id:8}
        ]
    }
]


var categoryHtml="";
var childCategoryHtml="";
for(var i=0;i<categoryList.length;i++)
{
    categoryHtml=categoryHtml+'<div class="col-xs-12 col-sm-12 col-md-12" style="margin-top:2px;margin-bottom:2px;"><input data-type="2" style="vertical-align:middle;margin-bottom:3px;margin-right:5px;" type="checkbox" name="sSts" value="'+categoryList[i].id+'" ><label style="font-size:14px;">'+categoryList[i].name+'</label></div>';


    childCategoryHtml=childCategoryHtml+'<li style="display: none;"><div style="margin:5px 0;" class="open-list"><img src="images/icon06.png"/><span style="vertical-align:middle;margin-left:8px;font-size:16px;font-weight:bold;">'+categoryList[i].name+'</span></div><div style="margin-top:5px;margin-left:-5px;margin-right:-5px;" class="clearfix child-list-col">';

    for(var j=0;j<categoryList[i].list.length;j++)
    {
        childCategoryHtml=childCategoryHtml+'<div class="col-xs-12 col-sm-12 col-md-12" style="margin-top:2px;margin-bottom:2px;"><input data-type="3" style="vertical-align:middle;margin-bottom:3px;margin-right:5px;" type="checkbox" name="sSts" value="'+categoryList[i].id+'-'+categoryList[i].list[j].id+'" ><label style="font-size:14px;">'+categoryList[i].list[j].name+'</label></div>';
    }

    childCategoryHtml=childCategoryHtml+"</div></li>"

}
$("#zhonglei").append(categoryHtml);
$(".child-type-list").append(childCategoryHtml);
var dataListPrev=dataList;



$("#zhonglei input").click(function()
{


    $(".child-type-list li").hide();
    $("#zhonglei input:checked").each(function()
    {
        var indexValue=$("#zhonglei>div").index($(this).parent());
        $(".child-type-list li").eq(indexValue).show();

    });

    checkboxSelect();


});


var pageSize=2; //每页显示4条记录
$(".textfield3").val(pageSize);

//此demo通过Ajax加载分页元素
var initPagination = function() {
    var num_entries =dataList.length ;

    // 创建分页
    $("#Pagination").pagination(num_entries, {
        num_edge_entries: 1, //边缘页数
        num_display_entries: 5, //主体页数
        callback: pageselectCallback,
        items_per_page: pageSize,
        prev_text: "&nbsp;",
        next_text: "下一頁"
    });

};

var initPagination1 = function() {
    var num_entries =dataList.length ;

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

initPagination1();
initPagination();



function pageselectCallback(page_index, jq){

    console.log($(jq).attr("id"));

    $("#allCount").text(dataList.length);
    $("#pageAll").text(Math.ceil(dataList.length/pageSize));
    $("#pageNow").text(page_index+1);

    var startPage=pageSize*page_index;
    var endPage=pageSize*(page_index+1);

    if(endPage>=dataList.length)
        endPage=dataList.length;

    var html="";
    for(var i=startPage;i<endPage;i++)
    {

        var priceHtml='大人 <font style="font-size:20px;color:#e10500;">$'+dataList[i].AdultPrice+'</font> 起';

        var tuijianHtml="";

        if(dataList[i].Recommend=='true')
        {
            tuijianHtml='<div style="position:absolute;top:0;left:0;z-index:2;" class="triangle3"></div><div style="position:absolute;top:2px;left:2px;z-index:3;color:#fff;font-size:14px;">精選</div>';

        }

        if(dataList[i].ChildPrice) priceHtml=priceHtml+'/孩童 <font style="font-size:20px;color:#e10500;">$'+dataList[i].ChildPrice+'</font> 起';


        var newHtml="";
        if(dataList[i].isNew==1)
        {
            newHtml='<div style="float:left;background:#24a07d;color:#fff;padding:1px 8px;margin-top:3px;font-size:14px;margin-top:5px;">新品<span class="hidden">上架</span></div>';
        }

        if(dataList[i].isPrev==1)
        {
            newHtml=newHtml+'<div style="float:left;background:#24a07d;color:#fff;padding:1px 8px;margin-top:3px;font-size:14px;margin-top:5px;">搶先<span class="hidden">預告</span></div>';
        }

        var cityListCol="";
        for(var k=0;k<dataList[i].Country.length;k++)
        {
            for(var n=0;n<dataList[i].City.length;n++)
            {
                cityListCol=cityListCol+","+CityArr["_"+dataList[i].Country[k]]["_"+dataList[i].City[k][n]];
            }

        }

        cityListCol=cityListCol.substr(1,cityListCol.length);


        html=html+'<div class="col-xs-24 col-sm-24 col-md-12 boxlist2" style="margin-bottom:20px;">'+
            '<a style="text-decoration:none;" href="product.html">'+
            '<div class="view view-first" style="box-shadow:0px 5px 8px rgba(0,0,0,0.2);">'+
            '<img style="width:100%;" src="'+dataList[i].Image+'">'+
            '<div class="itext">'+
            '<div class="ititle display" style="background:#fff;padding:10px 10px 0 10px;">'+
            '<div class="pl"><img src="images/icon28.png"><span style="vertical-align:middle;color:#666666;margin-left:5px;">'+cityListCol+'</span>'+
            '</div>'+
            '<div class="pr display">'+
            '<div class="collection">'+
            '<input id="option01" type="checkbox" name="field" value="option">'+
            '<label for="option01"></label>'+
            '</div>'+
            '</div>'+
            '<div class="clearboth"></div>'+
            '</div>'+
            '<div class="ibox2">'+
            '<div class="iboxtitle" style="font-weight:bold;">'+dataList[i].Description+
            '</div>'+
            '<div style="margin-top:10px;">'+newHtml+
            '<div style="float:right;font-size:14px;">'+priceHtml+'</div>'+
            '</div>'+
            '<div style="clear:both;"></div>'+
            '</div>'+
            '</div>'+
            '<div class="mask hidden">'+
            '<div style="padding:10% 20px;text-align:center;color:#000;">'+
            '<div class="collection">'+
            '<input id="option05" type="checkbox" name="field" value="option">'+
            '<label for="option05"><div class="collectionbt">收藏</div></label>'+
            '</div>'+
            '<p style="font-size:16px;font-weight:bold">【探索魔幻極光】黃刀鎮魔幻極光三日～璀燦天空之舞共四十個字共四十個字共四十個字共</p>'+
            '</div>'+
            '</div>'+tuijianHtml+
            '</div>'+
            '</a>'+
            '</div>';
    }
    $("#searchList").empty();
    $("#searchList").append(html);

    if($(jq).attr("id")=="pageCol")
    {
        $("#pageCol .next").click(function(e)
        {
            $("#Pagination .next")[0].click();
        });
        $("#pageCol .prev").click(function(e)
        {
            $("#Pagination .prev")[0].click();
        });
    }



    return false;
}




//城市选择
$("#cityCol input[type=checkbox]").click(function()
{
    checkboxSelect();

});

//价格筛选
$("#pirceCol input[type=checkbox]").click(function()
{
    checkboxSelect();

});



$(".child-type-list input").click(function()
{
    checkboxSelect();
});


$("#timeCol input[type=checkbox]").click(function()
{

    checkboxSelect();

});
$("#xinpinCol input[type=checkbox]").click(function()
{

    checkboxSelect();

});

Array.ExistsSameValues = function(a1, a2) {
    var exists = false;
    if(a1 instanceof Array && a2 instanceof Array)
    {
        for (var i=0,iLen=a1.length; i<iLen; i++)
        {
            for (var j=0,jLen=a2.length; j<jLen; j++)
            {
                if (a1[i]===a2[j])
                {
                    return true;
                }
            }
        }
    }
    return exists;
};


function checkboxSelect()
{

    var dataListTemp=[];
    var dataListTempArray=[];
    if($("#checkboxCol input[type=checkbox]:checked").length>0)
    {


        var typeStr1="";
        var typeStr2="";
        var typeStr3="";
        var typeStr4="";
        var typeStr5="";
        var typeStr6="";

        $("#checkboxCol input[type=checkbox]:checked").each(function()
        {
            var typeValue=$(this).attr("data-type");
            if(typeValue==1)
            {
                typeStr1=typeStr1+"#"+$(this).val()
            }
            else if(typeValue==2)
            {
                typeStr2=typeStr2+"#"+$(this).val();
            }
            else if(typeValue==3)
            {
                typeStr3=typeStr3+"#"+$(this).val();
            }
            else if(typeValue==4)
            {
                typeStr4=typeStr4+"#"+$(this).val();
            }
            else if(typeValue==5)
            {
                typeStr5=typeStr5+"#"+$(this).val();
            }
            else if(typeValue==6)
            {
                typeStr6=typeStr6+"#"+$(this).val();
            }


        });


        var cityValue=$(this).next().text().trim();
        console.log(typeStr5);
        for(var i=0;i<dataListPrev.length;i++)
        {



            if(
                (typeStr1==""?1:Array.ExistsSameValues(dataListPrev[i].CityList, typeStr1.split("#")))&&
                (typeStr6==""? 1:($.inArray(dataListPrev[i].isNew.toString(),typeStr6.split("#"))>-1))&&
                (typeStr5==""? 1:($.inArray(dataListPrev[i].timeType.toString(),typeStr5.split("#"))>-1))&&
                (typeStr4==""? 1:($.inArray(dataListPrev[i].price_type.toString(),typeStr4.split("#"))>-1))&&
                (typeStr3==""? 1:Array.ExistsSameValues(dataListPrev[i].ClassBStr, typeStr3.split("#")))&&
                (typeStr2==""? 1:Array.ExistsSameValues(dataListPrev[i].ClassA.split(","), typeStr2.split("#")))

              )
            {

                console.log($.inArray(dataListPrev[i].ID,dataListTempArray));
                if(!($.inArray(dataListPrev[i].ID,dataListTempArray)>-1))
                {
                    console.log(typeStr1.split("#"));
                    dataListTemp.push(dataListPrev[i]);
                    dataListTempArray.push(dataListPrev[i].ID);
                }

            }
        }








        dataList=dataListTemp;
    }
    else {
        dataList=dataListPrev;
    }

    console.log(JSON.stringify(dataList));

    $(".pagination").empty();
    initPagination1();
    initPagination();


}



$("#qingkong").click(function()
{

    $("#checkboxCol input[type=checkbox]").removeAttr("checked");

    dataList=dataListPrev;

    $(".pagination").empty();
    initPagination1();
    initPagination();


});

$("#select7").change(function()
{

    if($(this).val().trim()==1)
    {
        dataList.sort(function(a,b){
            return a.AdultPrice- b.AdultPrice;
        });
    }
    else if($(this).val().trim()==2)
    {
        dataList.sort(function(a,b){
            return b.AdultPrice- a.AdultPrice;
        });
    }
    else if($(this).val().trim()==3)
    {
        dataList.sort(function(a,b){
            return a.ProductBuyCount- b.ProductBuyCount;
        });
    }
    else {
        dataList.sort(function(a,b){
            return b.ProductBuyCount- a.ProductBuyCount;
        });
    }

    console.log(dataList);

    $(".pagination").empty();
    initPagination1();
    initPagination();




});





//每页显示多少条记录
function isPositiveInteger(s){//是否为正整数
    var re = /^[0-9]+$/ ;
    return re.test(s)
}
$(".textfield3").on("input",function()
{

    var inputValue=parseInt($(this).val());
    console.log(inputValue);
    if(inputValue&&inputValue!=0)
    {
        pageSize=$(this).val();
        $(".pagination").empty();
        initPagination1();
        initPagination();


    }

});




//加载更多
$(".load-more").click(function()
{
    var htmlCol='<div class="col-xs-24 col-sm-24 col-md-12 boxlist2" style="margin-bottom:20px;"><a style="text-decoration:none;" href="product.html"><div class="view view-first" style="box-shadow:0px 5px 8px rgba(0,0,0,0.2);"><img style="width:100%;" src="images/pic01.png"><div class="itext"><div class="ititle display" style="background:#fff;padding:10px 10px 0 10px;"><div class="pl"><img src="images/icon28.png"><span style="vertical-align:middle;color:#666666;margin-left:5px;">加拿大,京士頓,渥太華...</span></div><div class="pr display"><div class="collection"><input id="option01" type="checkbox" name="field" value="option"><label for="option01"></label></div></div><div class="clearboth"></div></div><div class="ibox2"><div class="iboxtitle" style="font-weight:bold;">【探索魔幻極光】2</div><div style="margin-top:10px;"><div style="float:left;background:#24a07d;color:#fff;padding:1px 8px;margin-top:3px;font-size:14px;margin-top:5px;">新品<span class="hidden">上架</span></div><div style="float:right;font-size:14px;">大人 <font style="font-size:20px;color:#e10500;">$15,888</font> 起/孩童 <font style="font-size:20px;color:#e10500;">$1,888</font> 起</div></div><div style="clear:both;"></div></div></div><div class="mask hidden"><div style="padding:10% 20px;text-align:center;color:#000;"><div class="collection"><input id="option05" type="checkbox" name="field" value="option"><label for="option05"><div class="collectionbt">收藏</div></label></div><p style="font-size:16px;font-weight:bold">【探索魔幻極光】黃刀鎮魔幻極光三日～璀燦天空之舞共四十個字共四十個字共四十個字共</p></div></div><div style="position:absolute;top:0;left:0;z-index:2;" class="triangle3"></div><div style="position:absolute;top:2px;left:2px;z-index:3;color:#fff;font-size:14px;">精選</div></div></a></div>';
    $("#searchList").append(htmlCol);
});


$(".open-list").click(function()
{

    $(this).next().toggle();

});


var Data1=[
    {"11":"美國(US)-紐約-NEW YORK(NYC)-拉瓜地拉瓜地拉-LGLGA NEWYORK(LGA)"},
    {"12":"美國(US)-紐約-NEW YORK(NYC)-拉瓜地拉瓜地拉-LGLGA NEWYORK(LGA)"},
    {"11":"美國(US)-紐約-NEW YORK(NYC)-拉瓜地拉瓜地拉-LGLGA NEWYORK(LGA)"},
    {"12":"美國(US)-紐約-NEW YORK(NYC)-拉瓜地拉瓜地拉-LGLGA NEWYORK(LGA)"},
];


