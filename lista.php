<?php

    require_once 'auth.php';

    if(checkAuth()==0) {
        header("Location: home.php");
        exit;
    }   

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $_SESSION['id']);

    $filmid = mysqli_real_escape_string($conn, $_POST['id']);
    $titolo = mysqli_real_escape_string($conn, $_POST['titolo']);
    $type = mysqli_real_escape_string($conn, $_POST['type']);
    $overview = mysqli_real_escape_string($conn, $_POST['overview']);
    $release_date = mysqli_real_escape_string($conn, $_POST['release_date']);
    $img = mysqli_real_escape_string($conn, $_POST['src']);

    $query = "SELECT * FROM lista WHERE user_id = ".$userid." AND id = '".$filmid."'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    $response = array('rimosso' => false, 'aggiunto' => false, 'id' => $filmid);
    if(mysqli_num_rows($res) > 0){
        $delete = "DELETE FROM lista WHERE user_id = ".$userid." AND id = '".$filmid."'";
        if(mysqli_query($conn, $delete) ){
            $response['rimosso'] = true;
        }else{
            die(mysqli_error($conn));
        }
        
        echo json_encode($response);
        exit;
    }

    $query = "INSERT INTO lista VALUES('".$filmid."',".$userid.",'".$titolo."','".$type."','".$overview."','".$release_date."','".$img."')";
    if(mysqli_query($conn, $query)){
        $response['aggiunto'] = true;
    }else{
        die(mysqli_error($conn));
    }
        
    echo json_encode($response);
    

    mysqli_close($conn);

?>