import React, { Component, useState } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import noC from'../../constants/noC'

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
      companies:[],
    };
  }
  componentDidMount() {

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
        }));
        const {companies}=this.state;

        // for(var i=0;i<8;i++){
        //   companies[i]={amountMoney:0,};
        // }

        await this.props.firebase.db.ref('/companies').once('value').then((snapshot)=>{
          const usersObject=snapshot.val();
          for(var i=0;i<noC;i++){
            companies[i]={amountMoney:0,name:usersObject[i].name};
          }
        });
      
        for(var i=0;i<usersList.length;i++){
    //      console.log(companies[i].amountMoney);
          //console.log(JSON.stringify(usersList[i]));
          for(var j=0;j<noC;j++){
         //   console.log(JSON.stringify(usersList[i].mountInfo[j].amountMoney));
            companies[j].amountMoney+=usersList[i].mountInfo[j].amountMoney;
          }
      // companies[i].amountMoney+=
      // usersList.mountInfo[i].amountMoney;
        }

        this.setState({
          users: usersList,
          companies:companies,
          loading: false,
        });
      }
    });

  }
  componentWillUnmount() {
    console.log('AdminPage will unmount');
    this.props.firebase.users().off();
  }

onClick1=()=>{

}

  render() {
    

    const { users, loading,companies } = this.state;
    return (
      <div>
        <table border={1}>

        <tr>
        <th>합계 계산</th>
        <th><button onClick={this.onClick1}>입력</button></th>
        </tr>

        <tr>
        <th>리워드 계산</th>
        <th><input></input></th>
        <th><button >입력</button></th>
        </tr>

        </table>
      <h1>Company List</h1>
      <CompanyList companies={companies}/>

        <h1>User List</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}
const CompanyList =({companies})=>{
  return( <div>
    {JSON.stringify(companies)
    }
    </div>);
}
const UserList = ({ users }) => {
  if (users == null)
    return (<div>nothing</div>);
  else {
    return (
      <ul>
        {users.map(user => (
          <li key={user.uid}>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>E-Mail:</strong> {user.email}
            </p>
            <p>
              <strong>ID:</strong> {user.uid}
            </p>
            <p>
              {JSON.stringify(user.mountInfo)}
            </p>
          </li>
        ))}
      </ul>
    );
  }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(AdminPage); 