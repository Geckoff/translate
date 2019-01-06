(function($){
    $(document).on('ready', function(){ 
        var headerIframe = window.parent.document.querySelector('.header-iframe');
        if (headerIframe) {
            document.getElementById('mobile-navigation-btn').addEventListener('click', function(e){
                $(headerIframe).toggleClass('iframe-menu-enabled');  
            });
        }
            
    })
})(jQuery)