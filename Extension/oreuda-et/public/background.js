chrome.windows.onFocusChanged.addListener(function(windowId) {
    chrome.windows.get(windowId, function(window) {
      if (window.type == "normal" && window.state == "normal") {
        chrome.windows.update(window.id, {focused: true});
      }
    });
  });
  