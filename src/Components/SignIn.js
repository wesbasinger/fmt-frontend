import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

class SignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      castMemberName: "---",
      castMemberId: "",
      session: "---",
      comments: "",
      workFromHome: false,
      formComplete: false
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onCastMemberChange = this.onCastMemberChange.bind(this);
    this.onSessionChange = this.onSessionChange.bind(this);
    this.onCommentsChange = this.onCommentsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onWorkFromHomeChange = this.onWorkFromHomeChange.bind(this);
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
          "comments" : this.state.comments,
          "workFromHome" : this.state.workFromHome
        }
      )
      this.setState({formComplete:true})
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

  onWorkFromHomeChange(e) {
    this.setState({workFromHome: !this.state.workFromHome})
  }

  render() {
    if (this.state.formComplete) {
      return (
        <Redirect to="/message" />
      )
    } else {
      return (
      <div className="starter-template">
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input className="form-control" onChange={this.onNameChange} name="name" type="text" required="true" />
            <label htmlFor="cast-member">Cast Member</label>
            <select className="form-control" name="cast-member" value={this.state.castMember} onChange={this.onCastMemberChange}>
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
            <select className="form-control" name="session" value={this.state.session} onChange={this.onSessionChange}>
                  <option>---</option>
                  <option value="SP18 - Beauty and the Beast">SP18 - Beauty and the Beast</option>
                 </select>
            <label htmlFor="work-from-home">Work From Home</label>
            <input type="checkbox" className="form-control" onChange={this.onWorkFromHomeChange} />
            <label htmlFor="comments">Comments</label>
            <textarea name="comments" className="form-control" onChange={this.onCommentsChange}/>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    )
    }
  }
}

export default SignIn;
