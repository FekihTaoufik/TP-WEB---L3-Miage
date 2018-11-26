<?php 
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
include 'bandeau.inc';
$bandeau = new Bandeau();
$headers = $bandeau->genereBarNav();

$access=explode("/",$_SERVER['SCRIPT_FILENAME'])[count(explode("/",$_SERVER['SCRIPT_FILENAME']))-1];
$access = $bandeau->accessOf($access);
if( ($access == "accessible si deconnecte" && isset($_SESSION['USER'])==true ) || ($access == "accessible si connecte" && isset($_SESSION['USER'])==false))
    header('Location: index.php');

function genererEntete($titre){
    $e = "<head>";
    $e = $e."<title>".$titre."</title>";
    if(isset($_SESSION['style'])){
        $e=$e.'<link rel="stylesheet" href="./des-css/'.$_SESSION['style'].'">'; 
    }
    $e.='<link rel="stylesheet" href="./des-css/nav.css">';
    return $e."</head>";
}