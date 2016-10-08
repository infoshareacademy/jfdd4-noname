// var size = 10;
//
//
// $(document).ready(function () {
//
//     // Initialize
//
//
//     var $form = $('input.button');
//     $form.on('click', function (event) {
//         event.preventDefault();
//         $('.game-area').removeClass('game-area').addClass('game-start');
//
//
//         var $row, $cell, inc=1, incTwo=0;
//
//         for (var rowNum = 0; rowNum < size; rowNum++) {
//             $row = $("<tr id=" + incTwo  + "></tr>").appendTo('#game');
//             incTwo++;
//             for (var cellNum = 0; cellNum < size; cellNum++) {
//                 $cell = $("<td id=" + incTwo+ inc + "></td>").addClass('cell').appendTo($row);
//                 inc++;
//                 // var isBlack = rowNum % 2 ? cellNum % 2 : !(cellNum % 2);
//
//                 // if (isBlack) {
//                 //     $cell.addClass('black')
//                 //         .attr('data-color', 'jestem czarny!!');
//                 //
//                 // } else {
//                 //     $cell.addClass('white').attr('data-color', 'jestem bialy!!');
//                 // }
//
//
//             }
//         }
//
//
//         ///Adding img bus
//
// function moveBus() {
//
// }
//
//
//     });
//
//
//
// });
//
$(document).ready(function () {
    var $position,
        $passenger,
        $bus,
        $road;

// CREATE TABLE
    var $container,
        $gameBoard;


    function createGameBoard(boardSize) {
        var $table, $tr, $td;
        $table = $('<table id="board">');
        for (var y = 0; y < boardSize; y++) {
            $tr = $('<tr class="board-row">');
            for (var x = 0; x < boardSize; x++) {
                $td = $('<td class="board-cell">');
                $td.attr('x', x).attr('y', y).appendTo($tr);
            }
            $table.append($tr);
        }
        return $table;
    }

    var boardSize = 16; // always even number!!!!
    $container = $('#busGame');
    $gameBoard = createGameBoard(boardSize);
    $container.append($gameBoard);

    // function movePassenger(key) {
    //     switch (key) {
    //         case 38:
    //             moveIn();
    //             break;
    //         case 40:
    //             moveOut();
    //             break;
    //     }
    // }

    function addPassenger() {
        $passenger = $('td[x=' + 1 + '][y=' + 1 + ']');
        $position = $passenger;
        $position.addClass('passenger');
    }

    addPassenger();

    function addRoad() {
        var X = 0;
        var Y = boardSize/2;


        for (; X < boardSize; X++) {
            $("tr:eq(" + Y + ") td:eq(" + X + ")").addClass('road');
            $("tr:eq(" + (Y - 1) + ") td:eq(" + X + ")").addClass('road');
            $("tr:eq(" + X + ") td:eq(" + (Y - 1) + ")").addClass('road');
            $("tr:eq(" + X + ") td:eq(" + Y + ")").addClass('road');
        }
    }

    addRoad();

    var busSpeed = 500,
        busRepeatTime = busSpeed * boardSize;

    function repeatBusMove() {
        setInterval(function () {
            moveBusOne();
        }, busRepeatTime);
    }

    function moveBusOne() {
        var Y = boardSize/2 -1;
        var X = -1;
        function addBus() {
            // $bus = $('td[x=' + 0 + '][y=' + 2 + ']').addClass('emptybus');
        }

        addBus();
        var move = setInterval(function () {
            // $("tr:eq(" + Y + ") td:eq(" + X + ")").addClass('emptybus');
            if (X <= boardSize) {
                $("tr:eq(" + Y + ") td:eq(" + X + ")").removeClass('emptybus');
                X++;
                $("tr:eq(" + Y + ") td:eq(" + X + ")").addClass('emptybus')
            }
            else {

                clearInterval(move);

                $("tr:eq(" + Y + ") td:eq(" + X + ")").removeClass('emptybus');
            }
        }, busSpeed);
    }

    moveBusOne();
    repeatBusMove();

});