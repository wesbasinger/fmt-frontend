import React, { Component } from 'react';

class ViewPicker extends Component {

  render() {
    return (
		<div className="starter-template">
      <div className="jumbotron">
        <h1>Welcome to the FMT Workday Sign In App</h1>
  			<button type="button" className="btn btn-primary btn-lg" onClick={this.props.onViewPickerClick} value="signIn">Sign In</button>
  			<button type="button" className="btn btn-primary btn-lg" onClick={this.props.onViewPickerClick} value='signOut'>Sign Out</button>
      </div>
		</div>
	)
  }
}

export default ViewPicker;
