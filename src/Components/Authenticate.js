import React, { Component } from 'react';

class Authenticate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      password: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAuthenticationRequest(this.state.password);
  }

  render() {

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          Authenticate:
          <input type="password" onChange={(e)=> {this.setState({password: e.target.value})}}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Authenticate;
