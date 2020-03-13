import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import './Home.css'
import RoundDisplay from './RoundDisplay';
class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      asset:0,
    }
  }
  componentDidMount() {
    this.setState({ loading: true });
    // this.props.firebase.users().on('value', snapshot => {
    //   const usersObject = snapshot.val();
    //   console.log('Home :  '+JSON.stringify(usersObject));
    //   const test=this.props.firebase.auth.currentUser.uid;
    //   console.log(test);
    // //  console.log(JSON.stringify(this.props.state));
    // });
    this.props.firebase.user(this.props.firebase.auth.currentUser.uid).on('value', snapshot => {
      const usersObject = snapshot.val();
      
      console.log('Home :  '+JSON.stringify(usersObject));
      
      const test=this.props.firebase.auth.currentUser.uid;
      
      console.log(test);

      this.setState({
        asset:usersObject.asset,
        username:usersObject.username,
      });
    //  console.log(JSON.stringify(this.props.state));
    });
    this.props.firebase.db.ref('/gamestate').on('value',snapshot=>{
    //  console.log(snapshot.val());
      const usersObject = snapshot.val();
      this.setState({
        round:usersObject.round,
        caniinvest:usersObject.caniinvest,
      });
    
    });
  }
  render(){
  //  console.log(JSON.stringify(this.props.state));
  const{username,asset,round,caniinvest}=this.state;
    return(
      
    <div>
      <h1>{username} 님의 잔고 ${asset}</h1>
      <RoundDisplay round={round} caniinvest={caniinvest}/>
    </div>
    
    );
  }

}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage); 