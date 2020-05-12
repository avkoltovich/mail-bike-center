"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var replace = require('gulp-replace');
var sass = require("gulp-sass");
var server = require("browser-sync").create();
var del = require("del");

var EmailBuilder = require('gulp-email-builder');

var options = {
  encodeSpecialChars: false,
  // emailTest : {

  //   // Email to send to
  //   to : 'avkoltovich@mail.ru, avkoltovich@yandex.ru, avkoltovich@gmail.com',

  //   // Email sent from
  //   from: 'avkoltovich.test@gmail.com',

  //   // Your email Subject
  //   subject : 'LEMI KIDS',

  //   // Optional
  //   nodemailer: {
  //     transporter: {
  //       service: 'gmail',
  //       auth: {
  //         user: 'avkoltovich.test',
  //         pass: 'Dc1950nb'
  //       }
  //     },
  //     defaults: {}
  //   }
  // }
};

var builder = EmailBuilder(options);

gulp.task('emailBuilder', function() {
  return gulp.src(['build/*.html'])
    .pipe(replace(/src="img\//g, 'src="' + 'https://lemikids.ru/images/mailing/'))
    .pipe(builder.build())
    .pipe(gulp.dest('send/'));
});

gulp.task("css", function() {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function() {
  return gulp
    .src("source/*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function() {
  return gulp
    .src(
      [
        "source/img/**",
        "source/fonts/**"
      ],
      {
        base: "source"
      }
    )
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("build", gulp.series("clean", "copy", "css", "html"));
gulp.task("start", gulp.series("build", "server"));
gulp.task("send", gulp.series("build", "emailBuilder"));
