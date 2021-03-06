window.boldTemplate = ( function (mainOptions) {

var templates = {},
	boldExtend,
	loadOptions = function () {

	}();

// SZABLONOWANIE
function Template (options) {
	this.html = options.html || "<div class='boldPopup'>example</div>";
	this.data = options.data || {};
	this.events = options.events || {};
	this.name = options.name || "Empty template";

	this.constructor(options);
}

Template.prototype.constructor = function() {
	templates[this.id] = this;
};

Template.prototype.setParam = function(key, val) {
	this[key] = val;
};

Template.prototype.getSource = function () {
	return this.source;
};

var templateFactory = function (options) {
	var defaultOptions = {
		source: "DOM",
		autoBind: true
	},
	generateTemplateId = function () {
		var templateCount = 0,
			template;
		for (template in templates) {
			if ((!templates.hasOwnProperty(template))){
				continue;
			}
			templateCount = templateCount + 1;
		}
		return templateCount;
	},
	create = function (options) {
		this.newTemplate = new Template(options);
		this.newTemplate.setParam("id", generateTemplateId());
		loadSource(options);
							console.log(options);

	},
	loadSource = function (options) {
		var source;
		if (this.options.source === "DOM") {
			source = document.getElementById(options.options.script).innerHTML;
		}
		this.newTemplate.setParam("source", source);
		if (this.options.autoBind) {
			bindData();
		}
	},
	bindData = function (data) {
		var dataToBind = data || this.options.data,

			template = Handlebars.compile(this.newTemplate.source),
			html = template(dataToBind);

		this.newTemplate.setParam("html", html);
		window.boldDebug.add({type: "TEMPLATES", stringArray: "Bindowanie danych do szablonu: " + this.newTemplate.name});
	},
	givePopup = function(){
		var popupOptions = this.options.options;

	},
	getHtml = function() {
		return this.newTemplate.html;
	},

	constructor = (function(){
		this.options = window.boldExtend(defaultOptions, options);
		create(this.options);
		//givePopup();
	
	}());

	return getHtml();
};


return {
	new : "",
	data: "",
	loadTemplate: templateFactory,
	id: "",
	on: "",
	trigger: "",
	templates: templates
};

} () );