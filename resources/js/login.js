/* LOGIN CONTROLLER */
mainApp.controller('loginCtrl', function($scope,$http,$location) {

	$scope.error = "";
	
	$scope.valid = {
		login: {
			username: '#ffffff',
			password: '#ffffff'
		},
		signup: {
			username: '#ffffff',
			password: '#ffffff',
			confirm: '#ffffff'
		}
	};

	$scope.login = function(user, pwd){

		angular.forEach($scope.valid.login, function(value, key){
			$scope.valid.login[key] = "#ffffff";
		});
		angular.forEach($scope.valid.signup, function(value, key){
			$scope.valid.signup[key] = "#ffffff";
		});

		if(!user || !pwd)
		{
			if(!pwd)
				$scope.valid.login.password = "#FF5C5C";
			if(!user)
				$scope.valid.login.username = "#FF5C5C";
			return;
		}

		$http({
			method: 'POST',
			url: './resources/php/login.php',
			data: {
				username: user,
				password: pwd
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(results){
			results = results.data;
			console.log('Server connected: "'+results+"\"");
			if ((results+'').length < 50) $scope.error = results;
			if(results != "")
			{
				if(results.charAt(0) == 'U')
					$scope.valid.login.username = "#FF5C5C";
				else if(results.charAt(0) == 'P')
					$scope.valid.login.password = "#FF5C5C";
				return;
			}
			username = user;
			$location.url('/gallery');
			
		}, function(error){
			console.log("Login error: "+error);
		});
	};

	$scope.signup = function(user, pwd, con){
		angular.forEach($scope.valid.login, function(value, key){
			$scope.valid.login[key] = "#ffffff";
		});
		angular.forEach($scope.valid.signup, function(value, key){
			$scope.valid.signup[key] = "#ffffff";
		});
		$scope.error = "";
		if(!user || !pwd || !con)
		{
			if(!user)
				$scope.valid.signup.username = "#FF5C5C";
			if(!pwd)
				$scope.valid.signup.password = "#FF5C5C";
			if(!con)
				$scope.valid.signup.confirm = "#FF5C5C";
			$scope.error = "Empty Fields";
			return;
		}
		if(pwd != con)
		{
			$scope.valid.signup.confirm = "#FF5C5C";
			$scope.valid.signup.password = "#FF5C5C";
			$scope.error = "Passwords not same";
			return;
		}
		$http({
			method: 'POST',
			url: './resources/php/signup.php',
			data: {
				username: user,
				password: pwd
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(results){
			results = results.data;
			console.log('Server connected: "'+results+"\"");
			if((results+'').length < 50) $scope.error = results;
			if(results != "")
			{
				$scope.valid.signup.username = "#FF5C5C";
			}
		},function(error){
			console.log("Signup error: "+error);
		});
	}

});