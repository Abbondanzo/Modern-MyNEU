/* Inject stylesheet on top of current stylesheet. Hope that god finds a way to inject faster */
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('css/custom.css');
(document.head||document.documentElement).appendChild(style);

/* Modify Tab data from a table to a list */
$('#tabs_tda').each(function() {
    //.replace(/<tr/g,'<ul').replace(/<\/tr>/g,'</ul>').replace(/<td/g,'<li').replace(/<\/td>/g,'</li>')
    var tabs = $(this).html().replace(/<tbody>/g,'<div>');
    var regex = tabs.replace(/<\/tbody>/g,'</div>').replace(/<tr>/g,'<ul>').replace(/<\/tr>/g,'</ul>').replace(/<td>/g,'<li>').replace(/<\/td>/g,'</li>').replace(/<tr/g,'<ul').replace(/<td/g,'<li');
    $(this).html('<div class="nav">'+regex+'</div>');
});
/* Hide that crappy image at top */
$('.bg1').closest('table').html('<div class="mylogo">myNEU</div>');
$('#welcome').closest('table').each(function() {
    var tabs = $(this).html().replace(/<tbody>/g,'<div>').replace(/Welcome/g, 'Signed in as').replace(/You are currently logged in./g, '');
    var regex = tabs.replace(/<\/tbody>/g,'</div>').replace(/<br>/g,'').replace(/<tr>/g,'<ul>').replace(/<\/tr>/g,'</ul>').replace(/<td>/g,'<li>').replace(/<\/td>/g,'</li>').replace(/<tr/g,'<ul').replace(/<td/g,'<li');
    $(this).html('<div class="heading">'+regex+'</div>');
})

$('.uportal-label').each(function() {
    if($(this).html().indexOf('logout') != -1) {
        $(this).addClass('logout');
    }
});

$('#welcome').parent().addClass('user');
