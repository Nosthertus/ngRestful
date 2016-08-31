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
			this.$domain = value
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
			if ($globals.$domain && !isAbsolute(url)) {
				this.$url = [$globals.$domain, url].join("/")
			} else {
				this.$url = url;
			}

			this.$headers = opts ? (opts.headers || {}) : {};
		}

		/**
		 * Checks if a provided url is absolute
		 * 
		 * @param  {String}  url The provided url to evaluate
		 * @return {Boolean}     Whether the url is absolute
		 */
		function isAbsolute(url) {
			var regex = /(https|http).+/g;

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

			return $restful.get(http, this.headers);
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

			return $restful.post(http, data, this.headers);
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

			return $restful.put(http, data, this.headers);
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

			return $restful.delete(http, data, this.headers);
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
		 * @param  {Object}  headers The headers options to set in the request
		 * @return {Promise}         The response from the host
		 */
		this.get = function(url, headers) {
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
		this.post = function(url, data, headers) {
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
		this.put = function(url, data, headers) {
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
		this.delete = function(url, data, headers) {
			return $http({
				method: "DELETE",
				url: url,
				data: data,
				headers: headers || {}
			});
		};
	}]);
})();