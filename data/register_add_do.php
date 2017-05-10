<?php
        header("content-type:application/json;charset=utf-8");
    	$uname=$_REQUEST['uname'];
		$upwd=$_REQUEST['upwd'];
		require("init.php");
			$sql="insert into jingxi_user values(null,'$uname','$upwd')";
		$result=mysqli_query($conn,$sql);
		$uid=mysqli_insert_id($conn);
		if($result){
			echo json_encode(["code"=>1,"msg"=>"您好!!!","uname"=>$uname,"uid"=>$uid,"upwd"=>$upwd]);
		}else{
			echo '{"code":-1,"msg":"注册失败"}';
		}
?>