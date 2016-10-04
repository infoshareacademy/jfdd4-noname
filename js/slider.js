/**
 * Created by kgodlewski on 04.10.16.
 */

/**
 * Created by kgodlewski on 03.10.16.
 */

var numer =0;
var liczbaSlajdow = 3;
var sliderClock = 0;

function aktualnySlajd() {
    numer++;
    if (numer > liczbaSlajdow) {
        numer = 1;
    }
    rozpoznajSlajdKwadrat(numer);
    console.log(numer);
    wybierzSlajd();
}

function rozpoznajSlajdKwadrat(identyfikator) {
    $('div.kwadrat').css("background","none");
    console.log(identyfikator + "" +"to jest identyfikator");
    $('div.slajd'+identyfikator).css("background","blue");

}

function rotacjaSlajd(){
    clearInterval(sliderClock);
    sliderClock =  setInterval(aktualnySlajd, 5000);
}

function wybierzSlajd() {

       document.getElementById("welcome").style.background = "url('img/slider/slajd" + numer + ".jpg')";
        document.getElementById("welcome").style.backgroundSize = "cover";


    hideZajawkaTxt ();
    showZajawkaTxt ();


    console.log(numer + " " + "to jest obecny slajd");
}

function hideZajawkaTxt () {
    $('.zajwkaSlajd').hide();
}

function showZajawkaTxt () {
    $('.zajawkaHead'+numer).show();
    $('.zajawkaTxt'+numer).show();
}


function stworzSlajdKwadraty () {
    for (var i = 1; i <= liczbaSlajdow; i++) {
        $('<div>').attr('class', "slajd" + i).addClass('kwadrat').appendTo('#sliderNavSquares');
    }

}

$('#moveForward').click(function() {
    clearInterval(sliderClock);
    rotacjaSlajd();
    aktualnySlajd();
});

$('#moveBackward').click(function() {
    clearInterval(sliderClock);
    numer -= 1;
    console.log(numer + "po odjeciu");
    if (numer<1){
        numer = liczbaSlajdow;
        rozpoznajSlajdKwadrat(numer);
        wybierzSlajd();
    } else {
        numer -= 1;
        rotacjaSlajd();
        console.log(numer + "do tylu");
        aktualnySlajd();
    }
});

