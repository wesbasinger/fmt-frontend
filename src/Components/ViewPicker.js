import React, { Component } from 'react';

class ViewPicker extends Component {

  render() {
    return (
		<div>
			<button onClick={this.props.onViewPickerClick} value="signIn">Sign In</button>
			<button onClick={this.props.onViewPickerClick} value='signOut'>Sign Out</button>
		</div>
	)
  }
}

export default ViewPicker;
