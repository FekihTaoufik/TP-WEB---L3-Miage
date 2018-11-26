<?php 
if(isset($_POST['adresse'])){
    ini_set('user_agent', 'PHP');
    $url ="http://nominatim.openstreetmap.org/search?q=".$_POST['adresse']."&format=json";
    try{
        $jsonfile = file_get_contents($url);
    }catch(Exception $ex){
        echo $ex;
    }
    $data = json_decode(str_replace('\"','"',$jsonfile));
    print_r($data);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Accueil</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <div>
    <form action="index.php" method="POST">
        <h3>Veuillez saisir une adresse : </h3>
        <textarea name="adresse" cols="30" rows="10"></textarea>
        <button type="submit">Envoyer</button>
        </form>
    </div>
</body>
</html>