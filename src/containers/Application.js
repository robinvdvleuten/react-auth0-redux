import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, routerShape, withRouter } from 'react-router';
import { getProfile, logout } from '../actions/auth0';
import { isAuthenticated } from '../reducers/auth0';

class Application extends Component {
  componentDidMount() {
    this.props.getProfile().catch(err => {
      if (err.error < 400 || err.error > 403) {
        return;
      }

      this.props.logout()
        .then(() => this.props.router.push('/login'));
    });
  }

  render() {
    if (!this.props.profile) {
      return (<div>Loading your profile...</div>);
    }

    return (
      <div>
        <div>
          <Link to="/logout">Logout</Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

Application.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  profile: PropTypes.object,
  router: routerShape.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state.auth0),
  profile: state.auth0.profile,
});

export default connect(
  mapStateToProps,
  { getProfile, logout }
)(withRouter(Application));
