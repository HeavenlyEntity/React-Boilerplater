/**
 *
 * LoginPage
 *
 */
// import reducer from './reducer';
// import saga from './saga';
// import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-named-as-default-member
// import { useInjectReducer } from 'utils/injectReducer';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import fireBase from '../../Firebase/firebase';
// import Input from '@material-ui/core/Input';
// import Button from '@material-ui/core/Button';
import { createStructuredSelector } from 'reselect';
// import TextField from '@material-ui/core/TextField';
// import { ThemeProvider  } from '@material-ui/styles';
import { createMuiTheme  } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import { green, lime, lightGreen } from '@material-ui/core/colors';
import makeSelectLoginPage from './selectors';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';

// eslint-disable-next-line no-undef
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
      value: '',
      error: false,
      password: '',
      email: '',
      showPassword: false,
    };
    // this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  login(e) {
    e.preventDefault();
    fireBase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {})
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  }

  handleChange(e) {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClickShowPassword() {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  }

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody className="mx-4">
                <div className="text-center">
                  <h3 className="dark-grey-text mb-5">
                    <strong>Sign in</strong>
                  </h3>
                </div>
                <MDBInput
                  name="email"
                  label="Email Address"
                  group
                  type="email"
                  error={this.state.error ? 'Wrong Email Or Password' : null}
                  success="right"
                  value={this.state.email}
                  onChange={e => this.handleChange(e)}
                />
                <MDBInput
                  name="password"
                  label="Your password"
                  group
                  type="password"
                  validate
                  containerClass="mb-0"
                  value={this.state.password}
                  onChange={e => this.handleChange(e)}
                />
                <p className="font-small blue-text d-flex justify-content-end pb-3">
                  Forgot
                  <a href="#!" className="blue-text ml-1">

                    Password?
                  </a>
                </p>
                <div className="text-center mb-3">
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
                <div className="row my-3 d-flex justify-content-center">
                  <MDBBtn
                    type="button"
                    color="white"
                    rounded
                    className="mr-md-3 z-depth-1a"
                  >
                    <MDBIcon fab icon="facebook-f" className="blue-text text-center" />
                  </MDBBtn>
                  <MDBBtn
                    type="button"
                    color="white"
                    rounded
                    className="mr-md-3 z-depth-1a"
                  >
                    <MDBIcon fab icon="twitter" className="blue-text" />
                  </MDBBtn>
                  <MDBBtn
                    type="button"
                    color="white"
                    rounded
                    className="z-depth-1a"
                  >
                    <MDBIcon fab icon="google-plus-g" className="blue-text" />
                  </MDBBtn>
                </div>
              </MDBCardBody>
              <MDBModalFooter className="mx-5 pt-3 mb-1">
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
