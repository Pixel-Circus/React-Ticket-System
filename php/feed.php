<?php 
header("Access-Control-Allow-Origin: *");
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
if(isset($_GET['clientgetbyid'])){
    $sql = "SELECT * FROM `clients` WHERE `id` LIKE '".$_GET['clientgetbyid']."' LIMIT 1";
}


if(isset($_GET['usercheck'])){
    $sql = "SELECT * FROM `users` WHERE `code` LIKE '".$_GET['usercheck']."'";
    if(isset($_GET['need_active'])){
        $sql.="AND `actif` LIKE 1";
    }
}
if(isset($_GET['usergetbyid'])){
    $sql = "SELECT * FROM `users` WHERE `id` LIKE '".$_GET['usergetbyid']."' LIMIT 1";
}


if(isset($_GET['listticketsclient'])){
    $sql = "SELECT * FROM `ticket` WHERE `client` LIKE '".$_GET['listticketsclient']."' ORDER BY `categorie` ASC, `date_modif` DESC";
}

if(isset($_GET['listticketsuser'])){
    $sql = "SELECT * FROM `ticket` WHERE `assigne` LIKE '".$_GET['listticketsuser']."' ORDER BY `categorie` DESC, `date_modif` DESC";
}

if(isset($_GET['getticketinfo'])){
    $sql = "SELECT * FROM `ticket` WHERE `code` LIKE '".$_GET['getticketinfo']."' LIMIT 1";
}

if(isset($_GET['getuserinfo'])){
    $sql = "SELECT * FROM `users` WHERE `code` LIKE '".$_GET['getuserinfo']."' LIMIT 1";
}

if(isset($_GET['getclientinfo'])){
    $sql = "SELECT * FROM `clients` WHERE `code` LIKE '".$_GET['getclientinfo']."' LIMIT 1";
}

if(isset($_GET['fetch_categories'])){
    $sql = "SELECT DISTINCT `categorie` FROM `ticket`";
}

if(isset($_GET['fetch_users'])){
    $sql = "SELECT * FROM `users` WHERE `actif` LIKE 1";
}
if(isset($_GET['fetch_all_users'])){
    $sql = "SELECT * FROM `users` ORDER BY `actif` DESC, `nom` ASC";
}

if(isset($_GET['fetch_clients'])){
    $sql = "SELECT * FROM `clients` ORDER BY `code` ASC";
}

if(isset($_GET['fetch_tickets_by_clients'])){
    $sql = "SELECT * FROM `ticket` WHERE `categorie` != 400 ORDER BY `client` ASC, `categorie` ASC";
}

if(isset($_GET['fetch_tickets_by_assignee'])){
    $sql = "SELECT * FROM `ticket` WHERE `categorie` != 400 ORDER BY `assigne` ASC, `categorie` ASC ";
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

echo json_encode(utf8ize($results));