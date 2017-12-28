import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';

import ViewPicker from './Components/ViewPicker';
import SignIn from './Components/SignIn';
import SignOut from './Components/SignOut';
import Message from './Components/Message';
import Lookup from './Components/Lookup';

const API_STEM = "https://jydt4o4ppj.execute-api.us-east-1.amazonaws.com/dev/"

const ACTIVE_SESSION = "SP18";

var $ = require("jquery");

class App extends Component {

  constructor(props) {
    super(props);
	this.state = {
    actives: [],
    message: "",
		view: null,
		cast: [],
    geolocation: null
	};

	this.handleViewPickerClick = this.handleViewPickerClick.bind(this);
  this.handleSignIn = this.handleSignIn.bind(this);
  this.handleSignOut = this.handleSignOut.bind(this);
  this.refreshActives = this.refreshActives.bind(this);
  this.refreshCast = this.refreshCast.bind(this);
  this.resetView = this.resetView.bind(this);
  this.changeToLookup = this.changeToLookup.bind(this);
  }

  componentDidMount() {
    var self = this;

    this.refreshCast();
    this.refreshActives();

    navigator.geolocation.getCurrentPosition(function(position) {
      self.setState(
        {
          geolocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp
          }
        }
      );
    });
  }

  changeToLookup() {
    this.setState({"view" : "lookup"})
  }

  resetView() {
    this.setState({"view": null});
  }

  refreshCast() {

    var self = this;

    $.ajax({
      method: "GET",
      url: API_STEM + "cast",
      contentType: 'application/json',
      crossDomain: true,
    }).done(function(response) {
      self.setState({cast: response})
    });

  }

  refreshActives() {

    var self = this;

    $.ajax({
      method: "GET",
      url: API_STEM + "actives",
      contentType: 'application/json',
      crossDomain: true
    }).done(function(response) {
      self.setState({actives: response});
    })
  }

  handleSignIn(formData) {

    var self = this;

    $.ajax({
      method: "POST",
      url: API_STEM + "actives",
      contentType: 'application/json',
      crossDomain: true,
      data: JSON.stringify({
        "name" : formData.name,
        "castMemberName" : formData.castMemberName,
        "castMemberId" : formData.castMemberId,
        "session" : formData.session,
        "comments" : formData.comments,
        "geolocation" : self.state.geolocation
      })
    }).done(function(response) {

      console.log(response);

      if(response.success) {
        self.refreshActives();
        self.refreshCast();
        self.setState({view: "message", message: "Successfully signed in."});
      } else {
        self.setState({message: response.message});
        self.setState({view: "message"});
      }
    });
  }

  handleSignOut(formData) {

    var self = this;

    $.ajax({
      method: "DELETE",
      url: API_STEM + "actives",
      contentType: 'application/json',
      crossDomain: true,
      data: JSON.stringify({
        "activeId" : formData.activeId,
        "geolocation" : self.state.geolocation,
        "timestamp" : formData.timestamp
      })
    }).done(function(response) {
      self.setState({view: "message", message: response.message})
      self.refreshCast();
      self.refreshActives();
    })
  }

  handleViewPickerClick(e) {
    this.setState({view: e.target.value});
  }

  render() {

	if (!this.state.view) {
			return (
				<div>
					<Header />
          <main role="main" className="container">
  					<ViewPicker onViewPickerClick={this.handleViewPickerClick} />
            <button onClick={this.changeToLookup}>Lookup Hours</button>
          </main>
					<Footer />
				</div>
			)
	} else if (this.state.view === "signIn") {
		return (
			<div>
				<Header />
        <main role="main" className="container">
  				<SignIn onSignIn={this.handleSignIn} cast={this.state.cast}/>
        </main>
				<Footer />
			</div>
		)
	} else if (this.state.view === 'signOut') {
		return (
			<div>
				<Header />
        <main role="main" className="container">
  				<SignOut onSignOut={this.handleSignOut} actives={this.state.actives}/>
        </main>
				<Footer />
			</div>
		)
	} else if (this.state.view === 'message') {
    return (
      <div>
        <Header />
        <main role="main" className="container">
          <Message onResetRequest={this.resetView} message={this.state.message} />
        </main>
        <Footer />
      </div>
    )
	} else if (this.state.view === "lookup") {
    return (
      <div>
        <Header />
        <main role="main" className="container">
          <Lookup ACTIVE_SESSION={ACTIVE_SESSION} cast={this.state.cast}/>
        </main>
        <Footer />
      </div>
    )
  } else {
    return(
      <div>
        Loading...
      </div>
    )
  }
  }
}

export default App;
