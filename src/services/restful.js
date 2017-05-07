ngRestful.service("$restful", ["$http", "ngRestful", function($http, $globals){
	/**
	 * Performs a GET request to the host
	 * 
	 * @param  {String}  url     The url path where to send the request
	 * @param  {Object}  config  The config options to set in the request
	 * @return {Promise}         The response from the host
	 */
	this.get = function(url, config){
		return $http(this.$createRequest({}, "GET", url, config));
	};

	/**
	 * Performs a POST request to the host
	 * 
	 * @param  {String}  url     The url path where to send the request
	 * @param  {Object}  data    The data to send along the request
	 * @param  {Object}  config  The config options to set in the request
	 * @return {Promise}         The response from the host
	 */
	this.post = function(url, data, config){
		return $http(this.$createRequest(data, "POST", url, config));
	};

	/**
	 * Performs a PUT request to the host
	 * 
	 * @param  {String}  url     The url path where to send the request
	 * @param  {Object}  data    The data to send along the request
	 * @param  {Object}  config  The config options to set in the request
	 * @return {Promise}         The response from the host
	 */
	this.put = function(url, data, config){
		return $http(this.$createRequest(data, "PUT", url, config));
	};

	/**
	 * Performs a DELETE request to the host
	 * 
	 * @param  {String}  url     The url path where to send the request
	 * @param  {Object}  data    The data to send along the request
	 * @param  {Object}  config  The config options to set in the request
	 * @return {Promise}         The response from the host
	 */
	this.delete = function(url, data, config){
		return $http(this.$createRequest(data, "DELETE", url, config));
	};

	/**
	 * Creates a request object for $http, the returned object can vary if
	 * the data has a file object, if that's the case then content-type is set
	 * to undefined in order to let the browser handle it
	 * 
	 * @param  {Object} data    The data that will be sent to the host
	 * @param  {String} method  The method on which will be used for the request
	 * @param  {String} url     The url where to send the request
	 * @param  {Object} config  The object mapped with request config
	 * @return {Object}         The object for $http
	 */
	this.$createRequest = function(data, method, url, config){
		config = this.$normalizeConfig(config);

		var request = {
			url: url,
			method: method,
			data: data
		};

		// Merge config data into request object
		Object.assign(request, config);

		// Check if headers is defined, if otherwise then create object
		if(typeof request.headers == "undefined"){
			request.headers = {};
		}
		
		// Merge default headers into header request object
		Object.assign(request.headers, $globals.$headers);

		// Create custom object for attached files
		if(method != "GET" && this.hasFileObject(data)){
			var form = new FormData();

			for(prop in data){
				form.append(prop, data[prop]);
			}

			// let the broswer handle the content-type request
			request.headers["Content-Type"] = undefined;

			// Set the data for request with attached files
			request["data"] = form;
			request["transformRequest"] = angular.identity;
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

	/**
	 * Normalizes the config structure for $createRequest use
	 * 
	 * @param  {Object} config The object to check and remove unecessary data
	 * @return {Object}        The object to be used for request object
	 */
	this.$normalizeConfig = function(config){
		var ignoreProps = ["url", "method", "data"	];

		var obj = config;

		// Remove all props with the name listed
		ignoreProps.forEach(function(el){
			if(obj.hasOwnProperty(el)){
				delete obj[el];
			}
		});

		return obj;
	}
}]);