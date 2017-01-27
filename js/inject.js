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

    // Array of background images
    var bgImages = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','bg6.jpg','bg7.jpg','bg8.jpg','bg9.jpg','bg10.jpg','bg11.jpg','bg12.jpg','bg13.jpg','bg14.jpg','bg15.jpg','bg16.jpg','bg17.jpg','bg18.jpg','bg19.jpg','bg20.jpg'];

    // Accelerate the logout session
    if(window.location.pathname.indexOf('logout') != -1) {
        window.location.pathname = "/";
    }

    // Good ol' login styling
    if(window.location.pathname == "/cp/home/displaylogin") {
        // Adds styling indicator
        $('body').addClass('login');
        // Random background from the array above
        $('body').css('background-image','url('+chrome.extension.getURL('img/portalbg/'+bgImages[Math.floor(Math.random()*bgImages.length)])+')');
        // New prompt
        $('#wrap').append('<div class="new-login"><form><img src="'+chrome.extension.getURL('img/myNEU.png')+'"><br><input name="neu-user" placeholder="Username" type="text"><br><input name="neu-pass" placeholder="Password" type="password"><br><button onclick="javascript:login();return true;" onload="clearCache()">Log in</button></form></div>');
        $('.helplinks li').each(function() {
            if($(this).html().indexOf('password.html') != -1) {
                $('.new-login form').append($(this));
            }
        });
        $('input[name=neu-user]').focus();
        $('.new-login').on('change',function() {
            var u = $('input[name=neu-user]').val();
            var p = $('input[name=neu-pass]').val();
            $('input[name=user]').val(u);
            $('input[name=pass]').val(p);
        });
        $('.new-login').on('click',function(e) {
            e.preventDefault();
        });

        $('#wrap').append('<div class="footer-links">'+$('.footerlinks').html()+'</div>');
    }

    /* Prevent 1 hour timeout, needs timeout implementation/experimentation */
    alertQueryCallback = function(){};

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
            // Replaces all HTML tags, script, and style settings
            var html = $(this).html().toLowerCase().replace(/<style(.|\s)*?style>/g,'').replace(/<script(.|\s)*?script>/g,'').replace(/<.*?>/g,'');
            if (html.indexOf(query) != -1) {
                 $(this).css('display','table');
            } else {
                $(this).css('display','none');
            };
        });
    });
    /* Resizes top bar */
    var widthOf = 1275;
    function fixHeading() {
        var heading = $('.heading');
        // Overflow detection
        if(heading.height() < heading.children().height()) {
            $('.secondary').each(function() {
                $(this).addClass('sreduce');
                // Sets max width for overflow
                if($(window).width() > widthOf) {
                    widthOf = $(window).width();
                }
                if($(this).html().indexOf('Signed') != -1) {
                    $(this).css('display','none');
                }
            });
        } else if($(window).width() > widthOf) { // Checks at overflow width
            $('.secondary').each(function() {
                $(this).removeClass('sreduce');
                if($(this).html().indexOf('Signed') != -1) {
                    $(this).css('display','block');
                }
            });
        }
    }
    /* Moves around credits on the links panel */
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
    /* Only checks window resizing on main pages */
    if(window.location.pathname.indexOf('render') != -1) {
        var timeoutId;
        $(window).on('resize',function() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function() {
                checkLove();
                fixHeading();
            }, 50 );
        })
        $(document).ready(function ($) {
            setTimeout(function() {
                checkLove();
                fixHeading();
            }, 50 );
        });
    }
    /* wl11gp pages */
    // Removes 'Search' text
    $('.headerlinksdiv2 form').each(function() {
        var html = $(this).html();
        if(html.indexOf('Search') != -1) {
            $(this).html(html.slice(7, -1));
            $('input[type=text]').attr('placeholder','Search');
        }
    });
    // Run on wl11gp
    if(window.location.pathname.indexOf('udcprod8') != -1) {
        // Adds title to content
        var title = $('.pagetitlediv').find('h2').html();
        $('.pagebodydiv').prepend('<h2>'+title+'</h2>');
        // Places icon in front of each link
        $('.submenulinktext2').each(function() {
            var html = $(this).html();
            if (html.indexOf('RETURN TO MENU') != -1) {
                $(this).html('<i title="Return to Menu" class="fa fa-reply" aria-hidden="true"></i>'+'<span>'+html+'</span>');
            } else if (html.indexOf('SITE MAP') != -1) {
                $(this).html('<i title="Site Map" class="fa fa-list" aria-hidden="true"></i>'+'<span>'+html+'</span>');
            } else if (html.indexOf('HELP') != -1) {
                $(this).html('<i title="Help" class="fa fa-life-ring" aria-hidden="true"></i>'+'<span>'+html+'</span>');
            }
        });
        if(title == "Student Detail Schedule") {
            detailSchedule();
        }
    }

    /* Fancy select boxes */
    $('select:not([multiple])').each(function() {
        var sb = this;
        $(sb).wrap('<div class="select"></div>');
        var opts = sb.options;
        var $current = $('<div class="current">' + opts[opts.selectedIndex].innerHTML.trim() + '</div>');
        $(sb).before($current);
        var optionsDiv = '<div class="options">';
        for(var i = 0; i < opts.length; i++) {
            optionsDiv += '<div class="option" data-value="' + opts[i].value + '">' + opts[i].innerHTML.trim() + '</div>';
        }
        var $options = $(optionsDiv + '</div>');
        $(sb).after($options);

        $current.click(function(e) {
            e.stopPropagation();
            var $select = $(sb).parent(".select");
            $select.toggleClass("active");
            $(".select").not($select).removeClass("active");
        });

        $options.find(".option").click(function(e) {
            e.stopPropagation();
            $current.html(this.innerHTML);
            sb.value = $(this).data("value");
            $(sb).parent(".select").removeClass("active");
        });
    });

    $('select[multiple]').each(function() {
        var sb = this;
        $(sb).wrap('<div class="select" style="width: 300px;"></div>');
        var opts = sb.options;
        var $current = $('<div class="current">' + opts[0].innerHTML.trim() + '</div>');
        $(sb).before($current);
        var optionsDiv = '<div class="options" style="width: 300px;">';
        var $search = $('<input type="text" placeholder="Search... (Coming soon!)" class="search" disabled>');
        for(var i = 0; i < opts.length; i++) {
            optionsDiv += '<div class="option' + (opts[i].selected ? " selected" : "") + '" data-value="' + opts[i].value + '">' + opts[i].innerHTML.trim() + '</div>';
        }
        var $options = $(optionsDiv + '</div>');
        $options.prepend($search);
        $(sb).after($options);

        $current.click(function(e) {
            e.stopPropagation();
            var $select = $(sb).parent(".select");
            $select.toggleClass("active");
            $(".select").not($select).removeClass("active");
        });

        $search.click(function(e) {
            e.stopPropagation();
        });

        $options.find(".option").click(function(e) {
            e.stopPropagation();
            var selected = $(sb).val();
			if(!selected) {selected = [];}
            var value = $(this).data("value").toString();
            if($(this).hasClass("selected")) {
				selected.splice(selected.indexOf(value), 1);
            }
            else {
				if(value === "%") {
					$options.find(".option.selected").removeClass("selected");
					selected = ["%"];
				}
				else {
					var all = selected.indexOf("%");
					if(all !== -1) {
						$options.find('[data-value="%"].selected').removeClass("selected");
						selected.splice(all, 1);
					}
					selected.push(value);
				}
            }
            $(this).toggleClass("selected");
            $(sb).val(selected);
			switch(selected.length) {
				case 0:
	            	$current.html("Select an item");
					break;
				case 1:
	            	$current.html($options.find('[data-value="' + selected[0] + '"]').html());
					break;
				default:
	            	$current.html(selected.length + " items selected");
					break;
			}
        });
    });

    $(document).click(function() {
        $(".select").removeClass("active");
    });

    /* My Schedule Code */
    // Runs specifically on Student Detail Schedule
    function detailSchedule() {
        console.log('ok');
    }

    // Sets image background of schedule item based on building name string
    function returnBuilding(image) {
        var bg = $('.building-image');
        if(image.indexOf('Behrakis') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/behrakis.jpg'));
        } else if(image.indexOf('West Village H') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/wvh.jpg'));
        } else if(image.indexOf('West Village G') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/wvg.jpg'));
        } else if(image.indexOf('West Village F') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/wvf.jpg'));
        } else if(image.indexOf('International Village') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/iv.jpg'));
        } else if(image.indexOf('Ryder Hall') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/ryder.jpg'));
        } else if(image.indexOf('Forsyth') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/forsyth.jpg'));
        } else if(image.indexOf('Richards') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/richards.jpg'));
        } else if(image.indexOf('Ell') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/ell.jpg'));
        } else if(image.indexOf('Dodge') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/dodge.jpg'));
        } else if(image.indexOf('Hayden') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/hayden.jpg'));
        } else if(image.indexOf('Hurtig') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/hurtig.jpg'));
        } else if(image.indexOf('Mugar') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/mugar.jpg'));
        } else if(image.indexOf('Robinson') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/robinson.jpg'));
        } else if(image.indexOf('Snell Library') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/library.jpg'));
        } else if(image.indexOf('Lake') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/lake.jpg'));
        } else if(image.indexOf('Kariotis') != -1) {
            bg.css('background-image',chrome.extension.getURL('img/buildings/kariotis.jpg'));
        } else {
            bg.css('background-image',chrome.extension.getURL('img/buildings/campus.jpg'));
        }
    }
}
