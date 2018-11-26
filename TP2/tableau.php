
<?php 
date_default_timezone_set('Europe/Paris');
include('./entetes.inc');

function listeFichier()
{
    $array = array();
    $path = getcwd();
    $fichiers = array_diff(scandir(getcwd()), array('..', '.'));
    foreach ($fichiers as $i => $f) {
        $f_path = $path . "\\" . $f;
        array_push($array, array('path_fichier'=>$f,'nom_fichier' => $f, 'date_modification' => (new DateTime('@' . filemtime($f_path)))->format('d M Y à H:i:s'), 'taille' => filesize($f_path)));
    }
    if(isset($_GET['tri']))
        array_multisort(array_column($array, 'nom_fichier'), $_GET['tri']=='reverse'?SORT_DESC:SORT_ASC, $array);
    return $array;
}
function genereTableau($title, $body)
{
    $html = " <table class = 'mainTable'> <thead> <th> " . $title[0] . " </th> <th> " . $title[1] . " </th> <th> " . $title[2] . " </th> </th> </thead> <tbody> ";
    $count =0;
    if (is_array($body) || is_object($body))
    foreach ($body as $k =>  $row) {
        $count++;
        $html = $html . " <tr> <td> " . (isset($row['path_fichier'])?"<a target='_blank' href='".$row['path_fichier']."'>".$row['nom_fichier']."</a>":$row['nom_fichier']) . " </td> <td> " . $row['date_modification'] . " </td> <td> " . $row['taille'] . " </td> </tr> ";
    }
    $html = $html . " </tbody> <caption> Ce tableau contient " . $count . " lignes </caption> </table> ";
    return $html;
}
$tab = array(array('nom_fichier' => 'date.php', 'date_modification' => '01-01-2016', 'taille' => 1234));
$titre = array('Nom du fichier', 'Date de modification', 'taille');
?>
<!doctype html>
<html lang="fr">
    <?php echo genererEntete("Tableaux"); ?>

<body>
<?php echo $headers ?>
<?php echo var_dump($tab, $titre) ?>
<br>
</p>
<p>
<?php echo print_r($tab) . " <br> " . print_r($titre) ?>
</p>
    <?php echo genereTableau($titre, $tab); ?>
    <p><a href="?tri=<?php echo isset($_GET['tri'])?($_GET['tri']=='reverse'?'normal':'reverse'):'reverse' ?>"><?php echo isset($_GET['tri'])?($_GET['tri']=='reverse'?'🔺':'🔻'):'🔻' ?>Trier le tableau</a></p>
    <?php echo genereTableau($titre, listeFichier()); ?>
</body>

</html>