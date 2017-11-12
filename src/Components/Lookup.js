import React, { Component } from 'react';

import CastDetail from './CastDetail';

class Lookup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      active: "",
      castMember: null
    };

    this.onActiveChange = this.onActiveChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {

    e.preventDefault();

    var self = this;

    var filtered = this.props.cast.filter(function(m) {return m._id === self.state.active});

    this.setState({castMember: filtered[0]});

  }

  onActiveChange(e) {
    //var delim = e.target.value;
    this.setState({active: e.target.value});
  }

  render() {

    if(!this.state.castMember) {

      return (
      <div>
        <h1>Lookup</h1>
        <form onSubmit={this.handleSubmit}>
          Cast Member: <select value={this.state.active} onChange={this.onActiveChange} name="castMember">
                  <option>---</option>
                  {
                    this.props.cast.map(function(castMember) {
                      return(
                        <option key={castMember._id} value={castMember._id}>{castMember.firstName + " " + castMember.lastName}</option>
                      )
                    })
                  }
                </select>
          <button value="submit">Submit</button>
        </form>
      </div>
      )

    } else {
      return(
        <CastDetail ACTIVE_SESSION={this.props.ACTIVE_SESSION} castMember={this.state.castMember}/>
      )
    }
  }
}

export default Lookup;
