<?php
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
        <title>Ricerca</title>
        <link rel="stylesheet" href="common_style.css"/>
        <link rel="stylesheet" href="cerca.css"/>
        <script src="cerca.js" defer="true"></script>
        <script src="modale.js" defer="true"></script>
        <script src="lista.js" defer="true"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
        <div id = 'overlay' class = 'hidden'></div>

        <nav id="flex-container">
            <span>MovieHeaven</span>
            <span id = 'nav_links'> 
                <a href="home.php">Home</a>
                <a id= 'profilo' href="profilo.php">
                    <?php   echo "<p>".$_SESSION['username']."</p>";   
                            echo "<div id = 'container_img'>";
                            echo "<img src ='".$img."'></div>";
                            
                        ?></a>
            </span>
        </nav>

        <article id = 'search_section'>
          <form name = 'search'>
            <label>Trova il tuo film o la tua serie preferita: <br> 
            <select name = 'ricerca'>
                <option value = 'movie'>Film</option>
                <option value = 'tv'>Serie tv</option>
            </select>
            <input type='text' name='film' id='search_film'></label>	
            <input class="submit" type='submit'>
          </form>
          

          <article id = 'vetrina' class = 'hidden'></article>


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