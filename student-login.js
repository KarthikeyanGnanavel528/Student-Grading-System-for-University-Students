document.querySelector('.js-login-button').addEventListener('click',(event) => loginButton());
document.querySelector('.js-show-password').addEventListener('click',() => showPassword());
document.querySelector('.forget-password-button').addEventListener('click', () => {
    forgetPassword();
});
document.querySelector('.js-submit-button').addEventListener('click', () => {
    submitButton(event);
});
function loginButton(event) {
    const username = document.querySelector('.js-email');
    const password = document.querySelector('.js-password');
    let formData = new FormData();
    formData.append('email', username.value);
    formData.append('password', password.value);
    fetch('phps/student-login.php', {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data) {
            // console.log(data);
            localStorage.setItem('stdetails', JSON.stringify(data.st_details));
            localStorage.setItem('grade_details', JSON.stringify(data.grade_details));
            window.location.href = 'student-grades-page.html';
        }
        else {
            alert('incorrect password or email');
        }
    })
    .then(error => console.log(error));
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
function forgetPassword() {
    document.querySelector('.pop-up').style.display = 'flex';   
}
function submitButton(event) {
    event.preventDefault();
    const emailInput = document.querySelector('.forget-password-email');
    let formData = new FormData(); 
    formData.append('email', emailInput.value);
    formData.append('token', 'verify');
    fetch('phps/mail.php', {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if(!data) {
            console.log(data);
            alert('Not a valid email!');
            return;
        }
        localStorage.setItem('otp', JSON.stringify(data));
        localStorage.setItem('email', JSON.stringify(emailInput.value));
        console.log(data);
        alert('verification code sent to your email!');
    });
    window.location.href = 'forget-password.html';
}
const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail+\.+com$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
const emailValidateElement = document.querySelector('.email-validation');
const passwordValidateElement = document.querySelector('.password-validation');
function validate(regEx, element, validele) {
    if (!regEx.test(element.value)) {
        validele.style.display = 'block';
    }
    else {
        validele.style.display = 'none';
    }
}
const emailInput = document.querySelector('.js-email');
const passwordInput = document.querySelector('.js-password');
emailInput.addEventListener("input", () => validate(emailRegex, emailInput, emailValidateElement));
passwordInput.addEventListener("input", () => validate(passwordRegex, passwordInput, passwordValidateElement));