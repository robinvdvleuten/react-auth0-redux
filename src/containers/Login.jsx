import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Auth0 from 'auth0-js';
import { login, parseHash } from '../actions/auth0';
import { isAuthenticated } from '../reducers/auth0';

const auth0 = new Auth0({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  callbackOnLocationHash: true
})

class LoginView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: null,
      password: null,
    };
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.router.replace('/');
    }

    this.props.parseHash(window.location.hash)
      .then(
        () => {
          const { location } = this.props

          if (location.state && location.state.nextPathname) {
            this.props.router.replace(location.state.nextPathname)
          } else {
            this.props.router.replace('/')
          }
        },
        // Empty error handling when no hash is found to parse.
        () => {}
      );
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleLoginFormSubmit(event) {
    event.preventDefault();

    this.props.login({
        connection: 'database',
        email: this.state.email,
        password: this.state.password,
        sso: false,
      })
      .then(
        () => {
          this.props.router.replace('/');
        },
        // Empty error handling when login fails.
        () => {}
      );
  }

  handleLoginProviderClick(connection) {
    this.props.login({
      connection,
      callbackURL: window.location.href
    });
  }

  render () {
    return (
      <div>
        {this.props.error && (
          <div>
            {this.props.error}
          </div>
        )}

        <form onSubmit={this.handleLoginFormSubmit.bind(this)}>
          <div>
            <label>
              Email
              <input type="email" required onChange={this.handleEmailChange.bind(this)} />
            </label>
            <label>
              Password
              <input type="password" required onChange={this.handlePasswordChange.bind(this)} />
            </label>
          </div>

          <div>
            <button type="submit">
              Login
            </button>
            <button type="button" onClick={this.handleLoginProviderClick.bind(this, 'google-oauth2')}>
              Login with Google
            </button>
          </div>
        </form>
      </div>
    );
  }
}

LoginView.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
  login: PropTypes.func.isRequired,
  parseHash: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state.auth0),
    error: state.auth0.error,
  };
};

export default connect(
  mapStateToProps,
  { login, parseHash }
)(withRouter(LoginView));
