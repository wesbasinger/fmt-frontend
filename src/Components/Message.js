import React, { Component } from 'react';

class Message extends Component {


  render() {
    return (
      <div className="starter-template">
        <div className="jumbotron">
          <h1>Message:</h1>
          <p className="lead">{this.props.message}</p>
        </div>
        <button onClick={this.props.onResetRequest}>Return to Home</button>
      </div>
	  )
  }
}

export default Message;
