import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import Components
import LoginForm from '../../components/UserLoginForm/UserLoginForm';

// Import Actions
import { loginUserRequest } from '../../UserActions';

class UserLoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLoginUser = this.handleLoginUser.bind(this);
  }

  handleLoginUser = (email, password) => {
    this.props.loginUserRequest({ password, email });
  };

  render() {
    return (
      <div>
        <LoginForm loginUser={this.handleLoginUser} logged={this.props.users} />
      </div>
    );
  }
}

// map Users from store to props
function mapStateToProps({ users }) {
  return { users };
}

// Bind actions to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUserRequest }, dispatch);
}

// Warning issued if prop not provided
UserLoginPage.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  loginUserRequest: PropTypes.func.isRequired,
};

UserLoginPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginPage);
