/**
 * [boldPreloader description]
 * @return {[type]} [description]
 */
BOLD.preloader = (function() {
    /**
     * stores of preloaders
     * @type {Array}
     */
    var preloaders = [];
    options = {};
    /**
     * Preloader constructor
     */
    var Preloader = function(passedOptions) {
        //set default options
        defaultOptions = { "parent": "body", "img": "preloader.gif", "overlay": 1, "timeout": "", "autoShow": 1 };
        options = BOLD.extend(defaultOptions, passedOptions);
        this.wrapper();
        parent = document.querySelector(options.parent);
        parent.appendChild(content);
        this.show();
    }

    /**
     * function responsible for show preloader and overlay if is set
     */
    Preloader.prototype.show = function() {
        content.style.display = "";
        if (options.overlay) {
            this.showOverlay();
        }
    };

    /**
     * create preloader and give him options
     */
    Preloader.prototype.wrapper = function() {
        content
            = document.createElement("img");
        content.setAttribute("class", "preloader-style");
        content.setAttribute("src", options.img);
    }

    /**
     * show overlay around the prolader
     */
    Preloader.prototype.showOverlay = function() {

        if (!this.overlay) {
            this.overlay = boldPopup.createOverlay();
            parent.appendChild(this.overlay);
        }
    }

    /**
     *  remove overlay and set to null
     */
    Preloader.prototype.removeOverlay = function() {
        this.overlay.remove();
        this.overlay = null;
    }

    /**
     * hide added preloader
     */
    Preloader.prototype.hide = function() {
        this.removeOverlay();
        content.style.display = "none";
    };

    /**
     * create new preloader and add to array
     * @return new Preloader
     */
    var creator = function(options) {
        preloader = new Preloader(options);
        return preloader;
    }

    return {
        create: creator
    }
}());
