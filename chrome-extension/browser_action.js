$( function(){
    chrome.runtime.sendMessage( {
      type: "get_mode"
    }, function( response ){
      $( "." + response + "-mode" ).prop( "checked", true );
    });

  $( "input[name='paint_mode']" ).on( "change", function(){
    chrome.runtime.sendMessage( {
      type: "change_mode",
      mode: $( this ).val()
    } );
  } );
} );
