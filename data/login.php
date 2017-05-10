<?php
        header("content-type:application/json;charset=utf-8");
    	$luname=$_REQUEST['uname'];
		$lupwd=$_REQUEST['upwd'];
		require("init.php");
		$sql="select*from jingxi_user where uname='$luname' and upwd='$lupwd'";
		$result=mysqli_query($conn,$sql);
		$row=mysqli_fetch_assoc($result);
		if($row){
			$sql=" select uid from jingxi_user where uname='$luname'";
			$result=mysqli_query($conn,$sql);
            $uid=mysqli_fetch_row($result)[0];
			echo json_encode(["code"=>1,"msg"=>"登录成功","uname"=>$luname,"upwd"=>$lupwd,"uid"=>$uid]);
		}else{
			echo '{"code":-1,"msg":"登录失败"}';
		}
?>