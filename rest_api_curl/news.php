<?php

    $key="130eb28cb6da440a86aad1f67d38625c";
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://newsapi.org/v2/everything?q=film&sortBy=publishedAt&language=it&pageSize=15");
    $headers = array('User-Agent: '.$key, 
    'Authorization: '.$key);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    $result = curl_exec($curl);
    echo $result;
    curl_close($curl);
?>