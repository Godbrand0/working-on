import {
    getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, 
    createUserWithEmailAndPassword, onAuthStateChanged, signOut,
    signInWithEmailAndPassword
} from "firebase/auth"

import { initializeApp } from "firebase/app";

import { 
    getFirestore, collection,getDocs, doc,setDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHiY3nb2bh7_VnAvl60iYbnjUsOusjPoA",
    authDomain: "auth-signin-8c41f.firebaseapp.com",
    projectId: "auth-signin-8c41f",
    storageBucket: "auth-signin-8c41f.appspot.com",
    messagingSenderId: "769903164072",
    appId: "1:769903164072:web:b19ce0b2671a1cc0c0609d"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth();
const colRef = collection(db, 'users')
const provider = new GoogleAuthProvider();


onAuthStateChanged(auth, (user) => {
    if (user) {
        setupUI(user);
    } else {
        setupUI();
    }
}, err => {
    console.log(err.message);
});

 


const comes = document.querySelectorAll('#come');

comes.forEach (come => {
    come.addEventListener('click', (e) => {
        signInWithRedirect(auth, provider);
    
    
        getRedirectResult(auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            
               
            // The signed-in user info.
            const user = result.user;
            
            
            const userEmail = user.email;
    
            // // Create a reference to the user's document in the 'users' collection using the user's UID
            // const docRef = doc(db, 'users', result.uid);
    
            // // Set the document data with the user's email
            // setDoc(docRef, {
            //     name: userEmail
            // });
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          })
          
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
           // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
    
        });
        
        
    });
    
})


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
   
    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user created:', cred.user)
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err =>{
        signupForm.querySelector('.error').innerHTML = err.message;
    })
})   


const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        console.log('user entered:', cred.user)
        loginForm.reset()
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err =>{
        loginForm.querySelector('.error').innerHTML = err.message;
    })

  

})

const logout = document.querySelector('.logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth)
   

})

