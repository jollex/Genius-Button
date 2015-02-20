chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {file:"src/getText.js"}, function() {
		chrome.tabs.sendMessage(tab.id, "getText", function(response) {
			var song = getSong(response);
			//var genius_url = getGeniusURL(song);
			//chrome.tabs.create({url:genius_url});
		});
	});
});

function getSong(response) {
	console.log(response);
}