import React from "react";

class PaintModeButtonGroup extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      mode: props.mode
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

module.exports = PaintModeButtonGroup;
