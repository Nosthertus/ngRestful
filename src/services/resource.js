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
	 * @param  {String}  path The resource path of the host
	 * @return {Promise}      The response from the host
	 */
	resource.prototype.fetch = function(path){
		var http = [this.$url, path].join("/");

		return $restful.get(http, this.headers);
	};

	resource.prototype.getContext = function() {
		return this;
	};

	return resource;
}]);