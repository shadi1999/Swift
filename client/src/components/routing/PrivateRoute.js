import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {loadUser} from '../../actions/auth';

const PrivateRoute = ({
  component: Component,
  userKind,
  auth : {isAuthenticated,user},
  loadUser,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && userKind === user.kind ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {loadUser})(PrivateRoute);