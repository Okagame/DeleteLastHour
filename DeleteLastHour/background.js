chrome.action.onClicked.addListener(async () => {
  try {
    await chrome.browsingData.remove(
      {
        since: Date.now() - 3600000, // One hour ago
      },
      {
        cache: true,
        cookies: true,
        downloads: true,
        formData: true,
        history: true,
        indexedDB: true,
        localStorage: true,
        pluginData: true,
        passwords: true,
        serviceWorkers: true,
        webSQL: true,
      }
    );

    chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
      const tabId = tabs[0]?.id;
      if (tabId) {
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: displayFeedback,
        });
      } else {
        displayError("Unable to find active tab");
      }
    });
  } catch (error) {
    displayError("An error occurred while removing browsing data");
    console.error("An error occurred while removing browsing data:", error);
  }
});

function displayFeedback() {
  const feedbackDiv = document.createElement("div");
  feedbackDiv.textContent = "Browsing data removed for the last hour";
  feedbackDiv.style.backgroundColor = "#4caf50";
  feedbackDiv.style.color = "#fff";
  feedbackDiv.style.padding = "8px";
  feedbackDiv.style.position = "fixed";
  feedbackDiv.style.top = "16px";
  feedbackDiv.style.right = "16px";
  feedbackDiv.style.zIndex = "9999";
  document.body.appendChild(feedbackDiv);

  setTimeout(function () {
    feedbackDiv.remove();
  }, 3000);
}

function displayError(errorMessage) {
  const errorDiv = document.createElement("div");
  errorDiv.textContent = errorMessage;
  errorDiv.style.backgroundColor = "#f44336";
  errorDiv.style.color = "#fff";
  errorDiv.style.padding = "8px";
  errorDiv.style.position = "fixed";
  errorDiv.style.top = "16px";
  errorDiv.style.right = "16px";
  errorDiv.style.zIndex = "9999";
  document.body.appendChild(errorDiv);

  setTimeout(function () {
    errorDiv.remove();
  }, 3000);
}
