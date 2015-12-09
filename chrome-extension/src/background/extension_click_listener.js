var mode = "clear";
var weapon = "sushikora";
var url = "";

chrome.runtime.onMessage.addListener( function( request, sender, sendResponse ){
  if( request.type == "get" ){
    sendResponse( {
      mode: mode,
      weapon: weapon,
      url: url
    } );
  }else if( request.type == "change_mode" ){
    mode = request.mode;
    changePaintMode();
  }else if( request.type == "change_weapon" ){
    weapon = request.weapon;
    changeWeapon();
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

  chrome.tabs.query( queryInfo, result => {
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

function changeWeapon(){
  var queryInfo = {
    active: true,
    windowId: chrome.windows.WINDOW_ID_CURRENT
  };

  chrome.tabs.query( queryInfo, result => {
    var currentTab = result.shift();
    chrome.tabs.sendMessage( currentTab.id, {
      type: "change_weapon",
      weapon: weapon
    } );
  } );
}
