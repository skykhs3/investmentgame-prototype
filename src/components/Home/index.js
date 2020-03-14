import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import './Home.css'
import RoundDisplay from './RoundDisplay';
import TimeDisplay from './TimeDisplay';
import CoInfo from './CoInfo'
class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "name loading...",
      asset: 0,
      round: 0,
    }
   // console.log("Home constructor");
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.round != 0 && nextState.round != this.state.round) {
      alert("Round changed");
    }
    return true;
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.user(this.props.firebase.auth.currentUser.uid).on('value', snapshot => {
      const usersObject = snapshot.val();
      this.setState({
        username: usersObject.username,
        asset: usersObject.asset,

      });
    });
    this.props.firebase.db.ref('/gamestate').on('value', snapshot => {
      const usersObject = snapshot.val();
      this.setState({
        round: usersObject.round,
        caniinvest: usersObject.caniinvest,
      });
    });
    this.props.firebase.db.ref('companies').on('value',snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
      }));
      ///console.log('test');
      console.log(JSON.stringify(usersList));
      this.setState({companies:usersList});

    });
  }
  render() {
     console.log("Home render");
    const { username, asset, round, caniinvest } = this.state;

    const item = [];
    for (var i = 0; i < 8; i++) {
     // if(this.state.companies[i]!==undefined){
       // console.log(this.state.companies[i].name);
       if(this.state.companies!=undefined){
        console.log(JSON.stringify(this.state.companies));
        item.push(<CoInfo key={i} Conum={i} Coname={this.state.companies[i].name} />);
      }
    }
  
    return (

      <div>
        <h1>{username} 님의 잔고 ${asset}</h1>
        <RoundDisplay round={round} caniinvest={caniinvest} />
        <TimeDisplay />
        <table border={1}>
          <th>기업명</th>
          <th>누적 투자액</th>
          <th>투자 or 회수할 금액</th>
          {item}
          <tr>
            <td>Total</td>
            <td>100</td>
            <td>100</td>
          </tr>
        </table>
      </div>

    );
  }

}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage); 