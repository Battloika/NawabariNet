chrome.runtime.onMessage.addListener( function( request ){
  var queryInfo = {
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  };

  chrome.tabs.query( queryInfo, function( result ){
    var currentTab = result.shift();
    chrome.tabs.sendMessage( currentTab.id, request, function(){} );
  } );
} );
