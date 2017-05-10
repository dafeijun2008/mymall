<?php
	header("content-type:application/json;charset=utf-8");
	$uname=$_REQUEST['uname'];
	require("init.php");
	$sql="select*from jingxi_user where uname='$uname'";
	$result=mysqli_query($conn,$sql);
	$uname=mysqli_fetch_assoc($result);
	if($uname){
		echo '{"code":-1,"msg":"用户名正确"}';
	}else{
		echo '{"code":1,"msg":"用户名错误,请重新输入"}';
	}
?>