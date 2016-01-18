chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(tab.id, {file:"src/getText.js"}, function() {
		chrome.tabs.sendMessage(tab.id, "getText", function(response) {
            getGeniusURL(response, function(genius_url) {
                chrome.tabs.create({url:genius_url});
            });
		});
	});
});

function getGeniusURL(songTitle, cb) {
	var baseURL = "http://genius.com/search?q=";
	var requestURL = baseURL + encodeURI(songTitle.trim().split(" ").join("+"));

    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) {
            var html = anHttpRequest.responseText;
            var url = $(html).find('.search_result').first().find('a').attr('href');
            cb(url);
        }
    }
    anHttpRequest.open("GET", requestURL, true);
    anHttpRequest.send(null);
}