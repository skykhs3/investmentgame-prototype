import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
      this.action ={
          setValue: (value) => {
            this.setState({value});
          }
      }
    }
    printt=(authUser)=>{
      console.log(authUser.uid)
    }
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({authUser})
            : this.setState({ authUser: null });

          if(authUser!=null){
            this.props.firebase.user(authUser.uid).once('value').then( (snapshot) =>{
              console.log(snapshot.val().username); this.setState({authUser:{...authUser, username:snapshot.val().username}})
            } )
            console.log('test'+authUser.uid);
          }
        },
      );
    }
    componentWillUnmount() {
      this.listener();
    }
    
    render() {
      const {state,action}=this;
      const value = {state, action};
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