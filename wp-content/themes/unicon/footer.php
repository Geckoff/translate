	<?php global $minti_data; ?>
	
	<?php if($minti_data['switch_footerwidgets'] == 1 && get_post_meta( get_the_ID(), 'minti_footerwidgets', true ) != 'hide') { ?>
		<?php $footercolumns = (!empty($minti_data['select_footercolumns'])) ? $minti_data['select_footercolumns'] : '4';
		
			if($footercolumns == '1'){
				$footercolumns_class = 'sixteen';
			} else if($footercolumns == '2'){
				$footercolumns_class = 'eight';
			} else if($footercolumns == '3'){
				$footercolumns_class = 'one-third';
			} else if($footercolumns == '4'){
				$footercolumns_class = 'four';
			} 

		?>

		<footer id="footer">
			<div class="container">
				<div class="<?php echo esc_attr($footercolumns_class); ?> columns"><?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('Footer Widgets 1')); ?></div>
				<?php if($footercolumns == '2' || $footercolumns == '3' || $footercolumns == '4') { ?>
				<div class="<?php echo esc_attr($footercolumns_class); ?> columns"><?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('Footer Widgets 2')); ?></div>
				<?php } ?>
				<?php if($footercolumns == '3' || $footercolumns == '4') { ?>
				<div class="<?php echo esc_attr($footercolumns_class); ?> columns"><?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('Footer Widgets 3')); ?></div>
				<?php } ?>
				<?php if($footercolumns == '4') { ?>
				<div class="<?php echo esc_attr($footercolumns_class); ?> columns"><?php if (function_exists('dynamic_sidebar') && dynamic_sidebar('Footer Widgets 4')); ?></div>	
				<?php } ?>
			</div>
		</footer>
	<?php } ?>
	
	<?php if($minti_data['switch_copyright'] == 1 && get_post_meta( get_the_ID(), 'minti_footercopyright', true ) != 'hide') { ?>
	<div id="copyright" class="clearfix">
		<div class="container">
			
			<div class="sixteen columns">

				<div class="copyright-text copyright-col1">
					<?php if($minti_data['textarea_copyright'] != "") { ?>
						<?php echo wp_kses_post($minti_data['textarea_copyright']); ?>
					<?php } else { ?>
						&copy; <?php _e('Copyright', 'minti') ?> <?php echo esc_html(date("Y ")); esc_html(bloginfo('name')); ?>
					<?php } ?>
				</div>
				
				<div class="copyright-col2">
					<?php if($minti_data['select_copyright'] == 'Navigation') { ?>
						<?php if(has_nav_menu('footer_navigation')) {
						    wp_nav_menu( array( 'theme_location' => 'footer_navigation' ) ); 
						} ?>
					<?php } elseif($minti_data['select_copyright'] == 'Social Media') { ?>
						<?php get_template_part( 'framework/inc/socialmedia' ); ?>
					<?php } elseif($minti_data['select_copyright'] == 'Leave Empty') { } ?>
				</div>

			</div>
			
		</div>
	</div><!-- end copyright -->
	<?php } ?>
		
	</div><!-- end wrapall / boxed -->
	
	<?php if($minti_data['select_backtotop'] != 'hide') { ?>
	<div id="back-to-top"><a href="#"><i class="fa fa-chevron-up"></i></a></div>
	<?php } ?>
	
	<?php wp_footer(); ?>
</body>

</html>