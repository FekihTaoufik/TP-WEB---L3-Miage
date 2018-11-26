<?php 
date_default_timezone_set('Europe/Paris');
session_start();
if( isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['mdp']) ){
    $users = [];
    foreach (file('./../users.csv') as $line) {
        $users[] = str_getcsv($line);
    }
    $found = false;
    for ($i=1; $i < count($users); $i++) { 
        if($users[$i][0]== $_POST['nom'] && $users[$i][1] == $_POST['prenom'] && $users[$i][2] == $_POST['mdp']){
            $_SESSION['USER']=array("nom"=>$users[$i][0],"prenom"=>$users[$i][1]);
            $found= true;
            break;
        }
    }
}
include './entetes.inc';

?>
<!doctype html>
<html lang="fr">
<?php echo genererEntete("Index"); ?>

<body>
    <?php echo $headers ?>
    <br>
    <br>
    <br>
    <?php if(!isset($_SESSION['USER'])){ ?>
    <span style="text-align:center;">
        <form action="index.php" method="POST">
            <label for="nom">Nom : </label>
            <input required type="text" name="nom"><br>
            <label for="prenom">Prénom : </label>
            <input required type="text" name="prenom"><br>
            <label for="mdp">Mot de passe : </label>
            <input required type="password" name="mdp"><br>
            <button type="submit">Envoyer</button>
        </form>
    </span>
    <?php } ?>

</body>

</html>