chrome.runtime.onInstalled.addListener(() => {
  // Service worker registration code here
});

chrome.action.onClicked.addListener(async () => {
  try {
    await chrome.browsingData.remove({
      since: Date.now() - 3600000, // One hour ago
    }, {
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
    });

    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];
      if (tab) {
        await displayFeedback(tab.id, "Browsing data removed for the last hour");
      } else {
        console.error("Unable to find active tab");
      }
    });
  } catch (error) {
    console.error("An error occurred while removing browsing data:", error);
  }
});

async function displayFeedback(tabId, message) {
  await chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: (msg) => {
      const feedbackDiv = document.createElement("div");
      feedbackDiv.textContent = msg;
      feedbackDiv.style.backgroundColor = "#4caf50";
      feedbackDiv.style.color = "#fff";
      feedbackDiv.style.padding = "8px";
      feedbackDiv.style.position = "fixed";
      feedbackDiv.style.top = "16px";
      feedbackDiv.style.right = "16px";
      feedbackDiv.style.zIndex = "9999";
      document.body.appendChild(feedbackDiv);

      setTimeout(() => {
        feedbackDiv.remove();
      }, 3000);
    },
    args: [message],
  });
}
