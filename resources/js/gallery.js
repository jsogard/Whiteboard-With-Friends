/* GALLERY CONTROLLER */

mainApp.controller('galleryCtrl', function($scope, $route, $location, $http, $window) {
	/*
	if(username == null)
		$location.url('/login');
	*/

	$scope.stylesheets = [
		{
			href: './styles.css',
			type: 'text/css'
		}
	];
	
	$scope.username = username;

	$http({
		method: 'POST',
		url: './resources/php/galleryboards.php'
	}).then(function(results){
		results = results.data;
		console.log('Coded:\n'+results);
		console.log('JSON:\n'+angular.fromJson(results));
		$scope.boards = angular.fromJson(results);
	});

	$scope.refresh = function(){
		$route.reload();
	};

	$scope.logout = function(){
		$http({
			method: 'POST',
			url: './resources/php/signout.php'
		}).then(function(results){
			username = null;
			$location.url('/login');
		});
	};

	$scope.new = function(){
		$location.url('/newBoard');
	};

	$scope.draw = function(board){
		$.ajax({
			url: "./resources/php/drawing.php",
			method: 'POST',
			async: false,
			data: {
				action:"set",
				id:board.id,
				name:board.name,
				owner:board.owner,
				read_write:board.read_write
			},
			success: function(response){
				console.log(response);
			}
		});

		$window.open('./drawing.html');
	};
});