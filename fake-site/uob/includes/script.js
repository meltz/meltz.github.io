jQuery(document).ready(function($) {

    // Scroll to top
    $.scrollUp ({
        scrollName: 'scroll-up',
        scrollDistance: 500,
        scrollSpeed: 200,
        animation: 'fade',
        scrollImg: true
    });

    // Analytics tracking, outbound link
    $('.outbound-link').on('click', function() {
        var microsite = '/ms/nyd21/' + ' - Outbound';
        var link = $(this).attr('href');

        gtag('event', 'Click', {
            'event_category': microsite,
            'event_label': link
        });
    });
});