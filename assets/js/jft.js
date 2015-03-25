'use strict';

var L = require( 'leaflet' );
//require( 'leaflet-markercluster' );
var corslite = require( 'corslite' );
var dsv = require( 'dsv' );
var aCsver = dsv( ',' );
var gomno = require( './gomno' );
var jftUtils = require( './JftUtils.js' );
var log4javascript = require( 'log4javascript' );
//var oldApp = require( './app.js' );

var rowcaEbolaRows = null;
var log = log4javascript.getLogger( "app" );
log.setLevel( log4javascript.Level.TRACE )
//var appender = new log4javascript.BrowserConsoleAppender();
//log.addAppender(appender);
//log.setLevel
log.debug( 'in jft.js: just accessed log4javascript' );


//corslite( "data/csv/test_1.csv", onDataLoad );
corslite( "data/jft/rowca-ebola-adm2.2014-12-22.csv", onTestCsvDataLoad );

function onTestCsvDataLoad( anError, aResponse ) 
  {
  log.trace( 'in onTestCsvDataLoad' );
  if( anError )
    log.trace( "onTestCsvDataLoad() errored" + anError );
  else
    {
    log.trace( "onTestCsvDataLoad(): no error" );
    /* JFT-TODO: want an accessor for typing the fields on read */
    rowcaEbolaRows = aCsver.parse( aResponse.responseText );
    log.trace( '  #rows loaded = ' + rowcaEbolaRows.length ); 
    }

  log.trace( "====================== Next, testGeocoder" )
  testGeocoder();
  }

function testGeocoder() {
  // This is the interface I'm building
  L.Geocoder.fetchGeocodeForName( "Monrovia", onNominatimReady, this );
  log.debug( "Monrovia request kicked off" );

  // The above just wraps this (note same callbacks) but I'll probalby get rid of L.Control.Geocoder if it's worth the bother
  var aNommer = new L.Control.Geocoder.Nominatim();
  aNommer.initialize();
  aNommer.geocode( "Seattle, WA", onNominatimReady, this );
  log.trace( 'aNommer=' + aNommer );
  }

function onNominatimReady( result ) {
  log.debug( "onNomReady():" )
  log.trace( "  result=" + result );
  for( var i = 0; i < result.length; ++i )
    log.trace( "    lat=" + result[i].properties.lat + ' for loc=' + result[i].properties.display_name );
  }

//log.trace( aCsver );
//aCsver( "assets/csv/test_1.csv" );


/* when go to D3 for markers
sgv.addwhatever(all_location_markers_long_lats).enter().append( "g"  ...)  then later
var locationMarker = sgv.selectAll( "#locationMarker" ).data(whatever_the_current_is) // which is an array?
...
locationMarker.data( whatever_the_current_is_now )
*/


log.trace( 'jft.js(:ebola-mapper.js): finished parsing' );





