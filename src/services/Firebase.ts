import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat";

class Firebase {
    firebaseConfig = {
        apiKey: "AIzaSyByovf9_DrX0ICcT6KIK2m64rV7WRuOmlo",
        authDomain: "react-hooks-7719b.firebaseapp.com",
        databaseURL: "https://react-hooks-7719b.firebaseio.com",
        projectId: "react-hooks-7719b",
        storageBucket: "react-hooks-7719b.appspot.com",
        messagingSenderId: "282702274457",
        appId: "1:282702274457:web:5001360b519a48dbf03d08",
        measurementId: "G-XQVX7496Y2"
    };

    constructor() {
        if(!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }
    }
}

export default Firebase;