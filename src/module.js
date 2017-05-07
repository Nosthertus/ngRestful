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
	$headers: {},
	setDomain: function(value){
		this.$domain = value;
	},
	setHeader: function(key, value){
		this.$headers[key] = value;
	}
});