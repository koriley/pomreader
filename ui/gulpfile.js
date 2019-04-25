'use strict';
var gulp = require('gulp');
// var sass = require('gulp-sass');
var browser = require('browser-sync').create();
var rimraf = require('rimraf');
// var webpack4 = require('webpack');
var webpackStream = require('webpack-stream');
var panini = require('panini');
var run = require("run-sequence").use(gulp);
var named = require("vinyl-named");
var yaml = require("js-yaml");
var plugins = require("gulp-load-plugins");
var fs = require("fs");
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
var concatCss = require('gulp-concat-css');
var bablePolly = require("babel-polyfill");

sass.compiler = require('node-sass');

var $ = plugins({
    scope: ['dependencies', 'devDependencies', 'peerDependencies']
});

var {
    COMPATIBILITY,
    PORT,
    UNCSS_OPTIONS,
    PATHS,
    MOVE
} = loadConfig();

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}



//gulp 4.0
gulp.task('build',
    gulp.series(clean, gulp.parallel(pages, js, addBoot, scss, images)));
//gulp 3.9
// gulp.task('build', function () {
//     run('sass', 'images', 'pages','moveJS', 'js', 'copy', 'server', 'watch');
// });

//gulp 4.0
gulp.task('default',
    gulp.series('build', location, server, watch));
//gulp 3.9
// gulp.task('default', ['clean']);
// gulp.task("runner", ['default'], function(){
//     console.log("running")
// });

//gulp 4.0
function scss() {
    return gulp.src('src/assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browser.reload({
            stream: true
        }));
}
//gulp 3.9
// gulp.task('sass', function () {
//     return gulp.src('src/assets/scss/**/*.scss')
//         .pipe($.sass({
//             includePaths: PATHS.sass
//           }))
//         .pipe(gulp.dest(PATHS.dist + '/assets/css'))
//         .pipe(browser.reload({
//             stream: true
//         }));
// });
function location(){
    return gulp.src('dist/**/*')
    .pipe(gulp.dest('../views'))
}
//gulp 4.0
function server(done) {
    browser.init({
        server: {
            baseDir: '../views'
        }
    });
    done();
}
//gulp 3.9
// gulp.task('server', function () {
//     browser.init({
//         server: {
//             baseDir: PATHS.dist
//         }
//     });

// });

//gulp 4.0
function reload(done) {
    browser.reload();
    done();
}

// Copy all static images
//gulp 4.0
function images() {
    return gulp.src("src/assets/img/**/*")
        // Pass in options to the task
        // .pipe(imagemin({
        //     optimizationLevel: 5
        // }))
        .pipe(gulp.dest('dist/assets/img'));
};
//gulp 3.9
// gulp.task('images', function () {
//     return gulp.src("src/assets/img/**/*")
//         // Pass in options to the task
//         .pipe($.imagemin({
//             optimizationLevel: 5
//         }))
//         .pipe(gulp.dest(PATHS.dist + '/assets/img'));
// });

//gulp 4.0
function watch() {
    gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages,location, browser.reload));
    gulp.watch('src/{layouts,partials}/**/*.html').on('all', gulp.series(resetPages, pages,location, browser.reload));
    gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(scss,location, browser.reload));
    gulp.watch('src/assets/js/**/*.js').on('all', gulp.series(js, addBoot, location, browser.reload));
    gulp.watch('src/assets/img/**/*').on('all', gulp.series(images,location, browser.reload));

}
//gulp 3.9
// gulp.task('watch', function () {
//     gulp.watch('src/pages/**/*.html', ['pages', browser.reload]);
//     gulp.watch('src/{layouts,partials}/**/*.html', ['refresh', 'pages', browser.reload]);
//     gulp.watch('src/assets/scss/**/*.scss', ['sass']);
//     gulp.watch('src/assets/js/**/*.js', ['js', browser.reload]);
//     gulp.watch('src/assets/img/**/*', ["images", browser.reload]);
//     gulp.watch('src/assets/**/*', ["copy", browser.reload]);
// });

gulp.task('refresh', function () {
    panini.refresh();
});
// gulp 4.0
function clean(done) {
    rimraf("./dist", done)
    rimraf('../views/', done);
}
// gulp 3.9
// gulp.task('delDir', function () {
//      rimraf('dist', function (done){});
//      rimraf('../views/', function (done){});
// });

// Copy page templates into finished HTML files
//gulp 4.0
function pages() {
    return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
        .pipe(panini({
            root: 'src/pages/',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            data: 'src/data/',
            helpers: 'src/helpers/'
        }))
        .pipe(gulp.dest(PATHS.dist));
};

//gulp 4.0
function resetPages(done) {
    panini.refresh();
    done();
}

//gulp 4.0
function js() {
    return gulp.src([ '!src/assets/js/libs/', 'src/assets/js/*.js'])
        .pipe(sourcemaps.init())
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        .pipe(concat('app.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/js'));
};

function addBoot(){
    return gulp.src(['src/assets/js/libs/jquery.js', 'src/assets/js/libs/jquery-ui.min.js', 'src/assets/js/libs/bootstrap.js', 'src/assets/js/libs/popper.js'])
    .pipe(gulp.dest('dist/assets/js'));
}
//gulp 3.9

// var webpackConfig = {
//     module: {
//       rules: [
//         {
//           test: /\.(js|jsx)$/,
//           loader: 'babel-loader'
//         }
//       ]
//     }
//   }
// gulp.task('js', function () {
//     return gulp.src(PATHS.entries)
//     .pipe(named())
//     .pipe($.sourcemaps.init())
//     .pipe(webpackStream(webpackConfig))
//     .pipe(gulp.dest(PATHS.dist + '/assets/js'));
// });

// gulp.task("copy", function () {
//     return gulp.src(PATHS.assets)
//       .pipe(gulp.dest(PATHS.dist + '/assets'));
//   });

//   gulp.task("moveJS",function(){
//     return gulp.src(MOVE.js)
//     .pipe(gulp.dest(PATHS.dist + '/assets/js'));
//   })
