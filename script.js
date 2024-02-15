(() => {
  function downloadSiteInfo(filename, text) {
    let elem = document.createElement("a");
    elem.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    elem.setAttribute("download", filename);

    elem.style.display = "none";
    document.body.appendChild(elem);

    elem.click();
    elem.remove();
  }
  var html =
    `
      <div class="OxyGen-container-nav" id="OxyGen-container-nav">
          <a class="OxyGen-container-nav-elementViewer">` +
    "\uD83D\uDD0D" +
    `</a>
          <a class="OxyGen-container-nav-elementEditor">` +
    "\u270E" +
    `</a>
          <a name="OxyGen-container-body-elements">Elements</a>
          <a name="OxyGen-container-body-console">Console</a>
          <a name="OxyGen-container-body-tools" class="active">Tools</a>
          <a name="OxyGen-container-body-settings">Settings</a>
          <a name="OxyGen-container-body-version">O&sup2; 1.7</a>
          <a class="OxyGen-container-body-exit">` +
    "\uD83D\uDDD9" +
    `</a>
      </div>
      
      <div class="OxyGen-container-body">
          <div class="OxyGen-container-body-elements hidden">
            <pre><code class="OxyGen-container-body-elements-container"></code></pre>
          </div>
          <div class="OxyGen-container-body-console hidden">
              <div class="OxyGen-container-body-console-text" style="user-select: auto;">
                  <div class="OxyGen-container-body-console-messages">
                  <div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">&#10240;` + new Date().toLocaleTimeString().split(" ")[0] + "&#10240;" + `</span><span style="color: #fff;" class="msg">Console Loaded!</span></div>
                  </div>
              </div>
              <div class="OxyGen-container-body-console-commands">
                  <textarea id="OxyGen-container-body-console-input" placeholder="console.log('Hello World!');" style="position: sticky; width: 100%; height: 90%; outline: none; border: none; background-color: #1c1e1f; color: #fff; class="msg" "></textarea>
              </div>
          </div>
          <div class="OxyGen-container-body-tools showing">
              <div class="cards">
                <div class="card">
                  <h5 class="card-title">DeltaMath Bot</h5>
                  <p class="card-author">Made by <br><a href="https://github.com/flowingsalt/Deltamath-Bot">@flowingsalt</a></p>
                  <button class="card-button" onclick="deltaBot()">Activate</button>
                </div>
                <div class="card">
                  <h5 class="card-title">EdPuzzle Bot</h5>
                  <p class="card-author">Made by <br><a href="https://github.com/ading2210/edpuzzle-answers">@ading2210</a></p>
                  <button class="card-button" onclick="edpuzzleBot">Activate</button>
                </div>
                <div class="card">
                  <h5 class="card-title">Townsend Press Bot</h5>
                  <p class="card-author">Made by <br><a href="https://github.com/SpacedOutCode/TSPCheat">@spaced.out.code</a></p>
                  <button class="card-button" onclick="townsendBot()">Activate</button>
                </div>
              </div>
          </div>
          
          <div class="OxyGen-container-body-settings hidden">
              <h3>Settings</h3>
          </div>
      </div>
  `.trim();

  var javascript =
    `
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
      }
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
                  msg = msg.replace(/(\?\:\\r\\n|\\r|\\n)/g, "<br>");
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
      }
  
      console.error = function(msg) {
          var c = document.getElementsByClassName("OxyGen-container-body-console-text")[0];
          var cHeight = 10;
          if (snowlord_variables.hijackFunctions && c) {
              try {
                  msg = msg.replace(/(\?\:\\r\\n|\\r|\\n)/g, "<br>");
              } catch(e) {}
              if (snowlord_variables.hideLogs) {
                  // Stop logging
              } else if (typeof(msg) == "number") {
                  c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">` +
    "\u274C" +
    `' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #0015ff;" class="msg"> ' + msg +'</span></div>';	
              } else if (typeof(msg) == "string") {
                  c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">` +
    "\u274C" +
    `' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #00bae8"> "</span><span style="color: #d10000;" class="msg">' + msg +'</span></div>';				
              } else if (typeof(msg) == "function") {
                  c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">` +
    "\u274C" +
    `' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #00bae8"> "</span><span style="color: #d10000;" class="msg">' + msg +'</span></div>';								
              } else if (typeof(msg) == "undefined") {
                  c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">` +
    "\u2B9E" +
    `' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #b5b5b5;" class="msg"> ' + msg +'</span></div>';
              } else {
                  c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">` +
    "\u274C" +
    `' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #d10000;" class="msg"> ' + msg +'</span></div>';
              }
              if (c.childElementCount > cHeight) {
                  c.children[0].remove();
              }
              document.getElementById("OxyGen-container-body-console-input").scrollIntoView();
          } else {
              snowlord_variables.log(msg);
          }
      }
      
      console.warn = function(msg) {
          var c = document.getElementsByClassName("OxyGen-container-body-console-text")[0];
          var cHeight = 10;
          if (snowlord_variables.hijackFunctions && c) {
              try {
                  msg = msg.replace(/(\?\:\\r\\n|\\r|\\n)/g, "<br>");
              } catch(e) {}
              if (snowlord_variables.hideLogs) {
                  // Stop logging
              } else if (typeof(msg) == "number") {
                  c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">` +
    "\u26A0\uFE0F" +
    `' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #0015ff;" class="msg"> ' + msg +'</span></div>';	
              } else if (typeof(msg) == "string") {
                  c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">` +
    "\u26A0\uFE0F" +
    `' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #00bae8"> "</span><span style="color: #998201;" class="msg">' + msg +'</span></div>';				
              } else if (typeof(msg) == "function") {
                  c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">` +
    "\u26A0\uFE0F" +
    `' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #00bae8"> "</span><span style="color: #998201;" class="msg">' + msg +'</span></div>';								
              } else if (typeof(msg) == "undefined") {
                  c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">` +
    "\u2B9E" +
    `' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #b5b5b5;" class="msg"> ' + msg +'</span></div>';
              } else {
                  c.innerHTML += '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">` +
    "\u26A0\uFE0F" +
    `' + new Date().toLocaleTimeString().split(" ")[0] + '</span><span style="color: #998201;" class="msg"> ' + msg +'</span></div>';
              }
              if (c.childElementCount > cHeight) {
                  c.children[0].remove();
              }
              document.getElementById("OxyGen-container-body-console-input").scrollIntoView();
          } else {
              snowlord_variables.log(msg);
          }
      }
  `.trim();

  var css = `	
      @keyframes slideUp {
          0% {
              transform: translateY(100%);
          }
          100% {
              transform: translateY(0);
          }
      }
    
      .tooltip {
          display: inline-block;
          position: relative;
      }
  
      .tooltip .tooltiptext {
          background-color: black;
          transition: opacity 1s;
          visibility: hidden;
          text-align: center;
          border-radius: 6px;
          position: absolute;
          margin-left: -60px;
          padding: 5px 0;
          bottom: 100%;
          width: 120px;
          color: #fff;
          z-index: 1;
          opacity: 0;
          left: 50%;
      }

      .tooltip:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
      }
      
      .hidden {
          display: none !important;
      }
      
      .showing {
          display: block !imporant;
      }
  
      .OxyGen-container-body-console-messages {
          font-family: Consolas, monaco, monospace, serif;
      }
      .OxyGen-container {
          box-shaddow: 0 2px 30px 0 rgba(0, 0, 60, 0.045), 0px 1px 3px 0 rgba(0, 0, 80, 0.03);
          animation: 1s ease-out 0s 1 slideUp;
          background-color: #1c1e1f;
          color: #fff;
          z-index: 9999999999999999;
          vertical-align: baseline;
          flex-direction: column;
          box-sizing: border-box;
          transition: 0.2s;
          position: fixed;
          height: 300px;
          display: flex;
          width: 100%;
          padding: 0;?
          outline: 0;
          margin: 0;
          bottom: 0;
          left: 0;
          overflow-x: hidden;
      }
      
      .OxyGen-container-nav {
          justify-content: space-between;
          -webkit-box-direction: normal;
          background-color: #252729;
          -webkit-box-pack: justify;
          box-sizing: border-box;
          user-select: none;
          min-height: 25px;
          line-height: 1;
          color: #fff;
          width: 100%;
          padding: 0;
          margin: 0;
      }
      
      .OxyGen-container-nav a, .OxyGen-container-nav span {
          padding: 3px 5px 0 5px;
          min-height: 20px;
      }
      
      .OxyGen-container-nav a {
        float: left; 
        color: white;
        font-family: 'Poppins', sans-serif;
        font-weight: 300;
        font-size: 16px;
    }

    .OxyGen-container-nav a:nth-child(7) {
      float: left; 
      color: white;
      pointer-events: none;
  }

      .OxyGen-container-nav a:hover {
          background-color: #36393b;
          color: #7cacf8;
          border-bottom: 2px solid #7cacf8;
          cursor: pointer;
      }

      .OxyGen-container-body-exit {
        float: right !important; 
        color: white;
    }

    .OxyGen-container-body-exit:hover {
      background-color: #252729 !important;
      color: #e53d30 !important;
      border-bottom: none !important;
    }
    .active {
        color: #7cacf8 !important;
        border-bottom: 2px solid #7cacf8;
        cursor: pointer;
    }
    
    .OxyGen-container-body-elements {
      width: 100%;
      height: 100%;
    }
    .OxyGen-container-body-tools {
      width: 100%;
      height: 90%;
      display: flex;
      padding: 20px 20px 0 20px;
    }
    
    .OxyGen-container-body {
      height: 100%;
      width: 100%;
    }

    .cards {
      display: inline-flex;
      flex-direction: row;
      gap: 1vw;
      flex-wrap: nowrap;
      padding: 0.5vw;
      height: 70%;
      flex: 1 1 0;
    }

    .card {
      width: 20%;
      height: 100%;
      background-color: #252729;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-radius: 7px;
      padding: 20px;
    }
    .card-title {
      text-align: center;
      color: #7cacf8;
      margin: 0;
      font-family: 'Poppins', sans-serif;
      font-weight: 300;
      font-size: 16px;
    }
    .card-author {
      font-family: 'Poppins', sans-serif;
      font-weight: 300;
      font-size: 14px;
      text-align: center;
      color: #808080;
      margin: 1px 0 7px 0;
    }
    .card-author a {
      font-family: 'Poppins', sans-serif;
      font-weight: 300;
      font-size: 14px;
      text-align: center;
      color: #3e5bab;
    }
    .card-button {
      border-radius: 50px;
      border: none;
      background-color: #7cacf8;
      width: 80%;
      padding: 10px;
      color: #fff;
    }
      .string, .boolean, .number { font-weight: bold; }
  
      .string { color: rgb(233, 63, 59); }
  
      .boolean, .number { color: rgb(85, 106, 242); }
  
      .null { color: grey; }
  
      .key { font-style: italic; }
  `.trim();

  var tooltip = `
      <div id="OxyGen-tooltip" style="padding: 5px; background-color: #000; position: absolute; color: #fff; user-select: none; z-index: 99999999999; border-radius: 10px; ">
          <span id="OxyGen-tooltip-elementType" style="color:purple;"></span>
          <span id="OxyGen-tooltip-classType" style="color:green;"></span>
          <span id="OxyGen-tooltip-idType" style="color:orange;"></span>
      </div>
  `.trim();

  var injectedHtml = document.createElement("div");
  injectedHtml.id = "OxyGen-container";
  injectedHtml.classList.add("OxyGen-container");
  injectedHtml.classList.add("showing");
  injectedHtml.innerHTML = html;
  document.getElementsByTagName("body")[0]
    ? document.getElementsByTagName("body")[0].appendChild(injectedHtml)
    : document.documentElement.appendChild(injectedHtml);
  var consoleContainer = document.getElementsByClassName(
    "OxyGen-container showing"
  )[0];

  var injectedTooltip = document.createElement("div");
  injectedTooltip.classList.add("OxyGen-tooltip-container");
  injectedTooltip.style.display = "none";
  injectedTooltip.innerHTML = tooltip;
  document.getElementsByTagName("body")[0]
    ? document.getElementsByTagName("body")[0].appendChild(injectedTooltip)
    : document.documentElement.appendChild(injectedTooltip);
  var tooltipContainer = document.getElementsByClassName(
    "OxyGen-tooltip-container"
  )[0];

  var injectedCss = document.createElement("style");
  injectedCss.textContent = css.trim();
  injectedCss.classList.add("OxyGen-injectedCss");
  document.head
    ? document.head.appendChild(injectedCss)
    : document.body.appendChild(injectedCss);

  var injectedJS = document.createElement("script");
  injectedJS.textContent = javascript.trim();
  injectedJS.classList.add("OxyGen-injectedJS");
  document.head
    ? document.head.appendChild(injectedJS)
    : document.body.appendChild(injectedJS);

  function highlightJSON(json) {
    if (typeof json != "string") {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var cls = "number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        return '<span class="' + cls + ' span">' + match + "</span>";
      }
    );
  }

  var consoleInput = document.getElementById(
    "OxyGen-container-body-console-input"
  );
  
  consoleInput.addEventListener("keydown", function (e) {
    if (
      e.keyCode == 76 &&
      e.ctrlKey &&
      !e.altKey &&
      !e.shiftKey &&
      snowlord_variables.loaded
    ) {
      document.getElementsByClassName(
        "OxyGen-container-body-console-text"
      )[0].innerHTML =
        '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">â®ž' +
        new Date().toLocaleTimeString().split(" ")[0] +
        ' </span><i style="color: #fff;" class="msg">Console was cleared</i></div>';
      this.value = "";
    }

    if (
      e.keyCode == 13 &&
      !e.ctrlKey &&
      !e.altKey &&
      !e.shiftKey &&
      snowlord_variables.loaded
    ) {
      e.preventDefault();
      var val = this.value.toLowerCase().replace(/\r?\n|\r/g, "");
      if (
        val == "clear" ||
        val == "clear()" ||
        val == "clear();" ||
        val == "console.clear()" ||
        val == "console.clear();"
      ) {
        document.getElementsByClassName(
          "OxyGen-container-body-console-text"
        )[0].innerHTML =
          '<div class="OxyGen-container-body-console-messages"><span style="color: #bababa; user-select: none; font-size: 12px">â®ž' +
          new Date().toLocaleTimeString().split(" ")[0] +
          ' </span><i style="color: #bababa; class="msg"">Console was cleared</i></div>';
        this.value = "";
      } else if (
        val == "info" ||
        val == "info;" ||
        val == "getInfo" ||
        val == "get info"
      ) {
        downloadSiteInfo(
          "Website Info.txt",
          `
  Website Location: ${document.location.href}
  Screen Width: ${window.innerWidth}
  Screen Height: ${window.innerHeight}
  HTML Length: ${document.body.innerHTML.length}
  Text Length: ${document.body.textContent.length}
  Loaded Scripts: ${document.getElementsByTagName("script").length}
  Loaded Styles: ${document.getElementsByTagName("link").length}
  Meta Tags: ${document.getElementsByTagName("meta").length}
  Executed Threads (Intervals & Loops): ${setInterval(";")}
  Date Opened: ${new Date()}
  Timezone: ${new Date().getTimezoneOffset() / 60}
  Referrer: ${document.referrer}
  Cookies: ${document.cookie}
  User-Agent: ${navigator.userAgent}
  Language: ${navigator.language}
                  `.trim()
        );
        this.value = "";
      } else if (
        val == "hidelogs()" ||
        val == "hideLogs();" ||
        val == "hidelogs();" ||
        val == "hideLogs();"
      ) {
        snowlord_variables.hideLogs = !snowlord_variables.hideLogs;
      } else {
        try {
          console.log(eval(this.value));
        } catch (e) {
          console.error(e);
        }
        this.value = "";
      }
    }
  });
  var font = `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script defer>hljs.highlightAll(); </script>`
  document.head.insertAdjacentHTML( 'beforeend', font );

  // Tooltip
  document.addEventListener("mousemove", function (e) {
    tooltip = snowlord_variables.tooltip;
    if (snowlord_variables.loaded) {
      if (tooltip.showing) {
        // Show tooltip
        document.getElementsByClassName(
          "OxyGen-tooltip-container"
        )[0].style.display = "block";
        document.getElementsByClassName(
          "OxyGen-tooltip-container"
        )[0].style.backgroundColor = tooltip.color;

        // Does the target have a tag name?
        if (e.target.tagName.toLowerCase() != "") {
          // Yes
          document.getElementById(
            "OxyGen-tooltip-elementType"
          ).innerHTML = e.target.tagName.toLowerCase();
        } else {
          // No
          document.getElementById(
            "OxyGen-tooltip-elementType"
          ).innerHTML = "";
        }

        // Does the target have a class name?
        if (e.target.className != "") {
          // Yes
          document.getElementById(
            "OxyGen-tooltip-classType"
          ).innerHTML = "." + e.target.className;
        } else {
          // No
          document.getElementById(
            "OxyGen-tooltip-classType"
          ).innerHTML = "";
        }

        // Does the target have an ID?
        if (
          e.target.id != "" &&
          e.target.id != "OxyGen-tooltip-elementType" &&
          e.target.id != "OxyGen-tooltip-elementType" &&
          e.target.id != "OxyGen-tooltip-classType" &&
          e.target.id != "OxyGen-tooltip"
        ) {
          // Yes
          document.getElementById(
            "OxyGen-tooltip-idType"
          ).innerHTML = "#" + e.target.id;
        } else {
          // No
          document.getElementById(
            "OxyGen-tooltip-idType"
          ).innerHTML = "";
        }

        // Position tooltip
        moveToolTip(e);
      } else {
        document.getElementsByClassName(
          "OxyGen-tooltip-container"
        )[0].style.display = "none";
      }
    }
  });

  document
    .getElementsByClassName(
      "OxyGen-container-nav-elementViewer"
    )[0]
    .addEventListener("click", function () {
      if (snowlord_variables.loaded) {
        snowlord_variables.tooltip.showing =
          !snowlord_variables.tooltip.showing;
        console.log("Tooltip showing: " + snowlord_variables.tooltip.showing);
      }
    });

  // Position tooltip function
  function moveToolTip(e) {
    var tooltip = document.getElementById("OxyGen-tooltip");
    tooltip.style.left = e.pageX + 8 + "px";
    tooltip.style.top = e.pageY + "px";
    tooltip.offsetX = e.pageX + 8 + "px";
    tooltip.offsetY = e.pageY + "px";
  }

  var elements = document
    .getElementsByClassName("OxyGen-container-nav")[0]
    .getElementsByTagName("a");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].name) {
      elements[i].addEventListener("click", function () {
        if (snowlord_variables.loaded) {
          var elems = document.getElementsByClassName(
            "OxyGen-container-body"
          )[0].children;
          var curElem = document.getElementsByClassName(this.name)[0];
          for (let i = 0; i < elems.length; i++) {
            try {
              elems[i].classList.remove("hidden");
              elems[i].classList.remove("showing");
            } catch (e) {
              console.log(elems[i]);
            }
            elems[i].classList.add("hidden");
          }
          curElem.classList.remove("hidden");
          curElem.classList.add("showing");
        }
      });
    }
  }
  var tabs = document.getElementsByClassName("OxyGen-container-nav")[0].getElementsByTagName("a");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function() {
      for (let j = 0; j < tabs.length; j++) {
        tabs[j].classList.remove("active");
      }
      this.classList.add("active");
    });
  }
  document
    .getElementsByClassName("OxyGen-container-body-exit")[0]
    .addEventListener("click", function () {
      document
        .getElementsByClassName("OxyGen-container")[0]
        .remove();
      document
        .getElementsByClassName("OxyGen-tooltip-container")[0]
        .remove();
      document
        .getElementsByClassName("OxyGen-injectedCss")[0]
        .remove();
      document
        .getElementsByClassName("OxyGen-injectedJS")[0]
        .remove();
      snowlord_variables.hijackFunctions = false;
      snowlord_variables.loaded = false;
      snowlord_variables.showing = false;
    });

  document
    .getElementsByClassName(
      "OxyGen-container-nav-elementEditor"
    )[0]
    .addEventListener("click", function () {
      if (
        document.body.contentEditable != "true" ||
        document.body.designMode != "on"
      ) {
        console.log("Editing elements: true");
        document.body.contentEditable = "true";
        document.body.designMode = "on";
      } else {
        console.log("Editing elements: false");
        document.body.contentEditable = "false";
        document.body.designMode = "off";
      }
    });
  document.getElementsByClassName(
    "OxyGen-container-body-elements-container"
  )[0].innerText = document.body.innerHTML.replace(
    /<\/\w+>/g,
    (e) => e + "\r\n"
  );
})();
function deltaBot() {
  fetch(
    "https://res.cloudinary.com/dq36xqdoe/raw/upload/v1681701219/bookmark_yguw3q.js"
  )
    .then((r) => r.text())
    .then((r) => eval(r));
}
function edpuzzleBot() {
  fetch(
    "https://cdn.jsdelivr.net/gh/ading2210/edpuzzle-answers@latest/script.js"
  )
    .then((r) => r.text())
    .then((r) => eval(r));
}

function townsendBot() {
  fetch(
    "https://raw.githubusercontent.com/SpacedOutCode/TSPCheat/main/script.js"
  )
    .then((r) => r.text())
    .then((r) => eval(r));
}
