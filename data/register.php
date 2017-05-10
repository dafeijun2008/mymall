<?php
	header("content-type:application/json;charset=utf-8");
	$uname=$_REQUEST['uname'];
	require("init.php");
	$sql="select*from jingxi_user where uname='$uname'";
	$result=mysqli_query($conn,$sql);
	$uname=mysqli_fetch_assoc($result);
	if($uname){
		echo '{"code":1,"msg":"该账户名已存在,请重新输入"}';
	}else{
		echo '{"code":-1,"msg":"该账户名可以使用"}';
	}
?>