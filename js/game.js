/**
 * Created by piotrszefler on 29.09.16.
 */

$("#join").submit(function(e) {
    e.preventDefault();
});

$('input.button').click(function () {
    $('#game').removeClass('inactive');

    for (i = 0; i < 4; i++) {
        var $row = $('<tr>').appendTo('#board');

        for (j = 0; j < 4; j++) {
            $row.append('<td>')
        }
    }
});

