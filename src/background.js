chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {file:"src/getText.js"}, function() {
		chrome.tabs.sendMessage(tab.id, "getText", function(response) {
			var searchResponse = getSearchResponse(response);
			var genius_url = getGeniusURL(searchResponse);
			//chrome.tabs.create({url:genius_url});
		});
	});
});

function getSearchResponse(songTitle) {
	// Base search URL
	var baseURL = "http://genius.com/search?q=";

	// Get the search URL
	var words = songTitle.split(" ");
	var requestURL = baseURL + words.join("+");

	var HttpClient = function() {
    	this.get = function(aUrl, aCallback) {
        	var anHttpRequest = new XMLHttpRequest();
        	anHttpRequest.onreadystatechange = function() { 
            	if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                	aCallback(anHttpRequest.responseText);
        	}

        	anHttpRequest.open("GET", aUrl, true);            
        	anHttpRequest.send(null);
    	}
	}

	aClient = new HttpClient();
	aClient.get(requestURL, function(response) {
		return getGeniusURL(response);
	});
}

function getGeniusURL(response) {
	console.log(response);
}