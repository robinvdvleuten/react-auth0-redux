import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../actions/auth0';

class DashboardView extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { profile } = this.props;

    if (!profile) {
      return (<div>Loading your profile...</div>);
    }

    return (
      <div>
        {profile.nickname} ({profile.email})
      </div>
    );
  }
}

DashboardView.propTypes = {
  profile: PropTypes.object,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.auth0.profile,
  };
};

export default connect(
  mapStateToProps,
  { getProfile }
)(DashboardView);
