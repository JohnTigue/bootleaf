// Backgrounders on this tech:
//   http://substack.net/how_I_write_tests_for_node_and_the_browser
//   https://ci.testling.com/guide/tape
//   https://medium.com/@brianleroux/es6-modules-amd-and-commonjs-c1acefbe6fc0
var test = require( 'tape' )
var http = require( 'http' )
var cacher = require( '../assets/js/construct_preload_cache_of_locations.js' )

test( 'module load sanity check', function( t ){
    t.plan( 1 )
    t.ok( test, 'tape module loaded ok' )
    }
  )


test( 'check testee loads', function( t ){
    t.plan( 1 )
    t.ok( cacher, 'cacher module loaded ok' )
    }
  )


test( 'See if Nominatim will 200 for Seattle', function( t ){
    t.plan( 1 )

    var someRequestOpts = {
      hostname: 'nominatim.openstreetmap.org',
      port: 80,
      method: 'GET',  
      path: '/search/?q=Seattle&limit=5&format=json&addressdetails=1'
      }

    var aRequest = http.request( someRequestOpts, function( aResponse ){
        console.log( 'STATUS: ' + aResponse.statusCode )
        t.ok( aResponse.statusCode, 200, 'Status code is 200' )
        }
      )

    //logger.trace( aRequest )

    aRequest.on( 'error', function( anError ){
        console.log( 'aRequest errored' + anError.message );
        }
      )

    aRequest.end() 
    }
  )


test( 'Old-school callback lookup for Seattle via Nominatim', function( t ){
    t.plan( 1 )

    var someRequestOpts = {
      hostname: 'nominatim.openstreetmap.org',
      port: 80,
      method: 'GET',  
      path: '/search/?q=Seattle&limit=5&format=json&addressdetails=1'
      }

    var aReq = http.request( someRequestOpts, function( response ){
        console.log( 'http.request has a response object' )
        var respBod = '';
        response.on( 'data', function( aChunk ) {
            console.log( 'http.request got aChunk:' ) //+ aChunk )
            respBod += aChunk 
            }
          )
        response.on( 'end', function() {
            var bodAsJson = JSON.parse( respBod )
            var seattleLatInt = parseInt(bodAsJson[0].lat)
            console.log( 'repsonse ended. Seattle Lat=' + seattleLatInt )
            t.equal( 47, seattleLatInt, "Seattle's lat === 47" )
            //console.log( JSON.stringify( bodAsJson, null, "  " ) )
            }
          ) 
        }
      ).on( 'error', function( anErr ) { console.error( anErr ) } )
    aReq.end()
    }
  )


var geoCacher = require( 'promisifying-caching-geocoder' )

test( 'promisify XmlHttpRequest just like old school callback', function( t ) {
  geoCacher.getGeodata( "Seattle" ).then( function( geodata ){ putOnMap( geodata ); maybePutInCacheBeforeWriteToFile(); t.ok( geodata, "called back" ) } )
  )
  
/*

var geocoder = require( '../assets/js/caching_geocoder' )
test( 'check for caching_geocoder', function( t ) {
    t.plan( 1 )
    t.ok( geocoder, 'geocacher module loaded ok' )
    }
  )


test( 'See if caching geocoder will find Seattle', function( t ) {
    t.plan( 1 )
    var locs = geocoder.locate( "Seattle" )
    t.equal( locs[0].center.lat, 47.6038321, 'Seattle is ~47.6 North' )
    }  
  )

*/
