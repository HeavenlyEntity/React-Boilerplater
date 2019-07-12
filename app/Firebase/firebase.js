import firebase from 'firebase';

// The core Firebase JS SDK is always required and must be listed first
// {/*<script src="https://www.gstatic.com/firebasejs/6.3.0/firebase-app.js"></script>*/}

// https://firebase.google.com/docs/web/setup#config-web-app

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDv5ONsqetztw8QEAo4t_MnXVTViWmUpqE',
  authDomain: 'mipi-ce353.firebaseapp.com',
  databaseURL: 'https://mipi-ce353.firebaseio.com',
  projectId: 'mipi-ce353',
  storageBucket: 'mipi-ce353.appspot.com',
  messagingSenderId: '1032970074016',
  appId: '1:1032970074016:web:81e728234bb73dfe',
};
// Initialize Firebase
const fireBase = firebase.initializeApp(firebaseConfig);
export default fireBase;
