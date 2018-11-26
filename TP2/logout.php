<?php 
include './entetes.inc';
if(isset($_SESSION['USER'])){
    $_SESSION['USER']=null;
    header('Location: index.php');
}