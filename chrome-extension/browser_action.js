$( function(){
  $( "input[name='paint_mode']" ).on( "change", function(){
    chrome.runtime.sendMessage( {
      type: "change_mode",
      mode: $( this ).val()
    } );
  } );
} );
