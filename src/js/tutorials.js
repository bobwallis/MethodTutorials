require( ['jquery', './lib/Grid', './lib/RingingPractice', './lib/PlaceNotation','./lib/webfont'], function( $, Grid, RingingPractice, PlaceNotation, webfont ) {
	var bluelines = window['bluelines'],
		practices = window['practices'];

	// Update viewport meta tag on orientation change
	$(window).on( 'orientationchange resize', function() {
		$( '#viewport' ).attr( 'content',(window.innerWidth < 440)? 'width=440' : 'width=device-width' );
	} );
	
	// Enable tabs
	$( '.tabs' )
		.each( function( i, v ) {
			$(v).addClass( 'tabs-'+$( 'li', v ).length );
		} )
		.on( 'click touchstart', function( e ) {
			var $target = $( e.target ),
				$tabs = $target.closest( '.tabs' ),
				active = $( 'li', $tabs ).index( $target );
			$( 'li', $tabs ).removeClass( 'active' ).eq( active ).addClass( 'active' );
			$( '> div', $target.closest( '.box' ) ).hide().eq( active ).show();
			e.preventDefault(); // This prevents click emulation, so the click event won't fire as well if we're doing a touch event
		} );
	
	$( '.box' ).each( function( i, v ) {
			v = $(v);
			if( typeof v.attr( 'data-active' ) !== 'undefined' ) {
				$( 'li:eq('+v.attr( 'data-active' )+')', v ).addClass( 'active' );
				$( '> div', v ).not( ':eq('+v.attr( 'data-active' )+')' ).hide();
			}
		} );

	// Create grids
	var createGrids = function() {
		for( var id in bluelines ) {
			var grid = Grid( $.extend( {
				dimensions: {
					bell: {
						height: 15
					}
				}
			}, bluelines[id] ) );
			$('#'+id).append( grid.draw() );
		}
	};
	// Defer creation until ithe Blueline font has loaded (but if it fails then load anyway as we'll fallback to the system default)
	webfont( 'Blueline', createGrids, createGrids );

	// Create practice interfaces
	for( var id in practices ) {
		var $prac = $( '#'+id ),
			pracHeight = 330;
		$prac.height( pracHeight );
		RingingPractice( $.extend( {
			container: id,
			width: $prac.parent().width(),
			height: pracHeight
		}, practices[id] ) );
	}
} );