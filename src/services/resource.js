ngRestful.factory("$resource", ["$restful", function($restful){
	/**
	 * Construct function of resource object
	 * Defines the common settings for the resource
	 * 
	 * @param  {String} url  The URL of the host API
	 * @param  {Object} opts The options settings to set in the resource
	 */
	function resource(url, opts){
		this.$url = url;

		this.$headers = opts ? (opts.headers || {}) : {};
	}

	/**
	 * Fetches a collection list from the resource
	 * 
	 * @param  {String|Array}  path The resource path of the host
	 * @return {Promise}            The response from the host
	 */
	resource.prototype.fetch = function(path){
		if(Object.prototype.toString.call(path) == "[object Array]"){
			path = setParams(path[0], path[1])
		}

		var http = [this.$url, path].join("/");

		return $restful.get(http, this.headers);
	};

	/**
	 * Sends data to a resource uri with POST method
	 * 
	 * @param  {String|Array} path The path of the host
	 * @param  {Object}       data The data to send to the resource
	 * @return {Promise}           The response from the host
	 */
	resource.prototype.save = function(path, data){
		if(Object.prototype.toString.call(path) == "[object Array]"){
			path = setParams(path[0], path[1])
		}
	
		var http = [this.$url, path].join("/");
		
		return $restful.post(http, data, this.headers);
	};

	/**
	 * Sends data to a resource uri with PUT method
	 * 
	 * @param  {String|Array} path The path of the host
	 * @param  {Object}       data The data to send to the resource
	 * @return {Promise}           The response from the host
	 */
	resource.prototype.update = function() {
		if(Object.prototype.toString.call(path) == "[object Array]"){
			path = setParams(path[0], path[1])
		}
	
		var http = [this.$url, path].join("/");

		return $restful.put(http, data, this.headers);
	};

	/**
	 * Sends a request with data to a resource uri with DELETE method
	 * 
	 * @param  {String|Array} path The path of the host
	 * @param  {Object}       data The data to send to the resource
	 * @return {Promise}           The response from the host
	 */
	resource.prototype.delete = function() {
		if(Object.prototype.toString.call(path) == "[object Array]"){
			path = setParams(path[0], path[1])
		}
	
		var http = [this.$url, path].join("/");

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
	function setParams(uri, params){
		for(p in params){
			uri = uri.replace(":" + p, params[p]);
		}

		return uri;
	}

	return resource;
}]);