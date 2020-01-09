( function( $, QUnit ) {

	"use strict";

	var $testCanvas = $( "#testCanvas" );
	var $fixture = null;

	QUnit.module( "jQuery Calenadar Heatmap", {
		beforeEach: function() {

			// fixture is the element where your jQuery plugin will act
			$fixture = $( "<div/>" );

			$testCanvas.append( $fixture );
		},
		afterEach: function() {

			// we remove the element to reset our plugin job :)
			$fixture.remove();
		}
	} );

	QUnit.test( "is inside jQuery library", function( assert ) {

		assert.equal( typeof $.fn.CalendarHeatmap, "function", "has function inside jquery.fn" );
		assert.equal( typeof $fixture.CalendarHeatmap, "function", "another way to test it" );
	} );

	QUnit.test( "returns jQuery functions after called (chaining)", function( assert ) {
		assert.equal(
			typeof $fixture.CalendarHeatmap([]).on,
			"function",
			"'on' function must exist after plugin call" );
	} );

	QUnit.test( "caches plugin instance", function( assert ) {
		$fixture.CalendarHeatmap([]);
		assert.ok(
			$fixture.data( "plugin_CalendarHeatmap" ),
			"has cached it into a jQuery data"
		);
	} );

}( jQuery, QUnit ) );
