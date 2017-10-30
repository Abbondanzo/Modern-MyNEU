/**
 * Saves options to chrome.storage
 * @param {String} option 
 * @param {*} value
 */
function saveOptions(option, value) {
    var storageOption = {};
    storageOption[option] = value;
    chrome.storage.sync.set(storageOption, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

/**
 * Restores select box and checkbox state using the preferences stored in chrome.storage.
 */
function restoreOptions() {
    chrome.storage.sync.get({
        enabled: 'true',
        customColor: '#EA1F23',
        defaultPage: 'central'
    }, function (items) {
        var enab = document.getElementById('enable');
        enab.value = items.enabled;
        if (JSON.parse(enab.value)) {
            enab.textContent = 'On';
        } else {
            enab.textContent = 'Off';
        }
        var cpicker = document.querySelector('.jscolor');
        // setAllColors(items.customColor);
        cpicker.value = items.customColor;
        cpicker.style.backgroundColor = items.customColor;
        document.querySelector('#default-page').value = items.defaultPage;
    });
}

/**
 * Load options upon start
 */
document.addEventListener('DOMContentLoaded', restoreOptions);

/**
 * Event listener for 'Toggle Plugin On/Off'
 */
document.getElementById('enable').addEventListener('click', function () {
    updateToggle();
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        chrome.tabs.update(tabs[0].id, {
            url: tabs[0].url
        });
    });
});

/**
 * Update Chrome storage when extension is toggled on/off
 */
function updateToggle() {
    var enab = document.getElementById('enable');
    if (JSON.parse(enab.value)) {
        enab.value = 'false';
        enab.textContent = 'Off';
    } else {
        enab.value = 'true';
        enab.textContent = 'On';
        chrome.tabs.executeScript(null, {
            file: 'js/script.min.js'
        });
    }
    var enabled = enab.value;
    saveOptions('enabled', enabled);
}

// Sets default colors
/*function setAllColors(jscolor) {
    document.querySelector('.title-head').style.backgroundColor = '#' + jscolor;
    document.querySelector('#enable[value=true]').style.backgroundColor = '#' + jscolor;
}*/

// Color picker
/*function update(jscolor) {
    // 'jscolor' instance can be used as a string
    setAllColors(jscolor);
    chrome.storage.sync.set({
        customColor: '' + jscolor
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
    });
}
*/

/**
 * Add event listeners for data-based options
 * @param {HTMLElement} element 
 * @param {String} eventType 
 * @param {String} option 
 */
function buildEventListener(element, eventType, option) {
    document.querySelector(element).addEventListener(eventType, function (event) {
        saveOptions(option, event.target.value);
    })
}

buildEventListener('#default-page', 'change', 'defaultPage');
buildEventListener('.jscolor', 'keyup', 'customColor');