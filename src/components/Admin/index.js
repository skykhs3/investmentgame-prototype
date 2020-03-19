import React, { Component, useState } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import noC from '../../constants/noC';
import Switch from "react-switch";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
      companies: [],
      eliminated: [],
      survived:[],
      setHour:'',
      setMinute:'',
      setSecond:'',
    };
    for (let i = 0; i < noC; i++) {
      this.state.eliminated.push(false);
      this.state.checked = false;
      this.state.survived.push(0);
    }

  }
  componentDidMount() {


    ///user 관련 세팅--->//
    this.setState({ loading: true });
    this.props.firebase.users().on('value', async snapshot => {
      const usersObject = snapshot.val();
      if (usersObject == null) {
        const usersList = [];
        this.setState({
          users: usersList,
          loading: false,

        });
      }
      else {
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
          ranking: 1,
          amountMoney: 0,

        }));



        // 기업 관련한 세팅
        await this.props.firebase.db.ref('/companies').once('value').then((snapshot) => {
          const usersObject = snapshot.val();
          const { companies } = this.state;
          for (let i = 0; i < noC; i++) {
            companies[i] = { amountMoney: 0, name: usersObject[i].name, ranking: 1 };
          }


          for (let i = 0; i < usersList.length; i++) {
            for (let j = 0; j < noC; j++) {
              usersList[i].amountMoney += usersList[i].mountInfo[j].amountMoney;
              companies[j].amountMoney += usersList[i].mountInfo[j].amountMoney;
            }
          }
          this.setState({
            users: usersList,
            companies: companies,
            loading: false,
          });
        });
      }
    });
    ///<---user 관련 세팅//

    this.onSwitchClick = this.onSwitchClick.bind(this);
    this.props.firebase.db.ref('/gamestate/caniinvest').on('value', snapshot => {
      this.setState({ checked: snapshot.val() });

    }
    );

  }
  componentWillUnmount() {
    console.log('AdminPage will unmount');
    this.props.firebase.users().off();
  }

  onSwitchClick(checked) {
    this.setState({ checked });
    this.props.firebase.db.ref('/gamestate/caniinvest').transaction(snapshot => {
      snapshot = checked;
      return snapshot;
    });
  }
  onCheckBoxClick = (i) => (e) => {
    const { eliminated } = this.state;
    eliminated[i] = e.target.checked;
    this.setState({ eliminated: eliminated })
  }

  ///떨어지는 기업들에 투자한 금액 0으로 만듦-->
  onCheckBoxButtonClick = async (e) => {
    const list = [];
    await this.props.firebase.db.ref().transaction(snapshot=>{
      if(snapshot==null) return snapshot;
      for (let i = 0; i < noC; i++) {
        if (this.state.eliminated[i]) {
          snapshot.companies[i].survive = false;
          for (let key in snapshot.users) {
            snapshot.users[key].mountInfo[i].amountMoney = 0;
          }
        }
        list.push(false);
      }
      return snapshot;
    });
    this.setState({ eliminated: list });
  }
  ///<--떨어지는 기업들

onTextBoxClick=(i)=>(e)=>{
  const{survived}=this.state;
  survived[i]=e.target.value;
  this.setState({survived});
}
  //->리워드 버튼 눌렀을때
onClickRewardButton=async (e)=>{
  e.preventDefault();
  const list = [];
    await this.props.firebase.db.ref().transaction(snapshot=>{
      if(snapshot==null) return snapshot;
      for(let key in snapshot.users){
        let  rewardSum=0;
        for(let i=0;i<noC;i++){
          rewardSum+=Math.floor(snapshot.users[key].mountInfo[i].amountMoney*this.state.survived[i]/100);
        }


       const Reward=rewardSum+500;
       const message=`리워드와 월급 포함 ${Reward} 지급되었습니다.`;
       snapshot.users[key].asset+=Reward;

        if(snapshot.users[key].messages.queue==undefined){
          snapshot.users[key].messages.queue={0:message};
        }
        else{
          snapshot.users[key].messages.queue={...snapshot.users[key].messages.queue,
             [snapshot.users[key].messages.queue.length]: message};
        }
        
      }
      return snapshot;
    });
    for(let i=0;i<noC;i++)
      list.push(0);
    this.setState({ survived: list });
}

onTimeChange=(event)=>{
  this.setState({ [event.target.name]: event.target.value });
}
onClickTimeSetButton=(e)=>{
  e.preventDefault();

  this.setState({setHour:'',setMinute:'',setSecond:''});
}
  render() {

    const { users, loading, companies } = this.state;

    

    //->기업 순위에 따른 리워드 참가자들에게 제공
    let rewardlist=[];
    if (companies.length > 0) {
      //console.log(JSON.stringify(companies));
      for (let i = 0; i < noC; i++) {
        rewardlist.push(<div>{companies[i].name} : <input type='textbox' size={3} checked={this.state.eliminated[i]} value={this.state.survived[i]} onChange={this.onTextBoxClick(i)}></input>%</div>);
      }
    } 
    //<-기업 순위에 따른 리워드 참가자들에게 제공

    //기업 탈락 체크 박스 설치
    let faillist = [];
    
    if (companies.length > 0) {
      //console.log(JSON.stringify(companies));
      for (let i = 0; i < noC; i++) {
        faillist.push(<div>{companies[i].name} : <input type='checkbox' onClick={this.onCheckBoxClick(i)} checked={this.state.eliminated[i]}></input></div>);
      }
    }


///-> 렌더링 리턴

    return (
      <div>
        <table border={1}>

        </table>

        <h1>Control</h1>

        <p>
          <label>
            <div>Can I invest now? {this.state.checked ? 'YES' : 'NO'}</div>

            <Switch onChange={this.onSwitchClick} checked={this.state.checked} />
          </label>
        </p>
        <p>

        <p>
          When does this round end?
          <form onSubmit={this.onClickTimeSetButton}>

          <input placeholder="HH" size={3} value={this.state.setHour} name="setHour" onChange={this.onTimeChange}></input>
          <input placeholder="MM" size={3} value={this.state.setMinute}name="setMinute" onChange={this.onTimeChange}></input>
          <input placeholder="SS" size={3} value={this.state.setSecond} name="setSecond" onChange={this.onTimeChange}></input>
          <button>submit</button>


          </form>
        </p>

        What percentage of the amount of money the participants invest in a company are compensated?
        <br></br>+ 월급까지 자동 지급
        <form onSubmit={this.onClickRewardButton}>
       <div>{rewardlist}</div>
       <button>submit</button>
       </form>
        </p>

        <p>
          Which companies will be eliminated?
          <div>{faillist}</div>
          <button onClick={this.onCheckBoxButtonClick}>submit</button>
        </p>
        


        <h1>Company List</h1>
        <CompanyList companies={companies} />

        <h1>User List</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}
///<- 렌더링 리턴

//////Lists-->

const CompanyList = ({ companies }) => {

  if (companies.length > 0) {
    for (let i = 0; i < noC; i++) {
      companies[i].ranking = 1;
      for (let j = 0; j < noC; j++) {
        if (companies[i].amountMoney < companies[j].amountMoney) {
          companies[i].ranking++;
        }
      }
    }
  }


  return (<div>
    <ul>
      {companies.map(user => (
        <li >
          <p>
            <strong>name: </strong> {user.name}
            <strong> / ranking: </strong> {user.ranking}
            <strong> / amount: </strong> {user.amountMoney}
          </p>
        </li>
      ))}
    </ul>
  </div>);
}
const UserList = ({ users }) => {
  if (users == null)
    return (<div>nothing</div>);
  else {
    if (users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        users[i].ranking = 1;
        for (let j = 0; j < users.length; j++) {
          if (users[i].asset + users[i].amountMoney < users[j].asset + users[j].amountMoney)
            users[i].ranking++;
        }
      }
      users.sort(function (a, b) { // 오름차순
        return a.ranking < b.ranking ? -1 : a.ranking > b.ranking ? 1 : 0;
        // 광희, 명수, 재석, 형돈
      })
    }

    return (
      <ul>
        {users.map(user => (
          <li key={user.uid}>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Total:<span style={{ color: 'red' }}>{user.asset + user.amountMoney}</span></strong>
            </p>
            <p>
              <strong>Ranking: <span style={{ color: 'blue' }}>{user.ranking}</span></strong>
            </p>
            <p>
              <strong>E-Mail:</strong> {user.email}
            </p>
            <p>
              <strong>Asset:</strong> {user.asset}
            </p>
            <p>
              <strong>ID:</strong> {user.uid}
            </p>
            <p>
              {JSON.stringify(user.mountInfo)}
              <br></br>
              <br></br>

            </p>

          </li>
        ))}
      </ul>
    );
  }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AdminPage); 
