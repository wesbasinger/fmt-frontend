import React, { Component } from 'react';

import Header from './Components/Header';
import Footer from './Components/Footer';

import ViewPicker from './Components/ViewPicker';
import SignIn from './Components/SignIn';
import SignOut from './Components/SignOut';

const API_STEM = "https://jydt4o4ppj.execute-api.us-east-1.amazonaws.com/dev/"

var $ = require("jquery");

class App extends Component {

  constructor(props) {
    super(props);
	this.state = {
		view: null,
		cast: [],
    geolocation: null
	};

	this.handleViewPickerClick = this.handleViewPickerClick.bind(this);
  this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    var self = this;

    $.ajax({
      method: "GET",
      url: API_STEM + "cast",
      contentType: 'application/json',
      crossDomain: true,
    }).done(function(response) {
      self.setState({cast: response})
    });

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position)
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

  handleSignIn(formData) {

    //console.log(formData)

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
    });
  }

  handleViewPickerClick(e) {
    this.setState({view: e.target.value});
  }

  render() {

	if (!this.state.view) {
			return (
				<div>
					<Header />
					<ViewPicker onViewPickerClick={this.handleViewPickerClick} />
					<Footer />
				</div>
			)
	} else if (this.state.view === "signIn") {
		return (
			<div>
				<Header />
				<SignIn onSignIn={this.handleSignIn} cast={this.state.cast}/>
				<Footer />
			</div>
		)
	} else if (this.state.view === 'signOut') {
		return (
			<div>
				<Header />
				<SignOut />
				<Footer />
			</div>
		)
	}
  }
}

export default App;
