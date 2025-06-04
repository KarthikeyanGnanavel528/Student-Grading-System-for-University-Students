<?php 
    include ('connection.php');
    $sem = $_POST['semester'];
    $dept = $_POST['department'];
    $reg = $_POST['regulation'];
    $find = $_POST['token'];
    if ($find == 'cgpa') {
        $result = mysqli_query($con, "select *from subjects where regulation=$reg and department='$dept' and sem_no<=$sem order by sem_no asc;");
    } else {
        $result = mysqli_query($con, "select *from subjects where regulation=$reg and department='$dept' and sem_no=$sem;");
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
                    <select name='grade' id='grade' class='sd sd$count'>
                        <option>--- select your grade ---</option>
                        <option value='O'>O</option>
                        <option value='A+'>A+</option>
                        <option value='A'>A</option>
                        <option value='B+'>B+</option>
                        <option value='B'>B</option>
                        <option value='C'>C</option>
                        <option value='U'>U</option>
                    </select>
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