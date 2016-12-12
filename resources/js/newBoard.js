mainApp.controller('newBoardCtrl', function($scope, $location, $http, $window) {
	//

	$scope.stylesheets = [
		{
			href: 'styles.css',
			type: 'text/css'
		}
	];

	$scope.board = {
		owner: username,
		name: null,
		writers: null,
		readers: null,
		public: 0
	}

	$scope.error = "";

	$scope.submit = function(){
		$scope.error = "";
		if($scope.board.name == null || $scope.board.name.length == 0)
		{
			$scope.error = "Enter board name";
			return;
		}

		if($scope.board.writers != null){
			$scope.board.writers = ($scope.board.writers + ",").split(',');
			angular.forEach($scope.board.writers, function(value, key){
				if(value == null || value.length == 0) 
				{
					$scope.board.writers[key] = null;
					return;
				}
				var clean = "";
				angular.forEach(value, function(letter, key){
					if(letter != " ") clean += letter;
				});
				$scope.board.writers[key] = (clean.length == 0 ? null : clean);
			});
		}


		if($scope.board.readers != null){
			$scope.board.readers = ($scope.board.readers + ",").split(',');
			angular.forEach($scope.board.readers, function(value, key){
				if(value == null || value.length == 0) 
				{
					$scope.board.readers[key] = null;
					return;
				}
				var clean = "";
				angular.forEach(value, function(letter, key){
					if(letter != " ") clean += letter;
				});
				$scope.board.readers[key] = (clean.length == 0 ? null : clean);
			});
		}

		var b = angular.toJson($scope.board);

		$.ajax({
			url: "./resources/php/newBoard.php",
			async: false,
			
			data: {
				"json":b
			},
			
			type: "POST",
			success: function(result){
				$window.open("./drawing.html");
				$location.url("/gallery");
			}
		});

		
	};



});