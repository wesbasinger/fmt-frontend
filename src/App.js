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
				<SignIn cast={this.state.cast}/>
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
