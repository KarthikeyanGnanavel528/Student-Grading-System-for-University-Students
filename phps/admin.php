<?php 
    include ('connection.php');
    $sem = $_POST['semester'];
    $dept = $_POST['department'];
    $reg = $_POST['regulation'];
    $find = $_POST['token'];
    if ($find == 'view') {
        $result = mysqli_query($con, "select *from subjects where regulation=$reg and department='$dept' and sem_no=$sem order by sem_no asc;");
    } else {
        $result = mysqli_query($con, "select *from subjects where regulation=$reg and department='$dept' and sem_no<=$sem;");
    }
    $html = '';
    $credits = [];
    if(mysqli_num_rows($result) > 0) {
        $count = 0;
        $total_credits = 0;
        while ($row = mysqli_fetch_assoc($result)) {
            $count ++;
            $total_credits += $row['credits'];
            array_push($credits, $row['credits']);
            $html = $html. "
            <div class='subject-details'>
                    <p>{$row['sem_no']}</p>
                    <p class='sc sc$count'>{$row['sub_code']}</p>
                    <p>{$row['sub_name']}</p>
                    <p>{$row['credits']}</p>
                </div>";
        }        
    }
    $subs = [
        "html" => $html,
        "total_credits" => $total_credits,
        "credits" => $credits
    ];
    echo json_encode($subs);
 ?>