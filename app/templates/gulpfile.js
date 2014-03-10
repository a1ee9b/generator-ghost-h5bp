var gulp = require('gulp'),
    concat = require('gulp-concat'),
    exec = require('gulp-exec'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();


gulp.task( 'template', function () {
  return gulp.src('*.hbs')
    .pipe( livereload( server ));
});

gulp.task( 'style', function () {
  return gulp.src( [
      'bower_components/normalize-css/normalize.css',
      'dev/styles/boilerplate.css',
      'dev/styles/main.css'
    ])
    .pipe( concat( 'main.css' ))
    .pipe( gulp.dest( 'assets/css' ))
    .pipe( livereload( server ));
});

gulp.task( 'scripts', function () {
  return gulp.src( [
      'dev/scripts/main.js'
    ])
    .pipe( concat( 'main.js' ))
    .pipe( gulp.dest( 'assets/js' ))
    .pipe( livereload( server ));
});

gulp.task( 'lib', function () {
  return gulp.src( [
      'bower_components/modernizr/modernizr.js',
      'dev/scripts/livereload.js'
    ])
    .pipe( concat( 'lib.js' ))
    .pipe( gulp.dest( 'assets/js' ))
    .pipe( livereload( server ));
});

gulp.task('ghost', function() {
  gulp.src('')
    .pipe(exec( 'cd ../../../; npm start' ));
});

gulp.task('watch', function() {
  // Listen on port 35729
  server.listen( 35729, function ( err ) {
    if ( err ) {
     return console.log( err );
    };

    gulp.watch( 'dev/styles/*.css', ['style'] );
    gulp.watch( 'dev/scripts/*.js', ['scripts'] );
    gulp.watch( '*.hbs', ['template'] );
  });
});


gulp.task( 'default', ['style', 'lib', 'scripts'], function() {
    gulp.start( 'ghost', 'watch' );
});