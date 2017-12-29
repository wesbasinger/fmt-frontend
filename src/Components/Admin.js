import React, { Component } from 'react';

import { CSVLink } from 'react-csv';

class Admin extends Component {

  render() {

    const history = []

    for(let i=0; i<this.props.cast.length; i++) {
      for(let j=0; j<this.props.cast[i].history.length; j++) {
        history.push(this.props.cast[i].history[j])
      }
    }

    return(
      <div className="starter-template">
        <CSVLink data={history} filename={"fmt-workday-data.csv"}><h2>Download All Data As CSV</h2></CSVLink>
        <h2>Add a Cast Member</h2>
      </div>
    )
  }
}

export default Admin;
