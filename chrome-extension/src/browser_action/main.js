import React from "react";
import ReactDom from "react-dom";

var PaintModeForm = require( "./PaintModeForm.js" );

class MainForm extends React.Component{
  render(){
    var mode = init_mode;

    return (
      <PaintModeForm mode={mode}/>
    );
  }
}

class PostPaintDataButton extends React.Component {
  postPaintData() {
    $.ajax( {
      type: "POST",
      url: env.api_server_url + "api/v1/paints",
      dataType: "json",
      data: {
        api_key: env.api_key,
        url: current_url,
        painted_map: painted_data
      },
      success: function( json ){
        console.log( json );
      },
      error: function( err ){
        console.log( err );
      }
    } );
  }

  render() {
    return (
      <button className="btn btn-default" onClick={::this.postPaintData}>
        塗り情報を送信する
      </button>
    );
  }
}

var init_mode = "clear";
var current_url = "";
var painted_data = [];
var env = null;

chrome.runtime.sendMessage( {
  type: "get"
}, response => {
  init_mode = response.mode;
  current_url = response.url;

  for( var i = 0 ; i < 10 ; i++ ){
    painted_data[ i ] = [];
    for( var j = 0 ; j < 10 ; j++ )
      painted_data[ i ][ j ] = 1;
  }

  $.getJSON( "env.json", json => {
    env = json;
    ReactDom.render(
      <MainForm />,
      document.getElementById( "paint-mode" )
    );

    ReactDom.render(
      <PostPaintDataButton />,
      document.getElementById( "post-paint-data" )
    );
  } )
});
