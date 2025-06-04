let credentials = {};
const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail+\.+com$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
const emailValidateElement = document.querySelector('.email-validation');
const passwordValidateElement = document.querySelector('.password-validation');
const emailInput = document.querySelector('.js-email');
const passwordInput = document.querySelector('.js-password');
let otp = '';
document.querySelector('.js-register-button').addEventListener('click',(event) => loginButton(event));
document.querySelector('.js-show-password').addEventListener('click',() => showPassword());
emailInput.addEventListener("input", () => validate(emailRegex, emailInput, emailValidateElement));
passwordInput.addEventListener("input", () => validate(passwordRegex, passwordInput, passwordValidateElement));
document.querySelector('.otp-submit-button').addEventListener('click', () => {
    otpMatch(otp);
})
function loginButton(event) {
    event.preventDefault();
    const username = document.querySelector('.js-email');
    const password = document.querySelector('.js-password');
    const confirm = document.querySelector('.js-confirm');
    if (!(username.value && password.value && confirm.value)) {
        alert("Enter all the fields!!");
        return;
    }
    if (!(validate(emailRegex, emailInput, emailValidateElement) && validate(passwordRegex, passwordInput, passwordValidateElement))) {
        return;
    }
    if (password.value == confirm.value) { 
        credentials.email = emailInput.value;
        credentials.password = passwordInput.value;
        localStorage.setItem("userCredentials", JSON.stringify(credentials));
        document.querySelector('.pop-up').style.display = 'flex';
    }
    else {
        alert('password doesn\'t match');
    }
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
        otp = data;
    });   
}
function otpMatch(otp) {
    if (String(document.querySelector('.otp-input').value) == otp) {
        window.location.href = 'student-details.html';
    }
    else {
        alert('invalid Verification code!!');
    }
        
}
function showPassword() {
    const checkbox1 = document.querySelector('.js-password');
    const checkbox2 = document.querySelector('.js-confirm');
    if (checkbox1.type == 'password' && checkbox2.type == 'password') {
        checkbox1.type = 'text';
        checkbox2.type = 'text';
    }
    else {
        checkbox1.type = 'password';
        checkbox2.type = 'password';
    }
}
function validate(regEx, element, validele) {
    if (!regEx.test(element.value)) {
        validele.style.display = 'block';
        return false;
    }
    else {
        validele.style.display = 'none';
        return true;
    }
}
