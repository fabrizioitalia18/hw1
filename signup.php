<?php
    require_once 'auth.php';

    if(checkAuth()!=0) {
        header("Location: home.php");
        exit;
    }   

    if(isset($_POST["email"]) && isset($_POST["password"]) && 
    isset($_POST["name"]) && isset($_POST["lastname"]) && isset($_POST["gender"]) &&
    isset($_POST["username"]) && isset($_POST["agreement"]) && isset($_POST["confirm_password"]))
    {
        $error = array(
            "username1" => "",
            "username2" => "",
            "password1"=> "",
            "password2" => "",
            "password3" => "",
            "password4"=> "",
            "email1" => "",
            "email2" => "",
            "generic" => ""
        );
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']) or die("Errore: ".mysqli_error($conn));

        //username
        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
            $error['username1'] = "Username non valido";
        }else{
            $username = mysqli_real_escape_string($conn, $_POST['username']);
            $res = mysqli_query($conn, "SELECT username FROM USERS WHERE username = '".$username."'");
            if (mysqli_num_rows($res) > 0) {
                $error['username2'] = "Username già in uso";
            }
        }

        //password
        if (strlen($_POST["password"]) < 8) {
            $error['password1'] = "La password è troppo corta";
        }

        if(!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/', $_POST['password'])){
            $error['password2'] = 'La password deve contenere almeno una lettera minuscola, una maiuscola e almeno un numero';
        }

        if(!preg_match('/^(?=.*[^\da-zA-Z]).*$/', $_POST['password'])){
            $error['password3'] = 'La password deve contenere almeno un carattere speciale';
        }

        if (strcmp($_POST["password"], $_POST["confirm_password"]) != 0) {
            $error['password4'] = "Le password non coincidono";
        }

        //email
        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $error['email1'] = "Email non valida";
        } else {
            $email = mysqli_real_escape_string($conn, strtolower($_POST['email']));
            $res = mysqli_query($conn, "SELECT email FROM USERS WHERE email = '".$email."'");
            if (mysqli_num_rows($res) > 0) {
                $error['email2'] = "Email già in uso";
            }
        }

        $count = 0;
        foreach($error as $err){
            if(!empty($err)){
                $count++;
            }
        }
        if($count == 0){
            $nome = mysqli_real_escape_string($conn, $_POST["name"]);
            $cognome = mysqli_real_escape_string($conn, $_POST["lastname"]);

            $password = mysqli_real_escape_string($conn, $_POST['password']);
            $password = password_hash($password, PASSWORD_BCRYPT);

            if($_POST["gender"] == 'f'){
                $img = "images/donna.png";
            }else{
                $img = "images/uomo.jpeg";
            }
            $query = "INSERT INTO USERS(nome,cognome,username,email,genere,pwd, img) 
            VALUES('".$nome."','".$cognome."','".$username."','".$email."','".$_POST["gender"]."','".$password."','".$img."')";

            if(mysqli_query($conn, $query)){
                $_SESSION["username"] = $_POST["username"];
                $_SESSION["id"] = mysqli_insert_id($conn);
                mysqli_close($conn);
                header("Location: home.php");
                exit;
            }
            else
            {
                $error["generic"]= 'Registrazione non riuscita. Riprova';
            }

        }   

    }

?>

<html>
    <head>
        <title>
            Signup
        </title>
        <link rel="stylesheet" href="signup.css"/>
        <script src="signup.js" defer="true"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>

    <body>
        <h1>MovieHeaven <br>
            <em>Unisciti a noi!</em>
        </h1>
        

        <?php
            if(!empty($error["generic"]))
            {
                echo "<div class='errore'>".$error["generic"]."</div>";
            }
        ?>

        
        <article>
            <form name ='signup' method='post'>
                <div id = 'name'>
                    <label>Nome<input type='text' name = 'name' placeholder = 'Nome' class = 'text'></label>
                    <div class = 'hidden'></div>
                </div>

                <div id = 'lastname'>
                    <label>Cognome<input type='text' name = 'lastname' placeholder = 'Cognome' class = 'text'></label>
                    <div class = 'hidden'></div>
                </div>

                <div id = 'email'>
                    <label>E-Mail<input type='text' name = 'email' placeholder = 'E-Mail' class = 'text'></label>
                    <div class = 'hidden'></div>
                    <?php
                    if(!empty($error['email1'])){
                        echo "<div class='errore'>".$error['email1']."</div>";
                    }
                    if(!empty($error['email2'])){
                        echo "<div class='errore'>".$error['email2']."</div>";
                    }
                ?>
                </div>
                
                <div id='username'>
                    <label>Username<input type='text' name = 'username' placeholder = 'Username' class = 'text'></label>
                    <div class = 'hidden'></div>
                    <?php
                        if(!empty($error['username1'])){
                            echo "<div class='errore'>".$error['username1']."</div>";
                        }
                        if(!empty($error['username2'])){
                            echo "<div class='errore'>".$error['username2']."</div>";
                        }
                    ?>
                </div>

                <label>Genere:<input type = 'radio' name = 'gender' value = 'm'> Maschio
                            <input type='radio' name = 'gender' value = 'f'> Femmina
                            <input type='radio' name = 'gender' value = 'a'> Altro
                </label>

                <div id = 'password'>
                    <label>Password<input type='password' name = 'password' placeholder = 'Password' class = 'text'> <img src = "images/pngegg-2.png"></label>
                    <div class = 'hidden'></div>
                    <?php
                        if(!empty($error['password1'])){
                            echo "<div class='errore'>".$error['password1']."</div>";
                        }
                        if(!empty($error['password2'])){
                            echo "<div class='errore'>".$error['password2']."</div>";
                        }
                        if(!empty($error['password3'])){
                            echo "<div class='errore'>".$error['password3']."</div>";
                        }
                    ?>
                </div>

                <div id = 'confirm_password'>
                    <label>Conferma password<input type='password' name = 'confirm_password' placeholder = 'Conferma password' class = 'text'> <img src = "images/pngegg-2.png"></label>
                    <div class = 'hidden'></div>
                    <?php
                        if(!empty($error['password4'])){
                            echo "<div class='errore'>".$error['password4']."</div>";
                        }
                    ?>
                </div>

                <label>Accetto i termini e le condizioni d'uso di MovieHeaven<input type = 'checkbox' name = 'agreement'></label>
                <label>&nbsp;<input type='submit' value = 'Registrati' class = 'submit'></label>
            </form>
            <div id = 'empty_fields' class = 'hidden'></div>
            <p>Sei già registrato?<a href = 'login.php'>Accedi</a> </p>
        </article>

    </body>
</html>