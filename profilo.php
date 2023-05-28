<?php
    require_once 'auth.php';

    if (checkAuth()==0) {
        header("Location: welcome.php");
        exit;
    }   

    $error = [];

    if ($_FILES['avatar']['size'] != 0) {
        $file = $_FILES['avatar'];
        $type = exif_imagetype($file['tmp_name']);
        $allowedExt = array(IMAGETYPE_PNG => 'png', IMAGETYPE_JPEG => 'jpg', IMAGETYPE_GIF => 'gif');
        if (isset($allowedExt[$type])) {
            if ($file['error'] === 0) {
                if ($file['size'] < 7000000) {
                    $fileNameNew = uniqid('', true).".".$allowedExt[$type];
                    $fileDestination = 'images/'.$fileNameNew;
                    move_uploaded_file($file['tmp_name'], $fileDestination);
                } else {
                    $error[] = "L'immagine non deve avere dimensioni maggiori di 7MB";
                }
            } else {
                $error[] = "Errore nel carimento del file";
            }
        } else {
            $error[] = "I formati consentiti sono .png, .jpeg, .jpg e .gif";
        }
    }

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $userid = mysqli_real_escape_string($conn, $_SESSION['id']);
    if(isset($fileDestination)){
        $query = "UPDATE users SET img = '".$fileDestination."' where id = '".$userid."'";
        if(!mysqli_query($conn, $query)){
            die(mysqli_error($conn));
        }

        mysqli_close($conn);
    }

?>


<html>
    <head>
        <title>MovieHeaven</title>
        <link rel="stylesheet" href="common_style.css"/>
        <link rel = "stylesheet" href = 'profilo.css'/>
        <script src="profilo.js" defer="true"></script>
        <script src="modale.js" defer="true"></script>
        <script src="lista.js" defer = "true"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
        <div id = 'overlay_dati' class = 'hidden'>
            <div class = 'modal_dati'>    
                    <div id = 'container_form'>
                        <div id = 'container_img'>
                            <img>
                        </div>
                        <form name='img_upload' method='post' enctype="multipart/form-data">
                            <div class="fileupload">
                                <label>Cambia la tua immagine del profilo<br>
                                    <input type='file' name='avatar' accept='.jpg, .jpeg, image/gif, image/png' id="upload_original" data-errore='false'></label>
                                    <br><span></span>
                            </div>
                            <div class="submit" id = 'upload'>
                            <input type='submit' value = 'Scegli' id = 'upload_submit'>
                            </div>
                        </form>
                        <?php if(count($error) != 0){
                            foreach($error as $err){
                                echo "<br><p class='error'>";
                                echo $err;
                                echo "</p>";
                            }
                        }?>
                    </div>
            </div>
        </div>

        <div id = 'overlay' class = 'hidden'></div>

        <nav id="flex-container">
            <span>MovieHeaven</span>
            <span id = 'nav_links'> 
                <a href="home.php">Home</a>
                <a href="cerca.php">Cerca</a>
                <a id = "dati_personali" href = "#">Dati Personali</a>
                <a href = 'logout.php'>Logout</a>
            </span>
        </nav>

        <article id = 'corpo'>
            <h1>I tuoi film:</h1>
            <article id = "lista_film"></article>
            <h1>Le tue serie tv:</h1>
            <article id = "lista_serie"></article>

        </article>

        <footer>
            <p id = 'title'>MovieHeaven</p>

            <p><strong>Chi siamo:</strong><br>
                <a href="https://instagram.com/_fabrizioitalia_?igshid=YmMyMTA2M2Y=">Instagram</a>
            </p>

            <p>Forniti da:<br>
                <a href = "https://www.imdb.com/">IMDB</a><br>
                <a href = "https://www.themoviedb.org/">TMDB</a><br>
                <a href = "https://newsapi.org/">News Api</a><br>
            </p>
        </footer>
    </body>
</html>