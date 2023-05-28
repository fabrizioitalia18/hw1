<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    require_once 'auth.php';

    if(checkAuth()==0) {
        header("Location: home.php");
        exit;
    }   

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $_SESSION['id']);

    $query = "SELECT nome,cognome,username,email,genere,img FROM users where id = '".$userid."'";
    $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
    
    $row = mysqli_fetch_assoc($res);
    $results = $row;
    echo json_encode($results);
    mysqli_free_result($res);
    mysqli_close($conn);

?>