import React from "react";
import ReactDom from "react-dom";

class PaintModeForm extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      mode: init_mode
    }
  }

  styles() {
    return {
      container: {
        fontFamily: "helvetica, arial, 'hiragino kaku gothic pro', meiryo, 'ms pgothic', sans-serif",
        fontSize: 11
      }
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

    const styles = this.styles();

    var clear_radio = <input type="radio" name = "paint_mode" onChange={::this.setModeClear}/>;
    if( this.state.mode == "clear" )
      clear_radio = <input type="radio" name = "paint_mode" onChange={::this.setModeClear} checked />;

    var paint_radio = <input type="radio" name = "paint_mode" onChange={::this.setModePaint}/>;
    if( this.state.mode == "paint" )
      paint_radio = <input type="radio" name = "paint_mode" onChange={::this.setModePaint} checked />;

    return (
      <form style={styles.container}>
        塗らない
        {clear_radio}
    　    塗る
        {paint_radio}
      </form>
    );
  }
}

class PostPaintDataButton extends React.Component {
  postPaintData() {
    var painted_data = [ [ 0, 0 ], [ 1, 0 ] ];

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
      <button onClick={::this.postPaintData}>結果を送信する</button>
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
      <PaintModeForm />,
      document.getElementById( "paint-mode" )
    );

    ReactDom.render(
      <PostPaintDataButton />,
      document.getElementById( "post-paint-data" )
    );
  } )
});
