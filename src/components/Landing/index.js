import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import noC from '../../constants/noC'
class LandingPage extends React.Component {

  componentDidMount() {
  }
  render() {
    ///---alert 출력///
    if (this.props.firebase.auth.currentUser != null) {
      this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child("messages").child("front").on('value', snapshot => {
        this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child("messages").transaction(snapshot => {
          if(snapshot==null){
            console.log('messages null!!!');
            return snapshot;
          }
          if(snapshot.queue==undefined)
            return snapshot;
          while(snapshot.front<snapshot.queue.length-1){
            
            snapshot.front++;
            alert(snapshot.queue[snapshot.front]);
          
          }
          return snapshot;

        }
        )
      });
    }
    ///alert 출력---///

    return (
      <div>
        <h1>Welcome to ICISTS Investment Game!</h1>
        <p style={{ color: 'red' }}>To sign in, please click on the 'Sign In' link at the top.</p>

        <p>this is explanation of ICISTS Investment Game...</p>
      </div>
    );
  }
}

const condition = authUser => true;
export default withAuthorization(condition)(LandingPage); 
