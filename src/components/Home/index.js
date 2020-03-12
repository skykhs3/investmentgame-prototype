import React from 'react';
import { withAuthorization } from '../Session';
const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>여기에 투자 게임 구현할 예정</p>
    <p>지금처럼 회원가입 하는 게 아니라</p>
    <p>대안으로 각 팀별로 미리 정해져 있는 입장코드 주고 로그인 시키는 거 생각 중</p>
  </div>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);