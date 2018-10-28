const gulp = require('gulp'),
      sass = require('gulp-sass'),
      babel = require('gulp-babel'),
      browserSync = require('browser-sync').create(),
      shell = require('gulp-shell'),
      browserify = require('browserify'),
      fs = require('fs');




gulp.task('sass', () => 
    gulp.src('src/sass/**/*.scss')
    .pipe( sass({outputStyle: 'compressed'}).on('error', sass.logError) )
    .pipe(gulp.dest('dist/css'))
    .pipe( browserSync.stream() )
);

gulp.task('babel', () => 
    browserify('src/js/app.js')
    .transform('babelify', { presets: ['@babel/env']})
    .bundle()
    .pipe( fs.createWriteStream('dist/js/app.js') )
);

gulp.task('build', shell.task(['bundle exec jekyll build --watch']) );

gulp.task('serve', () => {
    browserSync.init({
        files: '_site/**',
        port: 4000,
        server: {
            baseDir: '_site/'
        }

    });

    gulp.watch('src/sass/**/*.scss', ['sass'], browserSync.reload() );
    gulp.watch('src/js/app.js', ['babel'], (done) => {
        browserSync.reload();
        done();
    });
});

gulp.task('default', ['sass', 'babel', 'build', 'serve']);