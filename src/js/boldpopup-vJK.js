

var boldPopup = ( function (options) {
/**
 * stores all of popups
 * @type {Array}
 */
var popups = [];
var that = this;


/**
 * Constructor Popup which create popup by passed options
 * @param obj options all of popup's options pass by key:value
 */
function Popup(options)  {
	var that = this;
	//set default options
	this.options = {
		"parent" :"body",
		"overlay":1, 
		"timeout":"",
		"afterClose":"",
		"afterShow":"",
		"autoRemove": 0,
		"autoShow":1,
		"closeButton":1
	};


	for (var opt in options) { 
		this.options[opt] = options[opt];
	}
	this.content = boldTemplate.loadTemplate({"options": options, "data" : options.data});
	this.parent = document.querySelector(this.options.parent);
	this.parent.innerHTML +=this.content;
	
	if(this.options.closeButton){
		this.createCloseButton();
	}

	this.element = document.querySelector(options.element);
	if(this.element === null)
	{
		console.error("taki popup nie istnieje!");
	}
	
	//set observator on popup's changes
	this.setWatcher();
	//determine if popup needs overlay, if yes, we create it and display
	if(this.options.overlay && this.options.autoShow)
		{
			this.showOverlay();
		}
};

/**
 * [creator description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
var creator = function(options) {
	var popup = this.getPopup(options.element);

	if(typeof popup === 'undefined')
	{
		popup = new Popup(options);
		popups.push(popup);
	return popup;
	} else {
		popup.show();
	}
};

/**
 * [overlay description]
 * @return {[type]} [description]
 */
Popup.prototype.showOverlay = function() {
	if(!this.overlay)
		this.overlay = createOverlay();
	this.parent.appendChild(this.overlay); 
}

/**
 * [removeOverlay description]
 * @return {[type]} [description]
 */
Popup.prototype.removeOverlay = function() {
	this.overlay.remove();
}

/**
 * [setWatcher description]
 */
Popup.prototype.setWatcher = function() {
	var that = this;
	var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(targets) {
    	if(targets.target.style.display == "none")
    		that.removeOverlay();
    	else{
    		that.showOverlay();
    	}  
    });    
	});
	observer.observe(that.element, { attributes : true, attributeFilter : ['style'] });
}
/**
 * show popup - set popup as active 
 */
Popup.prototype.show = function() {
	var that = this;
	var element = that.element;	
	element.style.display="";
	if(that.options.timeout)
		setTimeout(function() {
			that.hide();

		},that.options.timeout * 1000);
};
/**
 * hide popup from document (not remove)
 */
Popup.prototype.hide = function() {
	this.element.style.display="none";
};

/**
 * [css description]
 * @param  {[type]} properties [description]
 * @return {[type]}            [description]
 */
Popup.prototype.css = function(properties) {
	var that = this;
	var element = document.querySelector(that.options.element);
	if(element === null)
		{
			console.error("taki popup nie istnieje!");
			return;
		}
	for(prop in properties) {
		element.style[prop] = properties[prop];
	} 
	return this;
}
/**
 * [createCloseButton description]
 * @return {[type]} [description]
 */
Popup.prototype.createCloseButton = function() {
	var that = this;
	var closeButton = document.createElement("div");
	closeButton.innerHTML = "X";
	closeButton.style.position = "absolute";
	closeButton.style["border-radius"] = "20px";
	closeButton.style.right = "10px";
	closeButton.style.top = "10px";
	closeButton.style.padding = "10px";
	closeButton.style["background-color"] = "yellow";
	closeButton.onclick = function() {
	if(that.options.autoRemove)
		that.removePopup();
	that.hide();
	}
	document.querySelector(that.options.element).appendChild(closeButton);
}

/**
 * [getContent description]
 * @return {[type]} [description]
 */
Popup.prototype.removePopup = function() {
	var that = this;
	var counter = 0;
	var popupArray = boldPopup.popups;
	for(popup in popupArray) {
		if(popupArray[popup].options.element === that.options.element){
			popupArray.splice(counter, 1);
		}
	counter++;
	}
	document.querySelector(that.options.element).remove();
}

/**
 * [getContent description]
 * @return {[type]} [description]
 */
Popup.prototype.getContent = function() {
	var that = this;
	return that.content;
}

/**
 * [getPopup description]
 * @param  {[type]} popupElement [description]
 * @return {[type]}              [description]
 */
var getPopup = function(popupElement){
	var popupArray = boldPopup.popups;
	for(popup in popupArray) {
		if(popupArray[popup].options.element === popupElement){
			return popupArray[popup];
		}
	}
}
/**
 * [createOverlay description]
 * @return {[type]} [description]
 */
var createOverlay = function() {
	var overlay = document.createElement("div");
	overlay.style.bottom="0";
	overlay.style.right="0";
	overlay.style.top="0";
	overlay.style["margin-left"]="15px";
	overlay.style["margin-right"]="15px";
	overlay.style["margin-bottom"]="30px";
	overlay.style.left="0";
	overlay.style.position="absolute";
	overlay.style["background-color"]= "black";
	overlay.style.opacity= "0.6";
	return overlay;
}

return {
	hide: this.hide,
	show: this.show,
	create: creator,
	createOverlay: createOverlay,
	getPopup: getPopup,
	popups: popups,
}

}());


