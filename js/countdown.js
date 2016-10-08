/**
 * Created by kgodlewski on 06.10.16.
 */
var timeLeft;
var timerClock;

insertTimer();

function insertTimer() {
    $('<div class="timerClock">').appendTo('#gameBoard');
    $('<button type="button" name="start" id="startClock">').text('START GAME').appendTo('.timerClock');
    $('<div>').attr('id','timeLeft').text(timeLeft).prependTo('#gameBoard');
}
function countDown() {
    timeLeft -= 0.1;
    if (timeLeft<0){
        return 0;
    }
    $('#timeLeft').text(timeLeft.toFixed(1));
}

$('#startClock').on("click", function () {
    clearInterval(timerClock);
    timeLeft = 360;
    timerClock = setInterval(countDown,100);
    countDown();
});








