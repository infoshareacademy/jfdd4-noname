/**
 * Created by piotrszefler on 27.09.16.
 */

$('.menu-trigger a').click(function() {
    $('#menu').toggleClass('active');
});

$(window).resize(function () {
   if ($(window).width() >= 900) {
       $('#menu').removeClass('active');
   }
});

$('#menu').find('li>a').click(function () {
    $('#menu').removeClass('active');
});