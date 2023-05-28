<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    require_once 'auth.php';
    require_once 'query_img.php';

    if(checkAuth()==0) {
        header("Location: login.php");
        exit;
    }   

    $img = findImg();

?>

<html>
    <head>
        <title>MovieHeaven</title>
        <link rel="stylesheet" href="home.css"/>
        <link rel="stylesheet" href="common_style.css"/>
        <script src="home.js" defer="true"></script>
        <script src="modale.js" defer="true"></script>
        <script src="lista.js" defer="true"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>


    <body>
        <div id = 'overlay' class = 'hidden'></div>

        <nav id="flex-container">
            <span>MovieHeaven</span>
            <span id = 'nav_links'> 
                <a href="cerca.php">Cerca</a>
                <a href="profilo.php" id ='profilo'>
                    <?php   echo "<p>".$_SESSION['username']."</p>";
                            echo "<div id = 'container_img'>";
                            echo "<img src ='".$img."'></div>";
                            
                        ?></a>
            </span>
        </nav>


        <article id = 'corpo' >

            <article id = 'box_office'>

                <h1>Box Office dell'ultimo week-end negli USA:</h1>
                
            </article>

            <article id = 'vetrina'>
                <div id = 'link'>
                    <a id='movies' href = '#' data-type = 'movie'>Film del giorno:</a>
                    <a id = 'series' href = '#' data-type = 'tv'>Serie tv del giorno:</a>
                </div>

                <section id = 'trending' class= 'hidden'>
                </section>

            </article>

            <article id='news'>
                <h1>News dal mondo dello spettacolo:</h1>
                    
            </article>
            

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