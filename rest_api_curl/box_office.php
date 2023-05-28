<?php
    $key = "k_jx1cf2kl";
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://imdb-api.com/en/API/BoxOffice/".$key);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    echo $result;
    curl_close($curl);
?>