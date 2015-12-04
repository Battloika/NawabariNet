var mode = "none";

chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ){
  if( request.type == "get_mode" ){
    sendResponse( mode );
    return;
  }

  var queryInfo = {
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  };

  chrome.tabs.query( queryInfo, function( result ){
    mode = request.mode;
    var currentTab = result.shift();
    chrome.tabs.sendMessage( currentTab.id, request, function(){} );
  } );
} );
