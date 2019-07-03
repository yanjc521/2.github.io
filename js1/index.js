(function(){

  KISSY.use('dom,event,node,kg/page/2.0.5/index',function(S,D,E,N,Page){

    var $ = N.all;

    var main = {
      init: function(){
        var self = this;

        self.bind();

	    self.hightLight();

        self.page();

	    self.feedback();

	    $('.help-ww a').attr('href','//wangwang.taobao.com'); //鎻掑叆鏃烘椇涓嬭浇鐨勯摼鎺�

	    $('.help-nav-new a').attr('href','/helper/guide.htm'); //淇敼鏂颁汉鎸囧崡閾炬帴

		$('.btn-search.help-icon').html('&#xe61f;'); //淇敼澶撮儴鏀惧ぇ闀滄寜閽瓧浣�

	    $('.list-one').append('<i><span></span></i>'); //缁欎竴绾х被鐩坊鍔犵澶碊OM


		if(TB.Global.util.getCookie('hng').split('|')[1] === 'zh-tw'){
			$('body').addClass('lang-tw');
		}


      },
      bind: function(){
        // E.on('.list-one','click',function(e){
        //   var abc = e.currentTarget;
        // });
        $('.list-one').on('click',function(e){
            var target = e.currentTarget;

            $('.list-two-show').removeClass('list-two-show');

            $('.list-one-hover').removeClass('list-one-hover');

            $(target).addClass('list-one-hover');

            $(target).next().addClass('list-two-show');
        });

        $('.list-two h4').on('click',function(e){

            var target = e.currentTarget;

            $('.hover-category-show').removeClass('hover-category-show');

            $(target).next().addClass('hover-category-show');

        });
      },

      page: function(){

       var page_total = window.pagestatus ? window.pagestatus.total : 0,
       		 page_current = window.pagestatus ? window.pagestatus.current : 0;

  	   if(window.pagestatus&&window.pagestatus.total){

	       var  pageObj = new Page({
	            container: ".help-page", // 瀹瑰櫒
	            total_page: page_total, // 鎬婚〉鏁�
	            continuous_page: 5, // 杩炵画鏄剧ず鍒嗛〉鏁�
	            current_page: page_current, // 褰撳墠椤�
	            previous_show: true, // 鏄惁鏄剧ず绗竴椤�
	            next_show: true, // 鏄惁鏄剧ず涓嬩竴椤�
	            edge_page: 0 // 涓ょ鏄剧ず鍒嗛〉鏁�
	            });

	       pageObj.on("page:skip", function(e){

		       var url = location.href;

		       var page,status;

		       if(url.indexOf('list')>0){
			       page = 'list';
			       status = 'cid=' + window.pagestatus.cid;
		       }else if(url.indexOf('search')>0){
			       page = 'search';
			       status = 'key=' + window.pagestatus.key;
		       }

		       var page_url = '/helper/'+ page +'.htm?'+ status +'&page=' + e.pageNum;

		       location.href=page_url;
	       });
       }
      },

	  hightLight: function(){

		    if(!window.cat_cur_id || window.cat_cur_id ==='0') return;

		    var idName = '#Jcid_' + window.cat_cur_id;

		    var target = $(idName);

		    target.addClass('h'); //h4

		    if(target[0].tagName == 'LI'){
			    target.parent().parent().addClass('hover-category-show'); //li
			    target.parent().parent().parent().addClass('list-two-show'); //list-two
			    target.parent().parent().parent().prev().addClass('list-one-hover'); //list-one
		    }else{

          if(target[0].tagName == 'H3'){
            target.next().addClass('list-two-show'); //list-two
          }else{
            target.parent().addClass('list-two-show'); //list-two
            target.parent().prev().addClass('list-one-hover'); //list-one
          }
		    }

	    },

	  feedback: function(){
		  var $ = S.all,
				  DOM = S.DOM,
				  Event = S.Event,
				  Ajax = S.Ajax;

		  var additional, knowledgeId;

		  var token = $('#J_Tbtoken input').val();
		  var isSellerVersion = location.href.indexOf('seller') >= 0;

		  var isSuggestShown=false;
		  //鍒ゆ柇鍙嶉dom鏄惁鍦ㄧ涓€灞�
		  var feedbackWrap = $('.J_FeedbackWrap');
		  var feedbackWrapFixed = $('.J_FeedbackWrap_fixed');

		  if(!feedbackWrap||!feedbackWrap.offset()){
			  return;
		  }


		  var feedbackOffsetTop = feedbackWrap.offset().top;
		  var fixedFeedbackWidth=isSellerVersion ? 955 : 688;

		  feedbackWrapFixed.css({
			  width:fixedFeedbackWidth,
			  left:feedbackWrap.offset().left
		  });
		  //鐢ㄦ埛鏄惁鐐瑰嚮浜嗗叧闂寜閽�
		  var isHiddenByUser = false;

		  if (typeof(analysis) === "undefined") {
			  knowledgeId = $('#J_Kid').val();
		  } else {
			  knowledgeId = analysis.knowledgeid;
		  }
		  function throttle(method, context) {
			  clearTimeout(method.tId);
			  method.tId = setTimeout(function(){
				  method.call(context);
			  },100);
		  }


		  //瀵瑰弽棣坉om閲嶆柊瀹氫綅
		  var rePositionFeedback = function() {

			  var winHeight = $(window).height();
			  var scrollTop = $(window).scrollTop();
			  var width = fixedFeedbackWidth;
			  if (feedbackOffsetTop > winHeight + scrollTop ) {
				  //feedbackWrapFixed.show().removeClass('zoom-out').addClass('zoom-in');
				  feedbackWrapFixed.show().removeClass('zoom-out');
				  if(isSuggestShown){
					  showSuggestModal('fixed');

				  }
			  } else {
				  feedbackWrapFixed.removeClass('zoom-in').addClass('zoom-out');
				  if(isSuggestShown){
					  showSuggestModal('normal');
				  }
				  setTimeout(function(){
					  feedbackWrapFixed.hide();

				  },200)
			  }

		  }



		  rePositionFeedback();

		  //绐楀彛婊氬姩锛屼笖鐢ㄦ埛娌℃湁鐐瑰嚮鍏抽棴鎸夐挳
		  $(window).on('scroll', function() {
			  if (!isHiddenByUser) {
				  //throttle()
				  rePositionFeedback();
			  }

		  });

		  var showSuggestModal = function(type) {
			  var modal = $('#J_SuggestModal');
			  var winWidth = $(window).width();
			  var winHeight = $(window).height();
			  var left=feedbackWrap.offset().left;
			  var top=feedbackWrap.offset().top;
			  isSuggestShown=true;
			  if(type==='fixed'){
				  modal.css({
					  position:'fixed',
					  top:'auto',
					  bottom:0,
					  left:'auto',
					  right:winWidth-feedbackWrap.offset().left-fixedFeedbackWidth ,
					  display: 'block'
				  });

			  }else{
				  modal.css({
					  position:'absolute',
					  bottom:'auto',
					  right:'auto',
					  top: '-10px',
					  left: '150px',
					  display: 'block'
				  });
			  }




		  }

		  var hideSuggestModal = function() {
			  var modal = $('#J_SuggestModal');
			  isSuggestShown=false;
			  modal.hide();

		  }





		  var updateFeedback = function(data, done, fail) {
			  var url = isSellerVersion ? '/support/seller/ajax/api/serviceCenterFeedBack.do' : '/helper/feed.htm';
			  new Ajax({
				  url: url,

				  data: {
					  type: data.type,
					  memo: data.memo || '',
					  kid: knowledgeId,
					  ts:new Date().getTime(),
					  _tb_token_: token
				  },
				  type:'post',
				  dataType: 'json',
				  success: done,
				  error: fail
			  });

		  };

		  var showTip = function(text) {
			  $('.suggest-submit-tip').text(text);
			  $('.suggest-submit-tip').show();
			  setTimeout(function() {
				  $('.suggest-submit-tip').fadeOut();
			  }, 2000);

		  }

		  var addVotedCount = function() {
			  var nowCount = parseInt($('.J_VotedCount').text(), 10);
			  $('.J_VotedCount').text(nowCount + 1);
		  }

		  $('.J_Close').on('click', function() {
			  hideSuggestModal();


		  });


		  $('.J_HideFeedback').on('click', function() {
			  feedbackWrapFixed.removeClass('zoom-in').addClass('zoom-out');
			  setTimeout(function(){
				  feedbackWrapFixed.hide();
			  },200)
			  isHiddenByUser = true;
			  new Ajax({
				  url: 'main/ajax/LogCancelFeedback.do',
				  data: {
					  knowledgeId: knowledgeId,
					  type:isSellerVersion?3:1,
					  t: token
				  },
				  dataType: 'json',
				  success: function(){},
				  error: function(){}
			  });

		  });

		  $('.J_GoodFeedback').on('click', function() {
			  $('.help-feedback-btn-wrap').hide();
			  $('.submitted-feedback-good').show();
			  //addVotedCount();
			  updateFeedback({
				  type: 0
			  }, function() {

			  }, function() {
				  //showTip('鎶曠エ澶辫触锛岃绋嶅悗鍐嶈瘯鍝︿翰');

			  });
		  });



		  $('.J_BadFeedback').on('click', function() {
			  var type=$(this).attr('type')==='fixed'?'fixed':'normal';
			  $('.help-feedback-btn-wrap').hide();
			  $('.submitted-feedback-bad').show();

			  showSuggestModal(type);
			  //addVotedCount();

			  updateFeedback({
				  type: 1
			  }, function() {

			  }, function() {
				  //showTip('鎶曠エ澶辫触锛岃绋嶅悗鍐嶈瘯鍝︿翰');

			  });
		  });

		  $('.add-suggest').on('click', function() {
			  if($(this).attr('type')==='fixed'){
				  showSuggestModal('fixed');
			  }else{
				  showSuggestModal('normal');
			  }

		  });


		  $('.J_Suggest').on('keyup', function() {
			  var reason = $('.J_Suggest').val();
			  var count = getBytesCount(reason);
			  /*remove瀛楁暟闄愬埗*/
			  // var limit = 200;
			  // if (count > 0 && count <= limit) {
			  //     $('.J_SubmitSuggest').removeClass('submit-btn-disabled');
			  // } else {
			  //     $('.J_SubmitSuggest').addClass('submit-btn-disabled');
			  // }
			  // if (count > limit) {
			  //     $('.J_RemainText').text('宸茶秴鍑�');
			  //     $('.J_RemainCount').text(count - limit).addClass('error');
			  // } else {
			  //     $('.J_RemainText').text('杩樺彲杈撳叆');
			  //     $('.J_RemainCount').text(limit - count).removeClass('error');
			  // }

			  if(count>0){
				  $('.J_SubmitSuggest').removeClass('submit-btn-disabled');
			  }else{
				  $('.J_SubmitSuggest').addClass('submit-btn-disabled');
			  }

		  });

		  $('.J_SubmitSuggest').on('click', function() {
			  additional = true;
			  var reason = $('.J_Suggest').val();

			  var addSuggestLink = $('.add-suggest');
			  var tipText = $('.submitted-feedback-bad').all('.tip-text');

			  var titCount = getBytesCount(reason);
			  /*鍘绘帀瀛楁暟闄愬埗
			   if (titCount > 200) {
			   showTip("涓嶆弧鎰忓唴瀹硅繃闀匡紝闄愬埗涓�200闀垮害(涓枃鍗犱袱涓�)");
			   return false;
			   }*/
			  if (titCount === 0) {
				  showTip('璇峰～鍐欎笉闈犺氨鐨勫師鍥犲摝');
				  return false;
			  }

			  var EncodedReason = encodeURI(reason);
			  updateFeedback({
				  type: 1,
				  memo: EncodedReason
			  }, function() {
				  addSuggestLink.hide();
				  tipText.show();
				  showTip('鎻愪氦寤鸿鎴愬姛');
				  hideSuggestModal();
			  }, function() {
//				  addSuggestLink.show();
//				  tipText.hide();
//				  showTip('鎻愪氦寤鸿澶辫触锛岃绋嶅悗鍐嶈瘯鍝�');
				  addSuggestLink.hide();
				  tipText.show();
				  showTip('鎻愪氦寤鸿鎴愬姛');
				  hideSuggestModal();

			  });
		  });

		  function getBytesCount(str) {
			  return (str.length + str.replace(/[\u0000-\u00ff]/g, "").length);
		  }

	  }

    };

	  S.ready(function(){
		  main.init();
	  });

  });
	





})()
