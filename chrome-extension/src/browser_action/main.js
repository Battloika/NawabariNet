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

var init_mode = "clear";

chrome.runtime.sendMessage( {
  type: "get_mode"
}, ( response ) => {
  init_mode = response;
  ReactDom.render(
    <PaintModeForm />,
    document.getElementById( "paint-mode" )
  );
});
