(function ($, root) {
    function AudioManager() {
        // 创建audio对象
        this.audio = new Audio();
        // 设置当前状态
        this.status = 'pause';
    }
    AudioManager.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
            this.audio.src = src;
            // 加载不播放
            this.audio.load();
        },
        playTo: function (time) {
            // 跳到当前时间
            this.audio.currentTime = time;
        }
    }
    root.audioManager = new AudioManager();
}(window.Zepto, window.player || (window.player = {})))