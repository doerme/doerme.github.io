jQuery(document).ready(function(){

	$('.link_item').live('touchstart', function(e) {
		$(this).addClass('link_on');
	});
	$('.link_item').live('touchmove', function(e) {
		$(this).removeClass('link_on');
	});
	$('.link_item').live('touchend', function(e) {
		$(this).removeClass('link_on');
	});
	$('.link_item').live('mouseout', function(e) {
		$(this).removeClass('link_on');
	});


	$("#index_focus").slide();

	$(".shade").bind('click',function() {
		$("#nav_list").removeClass("nav_list_active");
		$(this).hide();
	})

	$("#nav_btn").bind('click',function() {
		if(!$("#nav_list").hasClass('nav_list_active')){
			$("#nav_list").addClass("nav_list_active");
			$(".shade").show();
		}else{
			$("#nav_list").removeClass("nav_list_active");
			$(".shade").hide();
		}
	});

	$(".weixin_tel").bind("click",function(){
		if(!$(".case_foot_tel").hasClass("case_foot_tel_active")){
			$(".case_foot_tel").addClass("case_foot_tel_active");
		}else{
			$(".case_foot_tel").removeClass("case_foot_tel_active");
		}
	})

	$(window).load(function(){
		service_list_middle();
	})
	$(window).resize(function(){
		service_list_middle();
	})

	function service_list_middle(){
		$("#service_list li").each(function(){
			li_height  = parseInt($('.service_list_con',this).height());
			pic_height = parseInt($('.service_list_pic',this).height());
			if(pic_height < li_height){
				picmargintop = (li_height - pic_height)/2;
				$('.service_list_pic',this).css({"margin-top":picmargintop});
			}else{
				$('.service_list_pic',this).css({"margin-top":0});
			}
		});
	}


	$(".share a").bind("click",function(){
		$(".share_shade").show();
	})
	$(".share_shade").bind("click",function(){
		$(".share_shade").hide();
	})

	$(".gototop a").bind("click",function(){
		$('html,body').stop().animate({scrollTop: 0},500);
		return false;
	})

}); 