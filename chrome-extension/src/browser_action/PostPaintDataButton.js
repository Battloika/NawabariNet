import React from "react";

class PostPaintDataButton extends React.Component {
  propTypes: {
    api_server_url: React.PropTypes.string.isRequiered,
    api_key: React.PropTypes.string.isRequiered,
    current_url: React.PropTypes.string.isRequiered
  }

  postPaintData() {
    var painted_data = [];

    for( var i = 0 ; i < 10 ; i++ ){
      painted_data[ i ] = [];
      for( var j = 0 ; j < 10 ; j++ )
        painted_data[ i ][ j ] = 1;
    }

    console.log(this.props);

    $.ajax( {
      type: "POST",
      url: this.props.api_server_url + "api/v1/paints",
      dataType: "json",
      data: {
        api_key: this.props.api_key,
        url: this.props.current_url,
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

module.exports = PostPaintDataButton;
