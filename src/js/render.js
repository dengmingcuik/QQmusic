// 渲染页面
(function ($, root) {
    function renderImg(src) {
        var img = new Image;
        img.src = src;
        img.onload = function () {
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'));
        }
    }
    function renderInfo(data) {
        var str = '<div class="song-name">' + data.song + '</div>\
        <div class="singer-name">' + data.singer + '</div>\
        <div class="album-name">' + data.album + '</div>';
        $('.song-info').html(str);
    }
    function renderIsLike(like) {
        if (like) {
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }
    function renderList(dataArr) {
        var str = '';
        dataArr.forEach(function (ele, index) {
            str += '<li class="song-list" data="' + index + '">'+ ele.singer + ' - ' + ele.song + '</li>';
        })
        $('.list-box ul').html(str);
    }
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
    root.renderList = renderList;
}(window.Zepto, window.player || (window.player = {})))