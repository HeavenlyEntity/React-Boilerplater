/**
 *
 * LoginPage
 *
 */
// import saga from './saga';
// import reducer from './reducer';
// eslint-disable-next-line import/no-named-as-default-member
// import { useInjectReducer } from 'utils/injectReducer';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { createMuiTheme } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core/styles';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBModalFooter,
} from 'mdbreact';
import { Redirect } from 'react-router-dom';
import fireBase from '../../Firebase/firebase';
import makeSelectLoginPage from './selectors';
import './LoginPage.css';
// eslint-disable-next-line no-undef,no-unused-vars
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#76ff03',
    },
  },
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      password: '',
      email: '',
      showPassword: false,
      user: {},
    };
    // this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  login(e) {
    // eslint-disable-next-line no-alert
    // alert(`Login Button Pressed${this.state.password} ${this.state.email}`);
    e.preventDefault();
    fireBase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      // eslint-disable-next-line no-shadow,consistent-return
      .then(u => {
        // console.log(u);
        this.setState({ user: u });
        if (this.state.user) {
          return (
            // console.log(this.state.user);
            <Redirect from="/Login" to="/" />
          );
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  }

  handleEmailChange = event => this.setState({ email: event.target.email });

  handlePassChange = event =>
    this.setState({ password: event.target.password });

  // handleChange = event => this.setState({ value: event.target.value });

  handleClickShowPassword() {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  }

  getEmailValue = email => this.setState({ email });

  // eslint-disable-next-line no-console
  getPassValue = password => this.setState({ password });

  render() {
    return (
      <div className="signInDiv">
        <MDBContainer className="signInContainer">
          <MDBRow center>
            <MDBCol className="signInCardCol" md="6">
              <MDBCard className="signInCard">
                <MDBCardBody className="mx-4 signInCardBody">
                  <div className="text-center signInHeaderContainer">
                    <h3 className="dark-grey-text mb-5 signInHeader">
                      <strong className="signInHeaderText">Sign in</strong>
                    </h3>
                  </div>
                  <div className="signInInput">
                    <MDBInput
                      className="signInEmailInput"
                      name="email"
                      label="Email Address"
                      group
                      type="email"
                      error={
                        this.state.error ? 'Wrong Email Or Password' : null
                      }
                      success="right"
                      onChange={this.handleEmailChange}
                      getValue={this.getEmailValue}
                    />
                    <MDBInput
                      className="signInPassInput"
                      name="password"
                      label="Your password"
                      group
                      type="password"
                      validate
                      containerClass="mb-0"
                      getValue={this.getPassValue}
                      onChange={this.handlePassChange}
                    />
                  </div>
                  <p className="font-small blue-text d-flex justify-content-end pb-3 forgotPasswordText">
                    Forgot
                    <a href="#!" className="blue-text ml-1">

                      Password?
                    </a>
                  </p>
                  <div className="text-center mb-3 signInButton">
                    <MDBBtn
                      type="button"
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a"
                      onClick={this.login}
                    >
                      Sign in
                    </MDBBtn>
                  </div>
                  <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                    or Sign in with:
                  </p>
                  <div className="row my-3 d-flex justify-content-center ">
                    <MDBBtn
                      type="button"
                      color="white"
                      rounded
                      className="mr-md-3 z-depth-1a signInWithButtons"
                    >
                      <MDBIcon
                        fab
                        icon="facebook-f"
                        className="blue-text text-center "
                      />
                    </MDBBtn>
                    <MDBBtn
                      type="button"
                      color="white"
                      rounded
                      className="mr-md-3 z-depth-1a signInWithButtons"
                    >
                      <MDBIcon fab icon="twitter" className="blue-text" />
                    </MDBBtn>
                    <MDBBtn
                      type="button"
                      color="white"
                      rounded
                      className="z-depth-1a signInWithButtons"
                    >
                      <MDBIcon fab icon="google-plus-g" className="blue-text" />
                    </MDBBtn>
                  </div>
                </MDBCardBody>
                <MDBModalFooter className="mx-5 pt-3 mb-1 noMemberText">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Not a member?
                    <a href="#!" className="blue-text ml-1">
                      Sign Up
                    </a>
                  </p>
                </MDBModalFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
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
