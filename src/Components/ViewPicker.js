import React, { Component } from 'react';

import {Link} from 'react-router-dom';

class ViewPicker extends Component {

  render() {
    return (
		<div className="starter-template">
      <div className="jumbotron">
        <h1>Welcome to the FMT Workday Sign In App</h1>
  			<Link to={'/signIn'}>
          <button type="button" className="btn btn-primary btn-lg">Sign In</button>
        </Link>
        <Link to={'/signOut'}>
          <button type="button" className="btn btn-primary btn-lg">Sign Out</button>
        </Link>
      </div>
		</div>
	)
  }
}

export default ViewPicker;
