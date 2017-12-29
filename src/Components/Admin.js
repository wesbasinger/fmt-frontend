import React, { Component } from 'react';

import { CSVLink } from 'react-csv';

class Admin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: ""

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value})
  }

  handleLastNameChange(e) {
    this.setState({lastName: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onCastMemberAdd({
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });
    this.setState({
      firstName: "",
      lastName: ""
    })
  }

  render() {

    const history = []

    for(let i=0; i<this.props.cast.length; i++) {
      for(let j=0; j<this.props.cast[i].history.length; j++) {
        history.push(this.props.cast[i].history[j])
      }
    }

    return(
      <div className="starter-template">
        <div >
          <CSVLink data={history} filename={"fmt-workday-data.csv"}><h2>Download All Data As CSV</h2></CSVLink>
        <br/>
        </div>
        <div>
          <h2>Add a Cast Member</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input className="form-control" onChange={this.handleFirstNameChange} value={this.state.firstName} name="first-name" type="text" required="true" />
              <label htmlFor="last-name">Last Name</label>
              <input className="form-control" onChange={this.handleLastNameChange} value={this.state.lastName} name="last-name" type="text" required="true" />
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Admin;
