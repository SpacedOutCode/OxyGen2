var snowlord_variables = {
    listeners: [],
    loaded: true,
    showing: true,
    hijackFunctions: true,
    hideLogs: true, 
    log: console.log,
    warn: console.warn,
    error: console.error,
    tooltip: {
        showing : false,
        offsetX : 0,
        offsetY : 0,
        color : "rgba(0, 0, 0, 1)"
    }
};

/*
Element.prototype.oldAddEventListener = Element.prototype.addEventListener;
Element.prototype.addEventListener = function(type, handler, capture) {
    if (!capture) {
        capture = false;
    }
    this.oldAddEventListener(type, handler, capture);
    snowlord_variables.listeners.push({
        type : type,
        func : handler,
        capture : capture,
        elem : this,
        enabled : true
    });
}

function disableListener(index) {
    var elem = snowlord_variables.listeners[index].elem;
    var type = snowlord_variables.listeners[index].type;
    var func = snowlord_variables.listeners[index].func;
    snowlord_variables.listeners[index].enabled = false;
    var capture = snowlord_variables.listeners[index].capture;
    elem.removeEventListener(type, func, capture);
}

function toggleListener(index) {
    if (snowlord_variables.listeners[index].enabled) {
        disableListener(index);
    } else {
        enableListener(index);
    }
}

function enableListener(index) {
    var elem = snowlord_variables.listeners[index].elem;
    var type = snowlord_variables.listeners[index].type;
    var func = snowlord_variables.listeners[index].func;
    var capture = snowlord_variables.listeners[index].capture;
    snowlord_variables.listeners[index].enabled = true;
    elem.oldAddEventListener(type, elem, func, capture);
}
*/

console.log = function(msg) {
    var c = document.getElementsByClassName("OxyGen-container-body-console-text")[0];
    var cHeight = 10;
    if (snowlord_variables.hijackFunctions && c) {
        try {
            msg = msg.replace(/(?:\r\n|\r|\n)/g, "<br>");
        } catch(e) {}
        if (typeof(msg) == "number") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">&#10240;' + new Date().toLocaleTimeString().split(" ")[0] + "&#10240;" + '</span><span style="color: #0015ff;" class="msg">' + msg +'</span></div>';	
        } else if (typeof(msg) == "string") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">&#10240;' + new Date().toLocaleTimeString().split(" ")[0] + "&#10240;" + '</span><span style="color: #fff;" class="msg">' + msg +'</span></div>';				
        } else if (typeof(msg) == "function") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">&#10240;' + new Date().toLocaleTimeString().split(" ")[0] + "&#10240;" + '</span><span style="color: #fff;" class="msg">' + msg +'</span></div>';								
        } else if (typeof(msg) == "undefined") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">&#10240;' + new Date().toLocaleTimeString().split(" ")[0] + "&#10240;" + '</span><span style="color: #b5b5b5;" class="msg">' + msg +'</span></div>';
        } else {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">&#10240;' + new Date().toLocaleTimeString().split(" ")[0] + "&#10240;" + '</span><span style="color: #fff;" class="msg">' + msg +'</span></div>';
        }
        if (c.childElementCount > cHeight) {
            c.children[0].remove();
        }
        document.getElementById("OxyGen-container-body-console-input").scrollIntoView();
    } else {
        snowlord_variables.log(msg);
    }
};

console.error = function(msg) {
    var c = document.getElementsByClassName("OxyGen-container-body-console-text")[0];
    var cHeight = 10;
    if (snowlord_variables.hijackFunctions && c) {
        try {
            msg = msg.replace(/(?:\r\n|\r|\n)/g, "<br>");
        } catch(e) {}
        if (snowlord_variables.hideLogs) {
            // Stop logging
        } else if (typeof(msg) == "number") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">❌' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #0015ff;" class="msg"> ' + msg +'</span></div>';	
        } else if (typeof(msg) == "string") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">❌' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #00bae8"> "</span><span style="color: #d10000;" class="msg">' + msg +'</span></div>';				
        } else if (typeof(msg) == "function") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">❌' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #00bae8"> "</span><span style="color: #d10000;" class="msg">' + msg +'</span></div>';								
        } else if (typeof(msg) == "undefined") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">⮞' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #b5b5b5;" class="msg"> ' + msg +'</span></div>';
        } else {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">❌' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #d10000;" class="msg"> ' + msg +'</span></div>';
        }
        if (c.childElementCount > cHeight) {
            c.children[0].remove();
        }
        document.getElementById("OxyGen-container-body-console-input").scrollIntoView();
    } else {
        snowlord_variables.log(msg);
    }
};

console.warn = function(msg) {
    var c = document.getElementsByClassName("OxyGen-container-body-console-text")[0];
    var cHeight = 10;
    if (snowlord_variables.hijackFunctions && c) {
        try {
            msg = msg.replace(/(?:\r\n|\r|\n)/g, "<br>");
        } catch(e) {}
        if (snowlord_variables.hideLogs) {
            // Stop logging
        } else if (typeof(msg) == "number") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">⚠️' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #0015ff;" class="msg"> ' + msg +'</span></div>';	
        } else if (typeof(msg) == "string") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">⚠️' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #00bae8"> "</span><span style="color: #998201;" class="msg">' + msg +'</span></div>';				
        } else if (typeof(msg) == "function") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">⚠️' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #00bae8"> "</span><span style="color: #998201;" class="msg">' + msg +'</span></div>';								
        } else if (typeof(msg) == "undefined") {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">⮞' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #b5b5b5;" class="msg"> ' + msg +'</span></div>';
        } else {
            c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">⚠️' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #998201;" class="msg"> ' + msg +'</span></div>';
        }
        if (c.childElementCount > cHeight) {
            c.children[0].remove();
        }
        document.getElementById("OxyGen-container-body-console-input").scrollIntoView();
    } else {
        snowlord_variables.log(msg);
    }
};