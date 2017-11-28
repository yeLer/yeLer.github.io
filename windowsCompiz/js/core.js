//www.198zone.com
var Core = {};
var _cache = {};

Core.config = {
    shortcutTop:20,		//快捷方式top初始位置
    shortcutLeft:20,		//快捷方式left初始位置
    createIndexid:1,		//z-index初始值
    windowMinWidth:150,		//窗口最小宽度
    windowMinHeight:56		//窗口最小高度
};
//var data = [[{}, {}, {}], [{}]];
//桌面右键菜单
Core.menu={
    bodymenudata:
    [ 
    [{
        text: "排列图标",
        data: [[{
            text: "名称",
            func: function() {
                ZENG.msgbox.show("按名称排列！", 1, 2000);
            }
        }, {
            text: "大小",
            func: function() {
                ZENG.msgbox.show("按大小排列！", 1, 2000);
            }
        }, {
            text: "类型",
            func: function() {
                ZENG.msgbox.show("按类型排列！", 1, 2000);
            }
        }]]
    }, 
    {
        text: "刷新",
        func: function() {
            $('body').reload();
        }
    }, {
        text: "新建",
        data: [[{
            text: "文本文件",
            func: function() {
                ZENG.msgbox.show("文本文件！", 1, 2000);
            }
        }, {
            text: "Execl",
            func: function() {
                ZENG.msgbox.show("Execl！", 1, 2000);
            }       
        }]]
    },{
        text:"显示桌面",
        func:function(){
            Core.showDesktop();
        }
    }
    ],
    [{
        text: "属性(选择背景)",
        data: [[{
            text: "背景1",
            func: function() {
                $(this).attr("style",'background:url(images/background.jpg) repeat right bottom transparent;');
            }
        }, {
            text: "背景2",
            func: function() {
                $(this).attr("style",'background:url(images/background2.jpg) repeat right bottom transparent;');
            }       
        }]]
    }]
    ],
    icosmenudata : [[{
        text:"工具栏"
    }, {
        text:"任务管理器"
    }, {
        text:"显示桌面"
    }], [{
        text:"属性"
    }]]
};
Core.init = function(){
    $(document.body).bind('click',function(){
        //隐藏所有右键列表
        $(".popup-menu").hide();
    });
    var _top = Core.config.shortcutTop;
    var _left = Core.config.shortcutLeft;
    var windowHeight = $("#desk").height();
    var ul = $("#desk").find('ul');
    //屏蔽桌面右键事件
    $("#desk").bind('contextmenu',function(){
        $(".popup-menu").hide();
        $("#desk").smartMenu(Core.menu.bodymenudata, {
            name: "body"    
        });
        $("#task-bar").smartMenu(Core.menu.icosmenudata, {
            name: "task_bar"    
        });
        return false;
    });
    /**/
    $(window).bind('load',function(){
        //循环输出每个图标
        for(var sc in shortcut){
            _cache.shortcutTemp = {
                "top":_top,
                "left":_left,
                "title":shortcut[sc][1],
                "shortcut":shortcut[sc][0],
                "imgsrc":shortcut[sc][2]
            };
            $(ul).append(FormatModel(shortcutTemp,_cache.shortcutTemp));
            //每循环一个图标后，给top的偏移量加90px
            _top += 90;
            //当下一个图标的top偏移量大于窗口高度时，top归零，left偏移量加90px
            if(_top+Core.config.shortcutTop+57 > windowHeight){
                _top = Core.config.shortcutTop;
                _left += 90;
            }
        }
    }).bind('resize',function(){
        if($(window).width()<800 ||="" $(window).height()<400){="" zeng.msgbox.show("浏览器当前窗口过小，可能会影响正常操作！",="" 1,="" 2000);="" }="" 由于图标不会太多，所以resize里的方法是对样式直接修改，当然也可以重建li="" _top="Core.config.shortcutTop;" _left="Core.config.shortcutLeft;" windowheight="$("#desk").height();" 循环ul，操作每一个li="" $(ul).find("li").each(function(){="" $(this).css({="" "left":_left,="" "top":_top="" });="" +="90;" if(_top+core.config.shortcuttop+57=""> windowHeight){
                _top = Core.config.shortcutTop;
                _left += 90;
            }
        });
        //智能修改每个窗口的定位
        $("#desk div.window-container").each(function(){
            currentW = $(window).width() - $(this).width();
            currentH = $(window).height() - $(this).height();
            _l = $(this).data("info").left/$(this).data("info").emptyW*currentW >= currentW ? currentW : $(this).data("info").left/$(this).data("info").emptyW*currentW;
            _l = _l <= 0="" ?="" :="" _l;="" _t="$(this).data("info").top/$(this).data("info").emptyH*currentH">= currentH ? currentH : $(this).data("info").top/$(this).data("info").emptyH*currentH;
            _t = _t <= 0="" ?="" :="" _t;="" $(this).css({="" "left":_l+"px",="" "top":_t+"px"="" });="" }).bind('load',function(){="" $('.bgloader').fadeout('slow');="" 绑定快捷方式点击事件="" ul.find('li').live('click',function(){="" core.create($(this));="" 绑定任务栏点击事件="" $('.task-window="" li').live('click',function(){="" core.taskwindow($(this));="" }).live('contextmenu',function(){="" 展示自定义右键菜单="" core.taskwindowrightmenu($(this));="" 屏蔽浏览器自带右键菜单="" return="" false;="" 绑定窗口点击事件="" $('.window-container').live('click',function(){="" core.container($(this));="" 系统设置处理="" $('.task-panel="" li').bind('click',function(){="" core.taskwindowsystemmenu($(this));="" };="" 创建窗体="" core.create="function(obj,opt){" zeng.msgbox.show(typeof(obj),="" 1,="" 2000);="" if(typeof(obj)="=='string'){" var="" options="{" num="" :date.parse(new="" date()),="" imgsrc="" :"images="" shortcut="" news.png",="" title="" :opt.title,="" url="" :opt.url,="" width="" :opt.width,="" height="" :opt.height,="" resize="" :opt.resize="" }else{="" sc="obj.attr('shortcut');" :shortcut[sc][0],="" :shortcut[sc][1],="" :shortcut[sc][2],="" :shortcut[sc][3],="" :shortcut[sc][4],="" :shortcut[sc][5],="" :true="" }="" window_warp="window_" +options.num+'_warp';="" window_inner="window_" +options.num+'_inner';="" 判断窗口是否已打开="" iswindowopen="0;" li').each(function(){="" if($(this).attr('window')="=options.num){" 改变任务栏样式="" li="" b').removeclass('focus');="" $(this).children('b').addclass('focus');="" 改变窗口样式="" $('.window-container').removeclass('window-current');="" $('#'+window_warp).addclass('window-current').css({="" 'z-index':core.config.createindexid="" }).show();="" 改变窗口遮罩层样式="" $('.window-frame').children('div').show();="" $('#'+window_inner+'="" .window-frame').children('div').hide();="" core.config.createindexid="" +="1;" if(iswindowopen="=" 0){="" 增加并显示背景遮罩层="" _cache.movelayout="GetLayOutBox();" _cache.movelayout.show();="" 任务栏，窗口等数据="" _cache.tasktemp="{" "num":options.num,="" "title":options.title,="" "imgsrc":options.imgsrc="" top="($(window).height()-options.height-30)/2" <="0" ($(window).height()-options.height-30)="" 2;="" left="($(window).width()-options.width)/2" ($(window).width()-options.width)="" _cache.windowtemp="{" "width":options.width,="" "height":options.height,="" "top":top,="" "left":left,="" "emptyw":$(window).width()-options.width,="" "emptyh":$(window).height()-options.height,="" "zindex":core.config.createindexid,="" "url":options.url="" _cache.resizetemp="{" "t":"left:0;top:-3px;width:100%;height:5px;z-index:1;cursor:n-resize",="" "r":"right:-3px;top:0;width:5px;height:100%;z-index:1;cursor:e-resize",="" "b":"left:0;bottom:-3px;width:100%;height:5px;z-index:1;cursor:s-resize",="" "l":"left:-3px;top:0;width:5px;height:100%;z-index:1;cursor:w-resize",="" "rt":"right:-3px;top:-3px;width:10px;height:10px;z-index:2;cursor:ne-resize",="" "rb":"right:-3px;bottom:-3px;width:10px;height:10px;z-index:2;cursor:se-resize",="" "lt":"left:-3px;top:-3px;width:10px;height:10px;z-index:2;cursor:nw-resize",="" "lb":"left:-3px;bottom:-3px;width:10px;height:10px;z-index:2;cursor:sw-resize"="" 新增任务栏="" $('.task-window').append(formatmodel(tasktemp,_cache.tasktemp));="" 新增窗口="" win_warp="" ;="" if(options.resize){="" 添加窗口缩放模板="" for(var="" k="" in="" _cache.resizetemp){="" resize_type:k,="" css:_cache.resizetemp[k]="" resize:win_warp="" }),_cache.windowtemp);="" $('#desk').append(win_warp);="" $("#"+window_warp).data("info",_cache.windowtemp);="" 绑定窗口移动事件="" core.bindwindowmove($('#'+window_warp));="" 绑定窗口缩放事件="" core.bindwindowresize($('#'+window_warp));="" 绑定窗口功能按钮事件="" core.handle($('#'+window_warp));="" 隐藏背景遮罩层="" _cache.movelayout.hide();="" 点击任务栏="" core.taskwindow="function(obj){" +obj.attr('window')+'_warp';="" +obj.attr('window')+'_inner';="" if(obj.children('b').hasclass('focus')){="" obj.children('b').removeclass('focus');="" $('#'+window_warp).hide();="" obj.children('b').addclass('focus');="" 任务栏右键菜单="" core.taskwindowrightmenu="function(obj){" _cache.taskright="GetTaskRight(obj);" _cache.taskright.css({="" left:(obj.index()*(obj.width()+3)+2)+'px'="" 任务栏系统设置="" core.taskwindowsystemmenu="function(obj){" _cache.tasksystem="GetTaskSystem(obj);" _cache.tasksystem.css({="" right:'2px'="" 点击窗口="" core.container="function(obj){" li[window="'+obj.attr('window')+'" ]="" b').addclass('focus');="" obj.addclass('window-current').css({="" obj.find('.window-frame').children('div').hide();="" 最小化，最大化，还原，双击，关闭，刷新="" core.handle="function(obj){" 最小化="" obj.find(".ha-min").bind("click",function(e){="" 阻止冒泡="" e.stoppropagation();="" obj.hide();="" 最大化="" obj.find(".ha-max").bind("click",function(e){="" obj.css({="" width:"100%",="" height:"100%",="" top:0,="" left:0="" $(this).hide().next(".ha-revert").show();="" ie6iframeheight();="" zeng.msgbox.show("按f11体验浏览器全屏模式！",="" 4,="" 还原="" obj.find(".ha-revert").bind("click",function(e){="" width:obj.data("info").width+"px",="" height:obj.data("info").height+"px",="" left:obj.data("info").left+"px",="" top:obj.data("info").top+"px"="" $(this).hide().prev(".ha-max").show();="" 双击="" obj.find(".title-bar").bind("dblclick",function(e){="" 判断当前窗口是否已经是最大化="" if($(this).find(".ha-max").is(":visible")){="" $(this).find(".ha-max").click();="" $(this).find(".ha-revert").click();="" 关闭="" obj.find(".ha-close").bind("click",function(e){="" ]').remove();="" obj.remove();="" 刷新="" obj.find("#refresh").bind("click",function(e){="" $("#frame"+obj.attr('window')).attr("src",$("#frame"+obj.attr('window')).attr("src"));="" 显示桌面="" core.showdesktop="function(){" $(".task-window="" b").removeclass("focus");="" $("#desk="" ul").nextall("div").hide();="" core.bindwindowmove="function(obj){" obj.find(".title-bar").bind("mousedown",function(e){="" 改变窗口为选中样式="" x="e.screenX;" 鼠标位于屏幕的left="" y="e.screenY;" 鼠标位于屏幕的top="" st="obj.offset().top;" sl="obj.offset().left;" 增加背景遮罩层="" lay="($.browser.msie)?" $(window);="" 绑定鼠标移动事件="" lay.unbind("mousemove").bind("mousemove",function(e){="" 强制把右上角还原按钮隐藏，最大化按钮显示="" obj.find(".ha-revert").hide().prev(".ha-max").show();="" ex="e.screenX;" ey="e.screenY;" lessx="eX" -="" x;="" 距初始位置的偏移量="" lessy="eY" y;="" _l="sL" lessx;="" _t="sT" lessy;="" _w="obj.data("info").width;" _h="obj.data("info").height;" *="" 鼠标贴屏幕左侧20px内="" if(e.clientx="" 鼠标贴屏幕右侧20px内="">= (lay.width()-21)){
                _w = (lay.width()/2)+"px";
                _h = "100%";
                _l = (lay.width()/2)+"px";
                _t = 0;
            }*/
            //窗口贴屏幕顶部10px内
            if(_t <= 10){="" _t="0;" }="" 窗口贴屏幕左边10px内="" if(_l="" <="10){" _l="0;" 窗口贴屏幕右边10px内="">= lay.width()-_w-10){
                _l = lay.width()-_w;
            }
            //窗口贴屏幕下边10px内 //30px 下方还有task-bar任务栏
            if(_t >= lay.height()-_h-30-10){
                _t = lay.height()-_h-30;  
            }
            /*
            ZENG.msgbox.show(lay.height()+" "+_win_h, 1, 2000);
            //窗口贴屏幕底部60px内
            if(_t >= (lay.height()-60)){
                _t = (lay.height()-60)+"px";
                if(e.clientX <= 20){="" _w="(lay.width()/2)+"px";" _h="100%" ;="" _l="0;" _t="0;" }="" }*="" obj.css({="" width:_w,="" height:_h,="" left:_l,="" top:_t="" });="" obj.data("info",{="" width:obj.data("info").width,="" height:obj.data("info").height,="" left:obj.offset().left,="" top:obj.offset().top,="" emptyw:$(window).width()-obj.data("info").width,="" emptyh:$(window).height()-obj.data("info").height="" ie6iframeheight();="" 绑定鼠标抬起事件="" lay.unbind("mouseup").bind("mouseup",function(){="" _cache.movelayout.hide();="" if($.browser.msie){="" _cache.movelayout[0].releasecapture();="" $(this).unbind("mousemove");="" _cache.movelayout[0].setcapture();="" };="" 绑定窗口缩放事件="" core.bindwindowresize="function(obj){" for(rs="" in="" _cache.resizetemp){="" bindresize(rs);="" function="" bindresize(r){="" obj.find("div[resize=""+r+"" ]").bind("mousedown",function(e){="" 增加背景遮罩层="" _cache.movelayout="GetLayOutBox();" var="" lay="($.browser.msie)?" :="" $(window);="" cy="e.clientY;" cx="e.clientX;" h="obj.height();" w="obj.width();" lay.unbind("mousemove").bind("mousemove",function(e){="" _cache.movelayout.show();="" 窗口贴屏幕顶部10px内="" if(_t="" <="10){" 窗口贴屏幕底部60px内="">= (lay.height()-60)){
                    _t = (lay.height()-60);
                }
				
                if(_l <= 1){="" _l="1;" }="" if(_l="">= (lay.width()-2)){
                    _l = (lay.width()-2);
                }
                $('.window-frame').children('div').hide();
                obj.find('.window-frame').children('div').show();
                switch(r){
                    case "t":
                        if(h+cy-_t > Core.config.windowMinHeight){
                            obj.css({
                                height:(h+cy-_t)+"px",
                                top:_t+"px"
                            });
                        }
                        break;
                    case "r":
                        if(w-cx+_l > Core.config.windowMinWidth){
                            obj.css({
                                width:(w-cx+_l)+"px"
                            });
                        }
                        break;
                    case "b":
                        if(h-cy+_t > Core.config.windowMinHeight){
                            obj.css({
                                height:(h-cy+_t)+"px"
                            });
                        }
                        break;
                    case "l":
                        if(w+cx-_l > Core.config.windowMinWidth){
                            obj.css({
                                width:(w+cx-_l)+"px",
                                left:_l+"px"
                            });
                        }
                        break;
                    case "rt":
                        if(h+cy-_t > Core.config.windowMinHeight){
                            obj.css({
                                height:(h+cy-_t)+"px",
                                top:_t+"px"
                            });
                        }
                        if(w-cx+_l > Core.config.windowMinWidth){
                            obj.css({
                                width:(w-cx+_l)+"px"
                            });
                        }
                        break;
                    case "rb":
                        if(w-cx+_l > Core.config.windowMinWidth){
                            obj.css({
                                width:(w-cx+_l)+"px"
                            });
                        }
                        if(h-cy+_t > Core.config.windowMinHeight){
                            obj.css({
                                height:(h-cy+_t)+"px"
                            });
                        }
                        break;
                    case "lt":
                        if(w+cx-_l > Core.config.windowMinWidth){
                            obj.css({
                                width:(w+cx-_l)+"px",
                                left:_l+"px"
                            });
                        }
                        if(h+cy-_t > Core.config.windowMinHeight){
                            obj.css({
                                height:(h+cy-_t)+"px",
                                top:_t+"px"
                            });
                        }
                        break;
                    case "lb":
                        if(w+cx-_l > Core.config.windowMinWidth){
                            obj.css({
                                width:(w+cx-_l)+"px",
                                left:_l+"px"
                            });
                        }
                        if(h-cy+_t > Core.config.windowMinHeight){
                            obj.css({
                                height:(h-cy+_t)+"px"
                            });
                        }
                        break;
                }
                ie6iframeheight();
                //更新窗口宽高缓存
                obj.data("info",{
                    width:obj.width(),
                    height:obj.height(),
                    left:obj.offset().left,
                    top:obj.offset().top,
                    emptyW:$(window).width()-obj.width(),
                    emptyH:$(window).height()-obj.height()
                });
            });
            //绑定鼠标抬起事件
            lay.unbind("mouseup").bind("mouseup",function(){
                _cache.MoveLayOut.hide();
                if($.browser.msie){
                    _cache.MoveLayOut[0].releaseCapture();
                }
                $(this).unbind("mousemove");
            });
            if($.browser.msie){
                _cache.MoveLayOut[0].setCapture();
            }
        });
    }
};

//透明遮罩层
var GetLayOutBox = function(){
    if(!_cache.LayOutBox){
        _cache.LayOutBox = $('<div style="z-index:99999;display:none;cursor:default;background:none;height:100%;left:0;position:absolute;top:0;width:100%;filter:alpha(opacity=0);-moz-opacity:0;opacity:0"><div style="height:100%;width:100%"></div></div>');
        $(document.body).append(_cache.LayOutBox);
    }
    return _cache.LayOutBox;
}
//任务栏右键提示
var GetTaskRight = function(obj){
    if(!_cache.TaskRight){
        _cache.TaskRight = $('<div class="popup-menu task-menu" style="z-index:99999;bottom:30px;display:none"><ul><li><a menu="close" title="关闭" href="javascript:;" target="_blank" rel="external">关闭</a></li></ul></div>');
        $(document.body).append(_cache.TaskRight);
        $('.task-menu').bind('contextmenu',function(){
            return false;
        });
    }
    //绑定关闭事件
    $('.task-menu a[menu="close"]').unbind("click").bind("click",function(){
        $('#window_'+obj.attr('window')+'_inner .title-handle .ha-close').click();
        $('.task-menu').hide();
    });
    return _cache.TaskRight;
}
//任务栏右键提示
var GetTaskSystem = function(obj){
    if(!_cache.TaskSystem){
        _cache.TaskSystem = $('<div class="popup-menu task-menu" style="z-index:99999;bottom:30px;display:none"><ul><li><a menu="close" href="javascript:;" target="_blank" rel="external">用户登录</a></li><li><a menu="close" href="javascript:;" target="_blank" rel="external">用户登录</a></li></ul></div>');
        $(document.body).append(_cache.TaskSystem);
        $('.task-menu').bind('contextmenu',function(){
            return false;
        });
    }
    //绑定关闭事件
    $('.task-menu a[menu="close"]').unbind("click").bind("click",function(){
        $('#window_'+obj.attr('window')+'_inner .title-handle .ha-close').click();
        $('.task-menu').hide();
    });
    return _cache.TaskSystem;
}
//模板格式化（正则替换）
var FormatModel = function(str,model){
    for(var k in model){
        var re = new RegExp("{"+k+"}","g");
        str = str.replace(re,model[k]);
    }
    return str;
}
//IE6实时更新iframe高度
var ie6iframeheight = function(){
    if($.browser.msie && $.browser.version==="6.0"){
        $('.window-frame').css("height",($('.window-frame').parent().height()-59)+"px");
    }
}</=></=></=></=></=></800>