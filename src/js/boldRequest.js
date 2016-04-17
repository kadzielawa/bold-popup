boldRequest = function() {
	
	var that = this;
	that.options = {};
	ajax = function(options) {
		var xhr = new XMLHttpRequest();
		that.options = {"method" :"GET","async":1, "success": that.success, "fail": that.fail, "beforeSend": that.beforeSend};
		for (var opt in options) { 
			that.options[opt] = options[opt];
		}
		that.beforeSend();
		xhr.onreadystatechange = that.handleResponse;
		xhr.open(that.options.method,that.options.url,that.options.async);
		xhr.send();
	};

	success = function(data) {
		console.log(data.currentTarget.response);
	};

	fail = function() {
		console.log("coś poszło nie tak..");
	};

	beforeSend = function() {
		//pokaz preloader
		console.log("DDD");
	};

	handleResponse = function(data) {
		if (this.readyState == 4 && this.status == 200) {
			that.options.success(data);
		}
		else{
			that.options.fail(data);
		}
	};

	return {
		ajax: ajax,
	}
}();