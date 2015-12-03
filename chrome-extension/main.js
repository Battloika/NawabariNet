$(function(){
  var image_urls = {
    red_ink: chrome.extension.getURL( "images/red_ink.png" ),
    blue_ink: chrome.extension.getURL( "images/blue_ink.png" )
  };

  $( "body" ).append( $( "<div></div>", {
    "id": "effect-area"
  } ).css( {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "width": "100%",
    "height": "100%"
  } ));

  chrome.runtime.onMessage.addListener( function( request ) {
    paint( 200, 100 );
    paint( 400, 400, 5, 200 );
  } );

  function paint( pos_x, pos_y, num, variance ){
    if( !pos_x ) pos_x = 100;
    if( !pos_y ) pos_y = 100;
    if( !num ) num = 10;
    if( !variance ) variance = 100;

    var ink_width = 100;

    for( var i = 0 ; i < num ; i++ ){
      var variance_radius = variance * Math.random();
      var variance_radian = 2 * Math.PI * Math.random();

      var $img = $( "<img>", {
        "src": image_urls[ "red_ink" ],
        "width": ink_width + "px"
      } ).css( {
        "display": "none",
        "position": "absolute",
        "top": ( pos_y - ink_width / 2 + variance_radius * Math.sin( variance_radian ) ) + "px",
        "left": ( pos_x - ink_width / 2 + variance_radius * Math.cos( variance_radian ) )  + "px"
      } );

      $( "#effect-area" ).append( $img );

      $img.fadeIn( 1000 )
          .delay( 800 )
          .fadeOut( 2000 );
    }
  }
});

