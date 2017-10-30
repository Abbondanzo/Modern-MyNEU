# Modern-MyNEU
[![Code Climate](https://codeclimate.com/github/Abbondanzo/Modern-MyNEU/badges/gpa.svg)](https://codeclimate.com/github/Abbondanzo/Modern-MyNEU)

Open-source browser plugin that takes apart Northeastern's MyNEU portal for a much cleaner, modern look.

## Installation
The current Chrome Webstore version can be found [here](https://chrome.google.com/webstore/detail/modern-myneu/phpjhjbppfdgofldhpecojjdfccboblk)

### Prerequisites
Most everything is already included here for you. The only two things you will need are:
* A viable text editing environment with a JavaScript minifying plugin. I recommend [Atom](https://atom.io/) for editing/writing code and [Minify](https://atom.io/packages/atom-minify)
* [SASS](http://sass-lang.com/install) - You need this to compile `.scss` stylesheets into usable `.css`

### Compiling CSS
Once you have SASS installed, run `compile.bat` if you are on Windows or `compile.sh` if you are on Mac. If you are using Mac's Terminal to run the bash script, be sure to use `chmod +x compile.sh` before running.

### Adding to Chrome
Disable any conflicting versions of Modern MyNEU before installing the developer edition.
After all files are compiled, you need to enable Developer Mode in Chrome to install. Navigate to the settings via the menu in the upper right and go to More Tools -> Extensions. Check the box next to `Developer Mode` in the top bar.
Next, click on `Load Unpacked Extension` and select the Modern MyNEU folder where it is located on your computer.

## Making Changes
If you're like me and you like to tinker with code, there are a few things you need to do each time you make changes:
* When making any changes to the JavaScript code, minify the file and reload the extension via the Chrome Extensions menu. Changes will not display until the plugin is reloaded in Chrome. The `Reload` button is located next to `Options` under the extension's description.
* Any changes to the SCSS file must be compiled. Since the extension only reads from the CSS files, changes will not display until it is recompiled. Compiling the file can take anywhere from 1 to 10 seconds. You do not need to reload the extension to reflect any CSS changes. They will display after a page refresh.
* Any changes made to `.html` files will display immediately after a page refresh.

## Issue Reporting
If you ever come across any errors or issues with the extension, open an issue report. To request changes to the code base, open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contributors
Special thanks to the following people for contributing to Modern MyNEU:
* [Taha Vasowalla](https://github.com/DarkAce65)
* [Alex Aubuchon](https://github.com/A-lxe)

## Featured Articles
This extension has received some attention from a variety of publications, such as:
* [Huntington News, Students Revamp myNEU Interface](https://huntnewsnu.com/2017/02/students-revamp-myneu-interface/)
* [WIRED, Meet the NU-Nerds](https://www.wired.com/2017/04/the-genial-brilliant-candy-loving-hackers-of-stetson-west/)
* [Reddit, A Chrome extension that makes MyNEU not look like sh*t](https://www.reddit.com/r/NEU/comments/5q86si/a_chrome_extension_that_makes_myneu_not_look_like/)
