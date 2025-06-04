<?php
    include('connection.php');
    $reg_no = $_POST['reg_no'] ?? '';
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $regulation = $_POST['regulation'] ?? '';
    $department = $_POST['department'] ?? '';
    $password = $_POST['password'] ?? '';
    echo "smae:$name";
    $query = mysqli_query($con, "INSERT INTO student_table (reg_no, name, email, regulation, department) VALUES ('$reg_no', '$name', '$email', '$regulation', '$department')");
    $query2 = mysqli_query($con, "INSERT INTO credentials(email,password) VALUES('$email', '$password');");
?>