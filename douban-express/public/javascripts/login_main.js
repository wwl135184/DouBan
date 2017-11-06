require.config({
	paths:{
		jQuery: "jquery-1.10.1.min",
		login: "login"
	}
})
require(["jQuery", "login"], function($, login){
	login.loginVerify();
})