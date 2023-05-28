<?php
    require_once 'auth.php';

    if(checkAuth()==0) {
        header("Location: home.php");
        exit;
    }   

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $_SESSION['id']);

    $query = "SELECT * FROM lista where user_id = '".$userid."'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    $results = array('movies'=>array(), 'series' => array());
    if(mysqli_num_rows($res) > 0){
        while($row = mysqli_fetch_assoc($res)){
            if($row['tipo'] == 'movie'){
                $row['presente'] = true;
                $results['movies'][] = $row;
                
            }else{
                $row['presente'] = true;
                $results['series'][] = $row;
            }
            
        }
    }

    echo json_encode($results);
    mysqli_free_result($res);
    mysqli_close($conn);

?>