<?php
/**根据用户id查询订单数据**/
header('Content-Type:application/json');

$output = [];

@$userId = $_REQUEST['userId'];

if(empty($userId)){
    echo "[]"; //若客户端未提交用户id，则返回一个空数组，
    return;    //并退出当前页面的执行
}
//访问数据库
require('init.php');
$sql="select jingxi_order.oid,jingxi_order.userId,jingxi_order.phone,jingxi_order.addr,jingxi_order.totalprice,jingxi_order.user_name,
        jingxi_order.order_time,jingxi_order_detail.did,jingxi_order_detail.count,jx_product.price,jx_product.name,jx_product.img1
        from jingxi_order_detail,jx_product,jingxi_order
        where jingxi_order.oid = jingxi_order_detail.orderId and jx_product.pid= jingxi_order_detail.productId and jingxi_order.userid='$userId'";

$result = mysqli_query($conn, $sql);
$output['data'] = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($output);
?>
