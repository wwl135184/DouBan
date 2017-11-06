define(function(){
	var loginVerify = function(){
		$(function(){
			$("#account").blur(function(){
				account();
			})
			$(".pwd").blur(function(){
				password();
			})
			function account(){
				if($("#account").val() == "" || $("#account").val() == null){
					$(".accountError").css("display", "inline");
					$(".accountError").html("请输入正确的邮箱/手机号/用户名");
				}else{
					$(".accountError").css("display", "none");
					$(".accountError").attr("OK", true);
				}
			}
			function password(){
				if($(".pwd").val() == "" || $(".pwd").val() == null){
					$(".pwdError").css("display", "inline");
					$(".pwdError").html("请输入密码");
				}else{
					$(".pwdError").css("display", "none");
					$(".pwdError").attr("OK", true);
				}
			}
			$("#login").click(function(){
				var isYes = true;
				for(var i = 0; i < 2; i++){
					if($(".err").eq(i).attr("OK") == "false"){
						isYes = true;
						break;
					}
					isYes = false;
				}
				if(isYes){
					account();
					password();
					return false;
				}else{

				}
			})
		})
	}
	return {
		loginVerify: loginVerify
	} 
})