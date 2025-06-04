<?php
<!DOCTYPE html>
<html>
    <head>
        <title>GPA calculator</title>
        <link rel="icon" href="icons/cgpa-icon.jpg">
        <link rel="stylesheet" href="navigation-bar.css">
        <link rel="stylesheet" href="gpa-calculator.css">
        <link rel="stylesheet" href="general.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">        
    </head>
    <body>
        <div class="navigation-bar">
            <p></p>
            <p class="title">GPA CALCULATOR</p>
            <a href="home.html"><button class="login-button">Home</button></a>
        </div>
        <center>
            <div class="fetch-details">
                <form action="phps/fetch-subjects-gpa.php" method="post" onsubmit="submitData(event)">
                <table>
                    <tr>
                        <td>
                            <label for="regulation">Choose the Regulation</label>
                        </td>
                        <td>
                            <select name="regulation" id="regulation" class="reg-dropdown"></select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="department">Choose the Department</label>
                        </td>
                        <td>
                            <select name="department" id="department" class="dept-dropdown"></select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="semester">Choose the Semester</label>
                        </td>
                        <td>
                            <select name="semester" id="semester" class="sem-dropdown"></select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                                <input type="submit" value="Fetch Subjects" name="fetch" onclick="fetchButton()">
                        </td>
                    </tr>
                </table>
                </form>
            </div>
            <div class="subjects-title-grid-container">
                <div>semester</div>
                <div>subject code</div>
                <div>subject name</div>
                <div>grade</div>
            </div>
            <div class="subjects-grid-container subjects-grid-container1"></div>
            <div class="calculate-button-container calculate-button-container1">
                <button onclick="gpaCalculation(subData)">calculate</button>
                <h3 class="final-gpa"></h3>
            </div>
        </center>
        <?php 
            include('phps/fetch-subjects-gpa.php');    
        ?>
        <script>
            function fetchButton() {
                document.querySelector('.subjects-grid-container').classList.remove('subjects-grid-container1');
                document.querySelector('.calculate-button-container').classList.remove('calculate-button-container1');
            }
            // document.querySelector('.sd').addEventListener('focus', () => option(document.querySelector('.sd'), document.querySelector('.sd').value));
            let subData;
            function submitData(event) {
                event.preventDefault(); // Prevent form from reloading the page
                    
                let formData = new FormData();
                formData.append("regulation", regDropDown.value);
                formData.append("department", deptDropDown.value);
                formData.append("semester", semDropDown.value);
                formData.append("token", "gpa");

                fetch("phps/kkk.php", {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    
                    subDetailsElement.innerHTML = data.html;
                    subData = data;
                    // console.log(subData);
                    

                    
                })
                .catch(error => console.error("Error:", error));
                
            }
            function gpaCalculation(data) {
                let gp = 0;
                let grade;
                let flag = true;
                console.log(Number(data.credits[1]));
                console.log("hiii" + data.credits.length);
                for(let i = 0; i < data.credits.length; i++) {
                    const ele = document.querySelector('.sd'+ (i+1));
                    grade = gradePts(ele.value);
                    if (grade === -1) {
                        ele.style.border = '1px solid red';
                        flag = false;
                    }
                    else {
                        ele.style.border = '1px solid black';
                        gp += Number(data.credits[i]) * Number(grade);
                    }
                    // option(ele, grade);
                }
                
                if (flag){
                    document.querySelector('.final-gpa').innerText= 'GPA = ' + (gp/(data.total_credits)).toFixed(3);
                }
                else {
                    document.querySelector('.final-gpa').innerText= '';
                }
                
            }
            // function option(ele, grad) {
            //     if (grad! == -1) {
            //         ele.style.border = '1px solid black';
            //     }
            //     else {
            //         ele.style.border = '1px solid red';
            //     }
            // }
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

            // console.log(subData);
            const semDropDown= document.querySelector('.sem-dropdown');
            const regDropDown= document.querySelector('.reg-dropdown');
            const deptDropDown= document.querySelector('.dept-dropdown');
            const subDetailsElement = document.querySelector('.subjects-grid-container');
            
            const dpDetails = <?php echo dropDownDetails(); ?>;
            //console.log(dpDetails);
            // let subData;
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
        </script>
    </body>
</html>