  $(window).scroll(function(){
   	var top=$(window).scrollTop();
   	if(top>200){
   		var w=$(window).width();
   		var right=100;
   		
   		$(".stairs").css("position","fixed").css("top","0px").css("right",right);
   		}else{
		$(".stairs").css("position","absolute").css("top","200px").css("right",right);
	}
   	}
   )
  $('.fixedtool-9').on('click',function gotop(){
	$(window).scrollTop(0);  // 滚动到顶部
	$("html,body").animate({scrollTop:0},600);
})