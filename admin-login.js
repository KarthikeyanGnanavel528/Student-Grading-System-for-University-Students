document.querySelector('.js-login-button').addEventListener('click',() => loginButton());
document.querySelector('.js-show-password').addEventListener('click',() => showPassword());
function loginButton() {
    const username = document.querySelector('.js-user-name');
    const password = document.querySelector('.js-password');
    if (username.value === 'student' && password.value === 'student') {
        window.open('adminhome.html');
    }
    else {
        alert('incorrect password or username');
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