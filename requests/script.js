document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const form = document.querySelector("form");

    const regExpName = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;
    const regExpPass = /^[a-zA-Z0-9]+/;
    const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const validateElem = (elem) => {
        if(elem.name === 'firstname') {
    if(!regExpName.test(elem.value) && elem.value!== "") {
        elem.nextElementSibling.textContent = 'Введіть правильно';
    } else { 
        elem.nextElementSibling.textContent = ' ';
    }
}
if(elem.name === 'lastname') {
    if(!regExpName.test(elem.value) && elem.value!== "") {
        elem.nextElementSibling.textContent = 'Введіть правильно';
    } else { 
        elem.nextElementSibling.textContent = ' ';
    }
}
if(elem.name === 'email') {
    if(!regExpEmail.test(elem.value) && elem.value!== "") {
        elem.nextElementSibling.textContent = 'Введіть правильно email';
    } else { 
        elem.nextElementSibling.textContent = ' ';
    }
}
if(elem.name === 'password') {
    if(!regExpPass.test(elem.value) && elem.value!== "") {
        elem.nextElementSibling.textContent = 'Введіть надійний пароль!';
    } else { 
        elem.nextElementSibling.textContent = ' ';
    }
}

    }

    for(let elem of form.elements) {
        if(!elem.classList.contains('btn-primary')) {
            
            elem.addEventListener('blur', () => {
             validateElem(elem);   
            });
        }

    }

    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        for(let elem of form.elements) {
            if(!elem.classList.contains('btn-primary')) {
                
                if(elem.value === "") {
                    elem.nextElementSibling.textContent = 'Зааповніть дане поле!';

                } else {
                    elem.nextElementSibling.textContent = " ";
                }
            }

        }

    })
})
let signUp = document.querySelector('.signUp');
let signInNow = document.querySelector('.signInNow');
let signIn = document.querySelector('.signIn');
let signUpBtn = document.querySelector('.btn-primary');
signInNow.onclick = (event) => {
signIn.style.display = 'block';
signUp.style.display = 'none';

}

function locStorage() {
    let name = document.querySelector('#name');
    localStorage.setItem('Name', name.value);

    let sname = document.querySelector('#lname');
    localStorage.setItem('Lastname', sname.value);

    let mail = document.querySelector('#mail');
    localStorage.setItem('Email', mail.value);

    let pass = document.querySelector('#pass');
    localStorage.setItem('Password', pass.value);

}

signUpBtn.onclick = (event) => {

    signIn.style.display = 'block';
    signUp.style.display = 'none';

    // check validation
    locStorage();
}

const signForm = document.querySelector('#signForm');
let localPass = localStorage.getItem('Password');
let localEmail = localStorage.getItem('Email');
