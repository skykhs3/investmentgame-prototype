import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import './Home.css'
class HomePage extends React.Component {

  constructor(props) {
    super(props)
  }
  componentDidMount() {

console.log("Home:"+this.props.state.authUser.username);
   // <AuthUserContext.Consumer>
     // {sample => (
        

        // this.props.firebase.user(sample.state.authUser.username).on('value', snapshot => {
        //   const usersObject = snapshot.val();
        //   sample.action.setValue({asset:usersObject.asset});
        //   // if (usersObject == null) {
        //   //   const usersList = [];
        //   //   this.setState({
        //   //     users: usersList,
        //   //     loading: false,
        //   //   });
        //   // }
        //   // else {
        //   //   const usersList = Object.keys(usersObject).map(key => ({
        //   //     ...usersObject[key],
        //   //     uid: key,
        //   //   }));
        //   //   this.setState({
        //   //     users: usersList,
        //   //     loading: false,
        //   //   });
        //   // }

        // });
   //   )
    //  }
  //  </AuthUserContext.Consumer>
  }
  render() {

    return (
      <AuthUserContext.Consumer>
        {sample => (
          <div>
            <h1>{this.props.state.authUser.username} 님의 잔고는 : ${sample.state.authUser.asset}입니다.</h1>

          </div>
        )}
      </AuthUserContext.Consumer>
    );

  }
}
// function homeForm(WrappedComponent) {
//   return function UseSample(props) {
//     return (
//       <AuthUserContext.Consumer>
//         {
//           ({ state, actions }) => (
//             <WrappedComponent
//               state={state}
//               actions={actions}
//               firebase={this.props.firebase}
//             />
//           )
//         }
//       </AuthUserContext.Consumer>
//     )
//   }
// }
const withHomepage = Component => props => (
  <AuthUserContext.Consumer>
        {
          ({ state, actions }) => (
            <Component
              {...props} state={state} actions={actions}
            />
          )
        }
  </AuthUserContext.Consumer>
);

//   <FirebaseContext.Consumer>
//     {firebase => <Component {...props} firebase={firebase} />}
//   </FirebaseContext.Consumer>
// );
  const condition = authUser => !!authUser;
  export default withAuthorization(condition)(withHomepage(HomePage)); 