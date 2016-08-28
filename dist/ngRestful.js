(function(){
var ngRestful = angular.module("ngRestful", []);

ngRestful.service("$restful", ["$http", function($http){
	/**
	 * Performs a GET request to the host
	 * 
	 * @param  {String}  url     The url path where to send the request
	 * @param  {Object}  headers The headers options to set in the request
	 * @return {Promise}         The response from the host
	 */
	this.get = function(url[string], headers){
		return $http({
			method: "GET",
			url: url,
			headers: headers || {}
		});
	};

	/**
	 * Performs a POST request to the host
	 * 
	 * @param  {String}  url     The url path where to send the request
	 * @param  {Object}  data    The data to send along the request
	 * @param  {Object}  headers The headers options to set in the request
	 * @return {Promise}         The response from the host
	 */
	this.post = function(url, data, headers){
		return $http({
			method: "POST",
			url: url,
			data: data,
			headers: headers || {}
		});
	};

	/**
	 * Performs a PUT request to the host
	 * 
	 * @param  {String}  url     The url path where to send the request
	 * @param  {Object}  data    The data to send along the request
	 * @param  {Object}  headers The headers options to set in the request
	 * @return {Promise}         The response from the host
	 */
	this.put = function(url, data, headers){
		return $http({
			method: "PUT",
			url: url,
			data: data,
			headers: headers || {}
		});
	};

	/**
	 * Performs a DELETE request to the host
	 * 
	 * @param  {String}  url     The url path where to send the request
	 * @param  {Object}  data    The data to send along the request
	 * @param  {Object}  headers The headers options to set in the request
	 * @return {Promise}         The response from the host
	 */
	this.delete = function(url, data, headers){
		return $http({
			method: "DELETE",
			url: url,
			data: data,
			headers: headers || {}
		});
	};
}]);
})();