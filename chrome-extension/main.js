$(function(){
  var image_urls = {
    red_ink: chrome.extension.getURL( "images/red_ink.png" ),
    blue_ink: chrome.extension.getURL( "images/blue_ink.png" )
  };

  chrome.runtime.onMessage.addListener( function( request ) {
    $( "body" ).append( $( "<div></div>", {
      "id": "effect-area"
    } ).css( {
      "position": "absolute",
      "top": "0",
      "left": "0",
      "width": "100%",
      "height": "100%"
    } ));

    paint( 200, 100 );
  } );

  function paint( pos_x, pos_y ){
    if( !pos_x ) pos_x = 100;
    if( !pos_y ) pos_y = 100;

    var ink_width = 100;

    var $div = $( "<div></div>", {
      "class": "ink"
    } ).css( {
      "display": "none",
      "position": "absolute",
      "top": ( pos_y - ink_width / 2 ) + "px",
      "left": ( pos_x - ink_width / 2 )  + "px",
      "width": ink_width + "px"
    } );

    $div.append( $( "<img>", {
      "src": image_urls[ "red_ink" ],
      "width": ink_width + "px"
    } ).css( {
      "display": "block",
      "position": "absolute",
      "top": "0",
      "left": "0"
    } ) );

    $( "#effect-area" ).append( $div );

    $div.fadeIn( 1000 )
        .delay( 800 )
        .fadeOut( 2000 );
  }
});

