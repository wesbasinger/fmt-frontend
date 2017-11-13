import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
		<div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="/">FMT Workday Sign In</a>
      </nav>
		</div>
	)
  }
}

export default Header;
