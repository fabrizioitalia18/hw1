<?php

    require_once 'auth.php';

    if(checkAuth()==0) {
        header("Location: home.php");
        exit;
    }   

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $_SESSION['id']);
    
    $key = "c534470306ea0e601d6f16ad61b4a1c4";
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.themoviedb.org/3/trending/".$_GET['q']."/day?api_key=".$key."&language=it");
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = json_decode(curl_exec($curl));
    foreach($result->results as $elem){
        $filmid = mysqli_real_escape_string($conn, $elem -> id);
        $query = "SELECT * FROM lista WHERE user_id = ".$userid." AND id = '".$filmid."'";
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
        if(mysqli_num_rows($res) > 0){
            $elem->presente = true;
        }else{
            $elem -> presente = false;
        }
    }
    echo json_encode($result);
    curl_close($curl);
?>