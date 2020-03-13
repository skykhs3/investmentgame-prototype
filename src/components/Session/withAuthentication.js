import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
      this.action ={
          setValue: (value) => {
            this.setState({value});
          }
      }
    }
    componentDidMount() {
     // console.log(JSON.stringify(this.state));
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({authUser})
            : this.setState({ authUser: null });



          if(authUser!=null){
            this.props.firebase.user(authUser.uid).once('value').then( (snapshot) =>{
          //    console.log(snapshot.val().username); 
              this.setState({username:snapshot.val().username});
          //    console.log(JSON.stringify(this.state));
              })
          }
          
        }
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