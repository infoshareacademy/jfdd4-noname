/**
 * Created by Pamela on 2016-10-06.
 */

$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#back-to-top').removeClass('active-scroll').fadeIn(400);
        } else {
            $('#back-to-top').fadeOut(400);
        }
    });

    $('#back-to-top').click(function () {
        $("html, body").animate({
                scrollTop: 0
            },
            600);
        $(this).addClass('active-scroll');
    });

});


