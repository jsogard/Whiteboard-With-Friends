
$(document).ready(function(){

	$('#login > .username').focus();

	$(document).keypress(function(e) {
	    if(e.which == 13) {
	        if($('#login > input').is(':focus'))
	        	$('#login .submit').click();
	        else if($('#signup > input').is(':focus'))
	        	$('#signup .submit').click();
	    }
	});

	$('#login .submit').click(function(){
		var pwd = $('#login > .password').val();
		var error = "";
		var uname = $('#login > .username').val();

		if(uname == null || uname == "")
		{
			$("#error").html("Invalid Username");
			return;
		}

		if(pwd == null || pwd == "")
		{
			$("#error").html("Invalid Password");
			return;
		}

		$.ajax({
			url: "./login.php",
			async: false,
			
			data: {
				username: uname,
				password: pwd
			},
			
			type: "POST",
			success: function(result){
				if(result.length == 0)
				{
					window.open("./index.html",'_self',false);
				}
				else
				{
					error = result;
				}
			}
		});


		$("#error").html(error);
	});


	$('#signup > .submit').click(function(){
		console.log("signing up...");

		var pwd = $('#signup > .password').val();
		var con = $('#confirm').val();

		if(pwd == null || pwd == "" || pwd != con)
		{
			$("#error").html("Invalid Password");
			return;
		}

		var error = "";
		var uname = $('#signup > .username').val();

		console.log("u:"+uname+"\np:"+pwd);

		if(uname == null || uname == "")
		{
			$("#error").html("Invalid Username");
			return;
		}

		$.ajax({
			url: "./signup.php",
			async: false,
			
			data: {
				username: uname,
				password: pwd
			},
			
			type: "POST",
			success: function(result){
				if(result.length == 0)
				{
					window.open("./login.html",'_self',false);
				}
				else
				{
					error = result;
				}
			}
		});


		$("#error").html(error);
	});

});
