var size = 10;


$(document).ready(function () {


    var $form = $('input.button');
    $form.on('click', function (event) {
        event.preventDefault();
        $('.game-area').removeClass('game-area').addClass('game-start');


        var $row, $cell;

        for (var rowNum = 0; rowNum < size; rowNum++) {
            $row = $('<tr>').appendTo('#game');
            for (var cellNum = 0; cellNum < size; cellNum++) {
                $cell = $('<td>').addClass('cell').appendTo($row);

                // var isBlack = rowNum % 2 ? cellNum % 2 : !(cellNum % 2);

                // if (isBlack) {
                //     $cell.addClass('black')
                //         .attr('data-color', 'jestem czarny!!');
                //
                // } else {
                //     $cell.addClass('white').attr('data-color', 'jestem bialy!!');
                // }


            }
        }

    $('#game').find('tr').eq().addClass('road');
    $('#game').find('tr').eq(3).addClass('road');
    $('#game').find('tr').eq(4).addClass('road');


    });
});

