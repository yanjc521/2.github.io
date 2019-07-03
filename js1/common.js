/* 通用js代码  */


/* 
	gotop
	1.页面初始加载时隐藏gotop回到顶部按钮
	2.网页向下滚动200px的时候gotop按钮显示
	3.网页向上滚动至200px以内时gotop按钮又隐藏
	

	
 */
// 网页滚动时执行javascript方式
// 1javascript原生方式
   window.onscroll=function(){
   	var top = document.documentElement.scrollTop || document.body.scrollTop;  // 获取网页滚动高度
   	console.log("当前网页滚动记录："+top+"px"); // 在控制台输出内容
   	
   	// 判断，如果top>=20 显示gotop按钮
   	if(top>=200){
   		// 找到gotop这个元素
   		document.getElementById("gotop").style.display="block";	
   	}else{
   		document.getElementById("gotop").style.display="none";
   	}、
   	
   }
   // 定义一个gotop函数，方法 
   function gotop(){
   	 window.scroll(0,0);
   }
// 
// 2 jquery方式
// jquery网页滚动时执行
//$(window).scroll(function(){
//	var top = $(window).scrollTop();  // jquery获取网页滚动高度值
//	if(top>=200){
//		//$("#gotop").show();
//		$("#gotop").fadeIn(600);  // 单位毫秒
//	}else{
//		//$("#gotop").hide();
//		$("#gotop").fadeOut(600);
//	}
//	
//})
//function gotop(){
//	//$(window).scrollTop(0);  // 滚动到顶部
//	$("html,body").animate({scrollTop:0},600);
//}
//
//
//
/* 顶部banner广告 
	1.页面加载时top_ad隐藏
	2.2s之后top_ad由上至下滑动出来
	3.点击close关闭由下向上隐藏
*/
// 定时器，setTimeout页面加载完成后只执行一次
setTimeout(function() {
	$("#top_ad").slideDown(1000);
}, 2000);
function closetopad(){
	$("#top_ad").slideUp(600);
}
