ngRestful.factory("$resource", ["$restful", "ngRestful", function($restful, $globals){
	/**
	 * Construct function of resource object
	 * Defines the common settings for the resource
	 * 
	 * @param  {String} url  The URL of the host API
	 * @param  {Object} opts The options settings to set in the resource
	 */
<<<<<<< HEAD
	function resource(url, config){
		if($globals.$domain && !isAbsolute(url)){
			this.$url = [$globals.$domain, url].join("/")
=======
	function resource(url, opts){
		if(typeof url != "undefined" && !angular.isString(url)){
			throw new Error("url in constructor is not a valid value.");
>>>>>>> c3878739227fae9d6ecccfb3df35c60795f84c7d
		}

		else{
			url = "";

			if($globals.$domain && !isAbsolute(url)){
				this.$url = [$globals.$domain, url].join("/");
			}

			else{
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
	function isAbsolute(url){
		var regex = /^(https:\/\/|http:\/\/|\/\/).+/g;

		return url.match(regex) !== null;
	}

	/**
	 * Fetches a collection list from the resource
	 * 
	 * @param  {String|Array}  path The resource path of the host
	 * @return {Promise}            The response from the host
	 */
	resource.prototype.fetch = function(path){
		if(path && Object.prototype.toString.call(path) == "[object Array]"){
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
	resource.prototype.save = function(path, data){
		if(path && Object.prototype.toString.call(path) == "[object Array]"){
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
		if(path && Object.prototype.toString.call(path) == "[object Array]"){
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
		if(path && Object.prototype.toString.call(path) == "[object Array]"){
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
	function setParams(uri, params){
		for(p in params){
			uri = uri.replace(":" + p, params[p]);
		}

		return uri;
	}

	return resource;
}]);