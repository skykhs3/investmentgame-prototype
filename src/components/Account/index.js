import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';

class AccountPage extends React.Component{

  constructor(props){
    super(props)
  }
  render(){

    return(
  <AuthUserContext.Consumer>
  {sample => (
    <div>
      <h1>{sample.state.authUser.username }님의 마이페이지</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  )}
</AuthUserContext.Consumer>);
  }

}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage); 