window.boldPopup = ( function (options) {

var queue = [],
	that = this;

function Popup()  {
	
}

Popup.prototype.constructor = function() {
	
}

Popup.prototype.show = function() {
	
}

Popup.prototype.hide = function() {
	queue.shift();
	
}
return {
	hide: this.hide,
	show: this.show,
	
}

}());