import React, { Component } from 'react';

class CastDetail extends Component {

  render() {

    return (
      <div className="starter-template">
        <h1>Cast Name: {this.props.castMember.firstName + " " + this.props.castMember.lastName}</h1>
        <h1>Active Session: {this.props.ACTIVE_SESSION} </h1>
        <h1>Current Hours: {this.props.castMember.hours[this.props.ACTIVE_SESSION]}</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <td><strong>Workperson</strong></td>
              <td><strong>Datestamp</strong></td>
              <td><strong>Type</strong></td>
              <td><strong>Comments</strong></td>
              <td><strong>Logged Hours</strong></td>
            </tr>
          </thead>
          <tbody>
          {
            this.props.castMember.history.map(function(line) {
              return(
                <tr key={line._id}>
                  <td>{line.name}</td>
                  <td>{line.datestamp}</td>
                  <td>{line.type}</td>
                  <td>{line.comments}</td>
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

export default CastDetail;
