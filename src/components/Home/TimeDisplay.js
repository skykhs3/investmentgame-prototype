import React from 'react';
import Clock from 'react-live-clock'
class TimeDisplay extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            hour:0,
            minute:0,
            second:0,  
            style2:{color:'red'},
           
        }
    }
    onClockHandler=({output, previousOutput, moment}) => {
        //console.log(JSON.stringify(Number(output)));
        const hms=Number(output);
         let {hour,minute,second}=this.state;
         second=hms%100;
         minute=((hms-second)/100)%100;
         hour=(hms-minute*100-second)/10000;
         console.log(hour,minute,second);
         if(second%10==0)
            this.setState({style2:{color:'red'}});
        else
            this.setState({style2:{color:'black'}});
         
    }
    render(){
        //let today = new Date().toString; 
        // let a= moment('1995-12-25 01:00:00');
        //  let b= moment('1995-12-25 01:01:00');
        //  console.log(a.diff(b)) ;
        return(

        <div>
            
        <div style={{color:'blue'}}  >
            현재 시각은 <Clock format={'HH 시: mm 분: ss 초'} ticking={true} timezone={'Asia/Seoul'}/> 입니다.
        </div>

        <div style={this.state.style2}>
            현재 시각은 <Clock format={'HHmmss'} ticking={true} timezone={'Asia/Seoul'} onChange={this.onClockHandler}/> 입니다.
        </div>
        </div>
        );
    }
}
export default TimeDisplay;