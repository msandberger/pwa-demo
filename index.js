function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service workers not supported.");
  }

  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/pwa/serviceworker.js").then(
      function(registration) {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      },
      function(err) {
        console.error("ServiceWorker registration failed: ", err);
      }
    );
  });
}

function configureInstallPrompt() {
  window.addEventListener("beforeinstallprompt", browserPromptEvent => {
    console.debug("beforeinstallprompt");

    // Prevent Chrome 76 and later from showing the mini-infobar
    browserPromptEvent.preventDefault();

    const uiPrompt = document.getElementById("a2hs-prompt");

    uiPrompt.style.display = "block";
    uiPrompt.style.opacity = 1;

    uiPrompt
      .querySelector("#btn-a2hs-yes")
      .addEventListener("click", function() {
        browserPromptEvent.prompt();
        browserPromptEvent.userChoice.then(choiceResult => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          browserPromptEvent = null;
          uiPrompt.style.display = "none";
        });
      });
    uiPrompt
      .querySelector("#btn-a2hs-no")
      .addEventListener("click", function() {
        uiPrompt.style.display = "none";
      });
  });
}

configureInstallPrompt();
registerServiceWorker();
