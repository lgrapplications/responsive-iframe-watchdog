=== Responsive Iframe Watchdog ===
Contributors: lgrapplications
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=82XG5X9DWS5PJ
Tags: iframe, embed, video, security, trusted, trust, responsive, watchdog, hack, hacking, YouTube, Vimeo, Dailymotion, Brightcove, html
Requires at least: 4.5.0
Tested up to: 4.7.2
Stable tag: 1.2
License: GPLv2 or later
License URI:  http://www.gnu.org/licenses/gpl-2.0.html


Embed YouTube, Vimeo, Dailymotion, Brightcove... videos and HTML based on a list of trusted domain names.

== Description ==
Many WordPress administrators disable the ability to insert unfiltered_html for Editors and Authors roles to avoid being hacked via iframe or other html elements that have an src attribute associated with them.

This plugin:

* Scans all publicly published pages and posts for src attributes, examines the domain name portion of the uri and compares the domain name to a list of trusted domain names maintained by the site administrator(s).
* Provides a list of violations allowing the administrator to choose to trust a domain name by clicking a button. 
* Provides a dialog to insert embeded videos for YouTube, Vimeo, Dailymotion and Brightcove with a complete set of video and playlist attributes for each provider. You can create custom video embeds for other providers.
* Provides a dialog to embed html.
* Inserts auto-generated custom shortcode into the editor which means no html elements are used. 
![](https://www.youtube.com/watch?v=ZwzY1o_hB5Y)

== Installation ==

This section describes how to install the plugin and get it working.

1. Upload the plugin files to the '/wp-content/plugins/lgr_responsive_iframe_watchdog' directory, or install the plugin through the WordPress plugins screen directly.  Currently this plugin is only available through wordpress.org plugin directory.
1. Activate the plugin through the 'Plugins' screen in WordPress. Look for 'Responsive Iframe Watchdog' and click the 'activate' link.
1. Use the Tools->Responsive Iframe Watchdog screen to configure the plugin.
1. Decide if you want your embeds to support the unsecured http protocol by checking the box. It is recommended to leave this unchecked and any existing http calls will be reported in the 'List of Violations'. If you decide to allow http the click 'Save Changes' before continuing.
1. Upon installation the plugin's 'Trusted Domain Names' list will be empty and all pages and posts will temporarily be blocked from public view. Evaluate the 'List of Violations' and click the 'Add to Trusted List' button for each domain name you wish to trust, any duplicate domain names will be automatically removed from the list.
1. **Important: only 'Published' pages/posts are shown in the 'List of Violations'. Pages and Posts marked as 'Private', 'Draft' or 'Trash' will not appear in the list. When updating any pre-existing pages/posts visibility to 'Published' always preview the page/post to be sure that it is not blocked to the public due to an untrusted domain name.**
1. In the event that you see an http protocol violation a link to edit the post/page is provided. In most cases you will just simply change any http:// to https://.
1. Click the 'Save Changes' button when you are finished trusting domain names and the 'List of Violations' should be empty, if not you need to decide if you want to delete any pages or posts that remain.  The goal is to have no remaining Violations in the list.
1. One final note: Any pre-existing HTML elements (i.e. `<iframe>`, `<embed>`, `<video><source>`) will still function as it did before providing the domain name is trusted. If you at some point you need to edit these pages/posts you should use this plugin's embed dialog form to re-embed using shortcode instead of the original HTML element. Convert any existing `<iframe>`, `<embed>` or `<video><source>` elements to [lgrriw_div][lgrriw_iframe] shortcode via the dialog form. Failure to convert iframe tags to shorcode after editing an existing post/page containing an iframe could result in a blockage to public view after updating any changes to the page/post.

== Frequently Asked Questions ==

= What is the Security Risk with iframe tags and embed Shortcode? =

> By far the biggest security risk is someone getting your WordPress Administrator user name and password.  Taking second place is someone getting an Editor or Author Role's user name and password.

> Given a user name and password to login to your WordPress site allows a hacker to edit the content of the "src attribute" of an iframe tag or embed shortcode.  One thing a hacker might do is to point the URL to hackersite.com/copyofyourpage.html.  This page could be a copy of your embedded page with a hidden div that when clicked will install without you knowing malicious software on your customers computer.

> Another way is the hacker will inject malicious JavaScript code into a hidden iframe that will execute even if you don't click on anything. Watch this video demonstrating a Drive By Attack:
>[Javascript Injection](https://www.youtube.com/embed/_cBed6-ufIQ)

= How does a Hacker get you Username and Password? =

> There are many ways for example someone standing behind you as you log in is watching.  The scariest method is a malicious web site has install spyware on your computer for example watch the video below which complains about Microsoft's .net framework which allows a programmer to record keystrokes to capture everything you type on your keyboard!
[Recording Keystrokes to get your password](https://www.youtube.com/embed/759GUTVg6Ig)

= How does Responsive Iframe Watchdog Prevent this type of Hacking? =

> The hacker's domain will not be in the list of trusted domains which can only be changed by Administrators.  As long as the hacker did not capture the username and password of an Administrator Role for your WordPress Site you should be safe.  Responsive Iframe Watchdog will block the hacker's URL from Public View (domain not trusted) if the hacker logged in as a role other than Administrator (i.e. Editor, Author...).

> If the the hacker has a login for an Administrator Role you are in big trouble anyway so try to limit the number of Administrator Roles on your site.

= Do I have to disable iframes in WordPress by Removing the unfiltered_html capability? =

> You may have already disabled iframes from your WordPress site so that only an Administrator can embed.  This is a good idea!  Responsive Iframe Watchdog will allow your Editors and Authors to embed with iframes (unfiltered_html) disabled. 

= How do I disable iframes in WordPress by Removing the unfiltered_html capability? =
> Refer to the documentation on remove_cap. You should be experienced in executing php code within WordPress to run the following code and the code should only execute one time.


> To remove capability for Editor Roles:

~~~~
try{
	$editor_role = get_role( 'editor' );
	if( $editor_role ){
		$editor_role ->remove_cap( 'unfiltered_html' );
	}
}
catch(Exception $e){
	continue;
}
~~~~

> To remove capability for Author Roles:

~~~~
try{
	$author_role = get_role( 'author' );
	if( $author_role ){
		$author_role ->remove_cap( 'unfiltered_html' );
	}
}
catch(Exception $e){
	continue;
}
~~~~

= Will I have to change all existing iframes on my site? =

> Any pre-existing HTML elements (i.e. `<iframe>`, `<embed>`, `<video><source>`) will still function as it did before providing the domain name is trusted. If you at some point you need to edit these pages/posts you should use this plugin's embed dialog form to re-embed using shortcode instead of the original HTML element. Convert any existing `<iframe>`, `<embed>` or `<video><source>` elements to [lgrriw_div][lgrriw_iframe] shortcode via the dialog form. Failure to convert iframe tags to shorcode after editing an existing post/page containing an iframe will result in a blockage to public view after updating any changes to the page/post if your role has unfiltered_html capability disabled.

= What does "Responsive Mean? =

> Have you ever noticed that when you shrink your browser width and/or height, an embedded video doesn't always shrink with it? Or that the same video doesn't scale quite right on a mobile phone or tablet?. When one says that a video is responsive that means that it will look perfect in any browser or on any device at any size and it will not have any black borders around the video as the container is resized. ***Note: The WordPress embed shortcode is not responsive and can not be made responsive.***

= Can I embed a playlist? =

> Yes playlists are supported for YouTube and Dailymotion (Reoccurring Event) just the a URI into the URL textbox and the app will do the rest.  Vimeo and Brightcove individual videos are supported but playlists are not supported.

= Are all player parameters supported? =

> Just about all of the parameters are supported for all players (see screenshots).

= Can I put a border around the embedded video? =

> Yes just select the border thickness from the drop-down and enter a color or color number (i.e. red, blue, #c19925).

= Will the embed be clearly visible on my phone in portrait view? =

> Yes since your Worpress site pages are automatically responsive the embeds will follow all orientations and screen sizes. The smallest screen size I tested was an iPhone 5s which looks perfect in both portrait and landscape orientations.

= What if my video server is not YouTube, Vimeo, Livestream, Dailymotion or Brightcove can I still embed a video? =

> Yes just copy you URI and all of it's parameters to the clipboard and paste it into the "Other" url textbox and it will honor all parameters as is and make it responsive as well.

= What if my video is supposed to be SD 4X3 but on youtube it was encoded as HD 16X9 with black borders? =

> You can paste the URI into the textbox as usual and select 4X3 from the "Aspect Ratio" drop-down and it will be perfectly responsive as 4X3 with no black borders.

== Screenshots ==

1. This screen shot shows the Administrator's Settings page. The page is showing a couple of error messages that you will see when you first install the plugin (see item 5 under Installation).
2. This screen shot shows the icon as it appears in the editor.
3. This screen shot shows initial dialog.
4. This screen shot shows the YouTube Settings.
5. This screen shot shows the YouTube after url/id has been pasted.
6. This screen shot shows the YouTube after shortcode has been inserted.
7. This screen shot shows the YouTube preview imbed.
8. This screen shot shows the Vimeo Settings.
9. This screen shot shows the Livestream Settings.
10. This screen shot shows the Brightcove Settings.
11. This screen shot shows the Dailymotion Settings.
12. This screen shot shows the Custom Settings for Other Video Embed.
13. This screen shot shows the Custom Settings for HTML Embed.

== Video Tutorials ==

>The following video tutorials will walk you through configuring the "Responsive IFrame Watchdog" on you site and how to embed objects.

= [Administrator Settings](https://www.youtube.com/embed/7iQ3xwABAwI) =
https://www.youtube.com/embed/7iQ3xwABAwI

= [How to Embed YouTube Videos or Playlists](https://www.youtube.com/embed/edQQ_qnCiT8) =
https://www.youtube.com/embed/edQQ_qnCiT8

= [How to Embed Vimeo Videos](https://www.youtube.com/embed/Tcp16w2qvvc) =
https://www.youtube.com/embed/Tcp16w2qvvc

= [How to Embed Livestream Events or Videos](https://www.youtube.com/embed/ygfJyjQDjME) =
https://www.youtube.com/embed/ygfJyjQDjME

= [How to Embed Brightcove Videos](https://www.youtube.com/embed/9oSvlLZmhdg) =
https://www.youtube.com/embed/9oSvlLZmhdg

= [How to Embed Dailymotion Videos](https://www.youtube.com/embed/lMYoPfXQo1M) =
https://www.youtube.com/embed/lMYoPfXQo1M

= [How to Embed Videos from Other Service Providers](https://www.youtube.com/embed/Y39zwIi_qxg) =
https://www.youtube.com/embed/Y39zwIi_qxg

= [How to Embed HTML](https://www.youtube.com/embed/4OHpdFHUT3M) =
https://www.youtube.com/embed/4OHpdFHUT3M



== Changelog ==

= 1.0 =
* Initial Version.

== Upgrade Notice ==

= 1.1 =
Upgrade pending bug reports.

= 1.2 =
Fixed broken file path to lgr_responsive_iframe_watchdog.css in lgr_responsive_iframe_watchdog.php.
Fixed broken file path to lgr_responsive_iframe_watchdog.js in lgr_responsive_iframe_watchdog_options_page.php.
