$(function() {
    // 페이지 로딩
    var userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.match('android') != null) {
        location.href = 'https://goo.gl/qAb4o9	';
    // IOS일 경우
    } else if (userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipad') > -1){
        window.location = 'https://goo.gl/BMHEo6';
    } else {
        alert("모바일에서 이용해 주세요");
    }
});