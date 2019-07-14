/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/index';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
// Import Firebase
// eslint-disable-next-line import/no-unresolved,import/no-named-as-default-member
import fireBase from '../../Firebase/firebase';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fireBase.auth().onAuthStateChanged(user => {
      // console.log(user)
      if (user) {
        // eslint-disable-next-line react/no-unused-state
        this.setState({ user });
        //   localStorage.setItem('user', user.uid);
      } else {
        // eslint-disable-next-line react/no-unused-state
        this.setState({ user: null });
        //  localStorage.removeItem("user");
      }
    });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/Login" component={LoginPage} />
          <Route
            exact
            path="/"
            render={() =>
              this.state.user ? <HomePage /> : <Redirect to="/Login" />
            }
          />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    );
  }
}
