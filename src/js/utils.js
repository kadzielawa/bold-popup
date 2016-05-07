//namespace create
var BOLD = {};
// CLEAR JS EXTEND FUNCTION
BOLD.extend = function() {

    // Variables
    var extended = {},
        deep = false;
    i = 0;
    length = arguments.length;

    // Check if a deep merge
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;
    }

    // Merge the object into the extended object
    var merge = function(obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                // If deep merge and property is an object, merge properties
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = extend(true, extended[prop], obj[prop]);
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    // Loop through each object and conduct a merge
    for (; i < length; i++) {
        var obj = arguments[i];
        merge(obj);
    }

    return extended;

};

// DEBUG - funkcja pomocnicza
BOLD.debug = (function(msg) {

    var instance = this,
        notices = {},
        add,
        get,
        show,
        print,
        ln = 0,
        i = 0;

    add = function(msg) {
        msg = msg.stringArray;
        if (typeof msg === 'object' && msg.type && msg.stringArray) {

            if (notices[msg.type]) {
                notices[msg.type].push(msg.stringArray);
            } else {
                notices[msg.type] = [msg.stringArray];
            }
        } else if (typeof msg === 'string') {
            if (notices.messages) {
                ln = notices.messages.length;
            } else {
                notices.messages = [];
            }
            notices.messages[ln] = msg;

        } else {
            notices.messages = "HELLO WORLD";
        }
    };

    addError = function(msg) {
        return add({ type: "error", stringArray: msg });
    };

    show = function() {
        print("---------------------- !!! ----------------------");
        for (var noticeName in notices) {
            if (!notices.hasOwnProperty(noticeName)) continue;
            print("**** " + noticeName + " ****");
            noticeArray = notices[noticeName];

            ln = noticeArray.length;
            i = 0;

            for (i; i < ln; i = i + 1) {
                print("[" + parseInt((i + 1), 10) + "]: " + noticeArray[i]);
            }
        }
        print("---------------------- !!! ----------------------");
    };

    print = (function Print(msg) {
        console.log(msg);
        return Print;
    }("DEBUGOWANIE WŁĄCZONE"));

    return {
        notices: notices,
        show: show,
        add: add,
        addError: addError,
        get: get
    };

}());

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastchild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
