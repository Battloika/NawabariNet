import React from "react";
import ReactDom from "react-dom";

class PaintModeForm extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      mode: init_mode
    }
  }

  setModePaint() {
    this.setState( {
      mode: "paint"
    } );
  }

  setModeClear() {
    this.setState( {
      mode: "clear"
    } );
  }

  render() {
    chrome.runtime.sendMessage( {
      type: "change_mode",
      mode: this.state.mode
    } );

    var clear_button_class = "btn btn-default"
    var paint_button_class = "btn btn-default"

    if( this.state.mode == "clear" )
      clear_button_class = "btn btn-warning"
    if( this.state.mode == "paint" )
      paint_button_class = "btn btn-warning"


    return (
      <div className="btn-group" role="group">
        <button type="button" onClick={::this.setModeClear} className={clear_button_class}>
          塗らない
        </button>
        <button type="button" onClick={::this.setModePaint} className={paint_button_class}>
          塗る
        </button>
      </div>
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
      <PaintModeForm />,
      document.getElementById( "paint-mode" )
    );

    ReactDom.render(
      <PostPaintDataButton />,
      document.getElementById( "post-paint-data" )
    );
  } )
});
