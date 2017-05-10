<?php
/**
*向订单详情中添加订单 添加成功时，从购物车表中删除对应的信息
*请求参数：
  userid-用户ID，必需
  phone-手机号，必需
  user_name-联系人名称，必需
  addr-送餐地址，必需
  totalprice-总价，必需
  cartDetail-购物车详情（类似这样：[{"ctid":"11","did":"1","dishCount":"2","name":"【酸甜开胃虾】","img_sm":"p0281.jpg","price":"36.00"},{"ctid":"12","did":"2","dishCount":"1","name":"【桂香紫薯山药卷】","img_sm":"p2679.jpg","price":"16.50"}]）
*输出结果：
* {"code":1,"msg":"succ"}//加入成功
* 或
* {"code":2,"msg":"succ"}//更新数量成功
*/
header('Content-Type:application/json');
$output = [];
@$addr = $_REQUEST['addr'];
@$cartDetail = $_REQUEST['cartDetail'];
@$phone = $_REQUEST['phone'];
@$sex = $_REQUEST['sex'];
@$totalprice = $_REQUEST['totalPrice'];
@$userid = $_REQUEST['userId'];
@$user_name = $_REQUEST['user_name'];
$order_time = time()*1000;   //PHP中的time()函数返回当前系统时间对应的整数值
if(!($addr&&$cartDetail&&$phone&&$sex&&$totalprice&&$userid&&$user_name)){
   echo "[]";
   return ;
}
//if(empty($userid) || empty($user_name) || empty($phone) || empty($addr) || empty($totalprice) || empty($cartDetail)){
 //   echo "[]"; //若客户端提交信息不足，则返回一个空数组，
 //   return;    //并退出当前页面的执行
//}

//访问数据库
require('init.php');


$sql = "insert into jingxi_order values(null,'$userid','$phone','$user_name',now(),'$addr','$totalprice','sex')";
$result = mysqli_query($conn, $sql);
$arr = [];
if($result){    //INSERT语句执行成功，需要获取新产生的订单id
     $oid = mysqli_insert_id($conn); //获取最近执行的一条INSERT语句生成的自增主键
     $sql="select did from jingxi_cart_detail where cartId=(select cid from jingxi_cart where  userId=$userid)";
     $result = mysqli_query($conn,$sql);
     $did=mysqli_fetch_all($result);
        foreach ($did as $id ){
            $sql = "delete from jingxi_cart_detail where did=$id[0]";
            $result = mysqli_query($conn,$sql);
        }
    $arr['msg'] = 'succ';
    $arr['reason'] = "订单生成成功";
    $arr['oid'] = $oid;
  //var_dump($cartDetail);
  $cart = json_decode($cartDetail);
            //SQL3:根据购物车的内容，生成订单明细 INSERT
  //for($i=0;$i<count($cart);$i++){
        foreach($cart as &$p){
            //echo $p->count;
           $sql = "INSERT INTO jingxi_order_detail VALUES(null,'$oid','$p->pid','$p->count')";
           mysqli_query($conn,$sql);
         }
//  }
}else{          //INSERT语句执行失败
    $arr['msg'] = 'error';
    $arr['reason'] = "订单生成失败";
}
$output[] = $arr;
echo json_encode($output);
?>
