/**
 *
 * NavHeader
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function NavHeader() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/Login">Sign In</Link>
        </li>
        <li>
          {/* eslint-disable-next-line react/jsx-no-undef,jsx-a11y/anchor-is-valid */}
          <Link to="/landing">Landing</Link>
        </li>
        <li>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <Link to="/home">Home</Link>
        </li>
      </ul>
    </div>
  );
}

NavHeader.propTypes = {};

export default NavHeader;
