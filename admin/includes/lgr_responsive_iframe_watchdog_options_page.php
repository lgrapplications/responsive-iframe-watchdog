<?php



function lgrriw_options_page() { 

	// End Default PHP scripting

	?>

    <div class="wrap">

	<form action='options.php' method='post'>

		<?php wp_nonce_field( 'lgrriw_secure_iframe_submit' ); ?>

	    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

		<h2>Responsive Iframe Watchdog</h2>

        <p>By Larry Robertson</p>



		<?php

		submit_button();

		settings_fields( 'lgrriw_pluginPage' );

		do_settings_sections( 'lgrriw_pluginPage' );

		global $wpdb; // Get reference to the global wordpress database

		$adminURL = admin_url();

		//print "<p>$adminURL</p>"; // uncomment to debug

		$blogPrefix = $wpdb->get_blog_prefix(BLOG_ID_CURRENT_SITE);

		$sql = "SELECT " . $blogPrefix . "posts.post_title, " . $blogPrefix . "posts.ID, " . $blogPrefix . "posts.guid, " . $blogPrefix . "posts.post_content FROM " . $blogPrefix . "posts WHERE " . $blogPrefix . "posts.post_type = 'post' AND " . $blogPrefix . "posts.post_status = 'publish' AND (" . $blogPrefix . "posts.post_content LIKE '%src=%' OR " . $blogPrefix . "posts.post_content LIKE '%[embed]%') ORDER BY " . $blogPrefix . "posts.post_date DESC";

		//print "<p>$sql</p>";

		$results = $wpdb->get_results( $sql, OBJECT );



		if ( count( $results ) > 0 ): ?>

            <h2 class='h2_violations'>List of Violations</h2><br/>

			<?php settings_errors(); ?>

            <span>Only public posts and pages are shown.</span>

            <div>Violations Count: <span class='violation_count'>0</span></div>

            <div class='wallpapered'>

                <!--<div class='background'>Congratulations! You have no untrusted domains for embeds</div>-->

                <section class='violations_section'>

                    <div class='container'>

                        <table class='ctable' id='lgrriw_secure_iframe_results'>

                            <colgroup>

                                <col class="table_column_1">

                                <col class="table_column_2">

                                <col class="table_column_3">

                                <col class="table_column_4">

                                <col class="table_column_5">

                                <col class="table_column_6">

                                <col class="table_column_7">

                            </colgroup>

                            <thead class='cthead'>

                                <tr class="header">

                                    <th class='cth'>Post ID<div>Post ID</div></th>

                                    <th class='cth'>Title<div>Title</div></th>

                                    <th class='cth'>Preview Post<div>Preview Post</div></th>

                                    <th class='cth'>Edit Post<div>Edit Post</div></th>

                                    <th class='cth'>HTTP Status<div>HTTP Status</div></th>

                                    <th class='cth'>Tag/Shortcode<div>Tag/Shortcode</div></th>

                                    <th class='cth'>Add to Trusted List<div>Add to Trusted List</div></th>

                                    <th class='cth'>Untrusted Domain<div>Untrusted Domain</div></th>

                                </tr>

                            </thead>

                            <tbody class='ctbody'>

                                <?php

                                foreach ( $results as $row ) {

									$domain_pattern ='/src *= *["\']?([^"\']*)|\[embed(.*)\[\/embed\]/i';

									$searchTagHaystack = $row->post_content;

									$searchTagHaystack = str_replace("[", "<", $searchTagHaystack );

									$searchTagHaystack = str_ireplace("&lt;", "<", $searchTagHaystack );

									preg_match_all ( $domain_pattern, $row->post_content, $domain_matches, PREG_OFFSET_CAPTURE );

									foreach ($domain_matches[0] as $domain_match){

										$url = str_ireplace('src="','', $domain_match[0]);

										$isEmbedShortcodeTag = false;

										// Is the a shortcode embed?

										if (stripos($url, '[embed') !== false) {

											$isEmbedShortcodeTag = true;

										}

										$url = str_ireplace('[embed]','', $url);

										$url = str_ireplace('[/embed]','', $url);

										//print '<p>' . $url . '</p>'; // uncomment to debug

										$positionFound = $domain_match[1];

										// Get the tag name associated with the src by searching

										// backwards from the position found for an '<'

										$containingElementStartPosition = 0;

										for( $i = $positionFound; $i >= 0; $i-- ) {

											$char = substr( $searchTagHaystack, $i, 1 );

											if( $char == "<" ){

												$containingElementStartPosition = $i;

												break;

											}

										}											

										$containingElementEndPosition = strpos( $searchTagHaystack, ' ', $containingElementStartPosition);

										$containingElement = substr( $searchTagHaystack, $containingElementStartPosition + 1, $containingElementEndPosition - $containingElementStartPosition );

										// Was the tag [embed]?

										if( $isEmbedShortcodeTag == true ){

											$containingElement = 'embed';

										}

										// Satisfy parse_url by adding a protocol

										if( substr( $url, 0, 4 ) !== "http" ){

											$url = "https:" . $url;

										}

										// Get the domain name

										$domainName = parse_url($url, PHP_URL_HOST);





										// Check Valid Domains and Protocol and only create a row

										// if there is a violation

										$options = get_option( 'lgrriw_settings' );

										// Get the HTTP checkbox note returns nothing if not checked

										$allowHTTP = $options['lgrriw_checkbox_allow_html'];

										// Make it 0 if its not 1 to get around the problem of the checkbox not being checked

										if( $allowHTTP != 1 ){

											$allowHTTP = 0;

										}

										$validDomains = $options['lgrriw_textarea_valid_domains'];

										$domainNameNotTrusted = false;

										$httpViolation = false;

										if( (strpos($validDomains, $domainName) == false) ){

											$domainNameNotTrusted = true;

										}

										if( ( substr( $url, 0, 5 ) == "http:" && $allowHTTP !== 1) ){

											$httpViolation = true;

										}

										

										

										if( $domainNameNotTrusted == true || $httpViolation == true ){

											print "<tr class='ctr'>";

											print "<td class='ctd'>" .  esc_html( $row->ID ) . "</td>";

											if($row->post_title == ''){

												print "<td class='ctd'>" .  'untitled' . "</td>";

											}

											else{

												print "<td class='ctd'>" .  esc_html( $row->post_title ) . "</td>";

											}

											$editLink = $adminURL . "post.php?post=" . $row->ID . "&action=edit";

											print "<td class='ctd'><a href='" . esc_html( $row->guid ) . "' title='Preview this post' target='new'>Preview this post</a></td>";

											print "<td class='ctd'><a href='" . $editLink . "' title='Edit this post' target='new'>Edit this post</a></td>";

											// Get the options settings, remove any empty domain names and create bool (0 or 1) for checkbox

											$options = get_option( 'lgrriw_settings' );

											// Get the HTTP checkbox note returns nothing if not checked

											$allowHTTP = $options['lgrriw_checkbox_allow_html'];

											// Make it 0 if its not 1 to get around the problem of the checkbox not being checked

											if( $allowHTTP != 1 ){

												$allowHTTP = 0;

											}

											if( $allowHTTP == 1){

												print "<td class='ctd http_message'><span class='good_http'>Good</span></td>";

											}

											elseif( $allowHTTP == 0 && substr( $url, 0, 5 ) == "http:" ){

												print "<td class='ctd http_message'><span class='bad_http'>HTTP not allowed</span></td>";

											}

											else{

												print "<td class='ctd http_message'><span class='good_http'>Good</span></td>";

											}

											print "<td class='ctd'>$containingElement</td>";

											print "<td class='ctd'><input class='insert' name='insert' type='button' value='Add to Trusted List' /></td>";

											print "<td class='ctd domains'>";

											if( trim( $domainName ) == '' ){

												print "<span class='span_red'>Invalid URL: </span>" . esc_html( $url );

											}

											else{

												print esc_html( $domainName );

											}

											print "</td>";

											print "</tr>";

										}

									}

                                }

                                ?>

                            </tbody>

                        </table>

                    </div>

                </section>

			</div>

		<?php else: ?>

			<p>Your Blog Site has no embeds.</p>

		<?php endif;

			submit_button();

			wp_register_script( 'lgrriw_responsive_iframe_watchdog', plugins_url( 'responsive-iframe-watchdog/admin/js/lgr_responsive_iframe_watchdog.js') );

			wp_enqueue_script( 'lgrriw_responsive_iframe_watchdog' );

		?>

	</form>

    </div>

	<?php



}

?>