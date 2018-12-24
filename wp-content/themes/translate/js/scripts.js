(function($){
    $(document).on('ready', function(){
        var headerIframe = window.parent.document.querySelector('.header-iframe');
        if (headerIframe) {
            document.getElementById('mobile-navigation-btn').addEventListener('click', function(e){
                console.log($('.header-iframe'));
                $(headerIframe).toggleClass('iframe-menu-enabled');  
            });
        }
            
    })
})(jQuery)