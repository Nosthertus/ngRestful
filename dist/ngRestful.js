(function() {
	var ngRestful = angular.module("ngRestful", []);

	ngRestful.config(["$httpProvider", function($http) {
		// Enable CORS response
		$http.defaults.useXDomain = true;
	}]);

	/*
	 * Define constant configuration for the module
	 */
	ngRestful.constant("ngRestful", {
		$domain: "",
		setDomain: function(value) {
			this.$domain = value;
		}
	});

	ngRestful.factory("$resource", ["$restful", "ngRestful", function($restful, $globals) {
		/**
		 * Construct function of resource object
		 * Defines the common settings for the resource
		 * 
		 * @param  {String} url  The URL of the host API
		 * @param  {Object} opts The options settings to set in the resource
		 */
		function resource(url, opts) {
			if (typeof url != "undefined" && !angular.isString(url)) {
				throw new Error("url in constructor is not a valid value.");
			} else {
				url = "";

				if ($globals.$domain && !isAbsolute(url)) {
					this.$url = [$globals.$domain, url].join("/");
				} else {
					this.$url = url;
				}
			}

			this.$config = config || {};
		}

		/**
		 * Checks if a provided url is absolute
		 * 
		 * @param  {String}  url The provided url to evaluate
		 * @return {Boolean}     Whether the url is absolute
		 */
		function isAbsolute(url) {
			var regex = /^(https:\/\/|http:\/\/|\/\/).+/g;

			return url.match(regex) !== null;
		}

		/**
		 * Fetches a collection list from the resource
		 * 
		 * @param  {String|Array}  path The resource path of the host
		 * @return {Promise}            The response from the host
		 */
		resource.prototype.fetch = function(path) {
			if (path && Object.prototype.toString.call(path) == "[object Array]") {
				path = setParams(path[0], path[1])
			}

			var http = path ? [this.$url, path].join("/") : this.$url;

			return $restful.get(http, this.$config);
		};

		/**
		 * Sends data to a resource uri with POST method
		 * 
		 * @param  {String|Array} path The path of the host
		 * @param  {Object}       data The data to send to the resource
		 * @return {Promise}           The response from the host
		 */
		resource.prototype.save = function(path, data) {
			if (path && Object.prototype.toString.call(path) == "[object Array]") {
				path = setParams(path[0], path[1])
			}

			var http = path ? [this.$url, path].join("/") : this.$url;

			return $restful.post(http, data, this.$config);
		};

		/**
		 * Sends data to a resource uri with PUT method
		 * 
		 * @param  {String|Array} path The path of the host
		 * @param  {Object}       data The data to send to the resource
		 * @return {Promise}           The response from the host
		 */
		resource.prototype.update = function(path, data) {
			if (path && Object.prototype.toString.call(path) == "[object Array]") {
				path = setParams(path[0], path[1])
			}

			var http = path ? [this.$url, path].join("/") : this.$url;

			return $restful.put(http, data, this.$config);
		};

		/**
		 * Sends a request with data to a resource uri with DELETE method
		 * 
		 * @param  {String|Array} path The path of the host
		 * @param  {Object}       data The data to send to the resource
		 * @return {Promise}           The response from the host
		 */
		resource.prototype.delete = function(path, data) {
			if (path && Object.prototype.toString.call(path) == "[object Array]") {
				path = setParams(path[0], path[1])
			}

			var http = path ? [this.$url, path].join("/") : this.$url;

			return $restful.delete(http, data, this.$config);
		};

		/**
		 * Sets uri parameters into the uri string
		 * where key object is the parameter name and
		 * value is the value to replace
		 * 
		 * @param {String} uri    The uri with parameters to replace
		 * @param {Object} params The map of parameters to set into uri
		 */
		function setParams(uri, params) {
			for (p in params) {
				uri = uri.replace(":" + p, params[p]);
			}

			return uri;
		}

		return resource;
	}]);

	ngRestful.service("$restful", ["$http", function($http) {
		/**
		 * Performs a GET request to the host
		 * 
		 * @param  {String}  url     The url path where to send the request
		 * @param  {Object}  config  The config options to set in the request
		 * @return {Promise}         The response from the host
		 */
		this.get = function(url, config) {
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
		this.post = function(url, data, config) {
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
		this.put = function(url, data, config) {
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
		this.delete = function(url, data, config) {
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
		this.$createRequest = function(data, method, url, config) {
			config = this.$normalizeConfig(config);

			var request = {
				url: url,
				method: method,
				data: data
			};

			// Merge config data into request object
			Object.assign(request, config);

			// Create custom object for attached files
			if (method != "GET" && this.hasFileObject(data)) {
				var form = new FormData();

				for (prop in data) {
					form.append(prop, data[prop]);
				}

				if (typeof request.headers == "undefined") {
					request.headers = {};
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
		this.hasFileObject = function(data) {
			for (prop in data) {
				if (Object.prototype.toString.call(data[prop]) == "[object File]") {
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
		this.$normalizeConfig = function(config) {
			var ignoreProps = ["url", "method", "data"];

			var obj = config;

			// Remove all props with the name listed
			ignoreProps.forEach(function(el) {
				if (obj.hasOwnProperty(el)) {
					delete obj[el];
				}
			});

			return obj;
		}
	}]);
})();