
<?php
    include('connection.php');
    $email = $_POST['email'];
    $password = $_POST['password'];
    $reg_no = '';
    $dept;
    $re = mysqli_query($con, "SELECT * FROM credentials WHERE email='$email' AND password='$password';");
    if (mysqli_num_rows($re) == 0) {
        echo json_encode('');
    } else {
        $q = mysqli_query($con, "SELECT * FROM student_table WHERE email='$email';");
        $details = [];
        $grade_details = [];
        if (mysqli_num_rows($q) > 0) {
            $row = mysqli_fetch_assoc($q);
            $reg_no = $row['reg_no'];
            $st_details = [
                "reg_no" => $reg_no,
                "name" => $row['name'],
                "email" => $row['email'],
                "regulation" => $row['regulation'],
                "department" => $row['department']
            ];
            $details['st_details'] = $st_details;
            $dept = $row['department'];
        }
        for ($i = 1; $i <= 8; $i++) {
            $q1 = mysqli_query($con, "SELECT subjects.sem_no,grades.sub_code, subjects.sub_name, grades.grade
                                    FROM grades 
                                    JOIN subjects ON grades.sub_code = subjects.sub_code 
                                    WHERE grades.reg_no='$reg_no' AND subjects.sem_no = '$i' AND department = '$dept';");
            $q2 = mysqli_query($con, "SELECT *FROM semester WHERE reg_no='$reg_no' AND sem_no='$i';");
            $gpa = null;
            $grade_points = null;
            $credits = null;
            if ($q2 && mysqli_num_rows($q2) > 0) {
                $gparow = mysqli_fetch_assoc($q2);
                $gpa = $gparow['gpa'];
                $grade_points = $gparow['grade_points'];
                $credits = $gparow['credits'];
            }
            $html = '';
            if ($q1 && mysqli_num_rows($q1) > 0) {
                $count =1;
                while ($row = mysqli_fetch_assoc($q1)) {
                    $html = $html."<div class='subject-details'>
                    <p>{$row['sem_no']}</p>
                    <p class='sc sc$count'>{$row['sub_code']}</p>
                    <p>{$row['sub_name']}</p>
                    <p class='sg sg$count'>{$row['grade']}</p>
                </div>";
                $count++;
                }
            }
            $grade_details[$i] = [
                'grades' => $html,
                'gpa' => $gpa,
                'grade_points' => $grade_points,
                'credits' => $credits
            ];
        }
        $details['grade_details'] = $grade_details;
        ini_set('display_errors', 1);
        ini_set('display_startup_errors', 1);
        error_reporting(E_ALL);
        echo json_encode($details);
    }
?>
