var tutorials = [
	{
		html:  'Cambridge_Surprise_Minor.html',
		title: 'Cambridge Surprise Minor'
	}
];

var DEST = 'dist/';


var gulp         = require( 'gulp' );
var rename       = require( 'gulp-rename' );
var concat       = require( 'gulp-concat');
var gzip         = require( 'gulp-gzip' );
var es           = require( 'event-stream' );
var svg2png      = require( 'gulp-svg2png' );
var less         = require( 'gulp-less' );
var autoprefixer = require( 'gulp-autoprefixer' );
var minifyCss    = require( 'gulp-minify-css' );
var uncss        = require( 'gulp-uncss' );
var imagemin     = require( 'gulp-imagemin' );
var requirejs    = require( 'gulp-requirejs' );
var amdclean     = require( 'gulp-amdclean' );
var uglify       = require( 'gulp-uglify' );
var uglifyInline = require( 'gulp-uglify-inline' )
var mustache     = require( 'gulp-mustache' );
var typogr       = require( 'gulp-typogr' );
var hypher       = require( 'gulp-hypher' );
var h_pattern    = require( 'hyphenation.en-gb' );
var htmlmin      = require( 'gulp-htmlmin' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var ghPages      = require( 'gulp-gh-pages' );

gulp.task('default', ['appicon', 'img', 'favicon', 'fonts', 'css', 'js', 'tutorial_html', 'index_html'], function() {
});


gulp.task( 'appicon', function() {
	var tasks = [70, 76, 120, 150, 152, 180, 192, 310].map( function( size ) {
		return gulp.src( 'src/img/appicon.svg' )
			.pipe( svg2png( size/63 ) )
			.pipe( imagemin() )
			.pipe( rename( function( path ) {
				path.basename += '-'+size;
			} ) )
			.pipe( gulp.dest( DEST+'img/' ) );
	} );
	return es.merge.apply( null, tasks );
} );


gulp.task( 'favicon', function() {
	gulp.src( 'src/img/favicon.ico' )
		.pipe( gulp.dest( DEST ) );
} );



gulp.task( 'fonts', function() {
	gulp.src( 'src/fonts/*' )
		.pipe( gulp.dest( DEST+'fonts/' ) );
} );


gulp.task( 'css', function() {
	gulp.src( 'src/css/_.less' )
		.pipe( less() )
		.pipe( autoprefixer( { browsers: ['last 2 versions'] } ) )
		.pipe( rename( 'tutorials.css' ) )
		.pipe( minifyCss( { keepSpecialComments: 0 } ) )
		.pipe( gulp.dest( DEST+'css/' ) )
		.pipe( gzip() )
		.pipe( gulp.dest( DEST+'css/' ) );
} );


gulp.task( 'img', function() {
	gulp.src( ['src/img/favicon.svg', 'src/img/left.svg', 'src/img/down.svg', 'src/img/right.svg', 'src/img/x.svg'] )
		.pipe( imagemin() )
		.pipe( gulp.dest( DEST+'img/' ) )
		.pipe( gzip() )
		.pipe( gulp.dest( DEST+'img/' ) );
} );


gulp.task( 'js', function() {
	requirejs( {
		baseUrl: 'src/js',
		include: ['tutorials'],
		mainConfigFile: 'src/js/tutorials.js',
		paths: {
			jquery: 'lib/jquery'
		},
		optimize: 'none',
		out: 'tutorials.js'
    } )
		.pipe( amdclean.gulp() )
		.pipe( sourcemaps.init() )
		.pipe( uglify() )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( DEST+'js/' ) )
		.pipe( gzip() )
		.pipe( gulp.dest( DEST+'js/' ) );
} );


gulp.task( 'tutorial_html', function() {
	var tasks = tutorials.map( function( tutorial ) {
		return gulp.src( ['src/html/header.html', 'src/'+tutorial.html, 'src/html/footer.html'] )
			.pipe( concat( tutorial.html ) )
			.pipe( mustache( tutorial ) )
			.pipe( hypher( h_pattern ) )
			.pipe( typogr( { only: ['amp', 'widont', 'caps', 'smartypants'] } ) )
			.pipe( uglifyInline() )
			.pipe( htmlmin( { removeComments: true, collapseWhitespace: true } ) )
			.pipe( gulp.dest( DEST ) )
			.pipe( gzip() )
			.pipe( gulp.dest( DEST ) );
	} );
	return es.merge.apply( null, tasks );
} );


gulp.task( 'index_html', function() {
	gulp.src( ['src/html/header.html', 'src/html/index.html', 'src/html/footer.html'] )
		.pipe( concat( 'index.html' ) )
		.pipe( mustache( { title: 'Method Tutorials', list: tutorials.map( function(m) { return '<li><a href="'+m.html+'">'+m.title+'</a></li>'; } ).join('') } ) )
		.pipe( hypher( h_pattern ) )
		.pipe( typogr( { only: ['amp', 'widont', 'caps', 'smartypants'] } ) )
		.pipe( uglifyInline() )
		.pipe( htmlmin( { removeComments: true, collapseWhitespace: true } ) )
		.pipe( gulp.dest( DEST ) )
		.pipe( gzip() )
		.pipe( gulp.dest( DEST ) );
} );


gulp.task( 'watch', function() {
	gulp.watch( ['src/img/appicon.svg'], ['appicon'] );
	gulp.watch( ['src/img/favicon.*'], ['favicon'] );
	gulp.watch( ['src/css/**/*.less', 'src/css/**/*.css'], ['css'] );
	gulp.watch( ['src/js/**/*.js'], ['js'] );
	gulp.watch( ['src/**/*.html'], ['tutorial_html', 'index_html'] );
} );


gulp.task( 'deploy', function() {
	gulp.src( DEST+'**/*' )
		.pipe( ghPages() );
} );