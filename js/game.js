/**
 * Created by piotrszefler on 29.09.16.
 */

$("#join").submit(function(e) {
    e.preventDefault();
});

// CREATE GAME BOARD

$('input.button').click(function () {
    $('#game').removeClass('inactive');
    $('#join').addClass('inactive');
    // window.location = '#game';

    var boardSize = 32,
        fieldsize = 100 / boardSize + '%',
        $row;


    for (i = 0; i < boardSize; i++) {
        $row = $('<tr class="board-row">').appendTo('#board');

        for (j = 0; j < boardSize; j++) {
            $('<td class="board-cell">').css('width', fieldsize).appendTo($row)
        }
    }


    // PLACE AND MOVE PASSENGER
    var $boardRow = $('.board-row'),
        $boardCell = $('.board-cell');
    $passenger = $('#passenger');


    //current position
    var passRowIndex = 0,
        passCellIndex = 0;

    function movePassenger() {
        $('#passenger').removeAttr('id');
        $boardRow.eq(passRowIndex).find($boardCell).eq(passCellIndex).attr('id', 'passenger');
    }

    movePassenger();

    // MOVE PASSENGER WITH ARROWS
    $(document).keydown(function(e) {


        switch(e.which) {
            case 37: // left
                if (passCellIndex > 0) {
                    passCellIndex -= 1;
                    movePassenger();
                }
                break;

            case 38: // up
                if (passRowIndex > 0) {
                    passRowIndex -= 1;
                    movePassenger();
                }
                break;

            case 39: // right
                if (passCellIndex < boardSize - 1) {
                    passCellIndex += 1;
                    movePassenger();
                }
                break;

            case 40: // down
                if (passRowIndex < boardSize - 1) {
                    passRowIndex += 1;
                    movePassenger();
                }
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    // CREATE DISTRICTS
    var districtStart = 0,
        distrctEnd = boardSize -1;

    for (var i = districtStart; i <= distrctEnd; i++) {
        if (i > 1 && i < 10 || i > 11 && i < 20 || i > 21 && i < 30) {
            for (var j = districtStart; j <= distrctEnd; j++) {
                if (j > 1 && j < 10 || j > 11 && j < 20 || j > 21 && j < 30) {
                    $boardRow.eq(i).find($boardCell).eq(j).addClass('district');
                }
            }
        }

    }


});

