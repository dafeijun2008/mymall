<?php
    header('Content-Type:application/json');
@$pid = $_REQUEST['pid'];
if(empty($pid)){
    echo '[]';
    return;
}
require('init.php');
$sql = "SELECT pid,name,price,detail,img1,img2,img3,img4,img5 FROM jx_product WHERE pid=$pid";
$result = mysqli_query($conn,$sql);
$output = [];
$row = mysqli_fetch_assoc($result);
if(empty($row)){
    echo '[]';
}
else{
    $output[] = $row;
    echo json_encode($output);
}
?>




