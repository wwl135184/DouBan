require.config({
	paths:{
		jQuery: "jquery-1.10.1.min",
		comment: "comment"
	}
})
require(["jQuery", "comment"], function($, comment){
	comment.commentSubmit();
})