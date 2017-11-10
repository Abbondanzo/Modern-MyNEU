/* Inject stylesheet on top of current stylesheet. Hope that god finds a way to inject faster */
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.id = 'customcss';
style.href = chrome.extension.getURL('themes/modern/custom.css');

var defaultPage;

// Load extension settings
chrome.storage.sync.get({
    enabled: 'false',
    customColor: 'ea1f23',
    defaultPage: 'central'
}, function (items) {
    if (!JSON.parse(items.enabled)) {
        $('link[href*="custom.css"]').remove();
        style.href = chrome.extension.getURL('css/default.css');
        (document.head || document.documentElement).appendChild(style);
    } else {
        defaultPage = items.defaultPage;
        checkScript();
        (document.head || document.documentElement).appendChild(style);
        // updateAllColors(items.customColor); for future update
    }
});

function checkScript() {
    var greeting = 'Thank you for using Modern MyNEU. If you experience any issues or would like to dig into the code, head on over to https://github.com/Abbondanzo/Modern-MyNEU.';
    console.info(greeting);
    checkPage(modernTheme);
}

/**
 * @param {String} name 
 * @param {String|Boolean} value 
 * @param {Number} hours 
 */
function createCookie(name, value, hours) {
    var expires = '';
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

/**
 * @param {String} name
 * @returns {String|null}
 */
function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * @param {String} name 
 */
function eraseCookie(name) {
    createCookie(name, '', -1);
}

/**
 * Handles cookie and page checking to perform page redirect if requested
 * @param {Function} callback 
 */
function checkPage(callback) {
    var loggedIn = readCookie('JSESSIONID'),
        onLoginPage = window.location.href.indexOf('cp/home/displaylogin') !== -1,
        redirected = readCookie('singlePageRedirect');
    if (!loggedIn || onLoginPage) {
        createCookie('singlePageRedirect', false, 1);
    } else if (!JSON.parse(redirected)) {
        setPage();
    }
    callback();
}

/**
 * Parses DOM for pagelinks that match the default page set in chrome.storage
 */
function setPage() {
    var html = document.querySelector('html');
    html.style.opacity = 0;
    if (defaultPage !== 'central') {
        var lookFor;
        switch (defaultPage) {
            case 'selfservice':
                lookFor = 'self-service';
                break;
            case 'community':
                lookFor = 'community';
                break;
            case 'coop':
                lookFor = 'experiential learning/co-op';
                break;
            case 'career':
                lookFor = 'career development';
                break;
            case 'info':
                lookFor = 'infochannels';
                break;
            default:
                lookFor = null;
        }

        $('#tabs_tda td').each(function () {
            var link = $(this).find('a');
            var url = window.location.origin + '/' + link.attr('href');
            var sameURL = url === window.location.href;
            if (link.text().toLowerCase() === lookFor && !sameURL) {
                createCookie('singlePageRedirect', true, 1);
                window.location.href = url;
            }
        });
    } else {
        createCookie('singlePageRedirect', true, 1);
    }
    setTimeout(function () {
        html.style.opacity = 1;
    }, 2000);
}
/*function updateAllColors(color) {
    var hColor = '#' + color;
    $('.uportal-head14-bold').each(function() {
        $(this).css('color',hColor)
    })
    $('.heading a .secondary .fa').each(function() {
        $(this).css('color',hColor)
    })
    $('.mylogo').css('background-color',hColor)
    $('div.tabon a').css('box-shadow','inset 8px 0 0 0 ' + hColor)
}*/

/**
 * Performs all style changes and DOM manipulations that build the modern theme
 * For those of you reading this code, this was my first JS Chrome extension and most certainly needs a rebuild
 */
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
    var bgImages = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'bg6.jpg', 'bg7.jpg', 'bg8.jpg', 'bg9.jpg', 'bg10.jpg', 'bg11.jpg', 'bg12.jpg', 'bg13.jpg', 'bg14.jpg', 'bg15.jpg', 'bg16.jpg', 'bg17.jpg', 'bg18.jpg', 'bg19.jpg', 'bg20.jpg'];

    // Accelerate the logout session
    if (window.location.pathname.indexOf('logout') !== -1) {
        window.location.pathname = "/";
    }

    // Good ol' login styling
    if (window.location.pathname === "/cp/home/displaylogin") {
        // Adds styling indicator
        $('body').addClass('login');
        // Random background from the array above
        $('body').css('background-image', 'url(' + chrome.extension.getURL('img/portalbg/' + bgImages[Math.floor(Math.random() * bgImages.length)]) + ')');
        // New prompt
        $('#wrap').append('<div class="new-login"><form><img src="' + chrome.extension.getURL('img/myNEU.png') + '"><br><input name="neu-user" placeholder="Username" type="text"><br><input name="neu-pass" placeholder="Password" type="password"><br><button onclick="javascript:login();return true;" onload="clearCache()">Log in</button></form></div>');
        $('.helplinks li').each(function () {
            if ($(this).html().indexOf('password.html') !== -1) {
                $('.new-login form').append($(this));
            }
        });
        $('input[name=neu-user]').focus();
        $('.new-login').on('change', function () {
            var u = $('input[name=neu-user]').val();
            var p = $('input[name=neu-pass]').val();
            $('input[name=user]').val(u);
            $('input[name=pass]').val(p);
        });
        $('.new-login').on('click', function (e) {
            e.preventDefault();
        });
        $('.new-login form button').on('click', function (e) {
            $(this).html('<div class="spinner"><div class="rect1"></div>&nbsp;<div class="rect2"></div>&nbsp;<div class="rect3"></div>&nbsp;<div class="rect4"></div>&nbsp;<div class="rect5"></div></div>');
        });

        $('#wrap').append('<div class="footer-links">' + $('.footerlinks').html() + '</div>');
    }

    /* Modify Tab data from a table to a list */
    $('#tabs_tda').each(function () {
        //.replace(/<tr/g,'<ul').replace(/<\/tr>/g,'</ul>').replace(/<td/g,'<li').replace(/<\/td>/g,'</li>')
        var tabs = $(this).html().replace(/<tbody>/g, '<div>');
        var regex = replaceTable(tabs);
        $(this).html('<div class="nav">' + regex + '</div><div class="credits">Made with <i class="fa fa-heart" aria-hidden="true"></i> by <a href="https://github.com/Abbondanzo/Modern-MyNEU">Peter Abbondanzo</a></div>');
    });
    /* Hide that crappy image at top */
    $('.bg1').closest('table').html('<div class="mylogo"><img src="' + chrome.extension.getURL('img/logo.png') + '"></div>');
    $('#welcome').closest('table').each(function () {
        var tabs = $(this).html().replace(/<tbody>/g, '<div>').replace(/Welcome/g, 'Signed in as').replace(/You are currently logged in./g, '').replace(/&nbsp;/g, '');
        var regex = replaceTable(tabs);
        $(this).html('<div class="heading">' + regex + '</div>');
        $(this).css('height', 84 + 'px');
    });

    // Turns the table of a given element into a proper div/list
    function replaceTable(html) {
        return html.replace(/<\/tbody>/g, '</div>').replace(/<br>/g, '').replace(/<tr>/g, '<ul>').replace(/<\/tr>/g, '</ul>').replace(/<td>/g, '<li>').replace(/<\/td>/g, '</li>').replace(/<tr/g, '<ul').replace(/<td/g, '<li');
    }

    /* Add logout class to logout button and adds secondary class to outbound links on top */
    $('.uportal-label').each(function () {
        if ($(this).html().indexOf('logout') !== -1) {
            $(this).addClass('logout');
        } else {
            $(this).addClass('secondary');
        }
    });
    /* Adds user class to logged in user */
    $('#welcome').parent().addClass('user');
    /* Adds icons */
    $('.uportal-label').each(function () {
        var html = $(this).html();
        switch (html) {
            case "mail":
                $(this).html('<i class="fa fa-envelope" aria-hidden="true"></i> ' + html);
                break;
            case "my profile":
                $(this).html('<i class="fa fa-cog" aria-hidden="true"></i> ' + html);
                break;
            case "NUPay":
                $(this).html('<i class="fa fa-shopping-basket" aria-hidden="true"></i> ' + html);
                break;
            case "help":
                $(this).html('<i class="fa fa-question-circle" aria-hidden="true"></i> ' + html);
                $(this).closest('ul').append('<li class="search"><input type="type" id="searchQuery" placeholder="Search"></input></li>');
                break;
            case "logout":
                $(this).html(html + ' <i class="fa fa-sign-out" aria-hidden="true"></i>');
                break;
            default:
                break;
        }
    });
    /* Adds icons to sidebar menu */
    $('.nav div ul li').each(function () {
        var html = $(this).children().children().html();
        var faIcon = 'fa-file-text';
        var pages = {
            'myNEU Central': 'fa-home',
            'Self-Service': 'fa-navicon',
            'Community': 'fa-users',
            'Experiential Learning/Co-op': 'fa-graduation-cap',
            'Career Development': 'fa-briefcase',
            'InfoChannels': 'fa-info-circle'
        };

        for (var key in pages) {
            if (html.indexOf(key) !== -1) {
                faIcon = pages[key];
            }
        }

        $(this).children().children().html('<i class="fa ' + faIcon + '" aria-hidden="true"></i> ' + html);
    });
    /* Replaces expand, minimize, and maximize icons */
    $('.border img').each(function () {
        var title = $(this).attr('title');
        var src = $(this).attr('src');
        if (title) {
            if (title.indexOf('Expand') !== -1) {
                $(this).parent().html('<i title="' + title + '" class="fa fa-expand" aria-hidden="true"></i>');
            } else if (title.indexOf('Maximize') !== -1) {
                $(this).parent().html('<i title="' + title + '" class="fa fa-caret-square-o-right" aria-hidden="true"></i>');
            } else if (title.indexOf('Minimize') !== -1) {
                $(this).parent().html('<i title="' + title + '" class="fa fa-caret-square-o-down" aria-hidden="true"></i>');
            }
        } else if (src.indexOf('chan_remove_na') !== -1) {
            $(this).css('display', 'none');
        }
    });
    /* Search regex */
    $('#searchQuery').on('keypress change keydown paste input', function () {
        var query = $(this).val().toLowerCase();
        $('.uportal-background-content td table').each(function () {
            // Replaces all HTML tags, script, and style settings
            var html = $(this).html().toLowerCase().replace(/<style(.|\s)*?style>/g, '').replace(/<script(.|\s)*?script>/g, '').replace(/<.*?>/g, '');
            if (html.indexOf(query) !== -1) {
                $(this).css('display', 'table');
            } else {
                $(this).css('display', 'none');
            }
        });
    });
    /* Resizes top bar */
    var widthOf = 1275;

    function fixHeading() {
        var heading = $('.heading');

        // Overflow detection
        if (heading.height() < heading.children().height()) {
            $('.secondary').each(function () {
                $(this).addClass('sreduce');
                // Sets max width for overflow
                if ($(window).width() > widthOf) {
                    widthOf = $(window).width();
                }
            });
        } else if ($(window).width() > widthOf) { // Checks at overflow width
            $('.secondary').each(function () {
                $(this).removeClass('sreduce');
            });
        }
    }
    /* Moves around credits on the links panel */
    function checkLove() {
        var offset = $('.nav').offset().top;
        var height = $('.nav').height();
        var love = $('.credits').offset().top;
        if (offset + height + 40 >= love) {
            $('.credits').css('opacity', 0);
        } else {
            $('.credits').css('opacity', 0.2);
        }
    }
    /* Only checks window resizing on main pages */
    if (window.location.pathname.indexOf('render') !== -1) {
        var timeoutId;
        $(window).on('resize', function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                checkLove();
                fixHeading();
            }, 50);
        })
        $(document).ready(function ($) {
            setTimeout(function () {
                checkLove();
                fixHeading();
            }, 50);
        });
    }
    /* wl11gp pages */
    // Removes 'Search' text
    $('.headerlinksdiv2 form').each(function () {
        var html = $(this).html();
        if (html.indexOf('Search') !== -1) {
            $(this).html(html.slice(7, -1));
            $('input[type=text]').attr('placeholder', 'Search');
        }
    });
    // Run on wl11gp
    var windowLoc = window.location.pathname;
    if (windowLoc.indexOf('udcprod8') !== -1) {
        // Adds title to content
        var title = $('.pagetitlediv').find('h2').html();
        $('.pagebodydiv').prepend('<h2>' + title + '</h2>');
        // Places icon in front of each link
        $('.submenulinktext2').each(function () {
            var html = $(this).html();
            if (html.indexOf('RETURN TO MENU') !== -1) {
                $(this).html('<i title="Return to Menu" class="fa fa-reply" aria-hidden="true"></i><span>' + html + '</span>');
            } else if (html.indexOf('SITE MAP') !== -1) {
                $(this).html('<i title="Site Map" class="fa fa-list" aria-hidden="true"></i><span>' + html + '</span>');
            } else if (html.indexOf('HELP') !== -1) {
                $(this).html('<i title="Help" class="fa fa-life-ring" aria-hidden="true"></i><span>' + html + '</span>');
            }
        });
        if (title === "Student Detail Schedule") {
            detailSchedule();
            $('.more-details').on('click', function () {
                var topParent = $(this).closest('.schedule-item');
                if (topParent.hasClass('active-schedule')) {
                    topParent.removeClass('active-schedule');
                    $(this).html('more...');
                } else {
                    topParent.addClass('active-schedule');
                    $(this).html('less...');
                }
            });
        }
        // Runs on Dynamic schedule
        if (windowLoc.indexOf('NEUCLSS') !== -1) {
            $('body').css('background-image', 'none');
            $('.pageheaderdiv1').css('margin-top', 0);
        }
        // Runs on Add/Drop classes page
        if (windowLoc.indexOf('P_Regs') !== -1 || windowLoc.indexOf('bwskfreg.P_AltPin') !== -1) {
            $('.datadisplaytable').each(function () {
                $(this).addClass('resize-table');
            })
        }
    }
    /* Fix for Transcript table */
    $('.ddlabel').each(function () {
        var html = $(this).html();
        if (html.indexOf('TransferFrom') !== -1) {
            $(this).attr('colspan', '3');
            $(this).next().css('border', 0);
            $(this).next().attr('colspan', '9');
        } else if (html.indexOf('Academic Standing') !== -1) {
            $(this).next().css('border', 0);
        }
    })
    /* Fancy select boxes for single-selection boxes */
    $('select:not([multiple])').each(function () {
        var sb = this;
        $(sb).wrap('<div class="select"></div>');
        var opts = sb.options;
        var $current = $('<div class="current">' + opts[opts.selectedIndex].innerHTML.trim() + '</div>');
        $(sb).before($current);
        var optionsDiv = '<div class="options">';
        for (var i = 0; i < opts.length; i++) {
            optionsDiv += '<div class="option" data-value="' + opts[i].value + '">' + opts[i].innerHTML.trim() + '</div>';
        }
        var $options = $(optionsDiv + '</div>');
        $(sb).after($options);

        currentClick(sb, $current);

        $options.find(".option").click(function (e) {
            e.stopPropagation();
            $current.html(this.innerHTML);
            sb.value = $(this).data("value");
            $(sb).parent(".select").removeClass("active");
        });
    });
    /* Selection listener */
    function currentClick(sb, current) {
        current.click(function (e) {
            e.stopPropagation();
            var $select = $(sb).parent(".select");
            $select.toggleClass("active");
            $(".select").not($select).removeClass("active");
        });
    }
    /* Selection events for multiple-select boxes */
    $('select[multiple]').each(function () {
        var sb = this;
        $(sb).wrap('<div class="select" style="width: 300px;"></div>');
        var opts = sb.options;
        var $current = $('<div class="current">' + opts[0].innerHTML.trim() + '</div>');
        $(sb).before($current);
        var optionsDiv = '<div class="options" style="width: 300px;">';
        var $search = $('<input type="text" placeholder="Search... (Coming soon!)" class="search" disabled>');
        for (var i = 0; i < opts.length; i++) {
            optionsDiv += '<div class="option' + (opts[i].selected ? " selected" : "") + '" data-value="' + opts[i].value + '">' + opts[i].innerHTML.trim() + '</div>';
        }
        var $options = $(optionsDiv + '</div>');
        $options.prepend($search);
        $(sb).after($options);

        currentClick(sb, $current);

        $search.click(function (e) {
            e.stopPropagation();
        });

        $options.find(".option").click(function (e) {
            e.stopPropagation();
            var selected = $(sb).val();
            if (!selected) {
                selected = [];
            }
            var value = $(this).data("value").toString();
            if ($(this).hasClass("selected")) {
                selected.splice(selected.indexOf(value), 1);
            } else {
                if (value === "%") {
                    $options.find(".option.selected").removeClass("selected");
                    selected = ["%"];
                } else {
                    var all = selected.indexOf("%");
                    if (all !== -1) {
                        $options.find('[data-value="%"].selected').removeClass("selected");
                        selected.splice(all, 1);
                    }
                    selected.push(value);
                }
            }
            $(this).toggleClass("selected");
            $(sb).val(selected);
            switch (selected.length) {
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

    $(document).click(function () {
        $(".select").removeClass("active");
    });

    /* My Schedule Code */
    // Runs specifically on Student Detail Schedule
    function detailSchedule() {
        var summary = "This layout table is used to present the schedule course detail";
        $('.datadisplaytable[summary="' + summary + '"]').each(function () {
            // Hide this table
            $(this).css('display', 'none');

            // Get values in term table
            var termSelector = $(this).find('tbody').children();
            var term = termSelector.eq(0).children('td').html();
            var crn = termSelector.eq(1).children('td').html();
            var status = termSelector.eq(2).children('td').html();
            var gradeMode = termSelector.eq(4).children('td').html();
            var credits = termSelector.eq(5).children('td').html();
            var level = termSelector.eq(6).children('td').html();
            var campus = termSelector.eq(7).children('td').html();

            // Get schedule of class
            var nextTable = $(this).next()[0];

            // Hide this table
            $(nextTable).css('display', 'none');

            var nextTableSelector = $(nextTable).find('tbody').children().eq(1).children();
            var time = nextTableSelector.eq(1).html();
            var days = nextTableSelector.eq(2).html();
            var location = nextTableSelector.eq(3).html();
            var daterange = nextTableSelector.eq(4).html();
            var instructor = nextTableSelector.eq(6).html();
            var seats = nextTableSelector.eq(7).html();

            var html = '<div class="schedule-item">';
            html += '<div class="building-image" style="background-image: url(' + chrome.extension.getURL(returnBuilding(location)) + ')">';
            // Name of scheduled class
            var className = $(this).find('caption').html();
            var classNumber = className.match(/- ([A-Z]{2,4} \d{4}) -/)[1];
            var classTitle = className.match(/^.*?(?= -)/g);
            html += '<div class="building-left"><h3>' + classNumber + '</h3><h1>' + classTitle + '</h1></div>';


            // Transcribe days to abbreviations
            var i = 0;
            var longdays = "";
            while (i <= days.length) {
                switch (days.slice(i, i + 1)) {
                    case "M":
                        longdays += "Mon, ";
                        break;
                    case "T":
                        longdays += "Tue, ";
                        break;
                    case "W":
                        longdays += "Wed, ";
                        break;
                    case "R":
                        longdays += "Thur, ";
                        break;
                    case "F":
                        longdays += "Fri, ";
                        break;
                    case "S":
                        longdays += "Sat, ";
                        break;
                    default:
                        longdays += "";
                        break;
                }
                i++;
            }
            // Remove final comma
            if (longdays.length > 0) {
                longdays = longdays.slice(0, longdays.length - 2);
            }

            // Final/no final settings
            var finals = $(nextTable).find('tbody').children().eq(2);
            var finalLocation;
            var finalsinfo;
            if (finals.length) {
                var finaltime = finals.children().eq(1).html();
                var finaldate = finals.children().eq(4).html();
                finalLocation = finals.children().eq(3).html();
                finalsinfo = '<span class="finals">Final on ' + finaldate.match(/^.*?(?= -)/g) + ' at<br>' + finaltime + '</span>';
            } else {
                finalsinfo = 'No Final';
                finalLocation = 'No Final';
            }

            // Split instructor
            instructor = instructor.split(", ");
            var prof;
            if (instructor.length > 1) {
                var j = 1;
                var hiddenprof = "";
                while (j < instructor.length) {
                    hiddenprof += '<span>' + mailToLink(instructor[j]) + '</span>';
                    j++;
                }
                prof = mailToLink(instructor[0]) + ', <div class="hiddenprof">+' + (instructor.length - 1) + '<div class="otherprof">' + hiddenprof + '</div></div>';
            } else {
                prof = mailToLink(instructor[0]);
            }

            html += '<div class="building-right"><h3>' + longdays + '</h3><h3><i class="fa fa-clock-o" aria-hidden="true"></i> ' + time + '</h3></div>';
            html += '</div>'; // end .building-image
            // Details that exist under building image
            html += '<div class="schedule-details">';
            html += '<div class="details-left"><span><i class="fa fa-map-marker" aria-hidden="true"></i> ' + location + '</span><span><i class="fa fa-user" aria-hidden="true"></i> ' + prof + '</span></div>';
            html += '<div class="details-center"><span><i class="fa fa-dot-circle-o" aria-hidden="true"></i> ' + credits + ' Credits</span><span><i class="fa fa-calendar" aria-hidden="true"></i> ' + finalsinfo + '</span></div>';
            html += '<div class="details-right"><span><i>CRN:</i> ' + crn + '</span><span><a class="more-details">more...</a></span></div>';
            html += '</div>'; // end schedule-details
            // Hidden details viewed when clicking "more..."
            html += '<div class="schedule-extras"><div class="extras-left">';
            html += '<p>Range <span>' + daterange + '</span></p>';
            html += '<p>Term <span>' + term + '</span></p>';
            html += '<p>Campus <span>' + campus + '</span></p>';
            html += '<p>Status <span>' + status + '</span></p>';
            html += '</div><div class="extras-right">'; // End left, start right
            html += '<p>Final Location <span>' + finalLocation + '</span></p>';
            html += '<p>Grade Mode <span>' + gradeMode + '</span></p>';
            html += '<p>Level <span>' + level + '</span></p>';
            html += '<p>Remaining Seats <span>' + seats + '</span></p>';
            html += '</div></div></div>'; // End extras-right, schedule-extras, schedule-item
            $(this).after(html);
        });
    }

    // Sets image background of schedule item based on building name string
    function returnBuilding(image) {
        var buildings = {
            'Behrakis': 'img/buildings/behrakis.jpg',
            'West Village H': 'img/buildings/wvh.jpg',
            'West Village G': 'img/buildings/wvg.jpg',
            'West Village F': 'img/buildings/wvf.jpg',
            'International Village': 'img/buildings/iv.jpg',
            'Ryder': 'img/buildings/ryder.jpg',
            'Forsyth': 'img/buildings/forsyth.jpg',
            'Richards': 'img/buildings/richards.jpg',
            'Ell': 'img/buildings/ell.jpg',
            'Dodge': 'img/buildings/dodge.jpg',
            'Hayden': 'img/buildings/hayden.jpg',
            'Hurtig': 'img/buildings/hurtig.jpg',
            'Mugar': 'img/buildings/mugar.jpg',
            'Robinson': 'img/buildings/robinson.jpg',
            'Snell Library': 'img/buildings/library.jpg',
            'Lake': 'img/buildings/lake.jpg',
            'Kariotis': 'img/buildings/kariotis.jpg'
        }

        for (var key in buildings) {
            if (image.indexOf(key) !== -1) {
                return buildings[key];
            }
        }

        // Fallback return
        return 'img/buildings/campus.jpg';
    }

    // Returns the given professor with a mailto link if they have one assigned
    function mailToLink(instructor) {
        var match = instructor.match(/<a href(.|\s)*?>/);
        if (match) {
            return match[0] + instructor.match(/(.*?)<a href/)[1] + '</a>';
        } else {
            return instructor;
        }
    }
}