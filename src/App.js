import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route} from 'react-router-dom';

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
		cast: [],
    geolocation: null
	};

  this.handleSignIn = this.handleSignIn.bind(this);
  this.handleSignOut = this.handleSignOut.bind(this);
  this.refreshActives = this.refreshActives.bind(this);
  this.refreshCast = this.refreshCast.bind(this);
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
        self.setState({message: "Successfully signed in."});
      } else {
        self.setState({message: response.message});
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

  render() {
    return(
      <Router>
        <div>
          <Header />
            <Route exact path="/" component={ViewPicker}/>
            <Route path="/signIn" render={()=><SignIn
              cast={this.state.cast}
              onSignIn={this.handleSignIn}/>} />
            <Route path="/signOut" render={()=><SignOut
              actives={this.state.actives}
              onSignOut={this.handleSignOut}/>} />
            <Route path="/message" render={()=><Message message={this.state.message}/>} />
            <Route path="/lookup" render={()=><Lookup
              cast={this.state.cast}
              ACTIVE_SESSION={ACTIVE_SESSION}/>} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
