var gulp = require('gulp');

// 压缩html
var htmlClean = require('gulp-htmlclean');
// 压缩图片
var imageMin = require('gulp-imagemin');
// 压缩js
var uglify = require('gulp-uglify');
// 去掉js中的调试语句
var debug = require('gulp-strip-debug');
// less---css
var less = require('gulp-less');
// 压缩css
var cleanCss = require('gulp-cleancss');
// css前缀
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
// 开启服务器
var connect = require('gulp-connect');
// 判断当前环境变量
var devMod = process.env.NODE_ENV == 'development';
// export NODE_ENV=development  命令行设置环境变量


var folder = {
    src: 'src/',
    dist: 'dist/'
}

gulp.task('html', function () {
    var page = gulp.src(folder.src + 'html/*')
        // 自动刷新页面
        .pipe(connect.reload())
    if (!devMod) {
        page.pipe(htmlClean())
    }
    page.pipe(gulp.dest(folder.dist + 'html/'));
})
gulp.task('image', function () {
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'image/'));
})
gulp.task('css', function () {
    var page = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
    if (!devMod) {
        page.pipe(cleanCss())
    }
    page.pipe(gulp.dest(folder.dist + 'css/'));
})
gulp.task('js', function () {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
    if (!devMod) {
        page.pipe(debug())
            .pipe(uglify())
    }
    page.pipe(gulp.dest(folder.dist + 'js/'));
})
gulp.task('server', function () {
    connect.server({
        port: '8888',
        // 自动刷新
        livereload: true
    })
})

gulp.task('watch', function () {
    // 监听文件变化
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'js/*', ['js']);
})
gulp.task('default', ['html', 'css', 'js', 'image', 'server', 'watch'])