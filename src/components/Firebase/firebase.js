import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyD04Vcwcek6_LcZepFgGNXLAs2cq3TP3SU",
  authDomain: "investment-game-hyeonsu1984.firebaseapp.com",
  databaseURL: "https://investment-game-hyeonsu1984.firebaseio.com",
  projectId: "investment-game-hyeonsu1984",
  storageBucket: "investment-game-hyeonsu1984.appspot.com",
  messagingSenderId: "137734982819",
  appId: "1:137734982819:web:07e4a9527e7aa5525e0316",
  measurementId: "G-3M0BH7W64D"
};
class Firebase {
  constructor() {
    //console.log(firebaseConfig.apiKey);
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database();
    
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  user = (uid) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users/');

}
export default Firebase;