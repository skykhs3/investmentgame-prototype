import React from 'react';
class CoInfo extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        //let today = new Date().toString; 
        return(
        <tr>
        <td>{this.props.Coname}</td>
        <td>test</td>
        <td>test</td>
        <td>test</td>
        <td>test</td>
        <td>test</td>
        </tr>
        );
    }
}
export default CoInfo;