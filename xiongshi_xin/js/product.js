

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


//情景json

/*说明：
isDiscounts:1, 优惠组合
isMustBuy:1,   必买
isSingleSell:1 不可单卖
stock  库存
*/

var sceneJson=[
    {
        type:1,
        title:'白馬市極光奇景3日之旅',
        isDiscounts:1,
        isMustBuy:1,
        isSingleSell:1,
        firstTitle:'迪士尼樂園門票-陸地',
        firstDateList:[
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
        secondTitle:'迪士尼樂園門票-海洋',
        secondDateList:[
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
        detail:[
            {
                id:1,
                name:'大人',
                minvalue:1,
                ismultiple:1,
                stock:9
            },
            {
                id:2,
                name:'儿童',
                minvalue:1,
                ismultiple:0,
                stock:20
            }
        ]

    }
]

    var optionList= [
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
                            date: "2018-01-01",
                            price: "$839",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:1,  //表示倍数购买
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:1,  //表示倍数购买
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:2,
                            date: "2018-01-02",
                            price: "$48239",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:3,
                                    ismultiple:1,  //表示倍数购买
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,  //表示倍数购买
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:3,
                            date: "2018-01-03",
                            price: "$4339",
                            identity_list:[
                                {
                                    id:1,
                                    name:'',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                }

                            ]
                        },
                        {
                            id:4,
                            date: "2018-01-04",
                            price: "$839",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:5,
                            date: "2018-01-05",
                            price: "$439",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:6,
                            date: "2018-01-06",
                            price: "$39",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
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
                            date: "2018-02-01",
                            price: "$1839",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:2,
                            date: "2018-02-02",
                            price: "$239",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:3,
                            date: "2018-02-03",
                            price: "$48339",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
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
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
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
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:6,
                            date: "2018-02-06",
                            price: "$639",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
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
                            date: "2018-02-01",
                            price: "$1839",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:2,
                            date: "2018-02-02",
                            price: "$239",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:3,
                            date: "2018-02-03",
                            price: "$48339",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
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
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
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
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字'
                                }
                            ]
                        },
                        {
                            id:6,
                            date: "2018-02-06",
                            price: "$639",
                            identity_list:[
                                {
                                    id:1,
                                    name:'大人',
                                    minvalue:1,
                                    ismultiple:0,
                                    tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                },
                                {
                                    id:2,
                                    name:'儿童',
                                    minvalue:1,
                                    ismultiple:0,
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
                                date: "2018-01-01",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:1,  //表示倍数购买
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:1,  //表示倍数购买
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:2,
                                date: "2018-01-02",
                                price: "$48239",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:3,
                                        ismultiple:1,  //表示倍数购买
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,  //表示倍数购买
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:3,
                                date: "2018-01-03",
                                price: "$4339",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:4,
                                date: "2018-01-04",
                                price: "$839",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:5,
                                date: "2018-01-05",
                                price: "$439",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:6,
                                date: "2018-01-06",
                                price: "$39",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
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
                                date: "2018-02-01",
                                price: "$1839",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:2,
                                date: "2018-02-02",
                                price: "$239",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:3,
                                date: "2018-02-03",
                                price: "$48339",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
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
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
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
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:6,
                                date: "2018-02-06",
                                price: "$639",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
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
                                date: "2018-02-01",
                                price: "$1839",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:2,
                                date: "2018-02-02",
                                price: "$239",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:3,
                                date: "2018-02-03",
                                price: "$48339",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
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
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
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
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字'
                                    }
                                ]
                            },
                            {
                                id:6,
                                date: "2018-02-06",
                                price: "$639",
                                identity_list:[
                                    {
                                        id:1,
                                        name:'大人',
                                        minvalue:1,
                                        ismultiple:0,
                                        tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                    },
                                    {
                                        id:2,
                                        name:'儿童',
                                        minvalue:1,
                                        ismultiple:0,
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
                                    date: "2018-01-01",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-01-02",
                                    price: "$48239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:3,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-01-03",
                                    price: "$4339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-01-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-01-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-01-06",
                                    price: "$39",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                    date: "2018-01-01",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-01-02",
                                    price: "$48239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:3,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-01-03",
                                    price: "$4339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-01-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-01-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-01-06",
                                    price: "$39",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
            id:3,
            name:"选项3",
            time:[
                {
                    id:1,
                    name: "10:00",
                    identity:[
                        {
                            id:1,
                            name:"成人",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-01-01",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-01-02",
                                    price: "$48239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:3,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-01-03",
                                    price: "$4339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-01-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-01-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-01-06",
                                    price: "$39",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                    name: "11:00",
                    identity:[
                        {
                            id:1,
                            name:"成人",
                            pricelist: [
                                {
                                    id:1,
                                    date: "2018-01-01",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-01-02",
                                    price: "$48239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:3,
                                            ismultiple:1,  //表示倍数购买
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,  //表示倍数购买
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-01-03",
                                    price: "$4339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:4,
                                    date: "2018-01-04",
                                    price: "$839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:5,
                                    date: "2018-01-05",
                                    price: "$439",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-01-06",
                                    price: "$39",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                    date: "2018-02-01",
                                    price: "$1839",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:2,
                                    date: "2018-02-02",
                                    price: "$239",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:3,
                                    date: "2018-02-03",
                                    price: "$48339",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字'
                                        }
                                    ]
                                },
                                {
                                    id:6,
                                    date: "2018-02-06",
                                    price: "$639",
                                    identity_list:[
                                        {
                                            id:1,
                                            name:'大人',
                                            minvalue:1,
                                            ismultiple:0,
                                            tip:'測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字測試文字'
                                        },
                                        {
                                            id:2,
                                            name:'儿童',
                                            minvalue:1,
                                            ismultiple:0,
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
    ];


    var selectHtml="";
    for(var i=0;i<optionList.length;i++)
    {

        selectHtml=selectHtml+"<option value='"+optionList[i].id+"'>"+optionList[i].name+"</option>";

    }

    $("#xuanxiangText").append(selectHtml);


    //联动
    $("#xuanxiangText").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initTimeSelect(optionId);

        var optionId2=parseInt($("#changciText").val()-1);
        console.log("optionId2:"+optionId2);
        initIdentitySelect(optionId2);
        initPrice();
    });


    $("#changciText").change(function()
    {
        var optionId=parseInt($(this).val()-1);
        initIdentitySelect(optionId);
        initPrice();

    });

    $("#shenfenText").change(function()
    {

        initPrice();

    });

    function initIdentitySelect(optionId2)
    {

        var optionId1=parseInt($("#xuanxiangText").val()-1);


        $("#shenfenText").empty();
        var identityHtml="";
        for(var i=0;i<optionList[optionId1].time[optionId2].identity.length;i++)
        {
            identityHtml=identityHtml+"<option value='"+optionList[optionId1].time[optionId2].identity[i].id+"'>"+optionList[optionId1].time[optionId2].identity[i].name+"</option>"
        }
        $("#shenfenText").append(identityHtml);
    }


    function initTimeSelect(optionId)
    {
        $("#changciText").empty();
        var timeHtml="";
        for(var i=0;i<optionList[optionId].time.length;i++)
        {
            timeHtml=timeHtml+"<option value='"+optionList[optionId].time[i].id+"'>"+optionList[optionId].time[i].name+"</option>"
        }
        $("#changciText").append(timeHtml);
    }

    initTimeSelect(0);
    initIdentitySelect(0);



    function initPrice()
    {

        var optionId1=parseInt($("#xuanxiangText").val())-1;
        var optionId2=parseInt($("#changciText").val())-1;
        var optionId3=parseInt($("#shenfenText").val())-1;

        var priceList=optionList[optionId1].time[optionId2].identity[optionId3].pricelist;


        var yearMoth=$("#calendar04 .ic__year").attr("data-value");

        console.log("yearMoth"+yearMoth);
        console.log(priceList);

        $("#calendar04 .ic__day .price-text").text("");
        for(var i=0;i<priceList.length;i++)
        {

            if(priceList[i].date.indexOf(yearMoth)>-1)
            {

                console.log(yearMoth);

                var dayColText=parseInt(priceList[i].date.split("-")[2]);
                var priceText=priceList[i].price;

                $("#calendar04 .ic__day").each(function()
                {
                    if(parseInt(dayColText)==$(this).find("div").eq(0).text())
                    {
                        $(this).find("div").eq(1).text(priceText);
                    }
                });

            }
        }


    }



    function ic__prev()
    {
        console.log("prev");
        initPrice();
    }

    function ic__next()
    {
        console.log("next");
        initPrice();
    }


$(".select02").click(function()
{
    initPrice();
});





$(function(){

    $("#calendar04").ionCalendar({
        lang: 'zh-cn',
        onClick:function(date)
        {
            console.log(date);
            $("#dateCol").val(date.substr(0,10));
            $("#dateContent").text(date.substr(0,10));

            $(".detail-btn1").addClass("active");

            var optionId1=$("#xuanxiangText").val()-1;
            var optionId2=$("#changciText").val()-1;
            var optionId3=$("#shenfenText").val()-1;

            var priceList=optionList[optionId1].time[optionId2].identity[optionId3].pricelist;

            var priceText;
            var priceIndex=-1;
            for(var i=0;i<priceList.length;i++)
            {
                if(date.substr(0,10)==priceList[i].date)
                {
                    priceText=priceList[i].price;

                    priceIndex=i;

                }
            }


            var identity_list_html="";
            var shenfenColText="";
            if(priceIndex!=-1)
            {

                for(var i=0;i<priceList[priceIndex].identity_list.length;i++)
                {

                    if(priceList[priceIndex].identity_list[i].name)
                    {
                        shenfenColText=shenfenColText+priceList[priceIndex].identity_list[i].name+priceList[priceIndex].identity_list[i].minvalue+"位、";
                    }
                    else
                    {
                        shenfenColText=shenfenColText+priceList[priceIndex].identity_list[i].minvalue+"位";
                    }


                    if((shenfenColText.indexOf("、")>-1)&&(i==priceList[priceIndex].identity_list.length-1))
                    {
                        shenfenColText=shenfenColText.substring(0,shenfenColText.length-1);
                    }

                    identity_list_html=identity_list_html+'<div class="col-xs-3 col-sm-3 col-md-3 identity-col">'+
                        '<div>'+
                        '<span style="vertical-align:middle;margin-right:5px;">'+priceList[priceIndex].identity_list[i].name+'</span>'+
                        '<span class="text-hover"><img src="images/icon10.png"/>'+
                        '<div  class="talkbox">'+priceList[priceIndex].identity_list[i].tip+'</div>'+
                        '</span>'+
                        '</div>'+
                        '<div style="margin-top:10px;">'+
                        '<span class="minus-text" style="border:1px solid #dddddd;padding:2px 12px 3px 10px;background:#f7f7f7;color:#000;">-</span><span class="value1" style="vertical-align:initial;">'+
                        '<input class="middle-text" type="text" size="3" style="height:24px;text-align:center;" data-multiple="'+priceList[priceIndex].identity_list[i].ismultiple+'" data-minvalue="'+priceList[priceIndex].identity_list[i].minvalue+'" value="'+priceList[priceIndex].identity_list[i].minvalue+'">'+
                        '</span>'+
                        '<span class="plus-text" style="border:1px solid #dddddd;padding:2px 12px 3px 10px;background:#f7f7f7;color:#000;">+</span>'+
                        '</div>'+
                        '</div>';
                }
            }

            $("#shenfenColText").text(shenfenColText);

            $(".identity-list .identity-col").remove();
            $(".identity-list").prepend(identity_list_html);

            $("#priceCol").val(priceText);
            $("#shenfenCol").val($("#shenfenText").val());
            $("#changciCol").val($("#changciText").val());
            $("#xuanxiangCol").val($("#xuanxiangText").val());
            $(".fancybox-close-small")[0].click();

        }
    });

    $(".menushop").click(function()
    {
        window.location.href="confirm.html?class="+ $("#xuanxiangCol").val()+"&event="+$("#priceCol").val()+"&idkind="+$("#shenfenCol").val()+"&usedate="+$("#dateCol").val()+"&adult="+$("#adult").val()+"&child="+$("#child").val();
    });


});


$('.value-plus1').on('click', function(){
    var divUpd = $(this).parent().find('.value1 input'), newVal = parseInt(divUpd.val(), 10)+1;
    divUpd.val(newVal);

});

$('.value-minus1').on('click', function(){
    var divUpd = $(this).parent().find('.value1 input'), newVal = parseInt(divUpd.val(), 10)-1;
    if(newVal>=1) divUpd.val(newVal);

});





$(".quxiao-btn-col").click(function()
{

    $(".detail-btn1").removeClass("active");
    $(".detail-btn1").parent().parent().parent().parent().find(".select02").html('選項<font style="color:red;">*</font> 請選擇');

});



$(function(){
    $("#calendar02").ionCalendar({
        lang: 'zh-cn',
        onClick:function()
        {

            $("#productSelect").empty();

            var dateValue1=$("#calendarSelect1").val();
            var dateValue2=$("#calendarSelect2").val();
            var dateValue3=$("#calendarSelect3").val();
            var dateValue4=$(this).find("div").eq(1).text();

            $("#productSelect").empty();
            $("#productSelect").append("<option>"+dateValue1+","+dateValue2+","+dateValue3+"."+dateValue4+"</option>")

        }
    });

    $("#calendarMobile").ionCalendar({
        lang: 'zh-cn'
    });



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



           if(isMultiple=="1")
           {
               prevNum=prevNum+prevValue;
           }
           else {
               prevNum++;
           }

        if(prevNum<=10)
        {
           $(this).parent().find(".middle-text").val(prevNum);
         }



});







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


$("#countryList").append(countryListHtml);


$("body").on("click",".child-level",function()
{

    if($(this).attr("data-child")=="1")
    {
        var dataLevel=parseInt($(this).attr("data-level"))+1;
        var proCountryListTemp=JSON.parse($(this).parent().find(".child-list").text());
        getChildList(dataLevel,proCountryListTemp);
    }
    else
    {
        $(".calendar-col").show();
    }

   if($("#countryInput").val()=="")
   {
       $("#countryInput").val($("#countryInput").val()+$(this).next().text());
   }
    else {
       $("#countryInput").val($("#countryInput").val()+"、"+$(this).next().text());
   }



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

    $("#countryList").empty();
    $("#countryList").append(countryCheckHtml);


}





















































