define(function(){
	var registorVerify = function(){
		$(function(){
			function Null(){
				if($("#email").val() == "" && $("#password").val() == "" && $("#name").val() == ""){
					$("#button").attr("disabled", "disabled");
				}
			}
			function ajax(data, node1, node2, str1, str2){
				$.ajax({
					url: '/users/ajax',
					data: data,
					type: 'get',
					dataType: 'json',
					success: function(data){
						// alert(data);
						switch(data){
							case 100:
								node1.css("display", "inline").html(str1);
								$("#button").removeAttr("disabled");
								break;
							case 101:
								node2.css("display", "inline").html(str2);
								$("#button").attr("disabled", "disabled");
							default:
								break;	
						}
					}
				})
			}
			Null();
			$("#email").focus(function(){
				$("#emailJudge").css("display", "inline");
				$("#emailJudge").html("请输入邮箱地址");
				$("#emailError").css("display", "none");
			})
			$("#email").blur(function(){
				Null();
				$("#emailJudge").css("display", "none");
				if($(this).val() == ""){
					$("#emailError").css("display", "inline");
					$("#emailError").html("邮箱不能为空");
					$("#button").attr("disabled", "disabled");

				}else{
					 var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					if(filter.test($(this).val())){
						ajax({alias: $(this).val()}, $("#emailJudge"),  $("#emailError"), "邮箱地址正确", "该邮箱已被注册");
					}else{
						$("#emailError").css("display", "inline");
						$("#emailError").html("请输入正确的邮箱的地址");
					}
				}
			})
			$("#password").focus(function(){
				$("#pwdJudge").css("display", "inline");
				$("#pwdJudge").html("至少包含字母和数字，最短8个字符，区分大小写");
				$("#pwdError").css("display", "none");
			})
			$("#password").blur(function(){
				Null();
				$("#pwdJudge").css("display", "none");
				var reg = /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*.,/\ ]{8,20}$/i
				if($(this).val() == ""){
					$("#pwdError").css("display", "inline");
					$("#button").attr("disabled", "disabled");
				}else{
 					if(/^[A-Za-z]{8,20}$/.test($(this).val()) || /^[0-9]{8,20}$/.test($(this).val())){
 						$("#pwdError").css("display", "inline");
 						$("#pwdError").html("密码强度不够，请包含字母和数字");
 					}else if(reg.test($(this).val())){
 						$("#pwdJudge").css("display", "inline");
 						$("#pwdJudge").html("密码格式正确");
 						$("#button").removeAttr("disabled");
 					}else{
 						$("#pwdError").css("display", "inline");
 						$("#pwdError").html("密码长度需为8~20位");
 					}
				}
			})
			$("#name").focus(function(){
				$("#nameJudge").css("display", "inline");
				$("#nameJudge").html("中、英文均可，最长14个英文或7个汉字");
				$("#nameError").css("display", "none");
			})
			$("#name").blur(function(){
				Null();
				$("#nameJudge").css("display", "none");
				if($(this).val() == ""){
					$("#nameError").css("display", "inline");
					$("#nameError").html("名号不能为空");
					$("#button").attr("disabled", "disabled");
				}else{
					if(/^[A-Za-z]{1,14}$/.test($(this).val()) || /^[\u4E00-\u9FA5]{1,7}$/.test($(this).val())){
						ajax({name: $(this).val()}, $("#nameJudge"),  $("#nameError"), "名号格式正确", "该名号已被注册");
					}else{
						$("#nameError").css("display", "inline");
						$("#nameError").html("名号长度不能超过14个英文或7个汉字");
					}
				}
			})
		})
	}
	return {
		registorVerify: registorVerify
	}
})