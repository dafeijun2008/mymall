<?php
header("content-type:application/json;charset=utf-8");
//1:获取参数购物车did
$did = $_REQUEST['did'];
$msg = $_REQUEST['msg'];
$uid = $_REQUEST['uid'];
$count = $_REQUEST['count'];
$count=intval($count);
//2:创建sql
require("init.php");
//添加产品数量
if($msg=='add'){
  $sql = "UPDATE jingxi_cart_detail SET count=count+1 WHERE did = $did";
}else if($msg=='reduce'&&$count>1){//减少产品数量
  $sql = "UPDATE jingxi_cart_detail SET count=count-1 WHERE did = $did";
}else if($msg=='delete'){//删除产品
  $sql = "DELETE FROM jingxi_cart_detail WHERE did = $did";
}
$result = mysqli_query($conn,$sql);
if($result){
  $sql="SELECT pid,name,price,img1,did,count,detail FROM jx_product,jingxi_cart_detail
      WHERE pid=productId AND cartId=(SELECT cid FROM jingxi_cart WHERE userId=$uid)";
  $result=mysqli_query($conn,$sql);
  $rows=mysqli_fetch_all($result,MYSQLI_ASSOC);
  echo json_encode($rows);
}