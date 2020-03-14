import React from 'react';
class CoInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            money:'',
        }
    };
    handleReset=(event)=>{
        this.setState({money:''});
        this.props.onwilldoChange(this.props.Conum,0);
    }
    Reset(){
        this.setState({money:''});
        this.props.onwilldoChange(this.props.Conum,0);
    }
    onChange=(event)=>{
        
        this.setState({ [event.target.name]: event.target.value });
        this.props.onwilldoChange(this.props.Conum,event.target.value);
    };
    handleInvest= async(event) => {
        if(this.state.money==''){
        console.log('error');
         alert('Only Number!');
        }
        else{
            await this.props.firebase.user(this.props.firebase.auth.currentUser.uid).transaction((post)=>{
                if (post) {
                    // console.log(JSON.stringify(post));
                    // console.log(this.props.Coname);
                    // console.log(this.props.Conum);
                    if(post.asset-Number(this.state.money)<0){
                        alert('invaild');
                        return(post);
                    }
                    const answer=window.confirm('투자됨 ㅇㅈ?');
                    if(answer){
                    post.mountInfo[this.props.Conum].amountMoney+=Number(this.state.money);
                    post.asset-=Number(this.state.money);
                    this.handleReset();
                    return (post);
                    }
                }
                return (post);
              });
            
        }
    };
    handleWithdraw=async(event)=>{
        if(this.state.money==''){
        console.log('error');
         alert('Only Number!');
        }
        else{
            await this.props.firebase.user(this.props.firebase.auth.currentUser.uid).transaction((post)=>{
                if (post) {
                    if(post.mountInfo[this.props.Conum].amountMoney-Number(this.state.money)<0){
                        alert('invaild');
                        return(post);
                    }
                    const answer=window.confirm('철회됨 ㅇㅈ?');
                    if(answer){
                    post.mountInfo[this.props.Conum].amountMoney-=Number(this.state.money);
                    post.asset+=Number(this.state.money);
                    this.handleReset();
                    return (post);
                    }
                }
                return (post);
              });
            
        }
    }
    
    render(){
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
        {/* <td><button type="submit" onClick={this.arrowFunction}>Testbtn</button></td> */}
        </tr>
        );
    }
}
export default CoInfo;