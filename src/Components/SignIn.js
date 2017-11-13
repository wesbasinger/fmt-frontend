import React, { Component } from 'react';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      castMemberName: "---",
      castMemberId: "",
      session: "---",
      comments: ""
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onCastMemberChange = this.onCastMemberChange.bind(this);
    this.onSessionChange = this.onSessionChange.bind(this);
    this.onCommentsChange = this.onCommentsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {

    e.preventDefault();

    if (this.state.castMember === "---" || this.state.session === "---" || !this.state.name) {
      alert("All form values must be turned in.")
    } else {
      this.props.onSignIn(
        {
          "name" : this.state.name,
          "castMemberName" : this.state.castMemberName,
          "castMemberId" : this.state.castMemberId,
           "session" : this.state.session,
          "comments" : this.state.comments
        }
      )
    }
  }

  onNameChange(e) {
    this.setState({name: e.target.value});
  }

  onCastMemberChange(e) {
    // putting two data values into one string.
    var hackyDelim = e.target.value.split("$:-)");
    this.setState({castMemberId: hackyDelim[0]});
    this.setState({castMemberName: hackyDelim[1]});
  }

  onSessionChange(e) {
    this.setState({session: e.target.value});
  }

  onCommentsChange(e) {
    this.setState({comments: e.target.value});
  }

  render() {
    return (
		<div className="starter-template">
			<h1>Sign In</h1>
			<form onSubmit={this.handleSubmit} >
        <div className="form-group">
          <label htmlFor="name">Name</label>
  				<input className="form-control" onChange={this.onNameChange} name="name" type="text" required="true" />
          <label htmlFor="cast-member">Cast Member</label>
  				<select className="form-control" name="cast-member" value={this.state.castMember} onChange={this.onCastMemberChange} name="castMember">
                  <option>---</option>
  								{
  									this.props.cast.map(function(castMember) {
  										return(
  											<option key={castMember._id} value={castMember._id + "$:-)" + castMember.firstName+" " + castMember.lastName}>{castMember.firstName + " " + castMember.lastName}</option>
  										)
  									})
  								}
  							</select>
          <label htmlFor="session">Session</label>
  				<select className="form-control" name="session" value={this.state.session} onChange={this.onSessionChange}  name="session">
                <option>---</option>
  							<option value="SP18 - Beauty and the Beast">SP18 - Beauty and the Beast</option>
  						 </select>
          <label htmlFor="comments">Comments</label>
  				<textarea name="comments" className="form-control" onChange={this.onCommentsChange} name="comments"/>
  				<button type="submit" className="btn btn-primary">Submit</button>
        </div>
			</form>
		</div>
	)
  }
}

export default SignIn;
