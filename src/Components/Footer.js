import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
		<div className="starter-template">
			<p>App written and maintained by Wes Basinger.  Contact dbumathlete@gmail.com with any errors or feedback.</p>
      <small><Link to="/export">Export All Data</Link></small>
		</div>
	)
  }
}

export default Footer;
