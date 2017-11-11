import React, { Component } from 'react';

class Message extends Component {


  render() {
    return (
      <div>
        Message: {this.props.message}
        <button onClick={this.props.onResetRequest}>Return to Home</button>
      </div>
	  )
  }
}

export default Message;
