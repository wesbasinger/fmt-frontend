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
    error: "",
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

      if(response.success) {
        /***********************//***********************/
        // Would like to set a success message here eventually //
        /***********************//***********************/
        self.setState({view: null});
      } else {
        self.setState({error: response.message});
        self.setState({view: "error"});
      }
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
	} else if (this.state.view === 'error') {
    return (
      <div>
        /***********************//***********************/
        // Would like to eventually have a message component and send message as props.
        /***********************//***********************/
        <p>Error message: {this.state.error}</p>
      </div>
    )

	}
  }
}

export default App;
