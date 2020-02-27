var root = window.player;
var dataList, len;
var audio = root.audioManager;
var controlIndex;
var timer;
var len;
function getData(url) {
    $.ajax({
        url: url,
        post: 'GET',
        success: function (data) {
            dataList = data;
            len = data.length;
            controlIndex = new root.controlIndex(len);
            bindEvent();
            bindTouch();
            $('body').trigger('playChange', 0);
        },
        error: function () {
            console.log('error');
        }
    })
}
function bindEvent() {
    $('body').on('playChange', function (e, index) {
        root.render(dataList[index]);
        root.renderList(dataList);
        audio.getAudio(dataList[index].audio);
        root.pro.renderAllTime(dataList[index].duration);
        $('.song-list').removeClass('active');
        $('.song-list').eq(index).addClass('active');
        if (audio.status == 'play') {
            audio.play();
            rotated(0);
        }
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            transform: 'rotateZ(0deg)',
            trnasition: 'none'
        })
    })
    $('.prev').on('click', function () {
        var i = controlIndex.prev();
        $('body').trigger('playChange', i);
        root.pro.start(0);
        if (audio.status == 'pause') {
            audio.pause();
            root.pro.stop();
        }
    })
    $('.next').on('click', function () {
        var i = controlIndex.next();
        $('body').trigger('playChange', i);
        root.pro.start(0);
        if (audio.status == 'pause') {
            audio.pause();
            root.pro.stop();
        }
    })
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            root.pro.start();
            rotated($('.img-box').attr('data-deg'));
        } else {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    })
    $('.list').on('click', function () {
        $('.list-mask').show();
    })
    $( '.close-btn').on('click', function () {
        $('.list-mask').hide();
    })
    $('.list-mask').on('click', function () {
        $('.list-mask').hide();
    })
    $('.list-box ul').on('click', function (e) {
        e.stopPropagation();
    })
    $('.list-box ul').on('click', '.song-list', function () {
        var index = +($(this).attr('data'));
        $('body').trigger('playChange', index);
        root.pro.start(0);
        $('.list-mask').hide();
        controlIndex = new root.controlIndex(len, index);
    })
}
function rotated(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function () {
        deg += 1;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            transform: 'rotateZ(' + deg + 'deg)',
            trnasition: 'all 1s ease-out'
        })
    }, 200)
}
// 拖拽进度条
function bindTouch() {
    var left = $('.pro-wrap').offset().left;
    var width = $('.pro-wrap').offset().width;
    $('.spot').on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per < 1) {
            root.pro.upDate(per);
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if (per > 0 && per < 1) {
            var time = dataList[controlIndex.index].duration;
            var curTime = per * time;
            $('.play').addClass('playing');
            audio.playTo(curTime);
            audio.play();
            audio.status = 'play';
            root.pro.start(per);
        }
    })
}
getData('../mock/data.json')