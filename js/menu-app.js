/**
 * Created by Pamela on 2016-10-06.
 */

//SCROLL

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

//HIGHLIGHT THE ACTIVE MENU

          // var menuElem = menu.find("a");
       // //scroll animation
//     menuElem.click(function (e) {
//         var href = $(this).attr("href"),
//             offsetTop = href === "#" ? 0 : $(href).offset().top - menuHeight + 1;
//         $('html, body').stop().animate({
//             scrollTop: offsetTop
//         }, 400);
//         e.preventDefault();
//     });


    var $menu = $('#menu'),
        menuHeight = $menu.height();

    $(window).scroll(function() {
        var fromTop = $(this).scrollTop() + menuHeight - 15;

        var current = $('section.navigable').toArray().filter(function(s) {
            return s.offsetTop < fromTop
        }).pop();

        var activeClass = 'active-link';
        $('li', $menu).removeClass(activeClass);
        $('a[href="#' + current.getAttribute('id') +'"]').parent().addClass(activeClass);

    });



});








