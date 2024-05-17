const forms = document.querySelector('.forms');
const pwShowHide = document.querySelectorAll('.eye-icon');
const signup_link = document.querySelector('.signup_link');
const login_link = document.querySelector('.login_link');
const signup = document.querySelector('.signup');
const login = document.querySelector('.login');
const con = document.querySelector('.con');
const pass = document.querySelector('.pass');

var btn_done = document.querySelector('.button');
var modal_wrapper = document.querySelector('.modal_wrapper');
var shadow = document.querySelector('.shadow');

var btn = document.querySelector('.btn');
var modal = document.querySelector('.modal');
var shad = document.querySelector('.shad');

pwShowHide.forEach (eyeIcon =>{
    eyeIcon.addEventListener('click', () => {
        let pwFields = eyeIcon.parentElement.querySelectorAll('.password');

        pwFields.forEach(password => {
            if (password.type === 'password') {
                password.type = 'text';
            } else {
                password.type = 'password';
            }
            
        })
    })
})
// signup_link.addEventListener('click', () =>{
//     login.style.display = "none";
//     signup.style.display = "block";
// })

// login_link.addEventListener('click', () =>{
//     signup.style.display = "none";
//     login.style.display = "block";
// })





let lowerCase = document.getElementById('lower');
let upperCase = document.getElementById('upper');
let digit = document.getElementById('number');
let specialChar = document.getElementById('special');
let minLength = document.getElementById('length');

function checkPassword(data){
    const lower = new RegExp('(?=.*[a-z])');
    const upper = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,})');

    if (lower.test(data)) {
     lowerCase.classList.add('valid');
    } else {
     lowerCase.classList.remove('valid');
    }

    if (upper.test(data)) {
     upperCase.classList.add('valid');
    } else {
     upperCase.classList.remove('valid');
    }

    if (number.test(data)) {
     digit.classList.add('valid');
    } else {
     digit.classList.remove('valid');
    }

    if (special.test(data)) {
     specialChar.classList.add('valid');
    } else {
     specialChar.classList.remove('valid');
    }

    if (length.test(data)) {
      minLength.classList.add('valid');
    } else {
      minLength.classList.remove('valid');
    }
}

function validate_password() {
    var pass = document.getElementById('pass').value;
    var confirm_pass = document.getElementById('confirm_pass').value;
    if (pass!= confirm_pass) {
        document.getElementById('confirm_pass').style.borderBottomColor = 'red';
    } else {
        document.getElementById('confirm_pass').style.borderBottomColor = 'green';
    }
}






const  sign_up = document.querySelector('#signup');
const profile = document.querySelector('#profile');
const  forgot = document.querySelector('.link');
const  signin = document.querySelector('#signin');
const  photo = document.querySelector('.head');



const setupUI = (user) =>{
    //togge ui
    if (user) {
        //account info
        const picture = `
          <img src="${user.photoURL}" alt="photo">
          <h3>${user.email}</h3>
       
        `;
        photo.innerHTML = picture;
          
       
        

        profile.style.display= 'block';
    
        sign_up.style.display= 'none';
    } else {

      
        profile.style.display= 'none';
    
        sign_up.style.display= 'block';
    }
   
        
}
forgot.addEventListener('click', () =>{
    sign_up.style.display = 'none';
    signin.style.display = 'block';
})


const editButton = document.querySelector('.edit');
const editInfo = document.querySelector('#edit-info');
const backButton = document.querySelector('.back');

editButton.addEventListener('click', () =>{
    profile.style.display = 'none';
    editInfo.style.display = 'block';
});

backButton.addEventListener('click', () =>{
    profile.style.display = 'block';
    editInfo.style.display = 'none';
});