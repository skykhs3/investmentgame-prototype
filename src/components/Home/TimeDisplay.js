import React from 'react';
import Clock from 'react-live-clock'
class TimeDisplay extends React.Component{
    
    render(){
        //let today = new Date().toString; 
        // let a= moment('1995-12-25 01:00:00');
        //  let b= moment('1995-12-25 01:01:00');
        //  console.log(a.diff(b)) ;
        return(

        <div>
            {}
        <div style={{color:'blue'}}>
            현재 시각은 <Clock format={'HH 시: mm 분: ss 초'} ticking={true} timezone={'Asia/Seoul'}/> 입니다.
        </div>
        </div>
        );
    }
}
export default TimeDisplay;