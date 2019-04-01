<?php 
require_once "db_connect.php";
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

if(!empty($json_obj)){

    // doo all validation of json
    $full_name = $json_obj->full_name;
    $phone = $json_obj->phone;

    // echo $id;
    $sql = "INSERT INTO phones (full_name, phone)
    VALUES ('" . $full_name . "', '". $phone . "')";

    if ($conn->query($sql) === TRUE) {
        echo '{"status": true}';
    } else {
        echo '{"status": false, "message": '. $conn->error .'}';
    }
    
} else {
    echo '{"status": true, "message": '. $conn->error .'}';
}

$conn->close();

?>