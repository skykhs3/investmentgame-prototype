import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
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
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        }
      );

      this.props.firebase.db.ref('/notices').on('value',(snapshot)=>
          {
            console.log('withAuth changed');
            const {isdisplayed,contents}=snapshot.val();
            if(isdisplayed==true){
              alert(contents);
            }
         //   this.setState({isdisplayed:isdisplayed,contents:contents})
          });

    }
    componentWillUnmount() {
      this.listener();
    }
    render() {
     // var a=3/2;
     // console.log(a);
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