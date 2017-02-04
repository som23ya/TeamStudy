import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import callApi from '../../../../util/apiCaller';

// Import Components
import RegistrationForm from '../../components/UserRegistrationForm/UserRegistrationForm';

// Import Actions
import { addUser } from '../../UserActions';

class UserRegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  handleAddUser = (nickname, studentId, email, password) => {
    const fullname = nickname.split(' ');
    const firstName = fullname.shift();
    const lastName = fullname.shift() || '';

    callApi('users', 'post', {
      user: {
        firstName,
        lastName,
        studentId,
        email,
        password,
      },
    }).then(res => this.props.addUser(res.user));
  };

  render() {
    return (
      <div>
        <RegistrationForm addUser={this.handleAddUser} />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addUser }, dispatch);
}

UserRegistrationPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    studentId: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  })),
  addUser: PropTypes.func.isRequired,
};

UserRegistrationPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(null, mapDispatchToProps)(UserRegistrationPage);
