import React from 'react';
class RoundDisplay extends React.Component{
    render(){
        return(
        <div>
        <div>현재 {this.props.round} 라운드 진행 중 </div>
        <div>지금 {this.props.caniinvest==true ? "투자 가능" : "투자 불가능"}</div>
        </div>
        );
    }
}
export default RoundDisplay;