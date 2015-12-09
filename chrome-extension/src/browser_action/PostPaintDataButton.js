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

    $( "#loading" )
      .attr( "src", "images/loading.gif" )
      .fadeIn( 100 );

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
        $( "#loading" )
          .attr( "src", "images/success.png" )
          .delay( 1000 )
          .fadeOut( 100 );
        $( "#post-message" )
          .text( "送信に成功しました" )
          .css( "color", "green" )
          .fadeIn( 100 )
          .delay( 900 )
          .fadeOut( 100 );
      },
      error: function( err ){
        console.log( err );
        $( "#loading" )
          .attr( "src", "images/failer.png" );
        $( "#post-message" )
          .css( "color", "red" )
          .text( "送信に失敗しました" )
          .fadeIn( 100 );
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
