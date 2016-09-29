import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class DashboardView extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div>
        {profile.nickname} ({profile.email})
      </div>
    );
  }
}

DashboardView.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.auth0.profile,
});

export default connect(
  mapStateToProps
)(DashboardView);
