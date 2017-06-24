var gulp = require('gulp');
var $ = require('gulp-load-plugins')();//自动加载其他插件
var open = require('open');

var app = {
	srcPath: 'src/',	//源代码
	devPath: 'build/',	//开发目录
	prdPath: 'dist/'	//部署目录
};

gulp.task('lib',function(){
	gulp.src('lib/**/*')
	.pipe(gulp.dest(app.devPath + 'lib'))
	.pipe(gulp.dest(app.prdPath + 'lib'))
	.pipe($.connect.reload());
});

gulp.task('html',function(){
	gulp.src(app.srcPath + '**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload());
});

gulp.task('json',function(){
	gulp.src(app.srcPath + 'data/**/*.json')
	.pipe(gulp.dest(app.devPath + 'data'))
	.pipe(gulp.dest(app.prdPath + 'data'))
	.pipe($.connect.reload());
});

gulp.task('less',function(){
	 gulp.src(app.srcPath + 'style/index.less')
	 .pipe($.plumber())
	 .pipe($.less())
	 .pipe(gulp.dest(app.devPath + 'style/css'))
	 .pipe($.cssmin())
	 .pipe(gulp.dest(app.prdPath + 'style/css'))
	 .pipe($.connect.reload());
});

gulp.task('componentLess',function(){
	 gulp.src(app.srcPath + 'script/**/*.less')
	 .pipe($.plumber())
//	 .pipe($.less())
	 .pipe(gulp.dest(app.devPath+'script'))
//	 .pipe($.cssmin())
	 .pipe(gulp.dest(app.prdPath+'script'))
	 .pipe($.connect.reload());
});

gulp.task('js',function(){
	gulp.src(app.srcPath + 'script/**/*.js')
	.pipe($.plumber())
	
	.pipe($.babel({
		presets : ['es2015']
	}))
	
	.pipe($.concat('index.js'))
	.pipe(gulp.dest(app.devPath + 'js'))
	.pipe($.ngAnnotate())
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath + 'js'))
	.pipe($.connect.reload());
});

gulp.task('image',function(){
	gulp.src(app.srcPath +'image/**/*')
	.pipe(gulp.dest(app.devPath + 'image'))
	.pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath + 'image'))
	.pipe($.connect.reload());
})

gulp.task('build',['image','js','less','componentLess','lib','html','json']);

gulp.task('clean',function(){
	gulp.src([app.devPath, app.prdPath])
	.pipe($.clean());
})

gulp.task('serve',['build'],function(){
	$.connect.server({
		root : [app.prdPath],
		livereload:true,
		port:1234
	});
	open('http://localhost:1234');
	gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
	gulp.watch('lib/**/*', ['lib']);
	gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
	gulp.watch(app.srcPath + '**/*.html', ['html']);
	gulp.watch(app.srcPath + 'style/index.less', ['less']);
	gulp.watch(app.srcPath +'image/**/*', ['image']);
})


gulp.task('default',['serve']);
