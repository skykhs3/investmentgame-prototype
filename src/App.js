import React from 'react'
import app from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyAz645k59ZB9J27iE7vvYZss4j3s1l39XI",
  authDomain: "fir-test-6e6c7.firebaseapp.com",
  databaseURL: "https://fir-test-6e6c7.firebaseio.com",
  projectId: "fir-test-6e6c7",
  storageBucket: "fir-test-6e6c7.appspot.com",
  messagingSenderId: "333804642680",
  appId: "1:333804642680:web:eaac9e415eb0d45e63a88d",
  measurementId: "G-K9RQMJYS38"
};
class App extends React.Component{
  constructor(props){
    super(props);
    app.initializeApp(firebaseConfig);
    this.dataBase=app.database();
  }
  render(){
    console.log('test : ');
    this.dataBase.ref('/glass').once('value').then( (snapshot) =>(console.log(snapshot.val())) );

    return(
      <div>연습</div>
    );
  }
}
export default App;