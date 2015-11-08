$(function() {
		chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
			if(request.method == "downloadmp3") {
				//chrome.tabs.sendMessage(sender.tab.id, request);
				chrome.downloads.download({method: "GET", url: request.url, filename: request.filename});
			}
		});
});