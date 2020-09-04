<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
include('config.php');
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
mysqli_set_charset($conn, "utf8");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$response = [];
$response['data'] = json_decode(file_get_contents("php://input"),true);


$sql = '';
if($response['data']['id'] !== 'create'){
    $sql = "UPDATE `clients` SET";
    $i = 0;
    foreach($response['data'] as $k => $r){
        if($k==='id'){continue;}
        
        if($i!==0){$sql.=',';}
        $i++;

        if($k==='date_modif'){
            $sql .= " `".$k."` = '".date("Y-m-d H:i:s")."' ";
            continue;
        }
        $sql .= " `".$k."` = '".$conn->real_escape_string($r)."' ";
    }
    $sql .= "WHERE `clients`.`id` = ".$response['data']['id'];
}else{
    //$response['data']['code'] = uniqid();
    $keys = "";
    $values = "";
    $i=0;
    foreach($response['data'] as $k => $r){
        if($k==='id'){continue;}
        
        if($i!==0){
            $keys.=',';
            $values.=',';
        }
        $i++;
        $keys .= "`".$k."`";
        if($r){
            $values .= "'".$conn->real_escape_string(utf8_encode($r))."'";
        }else{
            $values .= "NULL";
        }
        //$sql .= " `".$k."` = '".$conn->real_escape_string($r)."' ";
    }
    $sql = "INSERT INTO `clients` (".$keys.") VALUES (".$values.")";
}


$result = $conn->query($sql);
if(!$result){
    $results['error'] = 'Query error.';
}else{
    $results['results'] = $result;
}

$response['code'] = $response['data']['code'];
$response['sql'] = $sql;

echo json_encode($response);