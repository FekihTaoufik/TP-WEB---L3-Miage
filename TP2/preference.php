<?php
/* La page preference.php contient un formulaire dont l'action est preference.php. 
Ce formulaire contient un menu déroulant (select) dont les options (option) sont les feuilles de style présentes dans le dossier courant (donc tp2).
 Le formulaire contient aussi un bouton pour validez le choix (submit).
  Si la page preference.php reçoit des valeurs via le formulaire, elle en extrait la feuille de style pour l'appliquer à elle-même (balise <link>).
   De plus, ce choix sera sélectionné par défaut dans le select.
*/
include('./entetes.inc');
if(isset($_GET['style'])){
    $_SESSION['style']=$_GET['style'];
}
function listeFichier(){
    $array = array();
    $path = getcwd().'\\des-css';
    $fichiers = array_diff(scandir($path), array('..', '.','nav.css'));
    foreach ($fichiers as $i => $f) {
        $f_path = $path . "\\" . $f;
        array_push($array, array('path_fichier'=>$f,'nom_fichier' => $f, 'date_modification' => (new DateTime('@' . filemtime($f_path)))->format('d M Y à H:i:s'), 'taille' => filesize($f_path)));
    }
    if(isset($_GET['tri']))
        array_multisort(array_column($array, 'nom_fichier'), $_GET['tri']=='reverse'?SORT_DESC:SORT_ASC, $array);
    return $array;
}
?>
<!doctype html>
<html lang="fr">
    <?php echo genererEntete("Préférences"); ?>

<body>
<?php echo $headers ?>
<p>Bienvenu a la selection de styles css</p>
    <form action="preference.php" method="get">
        <select name="style" id="style">
        <?php 
        foreach (listeFichier() as $key => $f) {
            ?>
        <option <?php echo isset($_GET['style'])?($_GET['style']==$f['nom_fichier']?'selected':''):($key==0?'selected':'') ?> value="<?php echo $f['nom_fichier'] ?>"><?php echo $f['nom_fichier'] ?></option>
            <?php } ?>
        </select>
        <button type="submit">Valider</button>
    </form>
</body>
</html>