const stdetails = JSON.parse(localStorage.getItem('stdetails'));
const stname = stdetails.name.toUpperCase();
const stRegNo = stdetails.reg_no;
const nameElement = document.querySelector('.js-reg-no');
const regnoElement = document.querySelector('.js-name');
const classElement = document.querySelector('.js-class');
const gradesElement = document.querySelector('.subjects-and-grades');
const saveButtonElement = document.createElement('button');
const cgpaElement = document.querySelector('.js-overall-cgpa');
const calculateButton = document.querySelector('.js-calculate-button');
let editButtonElement = document.createElement('button');
document.querySelectorAll('.semesters button').forEach(button => {
    button.addEventListener('click', (event) => {
      const semester = event.target.getAttribute('data-semester');
      showSubjects(semester);
    });
  });
const cgpaClass = document.querySelector('.js-class');
saveButtonElement.innerText = 'Save';
saveButtonElement.classList.add('save-button');
document.querySelector('.login-button').addEventListener('click', () => {
    window.location.replace('student-login.html');
});
document.title = stname;
nameElement.innerHTML = stname;
regnoElement.innerHTML = stdetails.reg_no;
let details = {};
let promises = [];
let n = 0;
let f = `<h1>Complete the Previous Semesters</h1>`;
let GPA, GP, CREDIT;
let first = false;
for (let i = 1; i <= 8; i++) {
    let formData = new FormData();
    formData.append('semester', i);
    formData.append('regulation', stdetails.regulation);
    formData.append('department', stdetails.department);
    formData.append('token', 'gpa');
    let fetchPromise = fetch('phps/kkk.php', {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        details['sem'+i] = {html: data.html, credits: data.credits};
    });
    promises.push(fetchPromise);
}

Promise.all(promises).then(() => {
    localStorage.setItem('details', JSON.stringify(details));
    details = JSON.parse(localStorage.getItem('details')) || {};
    // safe initial load
    let curSem = 'sem1';
    showSubjects('sem1');
});

details = JSON.parse(localStorage.getItem('details')) || {};
let grade_details  = JSON.parse(localStorage.getItem('grade_details')) || {};
cgpaCalculation();
let curSem = 'sem1';

n = details['sem1']['credits'].length;
editButtonElement.innerText = 'Edit';
editButtonElement.classList.add('edit-button');
calculateButton.addEventListener('click', () => gpaCalculation(details[curSem]['credits']));
saveButtonElement.addEventListener('click', () => {
    saveButton(n);
});
editButtonElement.addEventListener('click', () => {
    editButtonAction(n);
});
if(grade_details[1]['grades']) {
    calculateButton.replaceWith(editButtonElement);
}
function gpaCalculation(credits) {
    let gp = 0;
    let grade;
    let flag = true;
    let credit = 0;
    for(let i = 0; i < credits.length; i++) {
        const ele = document.querySelector('.sd'+ (i+1));
        grade = gradePts(ele.value);
        if (grade === -1) {
            ele.style.border = '1px solid red';
            flag = false;
        }
        else {
            ele.style.border = '1px solid black';
            if (grade != 0){
                gp += Number(credits[i]) * Number(grade);
                credit += Number(credits[i]);
            }  
        }
    }
    let gpa = (credit === 0) ? 0.000 : (gp / credit).toFixed(3);
    if (flag){
        document.querySelector('.final-gpa').innerText= 'GPA = ' + gpa;
        calculateButton.replaceWith(saveButtonElement);
    }
    else {
        document.querySelector('.final-gpa').innerText= 'GPA = -';
        // document.querySelector('.save-button').style.display = 'none';
    }   
    GPA = gpa; 
    GP = gp;
    CREDIT = credit;
}
function cgpaCalculation() {
    let g = 0;
    let c = 0;
    let cgpa = 0;
    for(let i = 1; i <= 8; i++) {
        g += (Number(grade_details[i]['grade_points']) || 0);
        c += (Number(grade_details[i]['credits']) || 0);
    }
    cgpa = (c===0) ? 0.000 : (g/c).toFixed(3);
    cgpaElement.innerHTML = cgpa;
    cgpaClass.innerHTML = classCalculation(cgpa);
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
function classCalculation(gpa) {
    if (gpa == 0) {
        return '-';
    }
    if (gpa >= 8.5) {
        return 'Distinction';
    }
    else if (gpa >= 6.5 && gpa < 8.5) {
        return 'First';
    }
    else {
        return 'Second';
    }
}
function saveButton(n) {
    let subs = {};
    for (let i = 0; i < n; i++) {
        const subjectKey = document.querySelector('.sc' + (i + 1));
        const gradeValue = document.querySelector('.sd' + (i + 1));
        subs[subjectKey.innerText.trim()] = gradeValue.value;
        const newElem = document.createElement('p');
        newElem.classList.add('sg');
        newElem.classList.add('sg'+(i+1));
        newElem.textContent = gradeValue.value;
        gradeValue.replaceWith(newElem);
    }
    let formData = new FormData();
    formData.append('grades', JSON.stringify(subs));
    formData.append('gpa', GPA);
    formData.append('grade_points', GP);
    formData.append('credits', CREDIT);
    formData.append('reg_no', stRegNo);
    formData.append('sem_no', curSem[3]);
    fetch('phps/student-grades-page.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log('Server response:', data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
    const st = JSON.parse(localStorage.getItem('grade_details')) || {};
    if (!st[curSem[3]]) st[curSem[3]] = {};
    st[curSem[3]]['grades'] = gradesElement.innerHTML;
    st[curSem[3]]['gpa'] = String(GPA);
    st[curSem[3]]['grade_points'] = String(GP);
    st[curSem[3]]['credits'] = String(CREDIT);
    localStorage.setItem('grade_details', JSON.stringify(st));
    grade_details = {...st};
    cgpaCalculation();
    saveButtonElement.replaceWith(editButtonElement);
}
function editButtonAction(n) {
    editButtonElement.replaceWith(calculateButton);
    let grade_values = [];
    for(let i = 1; i <= n; i++) {
        const gr = document.querySelector('.sg' + i).textContent;
        grade_values.push(gr);
    }
    gradesElement.innerHTML = details[curSem]['html'];
    for(let i = 0; i < n; i++) {
        document.querySelector('.sd'+(i+1)).value = grade_values[i];
    }
}
function showSubjects(sem) {
    curSem = sem;
    gradesElement.innerHTML = grade_details[sem[3]]?.grades ||  details[sem].html;
    if (curSem[3] != 1) {
        if (!(grade_details[Number([sem[3]]) - 1]).grades) {
            gradesElement.innerHTML = f;
            document.querySelector('.gpa-cgpa').style.display = 'none';
        }
        else {
            document.querySelector('.gpa-cgpa').style.display = 'flex';
        }
    }
    else {
        if(first) {
            document.querySelector('.gpa-cgpa').style.display = 'flex';
        }
        first = true;
    }
    document.querySelector('.final-gpa').innerText = 'GPA = ' + (grade_details[sem[3]]?.gpa || '');
    if (grade_details[sem[3]]?.grades) {
        calculateButton.replaceWith(editButtonElement);
        saveButtonElement.replaceWith(editButtonElement);
    } else {
        saveButtonElement.replaceWith(calculateButton);
        editButtonElement.replaceWith(calculateButton);
    }
    n = details[sem].credits.length;
    document.querySelectorAll('.semesters button').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.but-${sem[3]}`).classList.add('active');
}
gradesElement.addEventListener('input', () => {
    saveButtonElement.replaceWith(calculateButton);
});



function downloadPdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const stdetails = JSON.parse(localStorage.getItem('stdetails'));
    const grade_details = JSON.parse(localStorage.getItem('grade_details'));

    let y = 10;

    doc.setFontSize(16);
    doc.text("Student Grade Report", 70, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Name: ${stdetails.name}`, 10, y);
    y += 7;
    doc.text(`Register Number: ${stdetails.reg_no}`, 10, y);
    y += 7;
    doc.text(`Department: ${stdetails.department}`, 10, y);
    y += 7;
    doc.text(`Regulation: ${stdetails.regulation}`, 10, y);
    y += 10;

    for (let sem = 1; sem <= 8; sem++) {
        if (!grade_details[sem]?.grades) continue;

        doc.setFontSize(14);
        doc.text(`Semester ${sem}`, 10, y);
        y += 6;

        // Parse grades
        const parser = new DOMParser();
        const html = parser.parseFromString(grade_details[sem].grades, 'text/html');
        const rows = [];

        const subjectCodes = html.querySelectorAll('[class^="sc"]');
        const grades = html.querySelectorAll('[class^="sg"]');

        for (let i = 0; i < subjectCodes.length; i++) {
            const code = subjectCodes[i]?.innerText.trim() || '';
            const grade = grades[i]?.innerText.trim() || '';
            rows.push([code, grade]);
        }


        doc.autoTable({
            head: [['Subject', 'Grade']],
            body: rows,
            startY: y,
            margin: { left: 10 },
            theme: 'grid',
            styles: { fontSize: 10 }
        });

        y = doc.lastAutoTable.finalY + 10;

        doc.text(`GPA: ${grade_details[sem].gpa}`, 10, y);
        y += 8;

        // Add page if reaching bottom
        if (y > 260) {
            doc.addPage();
            y = 10;
        }
    }

    // Final CGPA
    doc.setFontSize(12);
    doc.text(`CGPA: ${document.querySelector('.js-overall-cgpa').textContent}`, 10, y);
    doc.text(`Class: ${document.querySelector('.js-class').textContent}`, 10, y + 7);

    doc.save(`${stdetails.reg_no}_grade_report.pdf`);
}
