import React, { Component } from 'react';

import timeFormatter from '../timeFormatter';

class CastDetail extends Component {

  render() {

    const remainingTime = 16 - this.props.castMember.hours[this.props.ACTIVE_SESSION];

    return (
      <div className="starter-template">
        <h1>Cast Name: {this.props.castMember.firstName + " " + this.props.castMember.lastName}</h1>
        <h2>Active Session: {this.props.ACTIVE_SESSION} </h2>
        <h2>Current Logged Time:
          {
            this.props.castMember.hours[this.props.ACTIVE_SESSION] ?
              timeFormatter(this.props.castMember.hours[this.props.ACTIVE_SESSION].toString()) :
              "No time currently logged."
          }
        </h2>
        <h2>
          Remaining Hours: {timeFormatter(remainingTime.toString())}
        </h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <td><strong>Workperson</strong></td>
              <td><strong>Datestamp</strong></td>
              <td><strong>Type</strong></td>
              <td><strong>Remote</strong></td>
              <td><strong>Comments</strong></td>
              <td><strong>Logged Hours</strong></td>
            </tr>
          </thead>
          <tbody>
          {
            this.props.castMember.history.map(function(line) {
              return(
                <tr key={line.datestamp}>
                  <td>{line.name}</td>
                  <td>{line.datestamp}</td>
                  <td>{line.type}</td>
                  <td>{line.remote ? "Yes" : "No"}</td>
                  <td>{line.comments}</td>
                  <td>{timeFormatter(line.elapsed_hours.toString())}</td>
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
