import React, { Component } from 'react';

class SignOut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeId: ""
    }

    this.onActiveChange = this.onActiveChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  onActiveChange(e) {
    this.setState({activeId: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    if(!this.state.activeId) {
      alert("Must select a workday name to sign out.")
    } else {
      this.props.onSignOut({activeId: this.state.activeId, timestamp: Date.now()})
    }

  }

  render() {
    return (
		<div>
			<p>Individuals currently signed in</p>
      <form onSubmit={this.handleSubmit}>
        <select value={this.state.activeId} onChange={this.onActiveChange}>
          <option>---</option>
          {
            this.props.actives.map(function(active) {
              return (
                <option key={active._id} value={active._id}>Name: {active.name}</option>
              )
            })
          }
        </select>
        <button value="submit">Submit</button>
      </form>
		</div>

	)
  }
}

export default SignOut;
