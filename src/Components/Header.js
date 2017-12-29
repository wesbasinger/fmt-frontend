import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
		<div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link to="/"><div className="navbar-brand">FMT Workday Sign In</div></Link>
        <Link to="/signIn"><div className="navbar">Sign In</div></Link>
        <Link to="/signOut"><div className="navbar">Sign Out</div></Link>
        <Link to="/lookup"><div className="navbar">Lookup Hours</div></Link>
        {
          this.props.isAdmin ? <Link to="/admin">Admin Functions</Link> : ""
        }
      </nav>
		</div>
	)
  }
}

export default Header;
