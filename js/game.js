// $(document).ready(function () {
//
//
//     $("#join").submit(function (e) {
//         e.preventDefault();
//         $('#game').removeClass('inactive');
//         $('#join').addClass('inactive');
//         $('#border-inactive').addClass('border-inactive');
//     });
//
// });


// CREATE GAME BOARD


// $('input.button').click(function () {
$('#game').removeClass('inactive');
$('#join').addClass('inactive');
// window.location = '#game';

var boardSize = 20, //must be even
    fieldsize = (100 / boardSize) + '%',
    $row;


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

function findField(coordinates) {
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

var passInitPosition = {row: 2, cell: 7};
movePassenger(passInitPosition, passInitPosition);


function movePassenger(current, target) {
    if (checkIfMoveIsValid(current, target)) {
        findField(current).removeAttr('id');
        findField(target).attr('id', 'passenger');
    }
}

function checkIfMoveIsValid(current, target) {

    var start = findField(current),
        end = findField(target);

    if (start.hasClass('district') && end.hasClass('district')
        // || start.hasClass('bus-stop') && end.hasClass('bus-stop')
    ) {
        return true;
    }
    else if (start.hasClass('bus-stop') && end.hasClass('bus')) {
        enterBus(target);
        return true;
    }
    else if (start.hasClass('bus') && end.hasClass('bus-stop')) {
        exitBus();
        return true;
    }
}


function enterBus(bus) {
    findField(bus).addClass('occupied');
}

function exitBus() {
    $('.bus').removeClass('occupied');
}

function findPassenger() {
    var player = document.getElementById('passenger');

    return {
        row: Number.parseInt(player.dataset.boardrow),
        cell: Number.parseInt(player.dataset.boardcell)
    }
}

function findBus(line) {
    var bus = document.getElementsByClassName(line)[0];

    return {
        row: Number.parseInt(bus.dataset.boardrow),
        cell: Number.parseInt(bus.dataset.boardcell)
    }
}


$(document).keydown(function (e) {


    var passTarget = findPassenger();

    switch (e.which) {
        case 37: // left
            if (passTarget.cell > 0) {
                passTarget.cell--;
                // if (findField({row: passTarget.row, cell: passTarget.cell - 2}).hasClass('bus-stop') &&
                //     findField(passTarget).hasClass('road') &&
                //     findField(passTarget).hasClass('bus') == false) {
                //     passTarget.cell -= 2;
                //     movePassenger(findPassenger(), passTarget)
                // }
                movePassenger(findPassenger(), passTarget);
            }
            break;

        case 38: // up
            if (passTarget.row > 0) {
                passTarget.row--;
                // if (findField({row: passTarget.row - 2, cell: passTarget.cell}).hasClass('bus-stop') &&
                //     findField(passTarget).hasClass('road') &&
                //     findField(passTarget).hasClass('bus') == false) {
                //     passTarget.row -= 2;
                // }
                movePassenger(findPassenger(), passTarget);
            }
            break;

        case 39: // right
            passTarget.cell++;
            // if (findField({row: passTarget.row, cell: passTarget.cell + 2}).hasClass('bus-stop') &&
            //     findField(passTarget).hasClass('road') &&
            //     findField(passTarget).hasClass('bus') == false) {
            //     passTarget.cell += 2;
            // }
            movePassenger(findPassenger(), passTarget);
            break;

        case 40: // down
            passTarget.row++;
            // if (findField({row: passTarget.row + 2, cell: passTarget.cell}).hasClass('bus-stop') &&
            //     findField(passTarget).hasClass('road') &&
            //     findField(passTarget).hasClass('bus') == false) {
            //     passTarget.row += 2;
            // }
            movePassenger(findPassenger(), passTarget);
            break;

        default:
            return;
            break;
    }
    e.preventDefault();


});

//CREATE AND MOVE BUSES
var busSpeed = 550;
// var busLoop;

function createBusLine(name, position, direction) {
    return {
        line: name,
        position: {
            row: position[0],
            cell: position[1]
        },
        direction: [direction[0], direction[1]]
    };
}


function showNewBusPosition(target, line) {
    if ($('.' + line).hasClass('occupied')) {
        $('.board-cell').removeClass('occupied').removeAttr('id');
        findField(target).addClass('occupied').attr('id', 'passenger');
    }
    $('.' + line).removeClass('bus ' + line);
    findField(target).addClass('bus ' + line);
}
//
function setBusTarget(createbus) {
    var busTarget = findBus(createbus.line);
    if (createbus.direction[0] != 0) {
        busTarget.row += createbus.direction[0];
    } else {
        busTarget.cell += createbus.direction[1]
    }
    if (busTarget.row > boardSize - 1 ||
        busTarget.row < 0 ||
        busTarget.cell > boardSize - 1 ||
        busTarget.cell < 0) {
        busTarget = createbus.position;
    }

    return busTarget;
}

function moveBus(createBus) {
    showNewBusPosition(createBus.position, createBus.line);
    busLoop = setInterval(function () {
        showNewBusPosition(setBusTarget(createBus), createBus.line);
    }, busSpeed)
}


moveBus(createBusLine('bus1', [0, districtSize], [1, 0]));

setTimeout(function () {
    moveBus(createBusLine('bus2', [boardSize - 1, districtSize + 1], [-1, 0]));
}, busSpeed *2.5);

setTimeout(function () {
    moveBus(createBusLine('bus3', [districtSize +1, 0], [0, 1]));
}, busSpeed *5);

setTimeout(function () {
    moveBus(createBusLine('bus4', [districtSize, boardSize -1], [0, -1]));
}, busSpeed *6.5);

setTimeout(function () {
    moveBus(createBusLine('bus5', [0, districtSize], [1, 0]));
}, busSpeed *10);

setTimeout(function () {
    moveBus(createBusLine('bus6', [boardSize - 1, districtSize + 1], [-1, 0]));
}, busSpeed *12.5);

setTimeout(function () {
    moveBus(createBusLine('bus7', [districtSize +1, 0], [0, 1]));
}, busSpeed *15);

setTimeout(function () {
    moveBus(createBusLine('bus8', [districtSize, boardSize -1], [0, -1]));
}, busSpeed *16.5);

// });