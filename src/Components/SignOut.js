import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

class SignOut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeId: "",
      formComplete: false,
      workFromHome: false
    }

    this.onActiveChange = this.onActiveChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onWorkFromHomeChange = this.onWorkFromHomeChange.bind(this);

  }

  onActiveChange(e) {
    this.setState({activeId: e.target.value});
  }

  onWorkFromHomeChange(e) {
    this.setState({workFromHome: !this.state.workFromHome})
  }

  handleSubmit(e) {
    e.preventDefault();

    if(!this.state.activeId) {
      alert("Must select a workday name to sign out.")
    } else {
      this.props.onSignOut({
        activeId: this.state.activeId,
        timestamp: Date.now(),
        workFromHome: this.state.workFromHome
      })
      this.setState({formComplete: true})
    }

  }

  render() {

    if(this.state.formComplete) {
      return (
        <Redirect to="/message" />
      )
    } else {
      return (
        <div className="starter-template">
          <p>Individuals currently signed in</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <select className="form-control" value={this.state.activeId} onChange={this.onActiveChange}>
              <option>---</option>
              {
                this.props.actives.map(function(active) {
                  return (
                    <option key={active._id} value={active._id}>Name: {active.name}</option>
                  )
                })
              }
            </select>
            <label htmlFor="work-from-home">Work From Home</label>
            <input type="checkbox" className="form-control" onChange={this.onWorkFromHomeChange} />
            <button type="submit" className="btn btn-primary" value="submit">Submit</button>
            </div>
          </form>
        </div>
      )
    }
  }
}

export default SignOut;
