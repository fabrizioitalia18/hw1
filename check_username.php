<?php
require_once 'db_parameters.php';

if (!isset($_GET["q"])) {
    header("Location: home.php");
    exit;
}

header('Content-Type: application/json');

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

$username = mysqli_real_escape_string($conn, $_GET["q"]);

$query = "SELECT email FROM users WHERE username = '".$username."'";
$res = mysqli_query($conn, $query) or die(mysqli_error($conn));

echo json_encode(array('exists' => mysqli_num_rows($res) > 0 ? true : false));

mysqli_close($conn);
?>