$(function(){
  'use strict';
  //返回到页面顶部
  var backToTop = $('.back-to-top');
  backToTop.click(function (e) {
    //jQuery平滑回到顶端效果
    $('html, body').animate({
      scrollTop: 0
    }, {
      duration: 200,
      easing: 'swing'
    });
  });
  //动态显示回到顶部按钮
  var currentScrollTop = 0;
  var hideUpward;
  $(window).scroll(function (e) {
    var scrollTop = $(this).scrollTop();
    backToTop[currentScrollTop > scrollTop && scrollTop > 0 ? 'show' : 'hide']();
    currentScrollTop = scrollTop;
    if (hideUpward) {
      clearTimeout(hideUpward);
    }
    hideUpward = setTimeout(function () {
      backToTop.hide();
    }, 60000);
  });
});