/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
// eslint-disable-next-line import/no-cycle
import Navigation from '../../components/Navigation';
import fireBase from '../../Firebase/firebase';
// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    fireBase.auth().signOut();
  }

  render() {
    return (
      <div>
        <h1>MiPi Home</h1>
        <Navigation />
        {/* eslint-disable-next-line react/button-has-type */}
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}
export default HomePage;
