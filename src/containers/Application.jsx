import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from '../actions/auth0';

class Application extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
      // User's authentication changed, so redirect to login form.
      this.props.router.push('/login');
    }
  }

  logout() {
    this.props.logout()
      .then(() => {
        this.props.router.push('/login');
      });
  }

  render() {
    return (
      <div>
        {this.props.isAuthenticated && (
          <div>
            <button onClick={this.logout.bind(this)}>Logout</button>
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
    isAuthenticated: state.user.isAuthenticated,
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(withRouter(Application));
