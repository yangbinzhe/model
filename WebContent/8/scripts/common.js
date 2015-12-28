/*** 选项卡控件**/
$.fn.MTab=function(options){
	var settings={
		tabNameClass:'tabname', //选项卡频道class名
		tabConClass:'tabcon',	//选项卡频道内容class名
		tabNameCur:'cur',		//当前选项卡频道class名
		eventMod:'click',		//eventMod:绑定事件类型
		tabItemElmt:'li',		//切换执行的自定义函数
		execFn:null
	 }
	options&&$.extend(settings,options);
	var _this=$(this);
	var _tabNames=$('.'+settings.tabNameClass,_this);
	var _tabCons=$('.'+settings.tabConClass,_this);
	var idx=$('.'+settings.tabNameCur,_tabNames).index();
	_tabCons.eq(idx).show();
	$(settings.tabItemElmt,_tabNames).bind(settings.eventMod,function(e){
	var idx=$(this).index();
	$(settings.tabItemElmt,_tabNames).removeClass(settings.tabNameCur);	
	$(this).addClass(settings.tabNameCur);	
	_tabCons.stop().hide();
	_tabCons.eq(idx).stop().show();	
	if(settings.execFn)settings.execFn(idx);
	 e.stopPropagation();    
	});
}
/*** 数字加减控件**/
$.fn.opNum=function(options){
	var ops={
		addBtn:'aBtn',		//minusBtn：递减按钮
		minusBtn:'mBtn',	//递增按钮
		nums:'nums',		//input值框
		downLimit:1,		//下限值
		numStep:50,			//步长值
		defVal:1,			//默认值
		upLimit:999			//上限值
	 }
	options&&$.extend(ops,options);
	$(this).find('.'+ops.nums).val(ops.defVal);
	$(this).find('.'+ops.minusBtn).click(function(){
		var numsV=parseInt($(this).siblings('.'+ops.nums).val());
//		var numsV=parseInt($nums.val());
		if(numsV>ops.downLimit){
			$(this).siblings('.'+ops.nums).val(numsV-ops.numStep);
		}	
	});
	$(this).find('.'+ops.addBtn).click(function(){
		var numsV=parseInt($(this).siblings('.'+ops.nums).val());
		if(numsV<ops.upLimit){
			$(this).siblings('.'+ops.nums).val(numsV+ops.numStep);
		}	
	});
}
function setTextDefVal(_this,isFcs,defValue,def_c){
	var color=def_c?def_c:'col_gray';
	if(isFcs&&($.trim($(_this).val())==defValue||$.trim($(_this).val()).length==0)){
		$(_this).removeClass(color);
		$(_this).val('');
	}else{
		if($.trim($(_this).val())==defValue||$.trim($(_this).val()).length==0){
		$(_this).addClass(color);
		$(_this).val(defValue);
		}
	}
}
/** 修改密码文本显示**/
function setPwdDefVal(_this,isFcs){
	if(isFcs&&$(_this).attr('class')=='input-txt'){
		$(_this).hide();
		$(_this).next('.input-pwd').show().focus();
	}
	if(isFcs==false&&$(_this).attr('class')=='input-pwd'&&$(_this).val().length==0){
		$(_this).siblings('.input-txt ').show();
		$(_this).hide();
	}
}
/*** 图像滑动控件，扩展photoswipe**/
$.fn.picSwipe=function(options){
	var ops={
		imageWarp:'',						//图片集合
		pagNo:'pag',						//页面标记
        pagCur:'current',					//页面当前标记
		pagCurIdx:0							//当前显示的图片
	 }
	options&&$.extend(ops,options);
	var _this=$(this),images=$('.'+ops.imageWarp,_this).find('img');
	var instance,pagNo,pags,PhotoSwipe=window.Code.PhotoSwipe;
		instance =PhotoSwipe.attach(
			images,
			{
				target:$('.'+ops.imageWarp,_this)[0],
				preventHide: true,
				getImageSource: function(obj){
					return obj.src;
				},
				getImageCaption: function(obj){
					return $(obj).attr('url');
				},
				captionAndToolbarHide:true,
				margin:0,
				backButtonHideEnabled:false
			}
		);	
		if(ops.pagNo){
			pagNo=$("<div class='"+ops.pagNo+"'></div>");
				for(i=0;i<images.length;i++){
					pagNo.append('<span></span>');
				}
			pagNo=pagNo;
			_this.append(pagNo);
			pags=$('span',pagNo);
			pags.eq(ops.pagCurIdx).addClass(ops.pagCur);
			instance.addEventHandler(PhotoSwipe.EventTypes.onDisplayImage, function(e){
			var i, len;
			for (i=0, len=pags.length; i<len; i++){
				pags.eq(i).attr('class', '');
			}
			pags.eq(e.index).attr('class',ops.pagCur);	
		});
		}	
		instance.addEventHandler(PhotoSwipe.EventTypes.onTouch, function(e){
			if (e.action === 'tap'){
				var currentImage = instance.getCurrentImage();
				//window.open(currentImage.caption);
			}
		});
		instance.show(ops.pagCurIdx);
}
//选择电子券
$(function(){
		$('div.ticket-s-a').click(function(){
			$('div.ticket-s-a').removeClass('activeR')
			$(this).addClass('activeR');
		});

})
///收货人管理 c-m-address-info c-m-address-select
$(function(){
		$('div.c-m-address-info').click(function(){
			$('div.c-m-address-info').removeClass('c-m-address-select')
			$(this).addClass('c-m-address-select');
		});

})

//安全键盘
$(function(){
	$(".safe-keyboard").toggle(
	  function () {
		$(this).addClass("safe-keyboard-green");
	  },
	  function () {
		$(this).removeClass("safe-keyboard-green");
	  }
	);
})

	$(function(){
	var imgHeight = $('.img-height').width();
	$('.checkbox-d').css({height:function(){return imgHeight}})
	})
	
	






