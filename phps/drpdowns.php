<?php
    include('connection.php');
    $query =  mysqli_query($con, "SELECT DISTINCT regulation, department FROM subjects ORDER BY regulation DESC;");
    $regulation = '';
    $department = '';
    if (mysqli_num_rows($query) > 0) {
        while($row = mysqli_fetch_assoc($query)) {
            $reg = $row['regulation'];
            $dept = $row['department'];
            $regulation = $regulation."
            <option>$reg</option>
            ";
            $department = $department."
            <option>$dept</option>
            ";
        }
        $object = [
            "regulation" => $regulation,
            "department" => $department
        ];
        echo json_encode($object);
    }
    else {
        echo "error";
    }
?>