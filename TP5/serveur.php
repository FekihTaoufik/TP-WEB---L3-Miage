<?php
date_default_timezone_set('Europe/Paris');
$q=$_GET["q"];


$path = str_replace('/\W/g','',$q)==''?getcwd().'\\':getcwd().$q;
if (!file_exists(str_replace('/\W/g','',$q)==''?getcwd():getcwd()."\\".$q) || strpos(realpath($path),__DIR__)===false) {
    echo json_encode(['success'=>false,'message'=>"Ce répertoire n'existe pas."]);
    exit;
} else {
    $text_extensions = ['html','js','css','php','txt'];
    if(strpos($path,__DIR__)==-1){
        echo json_encode(['success'=>false,'message'=>"Ce répertoire n'existe pas ou non autorisé."]);
        exit;
    }

    if (seTermineAvec($path,$text_extensions)) {

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($path).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($path));
        readfile($path);
        exit;
    }
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



function seTermineAvec($chaine, $sousChaine)
{
    foreach ($sousChaine as $key => $ch) {
        $length = strlen($ch);
        if (substr($chaine, -$length) === $ch)
            return true;
    }
    return false;
}

?>