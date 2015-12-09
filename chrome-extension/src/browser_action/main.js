import React from "react";
import ReactDom from "react-dom";
require( "bootstrap" );

var PaintModeButtonGroup = require( "./PaintModeButtonGroup.js" );
var PostPaintDataButton = require( "./PostPaintDataButton.js" );

class MainForm extends React.Component{
  render(){
    return (
      <div>
        <PaintModeButtonGroup mode={init_mode} />
        <PostPaintDataButton api_server_url={env.api_server_url}
            api_key={env.api_key} current_url={current_url}/>
        <img id="loading" height="20px"
            src="images/loading.gif" />
        <div id="post-message">送信に失敗しました</div>
      </div>
    );
  }
}

var init_mode = "clear";
var current_url = "";
var env = null;

chrome.runtime.sendMessage( {
  type: "get"
}, response => {
  init_mode = response.mode;
  current_url = response.url;

  $.getJSON( "env.json", json => {
    env = json;

    ReactDom.render(
      <MainForm />,
      document.getElementById( "input-area" )
    );

    $( "#loading" ).hide();
    $( "#post-message" ).hide();
  } )
});
