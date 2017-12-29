import React, { Component } from 'react';

import { CSVLink, CSVDownload } from 'react-csv';

class Export extends Component {

  render() {

    const history = []

    for(let i=0; i<this.props.cast.length; i++) {
      for(let j=0; j<this.props.cast[i].history.length; j++) {
        history.push(this.props.cast[i].history[j])
      }
    }

    return(
      <div className="starter-template">
        <CSVLink data={history} filename={"fmt-workday-data.csv"}><h2>Download as CSV</h2></CSVLink>
        <table className="table table-striped">
          <thead>
            <tr>
              <td><strong>Workperson</strong></td>
              <td><strong>Session</strong></td>
              <td><strong>Comments</strong></td>
              <td><strong>Datestamp</strong></td>
              <td><strong>Cast</strong></td>
              <td><strong>Type</strong></td>
              <td><strong>Hours</strong></td>
            </tr>
          </thead>
          <tbody>
            {
              history.map((line, index) => {
                return(
                  <tr key={index}>
                    <td>{line.name}</td>
                    <td>{line.session}</td>
                    <td>{line.comments}</td>
                    <td>{line.datestamp}</td>
                    <td>{line.cast_member}</td>
                    <td>{line.type}</td>
                    <td>{line.elapsed_hours}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Export;
