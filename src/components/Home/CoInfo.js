import React from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
class CoInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            money:'',
           
        }
    };
    componentDidMount(){
        this.props.firebase.company(this.props.Conum).on('value',snapshot=>{
            const companyObject=snapshot.val();
            this.setState({survive:companyObject.survive});
        })
    }
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
    investsubmit = () => {
        confirmAlert({
          title: 'Check',
          message: '투자하시겠습니까?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.setState({answer:true})
            },
            {
              label: 'No',
              onClick: () => this.setState({answer:false})
            }
          ]
        });
      };
    handleInvest= async(event) => {
        if(this.state.money==''){
        console.log('error');
         alert('Please enter numbers only!');
        }
        else{
            // 현재 자산이 투자하기 충분하냐, 정수 범위 안넘냐, 음수 아니냐
            await this.props.firebase.user(this.props.firebase.auth.currentUser.uid).transaction((post)=>{
                if (post) {
                     console.log((this.state.money),Number.isSafeInteger(Number(this.state.money)));
                    if(post.asset-Number(this.state.money)<0 ||!Number.isSafeInteger(Number(this.state.money)) || Number(this.state.money)<0){
                        alert('Invaild');
                        return(post);
                    }
                    const answer=window.confirm(`투자액은 ${this.state.money} 입니다. \n투자 하시겠습니까?`);
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
         alert('Please enter numbers only!');
        }
        else{
            await this.props.firebase.user(this.props.firebase.auth.currentUser.uid).transaction((post)=>{
                if (post) {
                    if(post.mountInfo[this.props.Conum].amountMoney-Number(this.state.money)<0 || !Number.isSafeInteger(Number(this.state.money)) || Number(this.state.money)<0){
                        alert('Invaild');
                        return(post);
                    }
                    const answer=window.confirm(`실질 회수액은 ${Math.floor(Number(this.state.money)*(1-this.props.roundfees))} 입니다.\n회수 하시겠습니까?`);
                    if(answer){
                    post.mountInfo[this.props.Conum].amountMoney-=Number(this.state.money);
                    console.log(this.props.roundfees);
                    post.asset+=Math.floor(Number(this.state.money)*(1-this.props.roundfees));
                    this.handleReset();
                    return (post);
                    }
                }
                return (post);
              });
            
        }
    }
   
    render(){
      //  console.log(this.state);
      let companyName=(<td>{this.props.Coname}</td>);
      if(!this.state.survive){
        console.log(this.props.survive);
        companyName=(<td><del>{this.props.Coname}</del></td>);
      }
        return(
        <tr>
        {companyName}
        <td>{this.props.amountMoney}</td>
        <td ><input style={{width:'70px'}}
          name="money"
          type='number'
         
          value={this.state.money}
          onChange={this.onChange}
          placeholder="0"
        /></td>

        <td><button type="submit" onClick={this.handleInvest} disabled={!this.state.survive || !this.props.caniinvest} >투자</button></td>
        <td><button type="submit" onClick={this.handleWithdraw} disabled={!this.state.survive || !this.props.caniinvest}>철회</button></td>
        <td><button type="submit" onClick={this.handleReset}>Reset</button></td>
        {/* <td><button type="submit" onClick={this.arrowFunction}>Testbtn</button></td> */}
        </tr>
        );
    }
}
export default CoInfo;