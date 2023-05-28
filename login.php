<?php

    require_once 'auth.php';

    if(checkAuth()) {
        header("Location: home.php");
        exit;
    }   
        
    if(isset($_POST["username"]) && isset($_POST["password"]))
    {
        
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Errore: ".mysqli_connect_error());
        $username = mysqli_real_escape_string($conn, $_POST["username"]);

        $query = "SELECT * FROM users WHERE username = '".$username."'";
        $res = mysqli_query($conn, $query) or die(mysqli_error($conn));;
        
        if(mysqli_num_rows($res) > 0)
        {
            $entry = mysqli_fetch_assoc($res);
            if (password_verify($_POST['password'], $entry['pwd'])) {
               
                $_SESSION["username"] = $entry["username"];
                $_SESSION["id"] = $entry["id"];           
                header("Location: home.php");
                mysqli_free_result($res);
                mysqli_close($conn);
                exit;
            
            }
        }

        $errore = true;

    }

?>


<html>
    <head>
        <title>
            Login
        </title>
        <link rel="stylesheet" href="login.css"/>
        <script src="login.js" defer="true"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
        <h1>MovieHeaven</h1>

        <?php
            if(isset($errore))
            {
                echo "<p class='errore'>";
                echo "Credenziali non valide";
                echo "</p>";
            }
        ?>

        <article>
            <h1>Inserisci username e password.</h1>
            <form name ='login' method='post'>
                <label>Username<input type='text' name = 'username' placeholder = 'Username' class = 'text'></label>
                <label>Password<input type='password' name = 'password' placeholder = 'Password' class = 'text'> <img src = "images/pngegg-2.png"></label>
                <label>&nbsp;<input type='submit' value = 'Login' class = 'submit'></label>
            </form>
            <div class = 'hidden'></div>
            <p>Non sei registrato?<a href = 'signup.php'>Iscriviti</a> </p>
            <p>Torna alla <a href = 'welcome.php'> pagina iniziale.</a> </p>
        </article>
    </body>
</html>