import React from 'react';
class RoundDisplay extends React.Component{
    render(){
        return(
        <div>
        <div>현재 {this.props.round} 라운드 진행 중 </div>
        <div>현재 투자 <span style={{color:'red'}}>{this.props.caniinvest==true ? "가능합니다" : "불가능합니다"}</span></div>
        </div>
        );
    }
}
export default RoundDisplay;