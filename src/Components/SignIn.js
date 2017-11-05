import React, { Component } from 'react';

class SignIn extends Component {

  render() {
    return (
		<div>
			<h1>Sign In</h1>
			<form>
				Name: <input type="text" required="true" />
				Cast Member: <select>
								{
									this.props.cast.map(function(castMember) {
										return(
											<option key={castMember.firstName+" " + castMember.lastName}>{castMember.firstName + " " + castMember.lastName}</option>
										)
									})	
								}
							</select>
				Session: <select>
							<option>SP18 - Beauty and the Beast</option>
						 </select>
				Comments: <textarea />
				<button>Submit</button>
			</form>
		</div>
	)
  }
}

export default SignIn;
