$('.sf-lnse#group').sf_lnse({
    $tabsWrap: [$('.sf-lnse#group').find('.pills')],
    renderHiddenToggle: true,
    needHiddenInputsChangeEvents: 'change',
    fromChangeEventName: 'change',
    switchEnableDisable: 'true',
    whenInit: function($module) {
        console.log('whenInit Callback', $module);
        var $panels = $module.find('[data-panl]');
        // 處理每個面板中的input預設值，或是初使化客製內容
        $panels.each(function() {
            var panelName = $(this).attr('data-panl');
            switch (panelName) {
                case "abroadGroup":
                    var abroadGroup = function() {
                        var $this = $(this);
                        var $sFdate = $this.find('[name=sFdate]');
                        var $sTdate = $this.find('[name=sTdate]');
                        var $aboardGroupDeparture = $this.find('#aboardGroupDeparture');
                        var $aboardGroupDestinationInput = $this.find('#aboardGroupDestination').find('input');
                        var $aboardGroupDate = $this.find('#aboardGroupDate');
                        var $aboardGroupKey = $this.find('#aboardGroupKey');
                        var $keyWord = $this.find('#exampleLinkSelect');
                        var keywordSource = "./_shared/json/keyword.json";
                        var keywordSetting = "{'source':'" + keywordSource + "','sendData': {'sLine':'_6','sKeyWord':'_A_6'},'autocomplete':true,'keywordQuery':true,'autoOnly':true,'verfiyError':'請選擇國外目的地','rmValueWhenNoFound':false,'appendTargetPosition':'body'}";
                        var destinationSource = "./_shared/json/TRS1NEW.js";
                        var destinationSetting = "{'source':'"+destinationSource+"','lineOrder': ['_6','_5','_7','_3','_1','_4','_2','_9'],'region':true,'more':false,'autocomplete':true,'dataTemplate':'abroadGroup','searchAllMergeString':true,'removeNotWordStringWhenSearch':false,'arrangeDataSortByOrderLine':true,'spliteSymbol':'-','removeRegex':false,'closeManually':true,'itemActiveByManual':true,'targetPosition':'#group #aboardGroupDestination','msgPlactHTML':'<div class=m-place style=color:#23a07e> 最多可選擇3則目的地 </div>'}"
                        
                        $keyWord.attr('data-dtm-lnsl', keywordSetting);
                        $aboardGroupDestinationInput.attr('data-dtm-lnsl', destinationSetting);

                        $sFdate.cy_ln({
                            arrow: true,
                            monthCount: 2,
                            weekdayName: ['日','一','二','三','四','五','六'],
                            range:[$sTdate[0]],
                            cssClass: {
                                top: 3,
                            }
                        });
                    }.call(this);
                break;
            }
        });
    },
    whenRecodeWrited: function($visiablePanlWrap, $input, $inputHidden) {
        console.log('whenRecodeWrited Callback', $input, $inputHidden);
    },
    whenTabSwitchDone: function($visiablePanlWrap) {
        console.log('whenTabSwitchDone Callback', $visiablePanlWrap);
    },
    whenInputRemoved: function($inputDom) {
        console.log('whenInputRemoved Callback', $inputDom);
    },
    whenFormChanged: function($visiablePanlWrap, $input, $inputHidden) {
        console.log('whenFormChanged Callback', $input, $inputHidden);
    },
    whenSubmit: function($visiablePanlWrap, $submit) {
        console.log('whenSubmit Callback', $visiablePanlWrap, $submit);
    }
});

// $('.sf-lnse [data-toggle=dtm-lnls]').dtm_lnls({
// });

console.log($('.sf-lnse#group .st_lnls'));
$('.sf-lnse#group .st_lnls').st_lnls({
    whenOpen: function($this) {
        var submit_wrap = $this.closest('[data-status]').find('.submit_wrap');
        $this.closest('.group').find('.noborder').removeClass('noborder');        
        $this.closest('.group').css('overflow', 'visible');
        $this.closest('.wrap').css('overflow', 'visible');

        $this.closest('.group').find('.noborder').removeClass('noborder');
        submit_wrap.removeClass('enabled');         
        submit_wrap.addClass('disabled');
        submit_wrap.attr('data-status','disabled');
        // var group = $this.closest('.group')
        var $sFdate = $this.closest('.sf-lnse').find('[name=sFdate]');
        var $aboardGroupDestinationInput = $this.closest('.sf-lnse').find('#aboardGroupDestination').find('input');

        // var int_lnls_input = group.find('.int_lnls').find('input');
        // var int_lntg_input = group.find('.int_lntg').find('input');        
        $sFdate.cy_ln('close'); 
        $aboardGroupDestinationInput.dtm_lnls('hideTarget')
    },
    whenClose: function($this) {
        $this.closest('.group').css('overflow', '');
        $this.closest('.wrap').css('overflow', '');
    }
});
$('.sf-lnse#group .int_lnls').int_lnls();
$('.sf-lnse#group .int_lntg').int_lntg({ 
    maxTagAmount: 3,
    whenAddTag: function($this, opt, $tag) {        
        if ($this.find('.int-tag').length == opt.maxTagAmount) {
            $this.find('input').dtm_lnls('toggleItemDisabled', true);
            $this.find('input').addClass('int-min');
        }
        $this.find('input').attr('placeholder','');
    }, 
    whenRemoveTag: function($this, opt, $tag) {
        $this.find('input').dtm_lnls('toggleItemDisabled', false);
        $this.find('input').dtm_lnls('removeItemAcitve', '[data-txt='+$tag.attr('data-txt')+']');
        $this.find('input').removeClass('int-min');
        console.log($this.find('.int-tag').length)
        if ($this.find('.int-tag').length <= 1) {
            $this.find('input').attr('placeholder','請輸入/選擇目的地');
        }
    },
});


$('[data-toggle="dtm-lnls"]').dtm_lnls({
    isRunning: true,
    // 設定階層keyName
    dataTemplate: {
        "abroadGroup": ["vLine", "vLinetravel", "vLinewebarea"],
        "domesticGroup": ["vLine", "vLinetravel", "vLinewebarea"],
    },
    levelName: {
        "abroadGroup": ["產品線", "區域/國家", "國家/城市", "城市/產品"],
        "domesticGroup": ["產品線", "國家", "城市"],
    },
    whenItemClicked: function($menu, $item, $input) {
        // console.log('whenItemClicked', $menu, $item, $input);
        switch ( $input.data('dtm_lnls').opts.dataTemplate ) {
            case "abroadGroup":
            case "domesticGroup":
                console.log('whenItemClicked');
                var itemData = $item.data();
                if ($menu.hasClass('auto')) {
                    var attrData = {}
                    for (var key in itemData) {
                        attrData['data-'+key] = itemData[key]
                    }
                    $input.closest('.int_lntg').int_lntg('addTag', {attr: attrData});
                    $input.dtm_lnls('toggleMenu', $menu);
                    $input.dtm_lnls('toggleMenu', $input.data('dtm_lnls').$target.filter(':not(.auto)'));
                } else {
                    if ($item.hasClass('active')) {
                        var attrData = {}
                        for (var key in itemData) {
                            attrData['data-'+key] = itemData[key]
                        }
                        $input.closest('.int_lntg').int_lntg('addTag', {attr: attrData});
                    } else {
                        for (var key in itemData) {
                            $input.closest('.int_lntg').int_lntg('removeTag', '[data-'+key+'='+itemData[key]+']');
                            break;
                        }
                    }
                }
                $input.dtm_lnls('clearInput');
            break;
            default:
            break;
        };
    },
    whenDestinationShow: function($menu, $input) {
        if ($input.closest('.sf-lnse.sf-b')) {
            var $sFdate = $input.closest('.sf-lnse.sf-b').find('[name=sFdate]');
            $sFdate.cy_ln('close');
        }
    }
});

// 上方搜尋列關閉非當下按下的日曆或目的地
$('.ctns .group .int_lnls input').on('click',function(e){
    var group = $(this).closest('.group')
    var int_lntg_input = group.find('.int_lntg').find('input');
    $(int_lntg_input).dtm_lnls('hideTarget');
})