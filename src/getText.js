chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message == "getText") {
		var url = document.URL;
		// YouTube case
		if (url.length >= 23 && document.URL.substring(0, 23) == "https://www.youtube.com") {
			sendResponse(document.getElementById("eow-title").innerHTML);
		} else {
			alert("This website is not supported");
		}
	}
});