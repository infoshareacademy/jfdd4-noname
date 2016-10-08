$(document).ready(function () {


    $("#join").submit(function (e) {
        e.preventDefault();
        $('#game').removeClass('inactive');
        $('#join').addClass('inactive');
        $('#border-inactive').addClass('border-inactive');
    });

// CREATE GAME BOARD
});


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


function createPavements(x, y) {
    findField({row: x, cell: y}).css("background-color", "grey");

}


createPavements(0, districtSize - 1);
createPavements(0, districtSize + 2);
createPavements(1, districtSize - 1);
createPavements(1, districtSize + 2);
createPavements(2, districtSize - 1);
createPavements(2, districtSize + 2);
createPavements(3, districtSize - 1);
createPavements(3, districtSize + 2);
createPavements(4, districtSize - 1);
createPavements(4, districtSize + 2);
createPavements(5, districtSize - 1);
createPavements(5, districtSize + 2);
createPavements(6, districtSize - 1);
createPavements(6, districtSize + 2);
createPavements(7, districtSize - 1);
createPavements(7, districtSize + 2);
createPavements(8, districtSize - 1);
createPavements(8, districtSize + 2);
createPavements(11, districtSize - 1);
createPavements(11, districtSize + 2);
createPavements(12, districtSize - 1);
createPavements(12, districtSize + 2);
createPavements(13, districtSize - 1);
createPavements(13, districtSize + 2);
createPavements(14, districtSize - 1);
createPavements(14, districtSize + 2);
createPavements(15, districtSize - 1);
createPavements(15, districtSize + 2);
createPavements(16, districtSize - 1);
createPavements(16, districtSize + 2);
createPavements(17, districtSize - 1);
createPavements(17, districtSize + 2);
createPavements(18, districtSize - 1);
createPavements(18, districtSize + 2);
createPavements(19, districtSize - 1);
createPavements(19, districtSize + 2);

createPavements(8, districtSize - 9);
createPavements(11, districtSize - 9);
createPavements(8, districtSize - 8);
createPavements(11, districtSize - 8);
createPavements(8, districtSize - 7);
createPavements(11, districtSize - 7);
createPavements(8, districtSize - 6);
createPavements(11, districtSize - 6);
createPavements(8, districtSize - 5);
createPavements(11, districtSize - 5);
createPavements(8, districtSize - 4);
createPavements(11, districtSize - 4);
createPavements(8, districtSize - 3);
createPavements(11, districtSize - 3);
createPavements(8, districtSize - 2);
createPavements(11, districtSize - 2);
createPavements(8, districtSize + 3);
createPavements(11, districtSize + 3);
createPavements(8, districtSize + 4);
createPavements(11, districtSize + 4);
createPavements(8, districtSize + 5);
createPavements(11, districtSize + 5);
createPavements(8, districtSize + 6);
createPavements(11, districtSize + 6);
createPavements(8, districtSize + 7);
createPavements(11, districtSize + 7);
createPavements(8, districtSize + 8);
createPavements(11, districtSize + 8);
createPavements(8, districtSize + 9);
createPavements(11, districtSize + 9);
createPavements(8, districtSize + 10);
createPavements(11, districtSize + 10);

function createRoadStrips(x, y) {
    findField({row: x, cell: y}).css("border-right", "solid 0.5px black");

}

createRoadStrips(0, districtSize);
createRoadStrips(1, districtSize);
createRoadStrips(2, districtSize);
createRoadStrips(3, districtSize);
createRoadStrips(4, districtSize);
createRoadStrips(5, districtSize);
createRoadStrips(6, districtSize);
createRoadStrips(7, districtSize);
createRoadStrips(8, districtSize);


createRoadStrips(11, districtSize);
createRoadStrips(12, districtSize);
createRoadStrips(13, districtSize);
createRoadStrips(14, districtSize);
createRoadStrips(15, districtSize);
createRoadStrips(16, districtSize);
createRoadStrips(17, districtSize);
createRoadStrips(18, districtSize);
createRoadStrips(19, districtSize);


function createHorizontalRoadStrips(x, y) {
    findField({row: x, cell: y}).css("border-top", "solid 0.5px black");

}

createHorizontalRoadStrips(10, districtSize - 9);
createHorizontalRoadStrips(10, districtSize - 8);
createHorizontalRoadStrips(10, districtSize - 7);
createHorizontalRoadStrips(10, districtSize - 6);
createHorizontalRoadStrips(10, districtSize - 5);
createHorizontalRoadStrips(10, districtSize - 4);
createHorizontalRoadStrips(10, districtSize - 3);
createHorizontalRoadStrips(10, districtSize - 2);
createHorizontalRoadStrips(10, districtSize - 1);
createHorizontalRoadStrips(10, districtSize + 2);
createHorizontalRoadStrips(10, districtSize + 3);
createHorizontalRoadStrips(10, districtSize + 4);
createHorizontalRoadStrips(10, districtSize + 5);
createHorizontalRoadStrips(10, districtSize + 6);
createHorizontalRoadStrips(10, districtSize + 7);
createHorizontalRoadStrips(10, districtSize + 8);
createHorizontalRoadStrips(10, districtSize + 9);
createHorizontalRoadStrips(10, districtSize + 10);

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

    if (start.hasClass('district') && end.hasClass('district') ||
        start.hasClass('bus-stop') && end.hasClass('bus-stop')) {
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
                if (findField({row: passTarget.row, cell: passTarget.cell - 2}).hasClass('bus-stop') &&
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
                if (findField({row: passTarget.row - 2, cell: passTarget.cell}).hasClass('bus-stop') &&
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
            if (findField({row: passTarget.row, cell: passTarget.cell + 2}).hasClass('bus-stop') &&
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

//CREATE AND MOVE BUSES
var busSpeed = 550;
var busLoop;


// var busRepeatTime = busSpeed * boardSize;
// var busTarget = {row: 0, cell: districtSize};

function createBusLine(name, position, direction) {
    var busLine = {
        line: name,
        position: {
            row: position[0],
            cell: position[1]
        },
        direction: [direction[0], direction[1]]
    };
    return busLine;
}


// var bus1 = {
//     name: bus1,
//     start: {
//         row: 0,
//         cell: districtSize
//     }
// };

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
        // console.log(findBus(createBus.line))
    }, busSpeed)
}


moveBus(createBusLine('bus1', [0, districtSize], [1, 0]));

setTimeout(function () {
    moveBus(createBusLine('bus2', [boardSize - 1, districtSize + 1], [-1, 0]));
}, busSpeed *5);
//
setTimeout(function () {
    moveBus(createBusLine('bus3', [districtSize, 0], [0, 1]));
}, busSpeed *10);

setTimeout(function () {
    moveBus(createBusLine('bus4', [districtSize +1, boardSize -1], [0, -1]));
}, busSpeed *15);


// });