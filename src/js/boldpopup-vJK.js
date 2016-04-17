

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
	//set default options
	this.options = {"parent" :"body","overlay":1, "timeout":"","autoShow":1,"closeButton":1};
	for (var opt in options) { 
		this.options[opt] = options[opt];
	}
	this.content = boldTemplate.loadTemplate({"options": options, data:{mainText: "test tekstu", buttonId: "testButton", buttonIdDwa: "drugiKlikacz"}});
	if(document.querySelector(options.element) === null)
		{
			console.error("taki popup nie istnieje!");
		}
	//set observator on popup's changes
	this.setWatcher();
	//determine if popup needs overlay, if yes, we create it and display
	if(this.options.overlay && this.options.autoShow)
		{
			this.createOverlay();
			this.showOverlay();
		}
};

/**
 * [creator description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
var creator = function(options) {
	var popup = new Popup(options);
	popups.push(popup);
	return popup;
};

/**
 * [overlay description]
 * @return {[type]} [description]
 */
Popup.prototype.createOverlay = function() {
	this.overlay = document.createElement("div");
	this.overlay.style.bottom="0";
	this.overlay.style.right="0";
	this.overlay.style.top="0";
	this.overlay.style["margin-left"]="15px";
	this.overlay.style["margin-right"]="15px";
	this.overlay.style["margin-bottom"]="30px";
	this.overlay.style.left="0";
	this.overlay.style.position="absolute";
	this.overlay.style["background-color"]= "black";
	this.overlay.style.opacity= "0.6";
}
/**
 * [overlay description]
 * @return {[type]} [description]
 */
Popup.prototype.showOverlay = function() {
	if(!this.overlay)
		this.createOverlay();
	var parent = document.querySelector(this.options.parent);
	parent.appendChild(this.overlay); 
}
/**
 * [removeOverlay description]
 * @return {[type]} [description]
 */
Popup.prototype.removeOverlay = function() {
	this.overlay.remove();
}
/**
 * [getStatus description]
 * @return {[type]} [description]
 */
Popup.prototype.getElement = function() {
	var element = document.querySelector(this.options.element);	
	return element;
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
	observer.observe(that.getElement(), { attributes : true, attributeFilter : ['style'] });
}
/**
 * show popup - set popup as active 
 */
Popup.prototype.show = function() {
	var that = this;
	var element = that.getElement();	
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
	var element = this.getElement();	
	element.style.display="none";
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
 * [getContent description]
 * @return {[type]} [description]
 */
Popup.prototype.getContent = function() {
	var that = this;
	return that.content;
}
/**
 * [appendTo description]
 * @param  {[type]} selector [description]
 * @return {[type]}          [description]
 */
Popup.prototype.appendTo = function(selector) {

};

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
		else {
			console.error("popup z takim selektorem nie istnieje!");
		}
	}
}


return {
	hide: this.hide,
	show: this.show,
	create: creator,
	getPopup: getPopup,
	popups: popups,
}

}());


