$(document).ready(function () {


    $("#join").submit(function (e) {
        e.preventDefault();
    });


    // $('input.button').click(function () {
    $('#game').removeClass('inactive');
    $('#join').addClass('inactive');
    // window.location = '#game';

    var boardSize = 20, //must be even
        fieldsize = 100 / boardSize + '%';


    var roadSize = 2,
        districtSize = (boardSize - 2) / 2;

    function createBoard() {
        for (i = 0; i < boardSize; i++) {
            $row = $('<tr class="board-row">').css({height: fieldsize}).appendTo('#board');

            for (j = 0; j < boardSize; j++) {
                $('<td class="board-cell road">').css({width: fieldsize})
                    .attr('data-boardRow', i)
                    .attr('data-boardCell', j)
                    .appendTo($row)
            }
        }
    }

    createBoard();

    function findField (coordinates) {
        return $('.board-row').eq(coordinates.row).find($('.board-cell')).eq(coordinates.cell)
    }


    function createDistricts() {
        for (var i = 0; i < boardSize; i++) {
            if (i < districtSize || i >= districtSize + roadSize) {
                for (var j = 0; j < boardSize; j++) {
                    if (j < districtSize || j >= districtSize + roadSize) {
                        findField({row: i, cell: j}).addClass('district').removeClass('road');
                    }
                }
            }
        }
    }

    createDistricts();


    function createBusStop(x, y) {
        findField({row: x, cell: y}).addClass('bus-stop');
    }

    createBusStop(2, districtSize - 1);
    createBusStop(2, districtSize + roadSize);
    createBusStop(districtSize - 3, districtSize - 1);
    createBusStop(districtSize - 3, districtSize + roadSize);
    createBusStop(districtSize + roadSize + 2, districtSize - 1);
    createBusStop(districtSize + roadSize + 2, districtSize + roadSize);
    createBusStop(2 * districtSize - 1, districtSize - 1);
    createBusStop(2 * districtSize - 1, districtSize + roadSize);

    createBusStop(districtSize - 1, 2);
    createBusStop(districtSize + roadSize, 2);
    createBusStop(districtSize - 1, districtSize - 3);
    createBusStop(districtSize + roadSize, districtSize - 3);
    createBusStop(districtSize - 1, districtSize + roadSize + 2);
    createBusStop(districtSize + roadSize, districtSize + roadSize + 2);
    createBusStop(districtSize - 1, 2 * districtSize - 1);
    createBusStop(districtSize + roadSize, 2 * districtSize - 1);


// PLACE AND CONTROL PASSENGER

    var passInitPosition = { row: 2, cell: 7 };
    movePassenger(passInitPosition, passInitPosition);

    // var passPosition = findPassenger();

    function movePassenger(current, target) {
        if (checkIfMoveIsValid(current, target)) {
            findField(current).removeAttr('id');
            findField(target).attr('id', 'passenger');
        }
    }


    function checkIfMoveIsValid(current, target) {

        var start = findField(current),
            end = findField(target);

        if (start.hasClass('district') && end.hasClass('district') ||
            start.hasClass('bus-stop') && end.hasClass('bus-stop') ||
            start.hasClass('bus-stop') && end.hasClass('bus') ||
            start.hasClass('bus') && end.hasClass('bus-stop')) {
            return true;
        }
    }

    function findPassenger() {
        var player = document.getElementById('passenger');

        return {
            row: Number.parseInt(player.dataset.boardrow),
            cell: Number.parseInt(player.dataset.boardcell)
        }
    }


    $(document).keydown(function (e) {


        var passTarget = findPassenger();

        switch (e.which) {
            case 37: // left
                if (passTarget.cell > 0) {
                    passTarget.cell--;
                    if (findField({row: passTarget.row, cell: passTarget.cell-2}).hasClass('bus-stop') &&
                        findField(passTarget).hasClass('road') &&
                        findField(passTarget).hasClass('bus') == false) {
                        passTarget.cell -= 2;
                        movePassenger(findPassenger(), passTarget)
                    } else {
                        movePassenger(findPassenger(), passTarget);
                    }
                }
                break;

            case 38: // up
                if (passTarget.row > 0) {
                    passTarget.row--;
                    if (findField({row: passTarget.row-2, cell: passTarget.cell}).hasClass('bus-stop') &&
                        findField(passTarget).hasClass('road') &&
                        findField(passTarget).hasClass('bus') == false) {
                        passTarget.row -= 2;
                        movePassenger(findPassenger(), passTarget)
                    } else {
                        movePassenger(findPassenger(), passTarget);
                    }
                }
                break;

            case 39: // right
                passTarget.cell++;
                if (findField({row: passTarget.row, cell: passTarget.cell+2}).hasClass('bus-stop') &&
                    findField(passTarget).hasClass('road') &&
                    findField(passTarget).hasClass('bus') == false) {
                    passTarget.cell += 2;
                    movePassenger(findPassenger(), passTarget)
                } else {
                    movePassenger(findPassenger(), passTarget);
                }
                break;

            case 40: // down
                passTarget.row++;
                if (findField({row: passTarget.row + 2, cell: passTarget.cell}).hasClass('bus-stop') &&
                    findField(passTarget).hasClass('road') &&
                    findField(passTarget).hasClass('bus') == false) {
                    passTarget.row += 2;
                    movePassenger(findPassenger(), passTarget)
                } else {
                    movePassenger(findPassenger(), passTarget);
                }
                break;

            default:
                return;
                break;
        }
        e.preventDefault();


    });


    function enterBus() {
        if (findPassenger() == busTarget) {
            findField(findPassenger()).removeAttr('id');
            $('.bus').addClass('occupied');
        }
    }
    //
    // function exitBus() {
    //     $('.bus').removeClass('occupied');
    // }
//
//
//CREATE AND MOVE BUS
    var busSpeed = 550,
        busRepeatTime = busSpeed * boardSize;

    var busTarget = {row: 0, cell: districtSize},
        busLoop;

    function showBusPosition(target) {
        $('.bus').removeClass('bus');
        findField(target).addClass('bus');
        if ($('.board-cell').hasClass('occupied')) {
            $('.board-cell').removeClass('occupied');
            findField(busTarget).addClass('occupied');
        }
    }

    function nextMove() {
        if (busTarget.row < boardSize) {
            busTarget.row += 1;
        } else {
            busTarget.row = 0;
        }
    }

    function moveBus() {
        busLoop = setInterval(function () {
            showBusPosition(busTarget);
            nextMove();
        }, busSpeed)
    }


    moveBus();

});

