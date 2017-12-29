import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Message extends Component {


  render() {
    return (
      <div className="starter-template">
        <div className="jumbotron">
          <h1>Message:</h1>
          <p className="lead">{this.props.message}</p>
        </div>
        <Link to="/"><button onClick={()=> {window.location.reload()}}>Return to Home</button></Link>
      </div>
	  )
  }
}

export default Message;
