<?php
    include('connection.php');
    function gradePts($grade) {
        switch ($grade) {
            case 'O':
                return 10;
            case 'A+':
                return 9;
            case 'A':
                return 8;
            case 'B+':
                return 7;
            case 'B':
                return 6;
            case 'C':
                return 5;
            case 'U':
                return 0;
            default:
                return -1; 
        }
    }
    $grades_json = $_POST['grades'];
    $gpa = $_POST['gpa'];
    $reg_no = $_POST['reg_no'];
    $sem_no =  $_POST['sem_no'];
    $grade_points = $_POST['grade_points'];
    $credits = $_POST['credits'];
    $grades = json_decode($grades_json, true);
    foreach ($grades as $subject => $grade) {
        $grade_pt = gradePts($grade);
        $q = mysqli_query($con, "INSERT INTO grades 
                         VALUES ('$reg_no', '$subject', '$grade_pt', '$grade')
                         ON DUPLICATE KEY UPDATE 
                         grade_pts = VALUES(grade_pts),
                         grade = VALUES(grade)");
    }
    $q = mysqli_query($con, "INSERT INTO semester
                         VALUES ('$reg_no', '$sem_no', '$gpa', '$grade_points', '$credits') 
                         ON DUPLICATE KEY UPDATE 
                         gpa = VALUES(gpa),
                         grade_points = VALUES(grade_points),
                         credits = VALUES(credits)");
    echo "GPA: $gpa reg_no: $reg_no sem_no : $sem_no";
?>