// Future of custom settings
updateMessage();

function updateMessage() {
	chrome.runtime.onInstalled.addListener(function (details) {
		if (details.reason === 'update') {
			chrome.tabs.create({'url': 'goodbye.html'}, function(window) {
			});
		}
	});
	chrome.storage.sync.set({'enabled': false}, function () {
        console.log('Chrome enabled setting reset');
    });
}