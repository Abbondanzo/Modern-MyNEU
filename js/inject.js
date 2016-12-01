/* Inject stylesheet on top of current stylesheet. Hope that god finds a way to inject faster */
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.id = 'customcss';
style.href = chrome.extension.getURL('themes/modern/custom.css');
chrome.storage.sync.get({
    enabled: "true"
}, function(items) {
    if (items.enabled == "false") {
        $("link[href*='custom.css']").remove();
        style.href = chrome.extension.getURL('css/default.css');
        (document.head||document.documentElement).appendChild(style);
    } else {
        (document.head||document.documentElement).appendChild(style);
        checkScript();
    }
});

function checkScript() {
    modernTheme();
}

function modernTheme() {
    // This is currently causing conflict with iframe loading
    /*$("iframe").each(function() {
        try {
            $(this).replaceWith($(this).contents().find("body").html());
        } catch (e) {
            console.log(e);
        }
    }); */

    /* Modify Tab data from a table to a list */
    $('#tabs_tda').each(function() {
        //.replace(/<tr/g,'<ul').replace(/<\/tr>/g,'</ul>').replace(/<td/g,'<li').replace(/<\/td>/g,'</li>')
        var tabs = $(this).html().replace(/<tbody>/g,'<div>');
        var regex = tabs.replace(/<\/tbody>/g,'</div>').replace(/<tr>/g,'<ul>').replace(/<\/tr>/g,'</ul>').replace(/<td>/g,'<li>').replace(/<\/td>/g,'</li>').replace(/<tr/g,'<ul').replace(/<td/g,'<li');
        $(this).html('<div class="nav">'+regex+'</div><div class="credits">Made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://github.com/Abbondanzo/Modern-MyNEU">Peter Abbondanzo</a></div>');
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
                $(this).closest('ul').append('<li class="search"><input type="type" id="searchQuery" placeholder="Search"></input></li>');
                break;
            case "logout":
                $(this).html(html+' <i class="fa fa-sign-out" aria-hidden="true"></i>');
                break;
            default:
                break;
        }
    });
    $('.nav div ul li').each(function() {
        var html = $(this).children().children().html();
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
    /* Replaces expand, minimize, and maximize icons */
    $('.border img').each(function() {
        var title = $(this).attr('title');
        var src = $(this).attr('src');
        if(title != null) {
            if (title.indexOf('Expand') != -1) {
                $(this).parent().html('<i title="'+title+'" class="fa fa-expand" aria-hidden="true"></i>');
            } else if (title.indexOf('Maximize') != -1) {
                $(this).parent().html('<i title="'+title+'" class="fa fa-caret-square-o-right" aria-hidden="true"></i>');
            } else if (title.indexOf('Minimize') != -1) {
                $(this).parent().html('<i title="'+title+'" class="fa fa-caret-square-o-down" aria-hidden="true"></i>');
            }
        } else if (src.indexOf('chan_remove_na') != -1) {
            $(this).css('display','none');
        }
    });
    /* Search regex */
    $('#searchQuery').on('keypress change keydown paste input', function() {
        var query = $(this).val().toLowerCase();
        $('.uportal-background-content td table').each(function() {
            var html = $(this).html().toLowerCase().replace(/<.*?>/g,'');
            if (html.indexOf(query) != -1) {
                 $(this).css('display','table');
            } else {
                $(this).css('display','none');
            };
        });
    });
    function checkLove() {
        var offset = $('.nav').offset().top;
        var height = $('.nav').height();
        var love = $('.credits').offset().top;
        if (offset+height+40>=love) {
            $('.credits').css('opacity',0);
        } else {
            $('.credits').css('opacity',0.2);
        }
    };
    var timeoutId;
    $(window).on('resize',function() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            checkLove();
        }, 50 );
    })
    $(document).ready(function ($) {
        setTimeout(function() {
            checkLove();
        }, 50 );
    });

}
