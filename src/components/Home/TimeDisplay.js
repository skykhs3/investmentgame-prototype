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
            limitedhour:0,
            limitedminute:0,
            limitedsecond:0,
           
        }
    }
    componentDidMount(){
        this.props.firebase.db.ref('/gamestate/timetoend').on('value',snapshot=>{
            const Obj=snapshot.val();
            console.log(JSON.stringify(Obj));
            this.setState({limitedhour:Obj.hour,limitedminute:Obj.minute,limitedsecond:Obj.second});
        });
    }
    onClockHandler=async({output, previousOutput, moment}) => {
        //console.log(JSON.stringify(Number(output)));
        const hms=Number(output);
         let {hour,minute,second}=this.state;
         second=hms%100;
         minute=((hms-second)/100)%100;
         hour=(hms-minute*100-second)/10000;
         //console.log(hour,minute,second);
         this.setState({second:second,minute:minute,hour:hour})

         const {limitedhour,limitedminute,limitedsecond}=this.state;
        let diff=limitedhour*3600+limitedminute*60+limitedsecond-3600*this.state.hour-60*this.state.minute-this.state.second;

        if(diff==0){
            await this.props.firebase.db.ref('/gamestate/caniinvest').transaction(snapshot=>{
                if(snapshot==null )return snapshot;
                snapshot=false;
                return snapshot;
            });
            
            alert('라운드 종료되었습니다.');
        }
         
        //  if(second%10==0)
        //     this.setState({style2:{color:'red',display:'none'}});
        // else
        //     this.setState({style2:{color:'black',display:'none'}});
         
    }
    render(){
        //let today = new Date().toString; 
        // let a= moment('1995-12-25 01:00:00');
        //  let b= moment('1995-12-25 01:01:00');
        //  console.log(a.diff(b)) ;
        const {limitedhour,limitedminute,limitedsecond}=this.state;
        let diff=limitedhour*3600+limitedminute*60+limitedsecond-3600*this.state.hour-60*this.state.minute-this.state.second;
    
        return(

        <div>
            
        <div style={{color:'blue'}}  >
            현재 시각은 <Clock format={'HH 시: mm 분: ss 초'} ticking={true} timezone={'Asia/Seoul'}/> 입니다.
        </div>
        {this.props.caniinvest ?
        (<div><div>투자 종료 시각은 {limitedhour}시 {limitedminute}분 {limitedsecond}초 입니다.</div>
        <div style={{color:'red'}}>종료까지 {Math.floor(diff/60)}분 {diff%60}초 남았습니다.</div></div>) : null}
        
        <div style={{display:'none'}} >
        현재 시각은 <Clock format={'HHmmss'} ticking={true} timezone={'Asia/Seoul'} onChange={this.onClockHandler}/> 입니다.
        </div>
        </div>
        );
    }
}
export default TimeDisplay;