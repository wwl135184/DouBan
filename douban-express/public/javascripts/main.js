require.config({
	paths:{
		jQuery: "jquery-1.10.1.min",
		registor: "registor"
	}
})
require(["jQuery", "registor"], function($, registor){
	registor.registorVerify();
})