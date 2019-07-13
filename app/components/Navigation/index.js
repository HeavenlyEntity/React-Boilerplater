/**
 *
 * Navigation
 *
 */

import React from 'react';
// eslint-disable-next-line import/no-cycle
import HomePage from '../../containers/HomePage/index';
// eslint-disable-next-line import/no-named-as-default-member
import LoginPage from '../../containers/LoginPage/index';
import { Link } from 'react-router-dom';
// import MiSettingsPage from '../../containers/HomePage';
// import MiFeedPage from '../../containers/HomePage';
// import AdminPage from '../../containers/HomePage';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

// eslint-disable-next-line react/prefer-stateless-function
class Navigation extends React.Component{
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to={LoginPage}>Sign In</Link>
          </li>
          <li>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Link to="#">Landing</Link>
          </li>
          <li>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Link to={HomePage}>Home</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;
