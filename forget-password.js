let credentials = {}
document.querySelector('.js-login-button').addEventListener('click',(event) => changePassword(event));
document.querySelector('.js-show-password').addEventListener('click',() => showPassword());
let otp;
function changePassword(event) {
    event.preventDefault();
    const username = document.querySelector('.js-verification-code');
    const password = document.querySelector('.js-password');
    const confirm = document.querySelector('.js-confirm');
    if (!(username.value && password.value && confirm.value)) {
        alert("Enter all the fields!!");
        return;
    }
    if (!(validate(emailRegex, emailInput, emailValidateElement) && validate(passwordRegex, passwordInput, passwordValidateElement))) {
        alert('Enter a valid password!');
        return;
    }
    if (password.value == confirm.value) {
        credentials.email = JSON.parse(localStorage.getItem('email'));
        credentials.password = passwordInput.value;
    }
    else {
        alert('password doesn\'t match');
    }
    let otp = JSON.parse(localStorage.getItem('otp'));
    if (otp != username.value) {
        alert('wrong verification code!!');
    }
    else {
        let formData = new FormData();
        formData.append('email', credentials.email);
        formData.append('password', credentials.password);
        fetch('phps/change-password.php', {
            method: "POST",
            body: formData
        })
        .then(res => res.text())
        .then(data => alert('password changed! Now go login.'));
        window.location.href = 'student-login.html';
    }
}
function showPassword() {
    const checkbox = document.querySelector('.js-password');
    if (checkbox.type == 'password') {
        checkbox.type = 'text';
    }
    else {
        checkbox.type = 'password';
    }
}
const emailRegex = /^[0-9]{4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
const emailValidateElement = document.querySelector('.email-validation');
const passwordValidateElement = document.querySelector('.password-validation');
function validate(regEx, element, validele) {
    if (!regEx.test(element.value)) {
        validele.style.display = 'block';
        return  false;
    }
    else {
        validele.style.display = 'none';
        return true;
    }
}
const emailInput = document.querySelector('.js-verification-code');
const passwordInput = document.querySelector('.js-password');
emailInput.addEventListener("input", () => validate(emailRegex, emailInput, emailValidateElement));
passwordInput.addEventListener("input", () => validate(passwordRegex, passwordInput, passwordValidateElement));