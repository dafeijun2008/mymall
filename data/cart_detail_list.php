<?php
    header("content-type:application/json;charset=utf-8");
    @$uid=$_REQUEST['uid'] or die('{"code":-2,"msg":"用户编号不能为空}');
    require("init.php");
    $sql="SELECT pid,name,price,img1,did,count,detail FROM jx_product,jingxi_cart_detail
    WHERE pid=productId AND cartId=(SELECT cid FROM jingxi_cart WHERE userId=$uid)";
    $result=mysqli_query($conn,$sql);
    $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($rows);
?>