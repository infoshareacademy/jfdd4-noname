/**
 * Created by kgodlewski on 06.10.16.
 */

var timeLeft;

$(document).ready(function () {
    insertTimer();
});

function insertTimer() {
    $('div').text(timeLeft.toFixed(2));
}

function countDown() {
    timeLeft -= 0.1;
    if (timeLeft<5){
        $('.showTime').css({
            "color": "red"
        });
    } if (timeLeft<0){
        timeLeft = 0;
        $('DIV').text('GAME OVER');
    }
    $('div').text(timeLeft.toFixed(1));
    console.log(timeLeft);
}

function setClock() {
    clearInterval(countDown);
    countDown();
    setInterval(countDown,100);
}

$('#startCLock').on("click", function () {
    timeLeft = 10;
   setClock();
});



