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

import Fade from '@material-ui/core/Fade';
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
    // Use if we have buttons leading to need to be signed in first. HOC
    // const isAuthenticatedButtton = withRouter(
    //   ({ history }) =>
    //     this.state.user ? (
    //
    //     ) : (
    //      // something notifying user needing to sign in first.
    //     )
    // );
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.state.user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/Login',
              }}
            />
          )
        }
      />
    );

    const { from } = { from: { pathname: '/' } };

    // if (this.state.user) return <Redirect to="/" />;

    return (
      <div>
        <Switch>
          {/* <Route
            exact
            path="/Introduction"
            render={() =>
              this.state.user ? <Redirect to="/"/> : <IntroductionPage />
            }
          /> */}
          <Route
            exact
            path="/Login"
            render={() =>
              this.state.user ? <Redirect to="/" /> : <LoginPage />
            }
          />
          <PrivateRoute path="/" component={HomePage} />
          {/* <PrivateRoute path="/MiPortfolio" component={MiPortfolioPage} /> */}
          {/* <PrivateRoute path="/Mifeed" component={MiFeedPage} /> */}
          {/* <PrivateRoute path="/MiSettings" component={MiSettings} /> */}
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </div>
    );
  }
}
