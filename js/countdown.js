/**
 * Created by kgodlewski on 06.10.16.
 */

var timeLeft;

$(document).ready(function () {
    insertTimer();
});

function insertTimer() {
    $('div').text(timeLeft);
}

function countDown() {
    timeLeft -=0.1;
    if (timeLeft<0){
        timeLeft = 0;
    }
    $('div').text(timeLeft);
    console.log(timeLeft);
}

function setClock() {
    clearInterval(countDown);
    countDown();
    setInterval(countDown,100);
}

$('#startCLock').on("click", function () {
    timeLeft = 5;
   setClock();
});



