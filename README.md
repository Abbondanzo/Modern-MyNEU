# Modern-MyNEU
Open-source browser plugin that takes apart Northeastern's MyNEU portal for a much cleaner, modern look.
![Login Page](https://lh3.googleusercontent.com/ISwoK9dfy5yE0fklrFvAJ4Zqj6RG5fRPAoni_MfApXEwkAV0rpNG__-XmF6OCmknLaeGi--0=s640-h400-e365-rw)
![Portal](https://lh3.googleusercontent.com/6nN2gfizNHLcuNV14PA2YvEcRbMQbglapFhM0r_vZ3NFTy9X3gaTUVfD_wPnvxw6ZQYS_6LyG9o=s640-h400-e365-rw)

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

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
