const gulp = require('gulp'),
      sass = require('gulp-sass'),
      babel = require('gulp-babel'),
      browserSync = require('browser-sync').create(),
      shell = require('gulp-shell');




gulp.task('sass', () => 
    gulp.src('src/sass/**/*.scss')
    .pipe( sass().on('error', sass.logError) )
    .pipe(gulp.dest('dist/css'))
    .pipe( browserSync.stream() )
);

gulp.task('babel', () => 
    gulp.src('src/js/app.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist/js'))
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