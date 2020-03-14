import React from 'react';
class CoInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            money:'',
        }
    }
    onChange=(event)=>{
        
        this.setState({ [event.target.name]: event.target.value });
    }
    handleInvest=(event)=>{
        if(this.state.money==''){
        console.log('error');
         alert('Only Number!');
        }
        console.log(this.state.money);
    }
    handleWithdraw=(event)=>{
        if(this.state.money==''){
        console.log('error');
         alert('Only Number!');
        }
    }
    handleReset=(event)=>{
        this.setState({money:''});
    }
    render(){
      //  console.log('CoInfo '+this.smoney);
    //  console.log(this.props.firebase.auth.currentUser.uid);
        return(
        <tr>
        <td>{this.props.Coname}</td>
        <td>{this.props.amountMoney}</td>
        <td><input
          name="money"
          type='number'
          value={this.state.money}
          onChange={this.onChange}
          placeholder="0"
        /></td>

        <td><button type="submit" onClick={this.handleInvest}>투자</button></td>
        <td><button type="submit" onClick={this.handleWithdraw}>철회</button></td>
        <td><button type="submit" onClick={this.handleReset}>입력 초기화</button></td>
        </tr>
        );
    }
}
export default CoInfo;