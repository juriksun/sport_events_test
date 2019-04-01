<?php
require('db_connect.php');

$sql = "SELECT * FROM phones";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo '{"status": true, "phones": ' .json_encode($rows) . "}";
    
} else {
    echo '{"status": false}';
}

$conn->close();

?>