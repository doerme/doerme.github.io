jQuery(document).ready(function(){
a = 1;
// $(window).bind("scroll",function(){
// if( $(document).scrollTop() + $(window).height() > $(document).height() - 20 && a==1) {
// 	a = 0;
// 	loadingcss3_open();
// 		$.ajax( {
// 			url: $("#page_ajax").attr("href"),
// 			success:function(data){
// 				setTimeout(function(){
// 					nowHref = $("#page_ajax_now").attr("href");
// 					nextHref = $("#page_ajax").attr("href");
// 					datanextHref = jQuery(data).find("#page_ajax").attr("href");
// 					datanowHref = jQuery(data).find("#page_ajax_now").attr("href");
					
// 					if(nowHref != nextHref){
// 						$("#page_ajax").attr("href",datanextHref);
// 						$("#page_ajax_now").attr("href",datanowHref);
// 						html = $(data).find("#ajax_list_ul").html();
// 						$("#ajax_list_ul").append(html);
// 						a = 1;
// 					}else{
// 						if($("#nomore").length < 1){
// 							$("#ajax_list").after('<div id="nomore">没有更多内容了！</div>');
// 						}
// 					}
// 					loadingcss3_close();
					
// 				},1000)
// 			}
// 		});
// 	}
// });

function loadingcss3_open(){
	$(".fixedloading").addClass("loadingcss3");
	$(".fixedloading").fadeIn(300);
	$(".fixedloadingbg").fadeIn(300);
}

function loadingcss3_close(){
	$(".fixedloading").removeClass("loadingcss3");
	$(".fixedloading").fadeOut(300);
	$(".fixedloadingbg").fadeOut(300);
}


});

