import React from 'react';
import { withAuthorization } from '../Session';
class HomePage extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
  <div>
    <h1>Home Page</h1>
    <p>여기에 투자 게임 구현할 예정</p>
  </div>
    );
  }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);