/* Inject stylesheet on top of current stylesheet. Hope that god finds a way to inject faster */
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.id = 'customcss';
style.href = chrome.extension.getURL('themes/modern/custom.css');
chrome.storage.sync.get({
    enabled: "true"
}, function(items) {
    console.log(items.enabled);
    if (items.enabled == "false") {
        $("link[href*='custom.css']").remove();
        style.href = chrome.extension.getURL('css/default.css');
        (document.head||document.documentElement).appendChild(style);
    } else {
        (document.head||document.documentElement).appendChild(style);
    }
});
