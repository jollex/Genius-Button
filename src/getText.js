chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message == "getText") {
		sendResponse(document.body.innerHTML);
	}
});