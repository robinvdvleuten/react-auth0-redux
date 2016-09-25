import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';
import { logout } from '../actions/auth0';
import { isAuthenticated } from '../reducers/session';

class Application extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
      // User's authentication changed, so redirect to login form.
      this.props.router.push('/login');
    }
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated && (
          <div>
            <Link to="/logout">Logout</Link>
          </div>
        )}

        {this.props.children}
      </div>
    );
  }
}

Application.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state.session),
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Application));
