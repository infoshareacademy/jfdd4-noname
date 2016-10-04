/**
 * Created by piotrszefler on 29.09.16.
 */

$(document).ready(function () {


    $("#join").submit(function (e) {
        e.preventDefault();
    });

// CREATE GAME BOARD

    // $('input.button').click(function () {
    $('#game').removeClass('inactive');
    $('#join').addClass('inactive');
    // window.location = '#game';

    var boardSize = 20, //must be even
        fieldsize = 100 / boardSize + '%',
        $row;


    for (i = 0; i < boardSize; i++) {
        $row = $('<tr class="board-row">').appendTo('#board');

        for (j = 0; j < boardSize; j++) {
            $('<td class="board-cell road">').css('width', fieldsize).appendTo($row)
        }
    }

// CREATE DISTRICTS
    var $boardRow = $('.board-row'),
        $boardCell = $('.board-cell');

    var roadSize = 2,
        districtSize = (boardSize - 2) / 2;


    for (var i = 0; i < boardSize; i++) {
        if (i < districtSize || i >= districtSize + roadSize) {
            for (var j = 0; j < boardSize; j++) {
                if (j < districtSize || j >= districtSize + roadSize) {
                    $boardRow.eq(i).find($boardCell).eq(j).addClass('district');
                }
            }
        }
    }

// CREATE BUS STOPS
    function createBusStop(x, y) {
        $boardRow.eq(x).find($boardCell).eq(y).addClass('bus-stop');
    }

    createBusStop(2, districtSize - 1);
    createBusStop(2, districtSize + roadSize);
    createBusStop(districtSize - 3, districtSize - 1);
    createBusStop(districtSize - 3, districtSize + roadSize);
    createBusStop(districtSize + roadSize + 2, districtSize - 1);
    createBusStop(districtSize + roadSize + 2, districtSize + roadSize);
    createBusStop(2 * districtSize - 1, districtSize - 1);
    createBusStop(2 * districtSize - 1, districtSize + roadSize);


// PLACE AND CONTROL PASSENGER

    var passRowIndex = 6,
        passColIndex = 7;

    function showPassenger() {
        $('#passenger').removeAttr('id');
        $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex).attr('id', 'passenger');
    }

    function enterBus() {
        $('#passenger').removeAttr('id');
        $('.bus').addClass('occupied');
    }

    showPassenger();

    $(document).keydown(function (e) {

        switch (e.which) {

            case 37: // left
                if (passColIndex > 0 && $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex - 1).hasClass('district')) {
                    passColIndex -= 1;
                } else if ($boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex).hasClass('bus-stop')) {
                    passColIndex -= 3;
                }
                showPassenger();
                break;

            case 38: // up
                if (passRowIndex > 0
                // && $boardRow.eq(passRowIndex - 1).find($boardCell).eq(passColIndex).hasClass('district')
                ) {
                    passRowIndex -= 1;
                }
                showPassenger();
                break;

            case 39: // right

                if ($boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex + 1).hasClass('bus')) {
                    enterBus()
                } else if ($boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex + 1).hasClass('district')) {
                    passColIndex += 1;
                    showPassenger();
                } else if ($boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex).hasClass('bus-stop')) {
                    passColIndex += 3;
                    showPassenger();
                }
                break;

            case 40: // down
                if (passRowIndex < boardSize - 1
                // && $boardRow.eq(passRowIndex + 1).find($boardCell).eq(passColIndex).hasClass('district')
                ) {
                    passRowIndex += 1;
                }
                showPassenger();
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

//CREATE AND MOVE BUS
    var busSpeed = 650,
        busRepeatTime = busSpeed * boardSize;

    function showBusPosition(x, y) {
        $('.bus').removeClass('bus');
        $boardRow.eq(x).find($boardCell).eq(y).addClass('bus');

        if ($boardCell.hasClass('occupied')) {
            $boardCell.removeClass('occupied');
            $boardRow.eq(x).find($boardCell).eq(y).addClass('occupied');
        }
    }

    function moveBus() {
        var busRowIndex = 0,
            busColIndex = districtSize;

        setInterval(function () {
            if (busRowIndex < boardSize) {
                showBusPosition(busRowIndex, busColIndex);
                busRowIndex += 1;
                console.log(busRowIndex)
            }
        }, busSpeed);
    }

    moveBus();
    setInterval(function () {
        moveBus();
    }, busRepeatTime);


    // });

});

// function moveBusOne() {
//     var Y = boardSize/2 -1;
//     var X = -1;
//     function addBus() {
//         // $bus = $('td[x=' + 0 + '][y=' + 2 + ']').addClass('emptybus');
//     }
//
//     addBus();
//     var move = setInterval(function () {
//         // $("tr:eq(" + Y + ") td:eq(" + X + ")").addClass('emptybus');
//         if (X <= boardSize) {
//             $("tr:eq(" + Y + ") td:eq(" + X + ")").removeClass('emptybus');
//             X++;
//             $("tr:eq(" + Y + ") td:eq(" + X + ")").addClass('emptybus')
//         }
//         else {
//
//             clearInterval(move);
//
//             $("tr:eq(" + Y + ") td:eq(" + X + ")").removeClass('emptybus');
//         }
//     }, busSpeed);
// }
//
// moveBusOne();
// repeatBusMove();