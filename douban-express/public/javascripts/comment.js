define(function(){
	var commentSubmit = function(){
		$(function(){
			function Null(){
				if($(".title").val() == "" || $(".content").val() == ""){
					$("#lessue").attr("disabled", "disabled");
				}
			}
			Null();
			$(".no").blur(function(){
				Null();
				if($(".title").val() && $(".content").val()){
					$("#lessue").removeAttr("disabled");
				}
			})
		})
	}
	return {
		commentSubmit: commentSubmit
	}
})