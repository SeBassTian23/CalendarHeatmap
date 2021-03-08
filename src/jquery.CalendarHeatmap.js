;( function( $ ) {

    "use strict";

        // Default Options
        var pluginName = "CalendarHeatmap",
            defaults = {
                title: null,
                months: 12,
                weekStartDay: 1,
                lastMonth: moment().month() + 1,
                lastYear: moment().year(),
                coloring: null,
                labels: {
                    days: false,
                    months: true,
                    custom: {
                        weekDayLabels: null,
                        monthLabels: null
                    }
                },
                tiles: {
                    shape: "square"
                },
                legend: {
                    show: true,
                    align: "right",
                    minLabel: "Less",
                    maxLabel: "More"
                },
                tooltips: {
                    show: false,
                    options: {}
                }
            };

        // The actual plugin constructor
        function Plugin( element, data, options ) {
            this.element = element;
            this.data = data;
            this.settings = $.extend( true, {}, defaults, options );
            this._defaults = defaults;
            this._name = pluginName;
            this.init();
        }

        // Avoid Plugin.prototype conflicts
        $.extend( Plugin.prototype, {
            init: function() {

                // Run Calandar Heatmap Function
                this.calendarHeatmap();

                // Check if the moment.js library is available.
                if ( !moment ) {
                    console.log( "The calendar heatmap plugin requires moment.js" );
                }
            },
            parse: function() {
                var arr = [];
                if ( !Array.isArray( dates ) || typeof dates !== "object" ) {
                    console.log( "Invalid data source" );
                    return null;
                } else {
                    if ( Array.isArray( dates ) && dates.length > 0 ) {
                        var arrtype = typeof dates[ 0 ];
                        if ( typeof dates[ 0 ] === "object" && !Array.isArray( dates[ 0 ] ) ) {
                            if ( dates[ 0 ].date && dates[ 0 ].count ) {
                                arr = [];
                                for ( var h in dates ) {
                                    var objDate = dates[ h ].date;
                                    if ( $.isNumeric( dates[ h ].date ) ) {
                                        objDate = parseInt( dates[ h ].date );
                                    }
                                    arr.push( {
                                        "count": parseInt( dates[ h ].count ),
                                        "date": moment( objDate ).format( "YYYY-MM-DD" )
                                    } );
                                }
                                return arr;
                            } else {
                                    console.log( "Invalid Object format." );
                                return null;
                            }
                        } else if ( [ "string", "date", "number" ].indexOf( arrtype ) > -1 ) {
                            if ( moment( dates[ 0 ] ).isValid() ) {
                                var obj = {};
                                for ( var i in dates ) {
                                    var d = moment( dates[ i ] ).format( "YYYY-MM-DD" );
                                    if ( !obj[ d ] ) {
                                        obj[ d ] = 1;
                                    } else {
                                        obj[ d ] += 1;
                                    }
                                }
                                arr = [];
                                for ( var j in obj ) {
                                    arr.push( {
                                        "count": parseInt( obj[ j ] ),
                                        "date": j
                                    } );
                                }
                                return arr;
                            } else {
                                console.log( "Invalid Date format." );
                                return null;
                            }
                        } else {
                            console.log( "Invalid format." );
                            return null;
                        }
                    } else if ( Array.isArray( dates ) && dates.length === 0 ) {
                        return [];
                    } else if ( typeof dates === "object" && !Object.empty( dates ) ) {
                        var keys = Object.keys( dates );
                        if ( moment( keys[ 0 ] ).isValid() ) {
                            if ( this._isNumeric( dates[ keys[ 0 ] ] ) ) {
                                var data = [];
                                for ( var k in dates ) {
                                    data.push( {
                                        "count": parseInt( dates[ k ] ),
                                        "date": moment( k ).format( "YYYY-MM-DD" )
                                    } );
                                }
                                return data;
                            }
                        } else {
                            console.log( "Invalid Date format." );
                            return null;
                        }
                    } else {
                        return null;
                    }
                }
            },
            pad: function( str, max ) {
                str = String( str );
                return str.length < max ? this.pad( "0" + str, max ) : str;
            },
            calculateBins: function( events ) {

                // Calculate bins for events
                var i;
                var bins = this.settings.steps || 4;
                var binlabels = [ "0" ];
                var binlabelrange = [ [ 0, 0 ] ];

                var arr = events.map( function( x ) {
                    return parseInt( x.count );
                } );

                var minCount = Math.min.apply( Math, arr );
                var maxCount = Math.max.apply( Math, arr );
                var stepWidth = ( maxCount - minCount ) / bins;

                if ( stepWidth === 0 ) {
                    stepWidth = maxCount / bins;
                    if ( stepWidth < 1 ) {
                        stepWidth = 1;
                    }
                }

                // Generate bin labels
                for ( i = 0; i < bins; i++ ) {
                    if ( !isFinite( minCount ) ) {
                        binlabels.push( "" );
                        binlabelrange.push( [ null, null ] );
                    } else if ( maxCount < bins ) {
                        if ( ( i - ( bins - maxCount ) ) >= 0 ) {
                            binlabels.push( String( 1 + ( i - ( bins - maxCount ) ) ) );
                            binlabelrange.push( [
                                ( 1 + ( i - ( bins - maxCount ) ) ),
                                ( 1 + ( i - ( bins - maxCount ) ) )
                            ] );
                        } else {
                            binlabels.push( "" );
                            binlabelrange.push( [ null, null ] );
                        }
                    } else if ( maxCount === bins ) {
                        binlabels.push( String( ( i + 1 ) ) );
                        binlabelrange.push( [ ( i + 1 ), ( i + 1 ) ] );
                    } else if ( ( maxCount / 2 ) < bins ) {
                        if ( ( i + 1 ) === bins ) {
                            binlabels.push( String( ( i + 1 ) ) + "+" );
                            binlabelrange.push( [ ( i + 1 ), null ] );
                        } else {
                            binlabels.push( String( ( i + 1 ) ) );
                            binlabelrange.push( [ ( i + 1 ), ( i + 1 ) ] );
                        }
                    } else {
                        var l = Math.ceil( i * stepWidth ) + 1;
                        var ll = Math.ceil( i * stepWidth + stepWidth );
                        if ( i === ( bins - 1 ) ) {
                            ll = maxCount;
                        }
                        binlabelrange.push( [ l, ll ] );

                        // TODO: Fix counting issue:  && ll < maxCount
                        if ( i === ( bins - 1 ) ) {
                            l += "+";
                        } else {
                            if ( l !== ll ) {
                                l += " to ";
                                l += ll;
                            }
                        }
                        binlabels.push( String( l ) );
                    }
                }

                // Assign bins to counts
                for ( i in events ) {

                    if ( events[ i ].count === 0 ) {
                        events[ i ].level = 0;
                    } else if ( events[ i ].count - minCount === 0 ) {
                        events[ i ].level = 1;
                    } else if ( !isFinite( minCount ) ) {
                        events[ i ].level = bins;
                    } else {
                        events[ i ].level = this.matchBin( binlabelrange, events[ i ].count );
                    }
                }

                return { events: events, bins: binlabels };
            },
            matchBin: function( range, value ) {
                for ( var r in range ) {
                    if ( value >= range[ r ][ 0 ] && value <= range[ r ][ 1 ] ) {
                        return r;
                    }
                }
                return 0;
            },
            matchDate: function( obj, key ) {
                return obj.find( function( x ) {
                    return x.date === key;
                } ) || null;
            },
            futureDate: function( str ) {
                return moment( str ).diff( moment(), "days" ) >= 0 &&
                moment( str ).format( "YYYY-MM-DD" ) !== moment().format( "YYYY-MM-DD" ) ?
                true : false;
            },
            _isNumeric: function( n ) {
                return !isNaN( parseFloat( n ) ) && isFinite( n );
            },
            _addWeekColumn: function( ) {
                if ( this.settings.labels.days ) {
                    $( ".ch-year", this.element )
                        .append( "<div class=\"ch-week-labels\"></div>" );

                    $( ".ch-week-labels", this.element )
                        .append( "<div class=\"ch-week-label-col\"></div>" );

                    $( ".ch-week-label-col", this.element )
                        .append( "<div class=\"ch-day-labels\"></div>" );

                    // If month labels are displayed a placeholder needs to be added
                    if ( this.settings.labels.months ) {
                        $( ".ch-week-labels", this.element )
                            .append( "<div class=\"ch-month-label\">&nbsp;</div>" );
                    }

                    var swd = this.settings.weekStartDay;

                    for ( var i = 0; i < 7; i++ ) {

                        var dayName = moment().weekday( ( i + swd ) ).format( "ddd" );
                        var dayNumber = moment().weekday( ( i + swd ) ).format( "d" );
                        if ( ( i - 1 ) % 2 ) {
                            var wdl = this.settings.labels.custom.weekDayLabels;
                            if ( Array.isArray( wdl ) ) {
                                dayName = wdl[ dayNumber ] || "";
                            } else if ( typeof wdl === "string" ) {
                                dayName = moment().weekday( ( i + swd ) )
                                .format( wdl );
                            }
                        } else {
                            dayName = "&nbsp;";
                        }
                        $( "<div>", {
                            class: "ch-day-label",
                            html: dayName
                        } )
                        .appendTo( $( ".ch-day-labels", this.element ) );
                    }
                }
            },
            calendarHeatmap: function( ) {

                var data = this.parse();

                if ( !Array.isArray( data ) ) {
                    return;
                }

                var calc = this.calculateBins( data );
                var events = calc.events;
                var binLabels = calc.bins;
                var currMonth = this.settings.lastMonth;
                var currYear = this.settings.lastYear;
                var months = this.settings.months;
                var i;

                // Start day of the week
                var swd = this.settings.weekStartDay || 1;

                // Empty container first
                $( this.element ).empty();

                // Add a title to the container if not null
                if ( this.settings.title ) {
                    $( "<h3>", {
                        class: "ch-title",
                        html: this.settings.title
                    } ).appendTo( $( this.element ) );
                }

                // Add the main container for the year
                $( this.element ).addClass( "ch" )
                    .append( "<div class=\"ch-year\"></div>" );

                // Add labels
                this.addWeekColumn();

                // Adjust tile shape
                if ( this.settings.tiles.shape && this.settings.tiles.shape !== "square" ) {
                    $( this.element ).addClass( " ch-" + this.settings.tiles.shape );
                }

                // Start building the months
                for ( i = months; i > 0; i-- ) {

                    var month = currMonth - i;
                    var year = currYear;
                    if ( month < 0 ) {
                        year -= 1;
                        month += 12; // TODO: FIX for more than one year
                    }

                    // Build Month
                    var monthName = moment().set( { "month": month, "year": year } )
                    .format( "MMM" );
                    if ( this.settings.labels.custom.monthLabels ) {
                        if ( Array.isArray( this.settings.labels.custom.monthLabels ) ) {
                            monthName = this.settings.labels.custom.monthLabels[ month ] || "";
                        } else {
                            monthName = moment().set( { "month": month, "year": year } )
                                .format( this.settings.labels.custom.monthLabels );
                        }
                    }
                    $( ".ch-year", this.element )
                        .append( "<div class=\"ch-month\"></div>" );

                    $( ".ch-month:last", this.element )
                        .append( "<div class=\"ch-weeks\"></div>" );

                    if ( this.settings.labels.months ) {
                        $( ".ch-month:last", this.element )
                        .append( "<div class=\"ch-month-label\">" + monthName + "</div>" );
                    }

                    // Get the number of days for the month
                    var days = moment().set( { "month": month, "year": year } ).daysInMonth();

                    // Add the first week
                    $( ".ch-month:last .ch-weeks", this.element )
                        .append( "<div class=\"ch-week\"></div>" );

                    // Week day counter
                    var wc = 0;
                    for ( var j = 0; j < days; j++ ) {
                        var str = year + "-" + this.pad( ( month + 1 ), 2 );
                        str += "-" + this.pad( ( j + 1 ), 2 );
                        var obj = this.matchDate( events, str );
                        var future = "";
                        if ( this.futureDate( str ) ) {
                            future = " is-after-today";
                        }
                        if ( obj ) {
                            var title = obj.count + " on ";
                            title += moment( obj.date ).format( "ll" );

                            var color = "";

                            if ( this.settings.coloring ) {
                                color = " " + this.settings.coloring + "-" + obj.level;
                            }

                            $( "<div/>", {
                                "class": "ch-day lvl-" + obj.level + color,
                                "title": title,
                                "data-toggle": "tooltip"
                            } ).appendTo(
                                $( ".ch-month:last .ch-weeks .ch-week:last", this.element )
                            );

                        } else {
                            $( "<div/>", {
                                "class": "ch-day" + future
                            } ).appendTo(
                                $( ".ch-month:last .ch-weeks .ch-week:last", this.element )
                            );
                        }

                        // Get the iso week day to see if a new week has started
                        var wd = moment().set( {
                            "date": ( j + 2 ),
                            "month": month,
                            "year": year
                        } ).isoWeekday();

                        // Incrementing the day counter for the week
                        wc++;

                        if ( wd === swd  && ( days - 1 ) > j ) {

                            $( ".ch-month:last .ch-weeks", this.element )
                                .append( "<div class=\"ch-week\">" + j + "</div>" );

                            // Reset the week day counter
                            wc = 0;
                        }
                    }

                    // Now fill up the last week with blank days
                    for ( wc; wc < 7; wc++ ) {
                        $( ".ch-month:last .ch-weeks .ch-week:last", this.element )
                            .append( "<div class=\"ch-day is-outside-month\"></div>" );
                    }
                }

                // Add a legend
                if ( this.settings.legend.show ) {

                    // Add the legend container
                    $( "<div>", {
                        class: "ch-legend"
                    } )
                    .appendTo( this.element )
                    .append( "<small>" + ( this.settings.legend.minLabel || "" ) + "</small>" )
                    .append( "<ul class=\"ch-lvls\"></ul>" )
                    .append( "<small>" + ( this.settings.legend.maxLabel || "" ) + "</small>" );

                    if ( this.settings.legend.align === "left" ) {
                        $( ".ch-legend", this.element ).addClass( "ch-legend-left" );
                    }

                    if ( this.settings.legend.align === "center" ) {
                        $( ".ch-legend", this.element ).addClass( "ch-legend-center" );
                    }

                    // Add the legend steps
                    for ( i = 0; i < binLabels.length; i++ ) {
                        $( "<li>", {
                            "class": "ch-lvl lvl-" + i,
                            "title": binLabels[ i ],
                            "data-toggle": "tooltip"
                        } )
                        .appendTo( $( ".ch-lvls", this.element ) );
                        if ( this.settings.coloring ) {
                            $( ".ch-lvls li:last", this.element  )
                            .addClass( this.settings.coloring + "-" + i );
                        }
                    }
                }

                // Add tooltips to days and steps
                if ( this.settings.tooltips.show && typeof $.fn.tooltip === "function" ) {
                    $( "[data-toggle=\"tooltip\"]", this.element )
                    .tooltip( this.settings.tooltips.options );
                }
            }
        } );

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[ pluginName ] = function( data, options ) {
            return this.each( function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" +
                        pluginName, new Plugin( this, data, options ) );
                }
            } );
        };

} )( jQuery );
