var deathsMarkerOptions =
  {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
  }

//Crockford's http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object
function cloneObject( anObj ) 
  {
  function F() {}
  F.prototype = anObj;
  return new F();
  }






// ============ outbreak_time_series_reader.js  ======================

// Hat tip to https://github.com/sevcsik for notes on how to boot in node and angular:
//  https://gist.github.com/sevcsik/9207267

OTSR = new function() {};

OTSR.contextIsAngular = function()
  {
  return typeof angular !== 'undefined';
  }

OTSR.contextIsNode = function()
  {
  return typeof module !== 'undefined' && module.exports;
  }

OTSR.initializeToFramework = function()
  {
  var OutbreakTimeSeriesReaderModule = function()
    {
    var OutbreakTimeSeriesReader = function()
      {
      }
    return OutbreakTimeSeriesReader;
    }
  if( OTSR.contextIsAngular() )
    angular.module( 'app.outbreak_time_series_reader', [] ).
      factory( 'OutbreakTimeSeriesReader', [OutbreakTimeSeriesReaderModule] );
  else if( OTSR.contextIsNode() )
    module.exports = OutbreakTimeSeriesReaderModule();
  }
OTSR.initializeToFramework();







//alert( 'hi from end of jft.js' );
