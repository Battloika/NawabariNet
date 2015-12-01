$(function(){
  chrome.runtime.onMessage.addListener( function( request ) {
    console.log( request );
  } );

  function showComment( comment, nega_or_posi, pos_x, pos_y, index ){
    var width = 100;

    var $div = $( "<div></div>", {
      "class": "comment"
    } ).css( {
      "display": "none",
      "position": "absolute",
      "top": pos_y + "px",
      "left": pos_x + "px",
      "width": width + "px"
    } );

    $div.append( $( "<img>", {
      "src": image_urls[ nega_or_posi ],
      "width": width + "px"
    } ).css( {
      "display": "block",
      "position": "absolute",
      "top": "0",
      "left": "0"
    } ) );

    $div.append( $( "<div></div>" )
    .css( {
      "position": "absolute",
      "top": "35px",
      "left": "0",
      "width": width + "px",
      "color": "white",
      "text-align": "center",
      "font-family": "ヒラギノ角ゴ StdN"
    } ).text( comment ) );

    $( "#effect-area" ).append( $div );

    $div.delay( index * 50 )
        .fadeIn( 1000 )
        .delay( 800 )
        .fadeOut( 2000 );
  }
});

