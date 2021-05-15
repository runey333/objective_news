import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyB4zlKazEyS3t_0sDTUyuq2trfW0lDrH_A",
    authDomain: "react-fb-practice-8a837.firebaseapp.com",
    databaseURL: "https://react-fb-practice-8a837-default-rtdb.firebaseio.com",
    projectId: "react-fb-practice-8a837",
    storageBucket: "react-fb-practice-8a837.appspot.com",
    messagingSenderId: "1014064928329",
    appId: "1:1014064928329:web:b0491b23a060b8099d9198",
    measurementId: "G-B67S410C5F"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
