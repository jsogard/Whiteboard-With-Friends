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

	$scope.delete = function(board){
		$.ajax({
			url: './resources/php/deleteboard.php',
			method: 'POST',
			async: false,
			data: {
				id:board.id
			},
			success: function(response){
				console.log('deleteboard.php:\n'+response);
				$scope.init();
			}
		});
	};

	$scope.init = function(){
		$http({
			method: 'POST',
			url: './resources/php/galleryboards.php'
		}).then(function(results){
			results = results.data;
			console.log('Coded:\n'+results);
			console.log('JSON:\n'+angular.fromJson(results));
			$scope.boards = angular.fromJson(results);
		});
	};
	$scope.init();

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

$(document).ready(function(){
    console.log("Note: Don't use refresh or back please");
    $(window).on('beforeunload', function(){
        return "Please do not use the browser's refresh";
    });
});