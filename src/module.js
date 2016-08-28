var ngRestful = angular.module("ngRestful", []);

ngRestful.config(["$httpProvider", function($http){
	// Enable CORS response
	$http.defaults.useXDomain = true;
}]);