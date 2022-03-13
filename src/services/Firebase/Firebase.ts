import firebase from "firebase/compat";
import {firebaseConfig} from "../../constants/Credentials";


if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const updateUserData = async (uid: string, data: any) => {
    return await firebase.database().ref(`users/${uid}`).set(data);
}

export const Providers = {
    facebook: new firebase.auth.FacebookAuthProvider(),
    google: new firebase.auth.GoogleAuthProvider()
}

// export default Firebase;