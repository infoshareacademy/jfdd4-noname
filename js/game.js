/**
 * Created by piotrszefler on 29.09.16.
 */

$("#join").submit(function(e) {
    e.preventDefault();
});

// CREATE GAME BOARD

// $('input.button').click(function () {
//     $('#game').removeClass('inactive');
//     window.location = '#game';

    var boardSize = 20,
        $row;


    for (i = 0; i < boardSize; i++) {
        $row = $('<tr class="board-row">').appendTo('#board');

        for (j = 0; j < boardSize; j++) {
            $('<td class="board-cell">').appendTo($row)
        }
    }


// });

// PUT PASSENGER ON THE BOARD
var $passRow = $('.board-row'),
    $passCell = $('.board-cell');
    $passenger = $('td#passenger');

//current position
var passRowIndex = 0,
    passCellIndex = 0;

$passRow.eq(passRowIndex).find($passCell).eq(passCellIndex).attr('id', 'passenger');

// MOVE PASSENGER WITH ARROWS

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
            if (passCellIndex > 0) {
                $passCell.removeAttr('id');
                passCellIndex -= 1;
                $passRow.eq(passRowIndex).find($passCell).eq(passCellIndex).attr('id', 'passenger');
            }
            break;

        case 38: // up
            if (passRowIndex > 0) {
                $passCell.removeAttr('id');
                passRowIndex -= 1;
                $passRow.eq(passRowIndex).find($passCell).eq(passCellIndex).attr('id', 'passenger');
            }
            break;

        case 39: // right
            if (passCellIndex < 19) {
                $passCell.removeAttr('id');
                passCellIndex += 1;
                $passRow.eq(passRowIndex).find($passCell).eq(passCellIndex).attr('id', 'passenger');
            }
            break;

        case 40: // down
            if (passRowIndex < 19) {
                $passCell.removeAttr('id');
                passRowIndex += 1;
                $passRow.eq(passRowIndex).find($passCell).eq(passCellIndex).attr('id', 'passenger');
            }
            break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});