var boldPopup = ( function (options) {

var popups = [];
var that = this;
var content = "";
function Popup(options)  {
	this.content = boldTemplate.loadTemplate({ id: "basicTemplate", data : {mainText: "test tekstu", buttonId: "testButton", buttonIdDwa: "drugiKlikacz"}});

	
};

Popup.prototype.show = function() {
	this.appendTo();
};

Popup.prototype.hide = function() {
	queue.shift();
	
};

Popup.prototype.css = function(properties) {
	var that = this;
	element = document.getElementById("boldPopup");
	console.log(element.style);
	for(prop in properties) {
		element.style["prop"] = properties[prop];
	} 
	return this;
}

Popup.prototype.getContent = function() {
	var that = this;
	return that.content;
}

Popup.prototype.appendTo = function(selector) {
	this.content = document.createElement("div");
	theDiv.appendChild(this.content);

};

var creator = function(options) {
	var popup = new Popup();
	console.log(that);
	popups.push(popup);
	return popup;

};
return {
	hide: this.hide,
	show: this.show,
	create: creator,
	popups: popups,
	
}

}());




// TWORZENIE

// POKAZ I UKRYJ

// PRELOADER

// EVENTY

// CALLBACKS

// POZYCJONOWANIE + CSS POZYCJE ITD

// TŁUMACZENIA

// API