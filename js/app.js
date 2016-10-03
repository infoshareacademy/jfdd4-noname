/**
 * Created by piotrszefler on 27.09.16.
 */

var $menu = $('#menu');

$(document).mouseup(function (e) {

    if (!$menu.is(e.target) &&
        $menu.has(e.target).length === 0) {
    $menu.removeClass('active');
    }
});

$(window).resize(function () {
   if ($(window).width() >= 900) {
       $('#menu').removeClass('active');
   }
});

$('.menu-trigger a').click(function() {
    $('#menu').toggleClass('active');
});


$menu.find('li>a').click(function () {
    $('#menu').removeClass('active');
});
