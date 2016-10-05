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
        $row = $('<tr class="board-row">').css({height: fieldsize}).appendTo('#board');

        for (j = 0; j < boardSize; j++) {
            $('<td class="board-cell road">').css({width: fieldsize}).appendTo($row)
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

    function exitBus() {
        $('.bus').removeClass('occupied');
    }

    showPassenger();


    $(document).keydown(function(e) {
        var current = getCurrentPosition();
        var target = getTargetPosition(e.which);

        var isMoveValid = checkIfMoveIsValid(current, target);

        if (isMoveValid) {
            movePlayer(current, target);
        }




        function getTargetPosition(keycode) {
            switch(keycode) {
                case 37: return $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex - 1);
                case 38: return $boardRow.eq(passRowIndex - 1).find($boardCell).eq(passColIndex);
                case 39: return $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex + 1);
                case 40: return $boardRow.eq(passRowIndex + 1).find($boardCell).eq(passColIndex);
            }
        }

    });

    function getCurrentPosition() {
        return $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex);
    }





    // $(document).keydown(function (e) {
    //
    //     switch (e.which) {
    //
    //         case 37: // left
    //             // enter bus
    //             if ($boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex).hasClass('bus-stop') &&
    //                 $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex - 1).hasClass('bus')) {
    //                 passColIndex -= 1;
    //                 enterBus();
    //             }
    //
    //             // exit bus
    //             else if ($boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex).hasClass('bus') &&
    //                 $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex - 1).hasClass('bus-stop')) {
    //                 passColIndex -= 1;
    //                 exitBus();
    //                 showPassenger();
    //             }
    //
    //             // walk
    //             else if (passColIndex > 0 &&
    //                 $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex).not('.bus') &&
    //                 $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex - 1).hasClass('district')) {
    //                 passColIndex -= 1;
    //                 showPassenger();
    //             }
    //
    //             // cross road
    //             else if ($boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex - 3 ).hasClass('bus-stop') &&
    //             $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex).hasClass('bus-stop')) {
    //                 passColIndex -= 3;
    //                 showPassenger();
    //             }
    //             break;
    //
    //         case 38: // up
    //             if (passRowIndex > 0
    //             // && $boardRow.eq(passRowIndex - 1).find($boardCell).eq(passColIndex).hasClass('district')
    //             ) {
    //                 passRowIndex -= 1;
    //             }
    //             showPassenger();
    //             break;
    //
    //         case 39: // right
    //
    //             if ($boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex + 1).hasClass('bus') &&
    //                 $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex ).hasClass('bus-stop')) {
    //                 passColIndex += 1;
    //                 enterBus()
    //             } else if ($boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex + 1).hasClass('district')) {
    //                 passColIndex += 1;
    //                 showPassenger();
    //             } else if ($boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex).hasClass('bus-stop') &&
    //                 $boardRow.eq(passRowIndex).find($boardCell).eq(passColIndex + 3).hasClass('bus-stop')) {
    //                 passColIndex += 3;
    //                 showPassenger();
    //             }
    //             break;
    //
    //         case 40: // down
    //             if (passRowIndex < boardSize - 1
    //             // && $boardRow.eq(passRowIndex + 1).find($boardCell).eq(passColIndex).hasClass('district')
    //             ) {
    //                 passRowIndex += 1;
    //             }
    //             showPassenger();
    //             break;
    //
    //         default:
    //             return; // exit this handler for other keys
    //     }
    //     e.preventDefault(); // prevent the default action (scroll / move caret)
    // });

//CREATE AND MOVE BUS
    var busSpeed = 650,
        busRepeatTime = busSpeed * boardSize;

    function showBusPosition(y, x) {
        $('.bus').removeClass('bus');
        $boardRow.eq(y).find($boardCell).eq(x).addClass('bus');
        
        if ($boardCell.hasClass('occupied')) {
            $boardCell.removeClass('occupied');
            $boardRow.eq(y).find($boardCell).eq(x).addClass('occupied');
            passRowIndex = y;
            passColIndex = x;
        }
    }

    function moveBus() {
        var busRowIndex = 0,
            busColIndex = districtSize;
        setInterval(function () {
            if (busRowIndex < boardSize) {
                showBusPosition(busRowIndex, busColIndex);
                busRowIndex += 1;
            }
        }, busSpeed);
    }

    moveBus();
    setInterval(function () {
        moveBus();

    }, busRepeatTime);


    // });

});