/**
 * [boldRequest description]
 * @return {[type]} [description]
 */
boldRequest = function() {
	
	var that = this;
	that.options = {};
	/**
	 * [ajax description]
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	ajax = function(options) {
		var xhr = new XMLHttpRequest();
		that.options = {
			"method" :"POST",
			"async":1, 
			"success": that.success,
			"fail": that.fail,
			"timeout": "",
			"data": "",
			"beforeSend": that.beforeSend,
			//additional options such as preloader
			"preloader": {"img":"preloader.gif","parent":".tile.blue"}
		};

		for (var opt in options) { 
			that.options[opt] = options[opt];
		}
		that.data = objToQueryString(that.options.data);
		xhr.onreadystatechange = that.handleResponse;
		xhr.open(that.options.method,that.options.url,that.options.async);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(that.data);
	};
	/**
	 * default success function
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	success = function(data) {
		console.log(data.currentTarget.response);
	};
	/**
	 * [fail description]
	 * @return {[type]} [description]
	 */
	fail = function() {
		console.error("coś poszło nie tak..");
	};
	/**
	 * [beforeSend description]
	 * @return {[type]} [description]
	 */
	beforeSend = function() {
		//pokaz preloader
		if(this.options.preloader) {
			this.preloader = boldPreloader.create(this.options.preloader);
		}
	};
	/**
	 * [handleResponse description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	handleResponse = function(data) {
		/**
		 * statusy readyState:
		 *  1 - połączenie nawiązane z serwerem
		 *	2 - żądanie wysłane do serwera 
		 *	3 - przetwarzanie żądania 
		 *	4 - żądanie obsłużone i odpowiedź jest już gotowa - status 200
		 */
		
		//response data 
		var respData = data.currentTarget.response;

		if(this.readyState == 1) {
			that.beforeSend();
		}
		if (this.readyState == 4 && this.status == 200) {
			// 
			setTimeout(function() {
				that.options.success(respData);
			}, that.options.timeout);
		}
		else if (this.readyState == 4 && this.status !== 200){
			that.options.fail(respData);
		}
		setTimeout(function() {
			that.preloader.hide.call(that.preloader);
		}, that.options.timeout);
		
	};
	/**
	 * Note this doesn't handle arrays or nested objects.
	 * @param    object 
	 * @return string ready to send e.g via GET request
	 */
	var objToQueryString = function(obj) {
        var str = "";
		for (var key in that.options.data) {
		    if (str != "") {
		        str += "&";
		    }
		    str += key + "=" + encodeURIComponent(that.options.data[key]);
		}
		return str;
	}

	return {
		ajax: ajax,
	}
}();