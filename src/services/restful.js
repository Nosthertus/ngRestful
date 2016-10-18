ngRestful.service("$restful", ["$http", function($http){
	/**
	 * Performs a GET request to the host
	 * 
	 * @param  {String}  url     The url path where to send the request
	 * @param  {Object}  headers The headers options to set in the request
	 * @return {Promise}         The response from the host
	 */
	this.get = function(url, headers){
		return $http(this.$createRequest({}, "GET", url, headers));
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
		return $http(this.$createRequest(data, "POST", url, headers));
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
		return $http(this.$createRequest(data, "PUT", url, headers));
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
		return $http(this.$createRequest(data, "DELETE", url, headers));
	};

	/**
	 * Creates a request object for $http, the returned object can vary if
	 * the data has a file object, if that's the case then content-type is set
	 * to undefined in order to let the browser handle it
	 * 
	 * @param  {Object} data    The data that will be sent to the host
	 * @param  {String} method  The method on which will be used for the request
	 * @param  {String} url     The url where to send the request
	 * @param  {Object} headers The object mapped with request headers
	 * @return {Object}         The object for $http
	 */
	this.$createRequest = function(data, method, url, headers){
		var request = {};

		// Create custom object for attached files
		if(method != "GET" && this.hasFileObject(data)){
			var form = new FormData();

			for(prop in data){
				form.append(prop, data[prop]);
			}

			// let the broswer handle the content-type request
			headers["Content-Type"] = undefined;

			request = {
				method: method,
				url: url,
				data: form,
				transformRequest: angular.identity,
				headers: headers
			};
		}

		// Create a normal http object
		else{
			request = {
				method: method,
				url: url,
				data: data,
				headers: headers
			};
		}

		return request;
	}

	/**
	 * Checks if the object data has a file object
	 * 
	 * @param  {Object}  data The data where to find
	 * @return {Boolean}      Whether the file was found
	 */
	this.hasFileObject = function(data){
		for(prop in data){
			if(Object.prototype.toString.call(data[prop]) == "[object File]"){
				return true;
			}
		}

		return false;
	}
}]);