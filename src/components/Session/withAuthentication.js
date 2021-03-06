import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      };
      this.action = {
        setValue: (value) => {
          this.setState({ value });
        }
      }
    }
    submit = (contents) => {
      confirmAlert({
        title: 'Notice',
        message: `${contents}`,
        buttons: [
          {
            label: 'Ok',
            onClick: () => {}
          },
        ]
      });
    };
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        }
      );
    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
      const { state, action } = this;
      const value = { state, action };
      return (
        <AuthUserContext.Provider value={value}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};
export default withAuthentication;