var mode = "clear";
var url = "";

chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ){
  if( request.type == "get" ){
    sendResponse( {
      mode: mode,
      url: url
    } );
  }else if( request.type == "change_mode" ){
    mode = request.mode;
    changePaintMode();
  }
} );

chrome.tabs.onActivated.addListener(function(activeInfo) {
  mode = "clear";
  changePaintMode();
} );


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  mode = "clear";
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

  chrome.tabs.query( queryInfo, result => {
    var currentTab = result.shift();
    chrome.tabs.sendMessage( currentTab.id, {
      type: "get_url"
    }, response => {
      url = response;
    } );
  } );
}
