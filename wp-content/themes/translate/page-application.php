<?php 
    if (!is_user_logged_in()) {
        header('Location: /log-in/');    
    }
?>

<script>
    window.userData = [
        '<?=admin_url('admin-ajax.php'); ?>',
        '<?=wp_create_nonce('gecktranslate'); ?>',
        <?=get_current_user_id(); ?>    
    ]
</script>
<?php 
/*
    Template Name: Application
*/

require_once "app/build/index.html";