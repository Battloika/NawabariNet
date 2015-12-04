var mode = "none";

chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ){
  if( request.type == "get_mode" ){
    sendResponse( mode );
    return;
  }

  mode = request.mode;
  changePaintMode();
} );

chrome.tabs.onActivated.addListener(function(activeInfo) {
  mode = "none";
  changePaintMode();
} );


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  mode = "none";
  changePaintMode();
} );

function changePaintMode(){
  var queryInfo = {
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  };

  chrome.tabs.query( queryInfo, function( result ){
    var currentTab = result.shift();
    chrome.tabs.sendMessage( currentTab.id, {
      type: "change_mode",
      mode: mode,
    } );
  } );

}
