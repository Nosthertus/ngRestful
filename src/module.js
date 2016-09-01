var ngRestful = angular.module("ngRestful", []);

ngRestful.config(["$httpProvider", function($http){
	// Enable CORS response
	$http.defaults.useXDomain = true;
}]);

/*
 * Define constant configuration for the module
 */
ngRestful.constant("ngRestful", {
	$domain: "",
	setDomain: function(value){
		this.$domain = value
	}
});