/**
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import reducer from './reducer';
// import saga from './saga';
// eslint-disable-next-line import/no-named-as-default-member
// import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import fireBase from '../../Firebase/firebase';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      password: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    fireBase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {})
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Login Page</title>
          <meta
            name="Login into MiPi"
            content="MiPi user Login screen for returning users"
          />
        </Helmet>
        <h1>Welcome to MiPi</h1>
        <form>
          <div>
            <p
              style={{
                color: 'red',
              }}
            >
              {this.state.error ? 'Email or Password is incorrect' : null}
            </p>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button type="submit" onClick={this.login}>
              Login
            </button>
            {/* TODO Make sign up method */}
            <button onClick={this.signUp}>Sign Up</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
