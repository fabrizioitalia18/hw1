<?php
    require_once 'auth.php';

    if(checkAuth()==0) {
        header("Location: login.php");
        exit;
    }   

    findImg();
    function findImg(){
        global $dbconfig, $userid;

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $userid = mysqli_real_escape_string($conn, $_SESSION['id']);
        $query = "SELECT img FROM USERS where id = '".$userid."'";
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));
        $row = mysqli_fetch_row($res);
        $results = $row;
        mysqli_free_result($res);
        mysqli_close($conn);
        return $results[0];
    }
?>