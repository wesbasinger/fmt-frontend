import React, { Component } from 'react';

import Authenticate from './Authenticate'

class Footer extends Component {
  render() {
    return (
		<div className="starter-template">
			<p>App written and maintained by Wes Basinger.  Contact dbumathlete@gmail.com with any errors or feedback.</p>
      {
        this.props.isAdmin ? "Authenticated as admin" : <Authenticate onAuthenticationRequest={this.props.onAuthenticationRequest}/>
      }  
		</div>
	)
  }
}

export default Footer;
