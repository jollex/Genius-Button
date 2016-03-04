chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message == "getText") {
		sendResponse(getSongTitle().replace(/[^\d\w\s]|_/g, ""));
	}
});

function getSongTitle() {
	var url = document.URL;

	// YouTube case
	if (url.length >= 23 && url.substring(0, 23) == "https://www.youtube.com") {
		// TODO: Make sure they're watching a video.
		return document.getElementById("eow-title").innerHTML;
	// Soundcloud case
	} else if (url.length >= 22 && url.substring(0, 22) == "https://soundcloud.com") {
		var classResultArray = document.getElementsByClassName("playbackSoundBadge__title sc-truncate");
		if (classResultArray.length > 0) {
			return classResultArray[0].title;
		} else {
			var response = prompt("[Genius Button] A song isn't playing", "Please enter song and artist here");
			if (response != null) {
				return response;
			}
		}
	// Spotify case
	//} else if (url.length >= 24 && url.substring(0, 24) == "https://play.spotify.com") {
	//	var nameHeader = document.getElementById("track-name");
	//	console.log(nameHeader);
	} else {
		var response = prompt("[Genius Button] This website is not supported", "Please enter song and artist here");
		if (response != null) {
   			return response;
		}
	}
}
