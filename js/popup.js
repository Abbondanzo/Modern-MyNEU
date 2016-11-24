// Saves options to chrome.storage
function save_options() {
    var enab = document.getElementById('enable');
    if (enab.value == "false") {
        enab.value = "true";
        enab.textContent = "On";
        chrome.tabs.executeScript(null, {file: "js/script.min.js"});
    } else {
        enab.value = "false";
        enab.textContent = "Off";
    }
    var enabled = document.getElementById('enable').value;
    chrome.storage.sync.set({
        enabled: enabled
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        enabled: "true"
    }, function(items) {
        var enab = document.getElementById('enable');
        enab.value = items.enabled;
        if (enab.value == "false") {
            enab.textContent = 'Off'
        } else {
            enab.textContent = 'On'
        }
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('enable').addEventListener('click',function() {
    save_options();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
});
