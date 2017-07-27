<?php

/**

 * @package lgr_responsive_iframe_watchdog

 * @version 1.2

 */

/*

Plugin Name: Responsive Iframe Watchdog

Plugin URI: 

Description: Plugin to limit the url specified in the src attribute associated with iframe, embed & video tags to a specified list of trusted domains.

Version: 1.2

Author: Larry Robertson

Author URI: http://www.lgr-wp.com/wp/

License: GPL2

*/



add_action( 'admin_menu', 'lgrriw_add_admin_menu' );

add_action( 'admin_init', 'lgrriw_settings_init' );

add_filter( 'the_content', 'lgrriw_content_preview_filter', 10, 2 );

function lgrriw_add_admin_menu(  ) { 



	//add_management_page( 'Responsive Iframe Watchdog', 'Responsive Iframe Watchdog', 'manage_options', 'lgrriw_pluginPage', 'lgrriw_options_page' );

	add_options_page( 'Responsive Iframe Watchdog', 'Responsive Iframe Watchdog', 'manage_options', 'lgrriw_pluginPage', 'lgrriw_options_page' );



}



function lgrriw_settings_init(  ) { 

	

		register_setting( 'lgrriw_pluginPage', 'lgrriw_settings', 'lgrriw_validate_sanitize' );

	

		add_settings_section(

			'lgrriw_pluginPage_section_0', 

			__( 'Permissions', 'lgr' ), 

			'lgrriw_settings_section_0_render', 

			'lgrriw_pluginPage'

		);

	

		add_settings_field( 

			'lgrriw_checkbox_allow_editor', 

			__( 'Allow Editor to Embed', 'lgr' ), 

			'lgrriw_checkbox_allow_editor_render', 

			'lgrriw_pluginPage', 

			'lgrriw_pluginPage_section_0' 

		);

	

		add_settings_field( 

			'lgrriw_checkbox_allow_author', 

			__( 'Allow Author to Embed', 'lgr' ), 

			'lgrriw_checkbox_allow_author_render', 

			'lgrriw_pluginPage', 

			'lgrriw_pluginPage_section_0' 

		);

	

		add_settings_section(

			'lgrriw_pluginPage_section_1', 

			__( 'Security', 'lgr' ), 

			'lgrriw_settings_section_1_render', 

			'lgrriw_pluginPage'

		);

	

		add_settings_field( 

			'lgrriw_checkbox_allow_html', 

			__( 'Allow HTTP (Not Recommended)', 'lgr' ), 

			'lgrriw_checkbox_allow_html_render', 

			'lgrriw_pluginPage', 

			'lgrriw_pluginPage_section_1' 

		);

	

		add_settings_field( 

			'lgrriw_textarea_valid_domains', 

			__( 'Trusted Domains', 'lgr' ), 

			'lgrriw_textarea_valid_domains_render', 

			'lgrriw_pluginPage', 

			'lgrriw_pluginPage_section_1' 

		);



		wp_register_style( 'lgrriw_responsive_iframe_watchdog', plugins_url( 'responsive-iframe-watchdog/admin/css/lgr_responsive_iframe_watchdog.css') );

		wp_enqueue_style( 'lgrriw_responsive_iframe_watchdog' );

	

	}



function lgrriw_checkbox_allow_editor_render(  ) { 



	$options = get_option( 'lgrriw_settings' );

	?>

	<input type='checkbox' id="allow_editor" name='lgrriw_settings[lgrriw_checkbox_allow_editor]' <?php checked( $options['lgrriw_checkbox_allow_editor'], 1 );?> value='1'>

	<?php

	echo __( 'Editor', 'lgr' );



}



function lgrriw_checkbox_allow_author_render(  ) { 



	$options = get_option( 'lgrriw_settings' );

	?>

	<input type='checkbox' id="allow_author" name='lgrriw_settings[lgrriw_checkbox_allow_author]' <?php checked( $options['lgrriw_checkbox_allow_author'], 1 );?> value='1'>

	<?php

	echo __( 'Author', 'lgr' );



}



function lgrriw_checkbox_allow_html_render(  ) { 



	$options = get_option( 'lgrriw_settings' );

	?>

	<input type='checkbox' id="allow_http" name='lgrriw_settings[lgrriw_checkbox_allow_html]' <?php checked( $options['lgrriw_checkbox_allow_html'], 1 );?> value='1'>

	<?php

	echo __( 'Allow HTTP insecure protocol (for SSL HTTPS leave unchecked)', 'lgr' );



}



function lgrriw_textarea_valid_domains_render(  ) { 



	$options = get_option( 'lgrriw_settings' );



	?>

	<textarea id='domain_list' class='textarea_domains' rows='7' cols='60' name='lgrriw_settings[lgrriw_textarea_valid_domains]'><?php echo $options['lgrriw_textarea_valid_domains']; ?></textarea>

	<?php

    echo __( '<br/>Enter each domain name on a separate line (i.e. example: www.youtube.com) or just click the "Add to Trusted List" button for each violation below.' );



}



function lgrriw_settings_section_0_render(  ) { 



	//echo __( 'Choose to Editor or Author.', 'lgrriw' );



}



function lgrriw_settings_section_1_render(  ) { 



	//echo __( 'Choose to allow http:// or not.', 'lgrriw' );



}



function lgrriw_validate_sanitize( $input ){

        $output = $input;

        $array_Domains_field_1 = array();

		

		$checkbox_allow_html_Is_checked = false;

		if( isset( $input['lgrriw_checkbox_allow_html'] ) ){

			$checkbox_allow_html_Is_checked = true;

		}

		

		$checkbox_allow_editor_Is_checked = false;

		if( isset( $input['lgrriw_checkbox_allow_editor'] ) ){

			$checkbox_allow_editor_Is_checked = true;

		}

		

		$checkbox_allow_author_Is_checked = false;

		if( isset( $input['lgrriw_checkbox_allow_author'] ) ){

			$checkbox_allow_author_Is_checked = true;

		}



        if( isset( $input['lgrriw_textarea_valid_domains'] ) ){

			$arrayLines = explode("\n", $input['lgrriw_textarea_valid_domains']);

			$stripEmptyLinesTrim = '';

			foreach ( $arrayLines as $line ){

				$trimmedLine = trim(str_replace( " ","",$line ));

				if( $trimmedLine !== '' ){

					if ( lgrriw_is_valid_domain_name( $trimmedLine ) == true ){

						$array_Domains_field_1[] = $trimmedLine;

						$stripEmptyLinesTrim .= $trimmedLine . "\n";

					}

					else{

						add_settings_error( 'lgrriw_pluginPage', 'lgrriw_invalid-textarea_field__1_message_1', "$trimmedLine can't be contacted, be sure the name is correct." );

					}

				}

			}

            $output['lgrriw_textarea_valid_domains'] = $stripEmptyLinesTrim;

		}

        return $output;

}



function lgrriw_is_valid_domain_name($domain_name){

	if(filter_var(gethostbyname($domain_name), FILTER_VALIDATE_IP)){

		return true;

	}

	else{

		return false;

	}

}

// Disable smart quotes for URL clipboard pasting

if( version_compare ( $wp_version, '4.0' ) === -1 ) {

    // To Disable Smart Quotes for WordPress less than 4.0

    foreach( array(

        'bloginfo',

        'the_content',

        'the_excerpt',

        'the_title',

        'comment_text',

        'comment_author',

        'link_name',

        'link_description',

        'link_notes',

        'list_cats',

        'nav_menu_attr_title',

        'nav_menu_description',

        'single_post_title',

        'single_cat_title',

        'single_tag_title',

        'single_month_title',

        'term_description',

        'term_name',

        'widget_title',

        'wp_title'

    ) as $sQuote_disable_for )

    remove_filter( $sQuote_disable_for, 'wptexturize' );

}

else {

    // To Disable Smart Quotes for WordPress 4.0 or higher

    add_filter( 'run_wptexturize', '__return_false' );

}



function lgrriw_content_preview_filter( $content ) {

	//////////////////////////////////////////

	// Back end Publish or Update Button

	// This callback funtion validates iframe

	// Domain Name against Trusted Domains

	// and inserts the responsive div wrapper

	// as specified in the iframe's rel attribute.

	// It also enforces http restriction.

	//////////////////////////////////////////



	// Get the options settings, remove any empty domain names and create bool (0 or 1) for checkbox

	$options = get_option( 'lgrriw_settings' );

	

	// Get the HTTP checkbox note returns nothing if not checked

	$allowHTTP = $options['lgrriw_checkbox_allow_html'];

	// Make it 0 if its not 1 to get around the problem of the checkbox not being checked

	if( $allowHTTP != 1 ){

		$allowHTTP = 0;

	}

	

	// Get the Editor checkbox note returns nothing if not checked

	$allowEditor = $options['lgrriw_checkbox_allow_editor'];

	// Make it 0 if its not 1 to get around the problem of the checkbox not being checked

	if( $allowEditor != 1 ){

		$allowEditor = 0;

	}

	

	// Get the Author checkbox note returns nothing if not checked

	$allowAuthor = $options['lgrriw_checkbox_allow_author'];

	// Make it 0 if its not 1 to get around the problem of the checkbox not being checked

	if( $allowAuthor != 1 ){

		$allowAuthor = 0;

	}



	$arrayDomains = array();

	//return $options['lgrriw_textarea_valid_domains'];

	$trustedDomains = $options['lgrriw_textarea_valid_domains'];

	//return print_r($options);

	$arrayOptions = explode( "\n", $trustedDomains );

	foreach ($arrayOptions as $domainName){

		$trimmedDomainName = trim($domainName);

		if( $trimmedDomainName !== ''){

			$arrayDomains[] = $trimmedDomainName;

		}

	}

	

	// Check to see if there any embed tags or shortcodes in the content.

	//if( (strpos($content,'<iframe')) !== false || strpos($content,'<embed') !== false || strpos($content,'<video') !== false || strpos($content,'<source') !== false || strpos($content,'[lgrriw_iframe') !== false || strpos($content,'[embed') !== false || strpos($content,'[video') !== false || strpos($content,'[source') !== false ){

		$matches = array(); // Create an array to hold the results of our search below.

		// Search for all src attributes no matter what tag or shortcode they exist in.

		preg_match_all( '/src=("[^"]*")/i', $content, $matches );

		// Process any src attributes found one at a time.

		foreach ( $matches[1] as $match ) {

			// If a protocol was specifed as http return an error and bail out.

			if( strpos($match,"http://") > 0 && $allowHTTP == 0 ){

				return "Sorry your embed has an unsecured url: ". $match . " you must use https://"; 

			}

			// Get the Server name by itself

			$urlNoProtocol = str_replace( "\"https://","",$match );

			$urlNoProtocol = str_replace( "\"http://","",$urlNoProtocol );

			$urlNoProtocol = str_replace( "\"//","",$urlNoProtocol );

			preg_match( '/^[^\/]*/', $urlNoProtocol, $matchesServer );

			if( strpos( ' ' . $trustedDomains, $matchesServer[0] ) == false){

				return "Sorry your page contains an unvalid embed to: " . $matchesServer[0] . ' Please use a trusted server to embed!  Trusted servers are: ' . $trustedDomains . '<br/>';

			}

		}

		$content = str_replace("[lgrriw_div","<div",$content); 

		$content = str_replace("][lgrriw_iframe","><iframe",$content); 

		$content = str_replace("[lgrriw_iframe","<iframe",$content); 

		$content = str_replace("][/lgrriw_iframe]","></iframe>",$content); 

		$content = str_replace("[/lgrriw_div]","</div>",$content); 

		return $content; // Embed code was found and validated.

	//}

	//else{

	//	return $content; // No embed code found so it's okay to output the content as is.

	//}

}





// I DON'T SEE ANY USE FOR THE FOLLOWING MESSAGE DISPLAY METHODS

// MAINLY BECAUSE THEY DISPLAY EITHE ALL THE TIME OR NONE OF THE TIME

// WHAT WERE THEY THINKING!!!

//$display_message = new WPSE_224485_Message( "Settings look good" );

class WPSE_224485_Message {

    public $_message;



    function __construct( $message ) {

        $this->_message = $message;



        add_action( 'admin_notices', array( $this, 'render' ) );

    }



    function render() {

		// Should be notice plus any one of notice-error, notice-warning, notice-success,

		// or notice-info. Optionally use is-dismissible to apply a closing icon.

		//$class = 'notice notice-error is-dismissible';

		//$class = 'notice notice-warning is-dismissible';

		//$class = 'notice notice-success is-dismissible';

		$class = 'notice notice-info is-dismissible';

		//$display = __( 'Irks! An error has occurred.', 'sample-text-domain' );

		//$display = __( $message, 'lgrris_messages' );

		

		printf( '<div class="%1$s"><p>%2$s</p></div>', $class, $this->_message ); 

        //printf( '<div class="updated">%s</div>', $this->_message );

    }

}

//add_action( 'admin_notices', 'sample_admin_notice__error' );

function sample_admin_notice__error( $message) {

	// Should be notice plus any one of notice-error, notice-warning, notice-success,

	// or notice-info. Optionally use is-dismissible to apply a closing icon.

	//$class = 'notice notice-error is-dismissible';

	//$class = 'notice notice-warning is-dismissible';

	//$class = 'notice notice-success is-dismissible';

	$class = 'notice notice-info is-dismissible';

	//$display = __( 'Irks! An error has occurred.', 'sample-text-domain' );

	$display = __( $message, 'lgrris_messages' );



	printf( '<div class="%1$s"><p>%2$s</p></div>', $class, $display ); 

}





//////////////////////////////////////////////////

/* Create toolbar a button in the Text editor */

//////////////////////////////////////////////////

function shortcode_button_script() 

{

    if(wp_script_is("quicktags"))

    {

        ?>

            <script type="text/javascript">

                

                //this function is used to retrieve the selected text from the text editor

                function getSel()

                {

                    var txtarea = document.getElementById("content");

                    var start = txtarea.selectionStart;

                    var finish = txtarea.selectionEnd;

                    return txtarea.value.substring(start, finish);

                }



                QTags.addButton( 

                    "code_shortcode", 

                    "Code", 

                    callback

                );



                function callback()

                {

                    var selected_text = getSel();

                    QTags.insertContent("[code]" +  selected_text + "[/code]");

                }

            </script>

        <?php

    }

}



add_action("admin_print_footer_scripts", "shortcode_button_script");





















































////////////////////////////////////////////////////////////

/* Create a toolbar button in the Visual editor */

////////////////////////////////////////////////////////////

//  Absolute path to plugin's root directory in file system.

define ( 'LGRRIW_ROOT_PATH', plugin_dir_path( __FILE__ ) );



//  URL to the plugin's root directory.

define( 'LGRRIW_ROOT_URL', plugin_dir_url( __FILE__ ) );



//  Absolute path to the main plugin file (this one).

///////////define( 'LGRRIW_PLUGIN_FILE', LGRRIW_ROOT_PATH . 'tinymce-embedder.php' );







////////////////////////

/// Setup Shortcodes ///

////////////////////////

add_shortcode( 'lgrriw-embed-shortcode', 'lgrriw_embed_shortcode_func' );



/**

 * The function handler for the lgrriw-embed-shortcode shortcode.

 * @param  ARRAY_A $attributes An array of all attributes passed to the shortcode.

 * @return string              The HTML to output in place of the shortcode.

 */

function lgrriw_embed_shortcode_func( $attributes ) {

    if( !array_key_exists( 'text', $attributes ) ) {

        $text_to_display = "No text provided in shortcode.";

    }

    else {

        $text_to_display = $attributes['text'];

    }



    return '<span style="color: #900;">' . $text_to_display . '</span>';

}



///////////////////////

/// Enqueue jQuery ///

//////////////////////

add_action( 'admin_enqueue_scripts', 'lgrriw_enqueue_admin_scripts' );

function lgrriw_enqueue_admin_scripts() {

	wp_enqueue_script( 'jquery' );

	wp_enqueue_script( 'jquery-ui-core' );

	wp_enqueue_script( 'jquery-ui-dialog' );

	wp_enqueue_script( 'jquery-ui-accordion' );

}



////////////////////////////////

/// Hook into TinyMCE Editor ///

////////////////////////////////

/**

 * Here is where the good stuff starts. This is where we tell WordPress that the

 * TinyMCE instances should expect a new button on the toolbar, and that we will

 * be defining a TinyMCE "plugin" which takes care of this button.

 */



//  Step 1: Register a toolbar button

//  Documentation: http://codex.wordpress.org/Plugin_API/Filter_Reference/mce_buttons,_mce_buttons_2,_mce_buttons_3,_mce_buttons_4

add_filter( 'mce_buttons', 'lgrriw_register_tinymce_button' );



/**

 * The function that tells WordPress to tell TinyMCE it has a new button.

 * @param  ARRAY_N $button_array Array of button IDs for the toolbar.

 * @return ARRAY_N               The button array with the new button added.

 */

function lgrriw_register_tinymce_button( $button_array ) {

    /**

     * Our goal is to insert the ID of a button we will define in TinyMCE's initialization

     * code.  This button definition is found in the tinymce-plugin.js file.  We

     * insert the ID in the position we want the button on the toolbar.  I'm going

     * to add it to the end of the toolbar.

     *

     * But, we should take into account when we want this button to appear.

     * In most cases, we only want our TinyMCE addition to work in the WordPress

     * admin section, not in any editors that may or may not be publicly

     * available (some plugins provide user facing TinyMCE editors).  If this is

     * true, we need to do some WordPress footwork to find where we are and if

     * we should show the button.

     *

     * For this example, I will illustrate limiting to showing the button on

     * post and page editors in the admin.

    */

    if( lgrriw_user_has_permission() == 1 ) {

        //  Okay, our conditions for showing the button have been met. Therefore,

        //  we need to tack on the new button ID to the button array.  This ID

        //  must match the one in our button definition in tinymce-plugin.js

        array_push( $button_array, 'lgrriw_button' );

    }



    return $button_array;

}



//

// Function to determine permission based on User Role and Current Screen

//

function lgrriw_user_has_permission(){

    $hasPermission = 0;



    global $current_screen; //  WordPress contextual information about where we are.



    $type = $current_screen->post_type;



	// Get the Options array

	$options = get_option( 'lgrriw_settings' );

	

	// Get the Editor checkbox note returns nothing if not checked

	$allowEditor = 1;

	if( $options['lgrriw_checkbox_allow_editor'] != 1 ){

		$allowEditor = 0;

	}

	else{

		$allowEditor = 1;

	}

	

	// Get the Author checkbox note returns nothing if not checked

	$allowAuthor = 1;

	if( $options['lgrriw_checkbox_allow_author'] != 1 ){

		$allowAuthor = 0;

	}

	else{

		$allowAuthor = 1;

	}



	$current_User_Role = lgrriw_get_current_user_role();



	if( ( ($current_User_Role == 'Administrator') || ( $current_User_Role == 'Editor' && $allowEditor == 1 ) || ( $current_User_Role == 'Author' && $allowAuthor == 1 ) ) && ( $type == 'post' || $type == 'page' ) ) {

    	$hasPermission = 1;

	}

    

	//echo __( "<br/>ALLOW AUTHOR: $allowAuthor" );

    //echo __( "<br/>ROLE: $current_User_Role" );

    //echo __( "<br/>HAS PERMISSION: $hasPermission" );

	

	return $hasPermission;

	

}



//  Step 2: Tell WordPress to tell TinyMCE we will be defining a plugin that deals with our button.

//  Documentation: http://codex.wordpress.org/Plugin_API/Filter_Reference/mce_external_plugins

add_filter( 'mce_external_plugins', 'lgrriw_register_tinymce_plugin' );



/**

 * The function that tells WordPress to tell TinyMCE it has a new plugin.

 * @param  ARRAY_A $plugin_array Array of plugin JavaScript files.

 * @return ARRAY_A               The plugin array with the new plugin file added.

 */

function lgrriw_register_tinymce_plugin( $plugin_array ) {

    /**

     * Much like with the button, our goal is to tack something onto the plugin

     * array.  In this case, it is the path to the JavaScript file which handles

     * our new plugin and button.

     *

     * Also, since we restricted the button to only show when in the admin and

     * editing a page or post, I'm going to do the same here and only register

     * the plugin if in the same situation.

     */

    if( lgrriw_user_has_permission() == 1 ) {

        //  Okay, our conditions for registering the plugin have been met. Therefore,

        //  we need to tack on the new plugin file to the plugin array.  The array

        //  key in the plugin array must match the plugin name in tinymce-plugin.js

        $plugin_array['lgrriw_plugin'] = LGRRIW_ROOT_URL . 'tinymce_dialog/js/tinymce_plugin.js';

    }



    return $plugin_array;

}



/**

 * Returns the translated role of the current user. 

 * No role, get false.

 *

 * @return string The translated name of the current role.

 **/

function lgrriw_get_current_user_role() {

    global $wp_roles;



    $current_user = wp_get_current_user();

    $roles = $current_user->roles;

    $role = array_shift( $roles );



    return isset( $wp_roles->role_names[ $role ] ) ? translate_user_role( $wp_roles->role_names[ $role ] ) : FALSE;

}



////////////////////////////////////

/// Save Data to Pass to TinyMCE ///

////////////////////////////////////

add_action( 'admin_head', 'lgrriw_save_tinymce_data' );



/**

 * Outputs JavaScript which stores data we need to pass from the server to the

 * client.

 */

function lgrriw_save_tinymce_data() {

    /**

     * Basically, this function is middle-man for PHP and JavaScript. If your

     * TinyMCE dialog needs to extract data from WordPress and PHP in some way,

     * the easiest thing to do is save it below.

     *

     * Just to prove it works, I'm going to pass the PHP version.  If you don't

     * need to share information, delete this.

     *

     * Essentially, all we are doing is creating a JavaScript variable in the

     * global namespace. We will then retrieve this in the TinyMCE dialog. This

     * function is merely outputting content the the head section of the WordPress

     * admin.

     */



	$options = get_option( "lgrriw_settings" );

	$validDomainsSpaceDelimited = str_replace ( "\n"," ",$options["lgrriw_textarea_valid_domains"]);

	

     ?>

     <script type='text/javascript'>

        var lgrriw_data = {

            'php_version': '<?php echo phpversion(); ?>',

			'valid_domains': '<?php echo $validDomainsSpaceDelimited; ?>'

        };

     </script>

     <?php

}











require_once('admin/includes/lgr_responsive_iframe_watchdog_options_page.php');



?>