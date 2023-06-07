chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "displayFeedback") {
    var feedbackMessage = document.getElementById("feedbackMessage");
    feedbackMessage.textContent = request.message;
  }
});

chrome.runtime.sendMessage({ action: "deleteLastHour" });
