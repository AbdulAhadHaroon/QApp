import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyASzd6nLMzSBHl9gwbEJOrKJi_Sc6Kg-H4",
    authDomain: "clinics-qapp.firebaseapp.com",
    databaseURL: "https://clinics-qapp.firebaseio.com",
    projectId: "clinics-qapp",
    storageBucket: "clinics-qapp.appspot.com",
    messagingSenderId: "127427003420"
  };
  firebase.initializeApp(config);

  export default firebase;
