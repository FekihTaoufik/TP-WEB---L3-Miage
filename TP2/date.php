<!-- 
Point 1 : date.php
[x] Dans le dossier tp2, créez une page (fichier) date.php.
Cette page est accessible à l'adresse : http://www-mips.unice.fr/~votrelogin/web/tp2/date.php .
[x]Dans cette page, écrivez la date et l'heure (avec la fonction date), ainsi que le nombre de jours et de secondes restant avant le 01 novembre 2017 (en utilisant la fonction strtotime et quelques calculs).
Votre page doit être valide (validator.w3.org).

Rajouter dans la page date.php un formulaire qui permet d'entrer une date.
Le formulaire est traité par cette même page (date.php), qui affiche également le temps restant avant la date saisie ou le temps passé depuis la date saisie.

Vous pouver choisir le format que vous voulez pour la date à saisir, mais une simple chaine de caractères du style 24-12-1975 ou 1975-12-24 ou 24 december 1975 devrait pouvoir fonctionner.

Affichez la date saisie (24-12-1975 ou 24 december 1975) en français (24 décember 1975). Pour cela vous pouvez utiliser str_replace($valeurs_remplacées, $valeurs_qui_remplacent, $string) qui remplace $valeurs_remplacées[$i] par $valeurs_qui_remplacent[$i] dans la chaîne $string. -->


<?php 
date_default_timezone_set('Europe/Paris'); 
include('./entetes.inc');
 ?>

<!doctype html>
<html lang="fr">
    <?php echo genererEntete("Dates"); ?>

<body>
<?php echo $headers ?>
<?php

$now = new DateTime();
if (isset($_GET['date_futur'])) {
    $date_futur = new DateTime($_GET['date_futur']);
} else {
    $date_futur = new DateTime('2019-05-11 12:00:00');
}
if (isset($_GET['date_futur_texte'])) {
    $date_futur_texte = new DateTime($_GET['date_futur_texte']);
} else {
    $date_futur_texte = "Non saisi";
}

$interval = $date_futur->diff($now);
echo "Aujourd'hui : " . $now->format('Y-m-d H:i:s');
echo "<br> Date saisie en texte libre : " . $date_futur_texte == 'Non saisi' ? $date_futur_texte->format('d M Y à H:i:s') : $date_futur_texte;
echo "<br> Date Saisi selon le type datetime-local : " . $date_futur->format('Y-m-d H:i:s');
echo "<br> Il reste " . $interval->format("%a days, %h hours, %i minutes, %s seconds") . " pour le " . $date_futur->format('Y-m-d H:i:s');
?>
 <form action="date.php">
    <input type="datetime-local" value="<?php echo isset($_GET['date_futur']) ? $_GET['date_futur'] : ''; ?>" name="date_futur"><br>
    <small>* Saisie libre en Anglais</small><br>
    <input type="text" name="date_futur_texte"  value="<?php echo isset($_GET['date_futur_texte']) ? $_GET['date_futur_texte'] : ''; ?>" placeholder="Saisie libre">
    <button type="submit">Envoyer</button>
 </form>
</body>
</html>