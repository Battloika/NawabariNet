$(function(){
  var image_urls = {
    red_ink: chrome.extension.getURL( "images/red_ink.png" ),
    blue_ink: chrome.extension.getURL( "images/blue_ink.png" ),
    sight: chrome.extension.getURL( "images/sight.png" )
  };

  var mousedowned = false;
  var in_interval = false;
  var drawInterval = window.setInterval( () => {
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
  } ).on( "mousedown", event => {
    mousedowned = true;
    paint( event.pageX, event.pageY, 3 );
  } ).on( "mousemove", event => {
    if( mousedowned && !in_interval ){
      paint( event.pageX, event.pageY, 5 );
      in_interval = true;
    }
  } ).on( "mouseup", () => {
    mousedowned = false;
  } ) );


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
        "src": image_urls[ "red_ink" ]
      } ).css( {
        "position": "absolute",
        "top": ( $( window ).scrollTop() + window.innerHeight ) + "px",
        "left": ( window.innerWidth / 2 ) + "px",
        "width": ( ink_width / 5 ) + "px",
        "pointer-events": "none"
      } );

      $( "#effect-area" ).append( $img );

      if( fadeout )
        $img.fadeIn( 100 )
            .delay( 500 )
            .fadeOut( 2000 ).queue( () => {
              this.remove();
            } );
      else
        $img.animate( {
          "top": ( pos_y - ink_width / 2 + variance_radius * Math.sin( variance_radian ) + ink_width / 2 ) + "px",
          "left": ( pos_x - ink_width / 2 + variance_radius * Math.cos( variance_radian ) + ink_width / 2 )  + "px"
        }, 300 ).animate( {
          "top": ( pos_y - ink_width / 2 + variance_radius * Math.sin( variance_radian ) ) + "px",
          "left": ( pos_x - ink_width / 2 + variance_radius * Math.cos( variance_radian ) )  + "px",
          "width": ink_width + "px",
        }, 100 );
    }
  }

  chrome.runtime.onMessage.addListener( ( request, sender, sendResponse ) => {
    if( request.type == "get_url" ){
      sendResponse( location.href );
      return;
    }

    if( request.type == "change_mode" ){
      if( request.mode == "clear" ){
        $( "#effect-area .ink" )
            .fadeOut( 1000 ).queue( () => {
              this.remove();
            } );
        $( "#effect-area" ).css( {
          "pointer-events": "none",
          "cursor": "auto"
        } );
      }

      if( request.mode == "paint" ){
        $( "#effect-area" ).css( {
          "pointer-events": "auto",
          "cursor": "url(" + image_urls.sight + "), crosshair"
        } );
      }
    }
  } );
});

