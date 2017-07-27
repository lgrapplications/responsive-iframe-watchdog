(function($) {
    /**
	This tinymce plugin provides the editor button and the modal dialog used to embed. 
    */
    //  Extract data stored in the global namespace in tinymce-dev-starter.php.
    var passed_data = lgrriw_data;
    var php_version = passed_data.php_version;
	var valid_domains = passed_data.valid_domains;
	var dialogTitle = 'Responsive Iframe Watchdog';




    //  Define the TinyMCE plugin and setup the button.
    //  The last property in the first tinymce.create paramenter below must be the same
    //  as the plugin you defined in tinymce-dev-starter.php. In this case, it is
    //  lgrriw_plugin.  If we called it my_cool_plugin, the first parameter would change
    //  to 'tinymce.plugins.my_cool_plugin'.
    tinymce.create('tinymce.plugins.lgrriw_plugin', {
        init: function(editor, url) {
           /**
             * The editor parameter contains the TinyMCE editor instance.  The url
             * parameter contains the absolute url to the directory containing the
             * TinyMCE plugin file (this file's directory).
             *
             * We will be using editor to talk to the TinyMCE instance.  And we
             * will be using url to tell TinyMCE where files are (e.g. button
             * images).
             */
            //  Specify button properties and commands.
            //  The first parameter of editor.addButton must be the button ID
            //  given in tinymce-dev-starter.php. In this case, it is lgrriw_button.
            editor.addButton('lgrriw_button', {
                title: dialogTitle,   // Tooltip when hovering over button.
                image: url + '/../../assets/tinymce-button_32.png',    // The image for the button.
                cmd: 'lgrriw_command'                           // The editor command to execute on button click.
            });

            //  Define the "command" executed on button click.
            editor.addCommand('lgrriw_command', function() {
				editor.windowManager.open(
                    {
						title: dialogTitle,   //    The title of the dialog window.
                        file:  url + '/../html/tinymce_dialog.html', //    The HTML file with the dialog contents.
                        width: 816,                               //    The width of the dialog
                        height: 505,                              //    The height of the dialog
                        inline: 1                                 //    Whether to use modal dialog instead of separate browser window.
                    },

                    //  Parameters and arguments we want available to the window.
                    {
                        editor: editor,
                        jquery: $,
						valid_domains: valid_domains
                    }
                );
				
				$('.mce-title').each(function(index,item){
					// Find this dialog before formatting otherwise
					// the formatting will change the Wordpress
					// Theme globally.  Be Careful!
					if($(item).text() == dialogTitle){
						$(item).css('text-align', 'center');
						//$(item).css('color', '#336999');
						$(item).css('color', 'black');
						//$(item).css('background-color', '#7fc4ff');
						//$(item).css('background-color', '#add9ff');
						//$(item).css('background-color', '#115588');
						//$(item).css('background-color', '#8899AA');
						//$(item).css('background-color', '#D7DADD');
						//$(item).css('background-color', '#779FBF');
						$(item).css('background-color', '#a6d6ff');
					}
				});
            });
        }
    });


    // Add the plugin to TinyMCE
    // Documentation: http://www.tinymce.com/wiki.php/api4:method.tinymce.AddOnManager.add
    tinymce.PluginManager.add('lgrriw_plugin', tinymce.plugins.lgrriw_plugin);
})(jQuery);
