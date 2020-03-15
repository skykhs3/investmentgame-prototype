import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import './Home.css'
import RoundDisplay from './RoundDisplay';
import TimeDisplay from './TimeDisplay';
import CoInfo from './CoInfo'
import noC from '../../constants/noC'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "name loading...",
      asset: 0,
      round: 0,
      willdo: [],
      roundfees:0.05,
    }
    for (var i = 0; i < noC; i++)
      this.state.willdo.push(0);
  }
  submit = (nextRound) => {
    confirmAlert({
      title: 'Notice',
      message: `Round is changed. ${nextRound-1} Round ➝ ${nextRound} Round`,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {}
        },
      ]
    });
  };
  shouldComponentUpdate(nextProps, nextState) {
    const nextRound=nextState.round;
    if (this.state.round != 0 && nextState.round != this.state.round) {
      alert(`Round is changed. \n${this.state.round} Round ➝ ${nextRound} Round`);
     // this.submit(nextState.round);
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
        mountInfo: usersObject.mountInfo,
      });
    });
    this.props.firebase.db.ref('gamestate').on('value', snapshot => {
      const usersObject = snapshot.val();
      this.setState({
        round: usersObject.round,
        caniinvest: usersObject.caniinvest,
        roundfees:usersObject.roundfees[usersObject.round],
      });
    
    });
    this.props.firebase.db.ref('companies').on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
      }));
      this.setState({ companies: usersList });
    });
  }
  onwilldoChange = (i, num) => {
    const { willdo } = this.state;
    willdo[i] = Number(num);
    this.setState({ willdo: willdo });
  }
  render() {
   // console.log("Home render");
    const { username, asset, round, caniinvest } = this.state;
    var sum = 0;
    var sum2 = 0;
    var item = [];
    for (var i = 0; i < noC; i++) {

      if (this.state.companies != undefined) {
        sum += this.state.mountInfo[i].amountMoney;
        sum2 += this.state.willdo[i];
      //  console.log(JSON.stringify(this.state.companies));
        item.push(<CoInfo
          caniinvest={this.state.caniinvest}
          key={i}
          Conum={i}
          Coname={this.state.companies[i].name}
          amountMoney={this.state.mountInfo[i].amountMoney}
          firebase={this.props.firebase}
          onwilldoChange={this.onwilldoChange}
          roundfees={this.state.roundfees}
        />);
      }
    }
    //window.confirm("ㅑ잇");

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
            <td>{sum}</td>
            <td>{sum2}</td>
          </tr>
        </table>
      </div>

    );
  }

}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage); 