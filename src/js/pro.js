(function ($, root) {
    // 进度条模块
    var framId;
    var dur;
    var startTime;
    var lastPer = 0;
    function renderAllTime(time) {
        dur = time;
        time = forMatTime(time);
        $('.all-time').html(time);
    }
    function forMatTime(time) {
        time = Math.round(time);//四舍五入取整
        var m = Math.floor(time / 60);
        var s = time - m * 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ":" + s;
    }
    function start(p) {
        lastPer = p == undefined ? lastPer : p;
        startTime = new Date().getTime();
        function fram() {
            cancelAnimationFrame(framId);
            var nowTime = new Date().getTime();
            // 百分比
            var per = lastPer + (nowTime - startTime) / (dur * 1000);
            if (per < 1) {
                upDate(per);
            } else {
                cancelAnimationFrame(framId);//取消定时器
            }
            framId = requestAnimationFrame(fram);//相当于setTimeOut(fram, 16.7)
        }
        fram();
    }
    function upDate(per) {
        // 根据百分比渲染进度条和时间
        var time = forMatTime(per * dur);
        $('.cur-time').html(time);
        var perX = (per - 1) * 100 + '%';
        $('.pro-top').css({
            transform: 'translateX('+ perX + ')'
        })
    }
    function stop() {
        cancelAnimationFrame(framId);
        // 记录最后暂停的时间，计算百分比，做累加
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (dur * 1000);
    }
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        upDate: upDate
    }
}(window.Zepto, window.player || (window.player = {})))