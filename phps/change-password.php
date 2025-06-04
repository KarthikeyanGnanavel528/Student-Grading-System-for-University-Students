<?php
    include('connection.php');
    $em = $_POST['email'];
    $ps = $_POST['password'];
    $quu = mysqli_query($con, "UPDATE credentials SET password= '$ps' WHERE email = '$em'");
    if ($quu) {
        echo "changed";
    }
    else {
        echo "not changed";
    }
?>