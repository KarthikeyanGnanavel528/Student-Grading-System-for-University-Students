function fetchButton() {
    document.querySelector('.subjects-grid-container').classList.remove('subjects-grid-container1');
    document.querySelector('.calculate-button-container').classList.remove('calculate-button-container1');
}
let subData;
function submitData(event, token) {
    event.preventDefault();   
    let formData = new FormData();
    formData.append("regulation", regDropDown.value);
    formData.append("department", deptDropDown.value);
    formData.append("semester", semDropDown.value);
    formData.append("token", token);
    fetch("phps/kkk.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        
        subDetailsElement.innerHTML = data.html;
        subData = data;   
    })
    .catch(error => console.error("Error:", error)); 
}
function gpaCalculation(data) {
    let gp = 0;
    let grade;
    let flag = true;
    let credit = 0;
    for(let i = 0; i < data.credits.length; i++) {
        const ele = document.querySelector('.sd'+ (i+1));
        grade = gradePts(ele.value);
        if (grade === -1) {
            ele.style.border = '1px solid red';
            flag = false;
        }
        else {
            ele.style.border = '1px solid black';
            if (grade != 0){
                gp += Number(data.credits[i]) * Number(grade);
                credit += Number(data.credits[i]);
            }  
        }
    }
    let gpa = (credit === 0) ? 0.000 : (gp/(credit)).toFixed(3);
    if (flag){
        document.querySelector('.final-gpa').innerText= 'GPA = ' + gpa;
    }
    else {
        document.querySelector('.final-gpa').innerText= '';
    }    
}
function gradePts(grade) {
    switch(grade) {
        case 'O':
            return 10;
            break;
        case 'A+':
            return 9;
            break;
        case 'A':
            return 8;
            break;
        case 'B+':
            return 7;
            break;
        case 'B':
            return 6;
            break;
        case 'C':
            return 5;
            break;
        case 'U':
            return 0;
            break;
        default:
            return -1;
    }
}
const semDropDown= document.querySelector('.sem-dropdown');
const regDropDown= document.querySelector('.reg-dropdown');
const deptDropDown= document.querySelector('.dept-dropdown');
const subDetailsElement = document.querySelector('.subjects-grid-container');
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