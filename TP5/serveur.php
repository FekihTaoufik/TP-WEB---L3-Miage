<?php
date_default_timezone_set('Europe/Paris');
$q=$_GET["q"];
// $q = str_replace('/\W/g','',$q)==''?getcwd():$q;
// Etape 2 == Début ===
if (!file_exists(str_replace('/\W/g','',$q)==''?getcwd():getcwd()."\\".$q)) {
    echo json_encode(['success'=>false,'message'=>"Ce répertoire n'existe pas."]);
    exit;
} else {
    $path = str_replace('/\W/g','',$q)==''?getcwd().'\\':getcwd().$q;
    $fichiers =[];
    $resultat = scandir($path);
    array_push($fichiers,array('path_fichier'=>$q.'/.','nom_fichier' => '.', 'date_modification' => null, 'taille' => null,'extension'=>null,'type'=>'dir'));
    if($q != getcwd())
        array_push($fichiers,array('path_fichier'=>$q.'/..','nom_fichier' => '..', 'date_modification' => null, 'taille' => null,'extension'=>null,'type'=>'dir'));
    foreach (array_diff($resultat, array('..', '.')) as $i => $f) {
        $f_path = $path . "\\" . $f;
        array_push($fichiers, array('path_fichier'=>$q.'/'.$f,'nom_fichier' => $f, 'date_modification' => (new DateTime('@'.filemtime($f_path)))->format('d M Y à H:i:s'), 'taille' => filesize($f_path),'extension'=>filetype($f_path)=='dir'?null:explode('.',$f)[count(explode('.',$f))-1],'type'=>filetype($f_path)));
    }
}
echo json_encode(['success'=>true,'fichiers'=>$fichiers]);
// Etape 2 == Fin ===

?>