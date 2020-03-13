import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser:{
        }
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
      console.log('with Authentication compoent did mount');
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({authUser:{...this.state.authUser,...authUser}})
            : this.setState({ authUser: null });

          if(authUser!=null){
            this.props.firebase.user(authUser.uid).once('value').then( (snapshot) =>{
              console.log(snapshot.val().username); this.setState({authUser:{
                ...authUser, 
                username:snapshot.val().username,
              }})
            } )
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