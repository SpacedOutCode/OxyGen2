( async () => {
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
  var html = ``;
  var javascript = ``;
  var css = ``;
  await fetch("https://api.spaced.gg/oxygen2")
  .then(response => response.json())
  .then(data => {
    javascript = data.js;
    css = data.css;
    html = data.html;
  })
  .catch(error => console.error('Error:', error));
  var tooltip = `
      <div id="OxyGen-tooltip" style="padding: 5px; background-color: #1C1E1F; position: absolute; color: #fff; user-select: none; z-index: 99999999999; border-radius: 10px; display: flex; flex-direction: column; border: 1px solid #7cacf8; padding: 10px;">
          <span id="OxyGen-tooltip-elementType" style="color:#f5852a;"></span>
          <span id="OxyGen-tooltip-classType" style="color:#2a93f5;"></span>
          <span id="OxyGen-tooltip-idType" style="color:#f5e42a;"></span>
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
  injectedCss.textContent = css;
  injectedCss.classList.add("OxyGen-injectedCss");
  document.head
    ? document.head.appendChild(injectedCss)
    : document.body.appendChild(injectedCss);

  var injectedJS = document.createElement("script");
  injectedJS.textContent = javascript;
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
  var simplyTip = false;
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
          if (!simplyTip) { document.getElementById(
            "OxyGen-tooltip-elementType"
          ).innerHTML = "Element: " + e.target.tagName.toLowerCase();} else {
            document.getElementById(
              "OxyGen-tooltip-elementType"
            ).innerHTML = e.target.tagName.toLowerCase();
          }
        } else {
          // No
          document.getElementById(
            "OxyGen-tooltip-elementType"
          ).innerHTML = "";
        }

        // Does the target have a class name?
        if (e.target.className != "") {
          // Yes
          if (!simplyTip) { document.getElementById(
            "OxyGen-tooltip-classType"
          ).innerHTML = "Class: " + e.target.className;} else {
            document.getElementById(
              "OxyGen-tooltip-classType"
            ).innerHTML = "." + e.target.className;
          }
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
          if (!simplyTip) { document.getElementById(
            "OxyGen-tooltip-idType"
          ).innerHTML = "Id: " + e.target.id;} else {
            document.getElementById(
              "OxyGen-tooltip-idType"
            ).innerHTML = "#" + e.target.id;
          }
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

  document.querySelectorAll(".slider")[0]
    .addEventListener("click", function () {
      if (snowlord_variables.loaded) {
        snowlord_variables.tooltip.showing =
          !snowlord_variables.tooltip.showing;
      }
    });

    document.querySelectorAll(".slider")[2]
    .addEventListener("click", function () {
      if (simplyTip) {
        simplyTip = false;
        document.querySelector("#OxyGen-tooltip").style.display = "flex";
      } else {
        simplyTip = true;
        document.querySelector("#OxyGen-tooltip").style.display = "";
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

    document.querySelectorAll(".slider")[1]
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
