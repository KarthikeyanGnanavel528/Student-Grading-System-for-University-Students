const savedCredentials = JSON.parse(localStorage.getItem("userCredentials"));
localStorage.removeItem("userCredentials");
console.log(savedCredentials);
const nameRegex = /^[A-Za-z ]{2,40}(\.[A-Za-z]{1})*$/;
const regNoRegex = /^\d{12}$/;
const form = document.querySelector('.js-save-button');
const nameInput = document.querySelector('.js-name');
const regNoInput = document.querySelector('.js-reg-no');
const regulationInput = document.querySelector('.js-regulation');
const departmentInput = document.querySelector('.js-department');
const nameValidateElement = document.querySelector('.name-validate');
const regNoValidateElement = document.querySelector('.reg-no-validate');
nameInput.addEventListener("input", () => validate(nameRegex, nameInput, nameValidateElement));
regNoInput.addEventListener("input", () => validate(regNoRegex, regNoInput, regNoValidateElement));
fetch('phps/drpdowns.php')
.then(response => response.json())
.then(data => {
    regulationInput.innerHTML = data.regulation;
    departmentInput.innerHTML = data.department;
});
form.addEventListener('click', (e) => {
    if (!(regNoInput.value && nameInput.value)){
        alert("fill all the fields");
    }
    else{
        save();
    }
});
function validate(regEx, element, validele) {
    if (!regEx.test(element.value)) {
        validele.style.display = 'block';
        return false;
    } else {
        validele.style.display = 'none';
        return true;
    }
}
function save() {
    let formData = new FormData();
    formData.append("reg_no", regNoInput.value);
    formData.append("name", nameInput.value);
    formData.append("email", savedCredentials.email);
    formData.append("regulation", regulationInput.value);
    formData.append("department", departmentInput.value);
    formData.append('password', savedCredentials.password);
    console.log(savedCredentials);
    fetch('phps/savedata.php', {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => console.log("Server says:", data))
    .catch(error => console.error("Error:", error));
    alert('data saved! Now Go Login!');
}