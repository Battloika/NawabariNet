$(function(){
  var image_urls = {
    red_ink: chrome.extension.getURL( "images/red_ink.png" ),
    blue_ink: chrome.extension.getURL( "images/blue_ink.png" )
  };

  var mousedowned = false;
  var in_interval = false;
  var drawInterval = window.setInterval(function() {
    in_interval = false;
  }, 100);

  var paint_area_height = $( "body" ).height();
  if( paint_area_height < $( window ).height() )
    paint_area_height = $( window ).height();

  $( "body" ).append( $( "<div></div>", {
    "id": "effect-area"
  } ).css( {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "width": "100%",
    "height": paint_area_height + "px",
    "overflow": "hidden",
    "pointer-events": "none"
  } ).on( "mousedown", function( event ){
    mousedowned = true;
    paint( event.pageX, event.pageY, 3 );
  } ).on( "mousemove", function( event ){
    if( mousedowned && !in_interval ){
      paint( event.pageX, event.pageY, 5 );
      in_interval = true;
    }
  } ).on( "mouseup", function(){
    mousedowned = false;
  } ) );

  paint( -200, -200, 1, 0, true );
    // 一度描画すると軽くなるので

  function paint( pos_x, pos_y, num, variance, fadeout ){
    if( !pos_x ) pos_x = 100;
    if( !pos_y ) pos_y = 100;
    if( !num ) num = 10;
    if( !variance ) variance = 100;

    var ink_width = 100;

    for( var i = 0 ; i < num ; i++ ){
      var variance_radius = variance * Math.random();
      var variance_radian = 2 * Math.PI * Math.random();

      var $img = $( "<img>", {
        "class": "ink",
        "src": image_urls[ "red_ink" ],
        "width": ink_width + "px"
      } ).css( {
        "display": "none",
        "position": "absolute",
        "top": ( pos_y - ink_width / 2 + variance_radius * Math.sin( variance_radian ) ) + "px",
        "left": ( pos_x - ink_width / 2 + variance_radius * Math.cos( variance_radian ) )  + "px",
        "pointer-events": "none"
      } );

      $( "#effect-area" ).append( $img );

      if( fadeout )
        $img.fadeIn( 100 )
            .delay( 500 )
            .fadeOut( 2000 ).queue(function() {
              this.remove();
            } );
      else
        $img.fadeIn( 100 );
    }
  }

  chrome.runtime.onMessage.addListener( function( request ) {
    if( request.type == "change_mode" ){
      if( request.mode == "clear" ){
        $( "#effect-area .ink" )
            .fadeOut( 1000 ).queue( function(){
              this.remove();
            } );
        $( "#effect-area" ).css( "pointer-events", "none" );
      }

      if( request.mode == "paint" ){
        $( "#effect-area" ).css( "pointer-events", "auto" );
      }
    }
  } );
});

