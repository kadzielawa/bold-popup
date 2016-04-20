/**
 * [boldPreloader description]
 * @return {[type]} [description]
 */
boldPreloader = (function() {
	/**
	 * stores of preloaders
	 * @type {Array}
	 */
	var preloaders = [];
	var that = this;
	that.options = {};
	/**
	 * Preloader constructor
	 */
	var Preloader = function(options) {
		var that = this;
		//set default options
		this.options = {"parent" :"body","overlay":1, "timeout":"","autoShow":1};
		for (var opt in options) { 
			this.options[opt] = options[opt];
		}
		this.wrapper();
		
		this.parent = document.querySelector(this.options.parent);
		this.parent.appendChild(this.content);
		if(this.options.overlay) {
			this.showOverlay();
		}
	}

	/**
	 * [creator description]
	 * @return {[type]} [description]
	 */
	Preloader.prototype.show = function() {
		this.preloader.style.display = "";
	};

	/**
	 * [wrapper description]
	 * @return {[type]} [description]
	 */
	Preloader.prototype.wrapper = function() {
		this.content = document.createElement("img");
		this.content.setAttribute("class", "preloader-style");
		this.content.setAttribute("src", this.options.img);
	}

	/**
	 * [overlay description]
	 * @return {[type]} [description]
	 */
	Preloader.prototype.showOverlay = function() {
		if(!this.overlay)
			this.overlay = boldPopup.createOverlay();
		this.parent.appendChild(this.overlay); 
	}

	/**
	 * [removeOverlay description]
	 * @return {[type]} [description]
	 */
	Preloader.prototype.removeOverlay = function() {
		this.overlay.remove();
	}

	/**
	 * [creator description]
	 * @return {[type]} [description]
	 */
	Preloader.prototype.hide = function() {
		this.removeOverlay();
		this.content.style.display = "none";
	};

	/**
	 * create new preloader and add to array
	 * @return {[type]} [description]
	 */
	var creator = function(options) {
		var preloader = new Preloader(options);
		return preloader;
	}

	return {
		create: creator,
		hide: this.hide,
	}
}());