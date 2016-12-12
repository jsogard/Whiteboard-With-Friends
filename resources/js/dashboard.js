/* DASHBOARD CONTROLLER */

mainApp.controller('dashboardCtrl', function($scope, $location) {
	if(username == null)
		$location.url('/login');
	$scope.username = username;
	$scope.message = "This page will be used to display all the boards";
	$scope.boards = '\
		[\
			{\
				"boardName":"Community",\
				"id":0,\
				"owner":"admin",\
				"path":"/img/100.png"\
			}\
		]';
});