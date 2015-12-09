import React from "react";

class WeaponButtonGroup extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      weapon: props.weapon
    }
  }

  useSushikora() {
    this.setState( {
      weapon: "sushikora"
    } );
  }

  useBold() {
    this.setState( {
      weapon: "bold"
    } );
  }

  render() {
    chrome.runtime.sendMessage( {
      type: "change_weapon",
      weapon: this.state.weapon
    } );

    var default_button = "btn btn-default";
    var selected_button = "btn btn-warning";

    return (
      <div className="btn-group" role="group">
        <button type="button" onClick={::this.useSushikora}
          className={this.state.weapon == "sushikora" ? selected_button : default_button}>
          スシコラ
        </button>
        <button type="button" onClick={::this.useBold}
          className={this.state.weapon == "bold" ? selected_button : default_button}>
          ボールド
        </button>
      </div>
    );
  }
}

module.exports = WeaponButtonGroup;
