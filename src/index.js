import {
    getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, 
    createUserWithEmailAndPassword, onAuthStateChanged, signOut,
    signInWithEmailAndPassword
} from "firebase/auth"

import { initializeApp } from "firebase/app";

import { 
    getFirestore, collection,getDocs,
    addDoc,onSnapshot,doc,setDoc,updateDoc
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
const provider = new GoogleAuthProvider();


onAuthStateChanged(auth, (user) => {
    if (user) {
        const docRef = doc(db, 'users', user.uid);
        onSnapshot(docRef, docSnapshot => {    
            if (docSnapshot.exists()) {
                setupGuides(docSnapshot);
            } else {
                setupGuides([]);
            }
            setupUI(user);
        }, err => {
            console.log(err.message);
        }); 
    } else {
        setupUI();
        setupGuides([]);
    }
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
            const docRef = doc(db, 'users', user.uid);

                getDoc(docRef).then((docSnapshot) => {
                    if (!docSnapshot.exists()) {
                        // Create user document if it doesn't exist
                        setDoc(docRef, {
                            gender: '',
                            color: '',
                            state: ''
                        });
                    }
                });
            const userEmail = user.email;
    
            // // Create a reference to the user's document in the 'users' collection using the user's UID
            // const docRef = doc(db, 'users', result.uid);
    
           
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

const signupLoader = document.querySelector('#signup-loader');
const loginLoader = document.querySelector('#login-loader');

 // Show loader
 const showLoader = (loader) => {
    loader.style.visibility = 'visible';
};

// Hide loader
const hideLoader = (loader) => {
    loader.style.visibility = 'hidden';
};

const signupForm = document.querySelector('#signup-form');
const addInfo = document.querySelector('.add');

signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    showLoader(signupLoader);


    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const gender = addInfo['gender'].value;
    const color = addInfo['color'].value;
    const state = addInfo['state'].value;

   
    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        const docRef = doc(db, 'users', cred.user.uid);
        return setDoc(docRef, {
            gender: gender,
            color: color,
            state: state
        });
    })
    .then(() => {
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
        hideLoader(signupLoader);
    })
    .catch(err =>{
        signupForm.querySelector('.error').innerHTML = err.message;
        hideLoader(signupLoader);
    })
})   






const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showLoader(loginLoader);

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        loginForm.reset()
        document.getElementById('profile').style.display = 'block';
        document.getElementById('signin').style.display = 'none';
        loginForm.querySelector('.error').innerHTML = '';
        hideLoader(loginLoader);
    }).catch(err =>{
        loginForm.querySelector('.error').innerHTML = err.message;
        hideLoader(loginLoader);
    })

  

})

const logout = document.querySelector('.logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth)
   

})

const addInfoForm = document.querySelector('.add');

addInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const gender = addInfoForm['gender'].value;
    const color = addInfoForm['color'].value;
    const state = addInfoForm['state'].value;

    onAuthStateChanged(auth, (user) => {
        
        if (user) {
            const docRef = doc(db, 'users', user.uid);

            updateDoc(docRef, {
                gender: gender,
                color: color,
                state: state
            })
            .then(() => {
                addInfoForm.reset();
            })
            .catch((error) => {
                console.error('Error updating document:', error.message);
            });
        } else {
            console.log('No user is signed in.');
        }
    });
});



