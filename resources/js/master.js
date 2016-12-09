
var mainApp = angular.module("mainApp", ['ngRoute']);
var username = null;


/* ROUTER */
mainApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.

	when('/login', {
		templateUrl: 'login.html',
		controller: 'loginCtrl'
	}).

	when('/dashboard', {
		templateUrl: 'dashboard.html',
		controller: 'dashboardCtrl'
	}).

	otherwise({
		redirectTo: '/login'
	});
}]);