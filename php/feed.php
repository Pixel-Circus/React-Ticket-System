<?php 
include('config.php');
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "";
$results = array();

if(isset($_GET['clientcheck'])){
    $sql = "SELECT * FROM `clients` WHERE `code` LIKE '".$_GET['clientcheck']."'";
}

if(isset($_GET['usercheck'])){
    $sql = "SELECT * FROM `users` WHERE `code` LIKE '".$_GET['usercheck']."'";
}

if(isset($_GET['listticketsclient'])){
    $sql = "SELECT * FROM `tickets` WHERE `client` LIKE '".$_GET['listticketsclient']."' ORDER BY `categorie` DESC, `date_modif` DESC";
}

if(isset($_GET['listticketsuser'])){
    $sql = "SELECT * FROM `tickets` WHERE `assigne` LIKE '".$_GET['listticketsuser']."' ORDER BY `categorie` DESC, `date_modif` DESC";
}

if(isset($_GET['listticketsall'])){
    $sql = "SELECT * FROM `tickets` ORDER BY `categorie` DESC, `date_modif` DESC";
}

if(isset($_GET['getticketinfo'])){
    $sql = "SELECT * FROM `tickets` WHERE `code` LIKE '".$_GET['getticketinfo']."' LIMIT 1";
}

$result = $conn->query($sql);
if(!$result){
    $results['error'] = 'Query error.';
}elseif ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      //echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
      $results['results'][] = $row;
    }
} else {
    $results['noresults'] = 'No results.';
}

$results['query'] = $sql;

echo json_encode($results);