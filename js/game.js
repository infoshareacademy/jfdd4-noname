/**
 * Created by piotrszefler on 29.09.16.
 */

$("#join").submit(function (e) {
    e.preventDefault();
});

// CREATE GAME BOARD

// $('input.button').click(function () {
$('#game').removeClass('inactive');
$('#join').addClass('inactive');
// window.location = '#game';

var boardSize = 32, //must be (number divisible by 3) + 8
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


//initial/current position
var passRowIndex = 5,
    passColIndex = 10;

function movePassenger() {
    $('#passenger').removeAttr('id');
    $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex).attr('id', 'passenger');
}

movePassenger();

$(document).keydown(function (e) {


    switch (e.which) {
        case 37: // left
            if (passColIndex > 0) {
                passColIndex -= 1;
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
            if (passColIndex < boardSize - 1) {
                passColIndex += 1;
                movePassenger();
            }
            break;

        case 40: // down
            if (passRowIndex < boardSize - 1) {
                passRowIndex += 1;
                movePassenger();
            }
            break;

        default:
            return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

// CREATE DISTRICTS
var districtStart = 2,
    districtSize = (boardSize - 8) / 3,
    boardEnd = boardSize - 1;


for (var i = districtStart; i <= boardEnd; i++) {
    if (i >= districtStart && i < districtStart + districtSize || i >= 2 * districtStart + districtSize && i < 2 * districtStart + 2 * districtSize || i >= 3 * districtStart + 2 * districtSize && i < 3 * districtStart + 3 * districtSize) {
        for (var j = districtStart; j <= boardEnd; j++) {
            if (j >= districtStart && j < districtStart + districtSize || j >= 2 * districtStart + districtSize && j < 2 * districtStart + 2 * districtSize || j >= 3 * districtStart + 2 * districtSize && j < 3 * districtStart + 3 * districtSize) {
                $boardRow.eq(i).find($boardCell).eq(j).addClass('district');
            }
        }
    }
}

// CREATE AND MOVE BUS
var busSpeed = 500;

function visualizeBusPosition(busRowIndex, busCellIndex) {
    $('.bus').removeClass('bus');
    $boardRow.eq(busRowIndex).find($boardCell).eq(busCellIndex).addClass('bus');
}




function callbackVisualizeBusPosition(busRowIndex, busCellIndex){
    return function(){
        console.log(busRowIndex, busCellIndex);
        visualizeBusPosition(busRowIndex, busCellIndex);
    }
}


function moveBus() {
    console.time('loop')
    var busRowIndex = 0, busCellIndex = 0;
    for (var x = 1; x <= boardSize; x++) {

        visualizeBusPosition(busRowIndex, busCellIndex);
        busRowIndex += 1;
        busCellIndex += 1;
        setTimeout(callbackVisualizeBusPosition(busRowIndex, busCellIndex), busSpeed);

    }
    console.timeEnd('loop')
}

moveBus();


// });

