const regDropDown = document.querySelector('.regulation');
const semDropDown  = document.querySelector('.semester');
const deptDropDown = document.querySelector('.department');
const subDetailsElement = document.querySelector('.subjects-grid-container');
function fetchButton(event) {
    document.querySelector('.subjects-grid-container').style.display = 'block';
    document.querySelector('.subjects-title-grid-container').style.opacity = 1;
    submitData(event, 'view');
}
function toggleSidebar() {
    document.querySelector('.side-bar').classList.toggle('active');
}
fetch('phps/fetch-subjects-gpa.php', {
    method: "POST"
})
.then(response => response.json())
.then(data => {
    const dpDetails = data;
    let sem_dp = ``;
    let reg_dp = ``;
    let dept_dp = ``;
    let sub = ``;
    dpDetails["sem"] = dpDetails["sem"].sort();
    dpDetails["reg"] = dpDetails["reg"].sort();
    dpDetails["dept"] = dpDetails["dept"].sort();
    for (let i of dpDetails["sem"]) {
        sem_dp += `<option>${i}</option>`;
    }
    for (let i of dpDetails["reg"]) {
        reg_dp += `<option>${i}</option>`;
    }
    for (let i of dpDetails["dept"]) {
        dept_dp += `<option>${i}</option>`;
    }
    semDropDown.innerHTML = sem_dp;
    regDropDown.innerHTML = reg_dp;
    deptDropDown.innerHTML = dept_dp;
    });
function submitData(event, token) {
    event.preventDefault();   
    let formData = new FormData();
    formData.append("regulation", regDropDown.value);
    formData.append("department", deptDropDown.value);
    formData.append("semester", semDropDown.value);
    formData.append("token", token);
    fetch("phps/admin.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        subDetailsElement.innerHTML = data.html;
        subData = data;   
    })
    .catch(error => console.error("Error:", error)); 
}