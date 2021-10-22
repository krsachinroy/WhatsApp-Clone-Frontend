import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD9-hu96Au0xYrvJOCLjXDBoan60LtSbTA",
    authDomain: "whatsapp-clone-9b7b2.firebaseapp.com",
    projectId: "whatsapp-clone-9b7b2",
    storageBucket: "whatsapp-clone-9b7b2.appspot.com",
    messagingSenderId: "207576831602",
    appId: "1:207576831602:web:c3f62eef2d63c2ca6b14eb"
};

firebase.initializeApp(firebaseConfig);
export default firebase;