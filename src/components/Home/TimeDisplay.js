import React from 'react';
import Clock from 'react-live-clock'
class TimeDisplay extends React.Component{
    render(){
        //let today = new Date().toString; 
        return(
        <div style={{color:'blue'}}>
            현재 시각은 <Clock format={'HH 시: mm 분: ss 초'} ticking={true} timezone={'Asia/Seoul'}/> 입니다.
        </div>
        );
    }
}
export default TimeDisplay;