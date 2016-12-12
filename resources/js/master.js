
var mainApp = angular.module("mainApp", ['ngRoute']);
var username = null;
var curr_board = {
	id: null,
	name: null,
	owner: null,
	read_write: null
};


/* ROUTER */
mainApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.

	when('/login', {
		templateUrl: 'login.html',
		controller: 'loginCtrl'
	}).

	when('/gallery', {
		templateUrl: 'gallery.html',
		controller: 'galleryCtrl'
	}).

	when('/profile', {
		templateUrl: 'profile.html',
		controller: 'profileCtrl'
	}).

	when('/drawing', {
		templateUrl: 'drawing.html',
		controller: 'drawingCtrl'
	}).

	when('/newBoard', {
		templateUrl: 'newBoard.html',
		controller: 'newBoardCtrl'
	}).

	otherwise({
		redirectTo: '/login'
	});
}]);

$(document).ready(function(){
    console.log("Note: Don't use refresh or back please");
    $(window).on('beforeunload', function(){
        return "Please do not use the browser's refresh";
    });
});