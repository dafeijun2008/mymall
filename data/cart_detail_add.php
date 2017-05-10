<?php
    header("content-type:application/json;charset=utf-8");
    $userId=$_REQUEST["userId"];
    $productId=$_REQUEST["productId"];
    require('init.php');
    $sql="select cid from jingxi_cart where userId='$userId'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
    if($row===null){
        $sql="insert into jingxi_cart values(null,'$userId')";
        mysqli_query($conn,$sql);
        $cartId=mysqli_insert_id($conn);
    }else{
        $cartId=$row[0];
    }
    $sql="select did,count from jingxi_cart_detail where cartId='$cartId' and productId='$productId'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_row($result);
    if($row===null){
        $sql = "insert into jingxi_cart_detail values(null,'$productId','$cartId',1)";
        mysqli_query($conn,$sql);
        $count=1;
    }else{
        $did=$row[0];
        $count=$row[1];
        $count++;
        $sql="update jingxi_cart_detail set count='$count' where did='$did'";
        mysqli_query($conn,$sql);
    }
    echo '{"code":1,"msg":"添加成功","count":'.$count.'}';
?>