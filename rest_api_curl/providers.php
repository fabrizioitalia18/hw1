<?php
    $key = "c534470306ea0e601d6f16ad61b4a1c4";
    $id = $_GET['q'];
    $type = $_GET['type'];
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.themoviedb.org/3/".$type."/".$id."/watch/providers?api_key=".$key);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    $providers = json_decode($result) -> results -> IT;
    echo json_encode($providers);
    curl_close($curl);
?>