(function(){
var ngRestful = angular.module("ngRestful", []);

ngRestful.service("$restful", ["$http", function($http){
	this.get = function(url, headers){
		return $http({
			method: "GET",
			url: url,
			headers: headers || {}
		});
	};
}]);
})();