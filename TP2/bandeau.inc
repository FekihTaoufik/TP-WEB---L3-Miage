<?php 
class Bandeau {
    public static $publicAccess = array(
        "index.php" => "toujours accessible",
        "tableau.php" => "toujours accessible",
        "preference.php" => "accessible si connecte",
        "date.php" => "accessible si deconnecte",
        "logout.php" => "accessible si connecte",
    );
    public static $map = array( 
        array("index.php", "Accueil"),
        array("tableau.php", "plan du site"),
        array("preference.php", "Choix du style"),
        array("date.php", "manipulation de dates"),
        array("logout.php", "Se déconnecter"),
    );


       private function genererLien($href, $name) {
           return "<a href='".$href."'>".$name."</a>";
       }
       public function accessOf($file){
           return Bandeau::$publicAccess[$file];
       }
    
       public function genereBarNav() {
           $_="";
            foreach (Bandeau::$map as $key => $l) {
                $access = Bandeau::$publicAccess[$l[0]];
                if( $access == "toujours accessible" ||($access == "accessible si deconnecte" && isset($_SESSION['USER'])==false ) || ($access == "accessible si connecte" && isset($_SESSION['USER'])))
                    $_.="<div class='lien'>".Bandeau::genererLien($l[0],$l[1]). "</div>";
            }
            $now =new DateTime();
            $_.="<div class='droite'>Bonjour ".(isset($_SESSION['USER'])?$_SESSION['USER']['prenom'].' '.$_SESSION['USER']['nom']:'invite').", nous sommes le ".$now->format('d/m/Y H:i:s')."</div>";
           return $_ ;
       }
    
    }

    