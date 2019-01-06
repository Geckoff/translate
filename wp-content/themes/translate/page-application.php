<?php 
    if (!is_user_logged_in()) {
        header('Location: /log-in/');    
    }
?>

<script>
    window.userData = [
        '<?=admin_url('admin-ajax.php'); ?>',
        '<?=wp_create_nonce('gecktranslate'); ?>',
        <?=get_current_user_id(); ?>,
        '<?=get_home_url(); ?>'
    ];

    
    document.addEventListener('DOMContentLoaded', function(){
        var headerIframe = document.querySelector('.header-iframe');
            footerIframe = document.querySelector('.footer-iframe');
        headerIframe.setAttribute('src', window.userData[3] + '/profile-bar/');    
        footerIframe.setAttribute('src', window.userData[3] + '/footer-page/'); 
        headerIframe.contentWindow.location = window.userData[3] + '/profile-bar/';
        footerIframe.contentWindow.location = window.userData[3] + '/footer-page/';
    }, false);
          
    
</script>
<?php 
/*
    Template Name: Application
*/

require_once "app/build/index.html";