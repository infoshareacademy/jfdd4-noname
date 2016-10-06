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

    var lastId,
        menu = $("#menu"),
        menuHeight = menu.outerHeight() + 15,
        // All list items
        menuElem = menu.find("a"),
        // Anchors corresponding to menu items
        scrollElem = menuElem.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) {
                return item;
            } // it returns 5 sekcji "#"

        });


//scroll animation
    menuElem.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - menuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 400);
        e.preventDefault();
    });

//bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + menuHeight;

        // Get id of current scroll item
        var cur = scrollElem.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            menuElem
                .parent().removeClass("active-link")
                .end().filter("[href='#" + id + "']")
                .parent().addClass("active-link");
        }
    });


    // $(document).on("scroll", activeMenu);
    // $('a[href^="#"]').on('click', function (e) {
    //     e.preventDefault();
    //     $(document).off("scroll");
    //
    //     $('a').each(function () {
    //         $(this).removeClass('active');
    //
    //     });
    //     $(this).addClass('active');
    //     var target = this.hash,
    //         menu = target;
    //     $target = $(target);
    //     $('html, body').stop().animate({
    //         'scrollTop': $target.offset().top
    //     }, 500, 'swing', function () {
    //         window.location.hash = target;
    //         $(document).on("scroll", activeMenu);
    //     });
    // });
    //
    // function activeMenu(event) {
    //     $('#menu li a').each(function () {
    //         var scrollPosTop = $(document).scrollTop();
    //         var currentSection = $(this);
    //         var refSection = $(currentSection.attr("href")).position().top;
    //         if (refSection <= scrollPosTop && refSection > scrollPosTop) {
    //             $('#menu li a').removeClass('active');
    //             currentSection.addClass('active');
    //         } else {
    //             currentSection.removeClass('active');
    //         }
    //     })
    // }

});








