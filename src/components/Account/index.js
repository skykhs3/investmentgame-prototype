import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
  <AuthUserContext.Consumer>
  {sample => (
    <div>
      <h1>Account: {sample.state.authUser.email}</h1>
      <PasswordForgetForm />
      <PasswordChangeForm />
    </div>
  )}
</AuthUserContext.Consumer>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AccountPage); 