import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import './Home.css'
import RoundDisplay from './RoundDisplay';
import TimeDisplay from './TimeDisplay';
import CoInfo from './CoInfo'
import noC from '../../constants/noC'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import NumericInput from 'react-numeric-input';
class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: "name loading...",
      asset: 0,
      round: 0,
      willdo: [],
      roundfees: 0.05,
    }
    for(let i = 0; i < noC; i++)
      this.state.willdo.push(0);
  }
  submit = (nextRound) => {
    confirmAlert({
      title: 'Notice',
      message: `Round is changed. ${nextRound - 1} Round ➝ ${nextRound} Round`,
      buttons: [
        {
          label: 'Ok',
          onClick: () => { }
        },
      ]
    });
  };

 async componentDidMount() {
    this.setState({ loading: true });
    await this.props.firebase.user(this.props.firebase.auth.currentUser.uid).on('value', snapshot => {
      const usersObject = snapshot.val();
      this.setState({
        username: usersObject.username,
        asset: usersObject.asset,
        mountInfo: usersObject.mountInfo,
      });
    });
    await this.props.firebase.db.ref('gamestate').on('value', snapshot => {
      const usersObject = snapshot.val();
      this.setState({
        round: usersObject.round,
        caniinvest: usersObject.caniinvest,
        roundfees: usersObject.roundfees[usersObject.round],
      });

    });
    await this.props.firebase.db.ref('companies').on('value', snapshot => {
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



    for (let i = 0; i < noC; i++) {

      if (this.state.companies != undefined && this.state.mountInfo!=undefined) {
           // console.log(JSON.stringify(this.state.companies));
           // console.log(JSON.stringify(this.state.mountInfo));
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
        {/* <NumericInput min={0} max={100} value={50}/> */}
        <h1>{username} 님의 잔고 ${asset}</h1>
        <RoundDisplay round={round} caniinvest={caniinvest} />
        <TimeDisplay firebase={this.props.firebase} caniinvest={caniinvest}/>
        <p>
        <table border={1}>
          <tr>
          <th>기업명</th>
          <th >누적 투자액</th>
          <th >금액</th>
          </tr>

          {item}
          
          <tr>
            <td>Total</td>
            <td>{sum}</td>
            <td>{sum2}</td>
          </tr>
        </table>
        </p>
      </div>

    );
  }

}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage); 
