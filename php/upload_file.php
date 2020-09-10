<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$target_file = __DIR__.'/../uploads/';
if(isset($_GET['code'])){
    $target_file .= $_GET['code'].'/';
}
if(!isset($_GET['name'])){
    die;
}
if(!is_dir($target_file)){
    //echo 'dir not created '.$target_file;
    mkdir($target_file);
}
$target_file .= $_GET['name'];
//var_dump($_FILES);
//error_log($_FILES);
$move = move_uploaded_file($_FILES['image']['tmp_name'],$target_file);
//echo $move;
echo $_GET['name'];
//echo $target_file;
die;