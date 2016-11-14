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
$('.bg1').closest('table').html('<div class="mylogo"><img src="'+chrome.extension.getURL('img/logo.png')+'"></div>');
$('#welcome').closest('table').each(function() {
    var tabs = $(this).html().replace(/<tbody>/g,'<div>').replace(/Welcome/g, 'Signed in as').replace(/You are currently logged in./g, '').replace(/&nbsp;/g, '');
    var regex = tabs.replace(/<\/tbody>/g,'</div>').replace(/<br>/g,'').replace(/<tr>/g,'<ul>').replace(/<\/tr>/g,'</ul>').replace(/<td>/g,'<li>').replace(/<\/td>/g,'</li>').replace(/<tr/g,'<ul').replace(/<td/g,'<li');
    $(this).html('<div class="heading">'+regex+'</div>');
    $(this).css('height',84+'px');
});
/* Add logout class to logout button and adds secondary class to outbound links on top */
$('.uportal-label').each(function() {
    if($(this).html().indexOf('logout') != -1) {
        $(this).addClass('logout');
    } else {
        $(this).addClass('secondary');
    }
});
/* Adds user class to logged in user */
$('#welcome').parent().addClass('user');
/* Adds icons */
$('.uportal-label').each(function() {
    var html = $(this).html();
    switch (html) {
        case "mail":
            $(this).html('<i class="fa fa-envelope" aria-hidden="true"></i> '+html);
            break;
        case "my profile":
            $(this).html('<i class="fa fa-cog" aria-hidden="true"></i> '+html);
            break;
        case "NUPay":
            $(this).html('<i class="fa fa-shopping-basket" aria-hidden="true"></i> '+html);
            break;
        case "help":
            $(this).html('<i class="fa fa-question-circle" aria-hidden="true"></i> '+html);
            break;
        case "logout":
            $(this).html(html+' <i class="fa fa-sign-out" aria-hidden="true"></i>');
            break;
        default:
            break;
    }
});
$('.nav').children('div').children('ul').children('li').each(function() {
    var html = $(this).children().children().html();
    console.log(html);
    if (html.indexOf('myNEU Central') != -1) {
        $(this).children().children().html('<i class="fa fa-home" aria-hidden="true"></i> '+html);
    } else if (html.indexOf('Self-Service') != -1) {
        $(this).children().children().html('<i class="fa fa-navicon" aria-hidden="true"></i> '+html);
    } else if (html.indexOf('Community') != -1) {
        $(this).children().children().html('<i class="fa fa-users" aria-hidden="true"></i> '+html);
    } else if (html.indexOf('Experiential Learning/Co-op') != -1) {
        $(this).children().children().html('<i class="fa fa-graduation-cap" aria-hidden="true"></i> '+html);
    } else if (html.indexOf('Career Development') != -1) {
        $(this).children().children().html('<i class="fa fa-briefcase" aria-hidden="true"></i> '+html);
    } else if (html.indexOf('InfoChannels') != -1) {
        $(this).children().children().html('<i class="fa fa-info-circle" aria-hidden="true"></i> '+html);
    }
});
