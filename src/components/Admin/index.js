import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }
  componentDidMount() {
    console.log('AdminPage did mount');

    this.setState({ loading: true });
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      if (usersObject == null) {
        const usersList = [];
        this.setState({
          users: usersList,
          loading: false,
        });
      }
      else {
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));
        this.setState({
          users: usersList,
          loading: false,
        });
      }
      
    });
  }
  componentWillUnmount() {
    console.log('AdminPage will unmount');
    this.props.firebase.users().off();
  }
  render() {
    


    const { users, loading } = this.state;
    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}
const UserList = ({ users }) => {
  if (users == null)
    return (<div>df</div>);
  else {
    return (
      <ul>
        {users.map(user => (
          <li key={user.uid}>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>E-Mail:</strong> {user.email}
            </p>
            <p>
              <strong> ID:</strong> {user.uid}
            </p>
          </li>
        ))}
      </ul>
    );
  }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AdminPage); 