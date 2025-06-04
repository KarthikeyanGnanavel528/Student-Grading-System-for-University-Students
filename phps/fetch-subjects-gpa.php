<?php
    include('connection.php');
    $dpDetails = [
        "reg" => [],
        "sem" => [],
        "dept"  => []
    ];
    $reg = [];
    $sem = [];
    $dept = [];
    $query = mysqli_query($con, "select distinct regulation from subjects order by regulation;");
    $query2 = mysqli_query($con, "select distinct department from subjects order by department;");
    $query3 = mysqli_query($con, "select distinct sem_no from subjects order by sem_no;");
    if (mysqli_num_rows($query) > 0 && mysqli_num_rows($query2) && mysqli_num_rows($query3)) {
        while ($row = mysqli_fetch_assoc($query)) {
            array_push($dpDetails["reg"], $row['regulation']);
        }
        while ($row = mysqli_fetch_assoc($query2)) {
            array_push($dpDetails["dept"], $row['department']);
        }
        while ($row = mysqli_fetch_assoc($query3)) {
            array_push($dpDetails["sem"], $row['sem_no']);
        }
    }
    $dpDetails["reg"] = $dpDetails["reg"];
    $dpDetails["sem"] = $dpDetails["sem"];
    $dpDetails["dept"] = $dpDetails["dept"];
    echo json_encode($dpDetails);
?>