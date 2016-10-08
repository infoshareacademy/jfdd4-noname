/**
 * Created by kgodlewski on 06.10.16.
 */
var timeLeft;

insertTimer();

function insertTimer() {
    $('<div class="timerClock">').appendTo('#gameBoard');
    $('<button type="button" name="start" id="startClock">').text('START GAME').appendTo('.timerClock');
    $('<div>').addClass('timeLeft').text(timeLeft).appendTo('.timerClock');
}
function countDown() {
    timeLeft -= 0.1;
    if (timeLeft<0){
        return 0;
    }
    $('.timeLeft').text(timeLeft.toFixed(1));
}

function setClock() {
    clearInterval(countDown);
    setInterval(countDown,100);
}

$('#startClock').on("click", function () {
    timeLeft = 10;
    countDown();
    setClock();
});








