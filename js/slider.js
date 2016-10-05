/**
 * Created by kgodlewski on 04.10.16.
 */

/**
 * Created by kgodlewski on 03.10.16.
 */

var slideCounter =0;
var slideQuantity = 3;
var sliderClock = 0;

function currentSlide() {
    slideCounter++;
    if (slideCounter > slideQuantity) {
        slideCounter = 1;
    }
    currentSlideSquareBar(slideCounter);
    console.log(slideCounter);
    chooseCurrentSlide();
}

function currentSlideSquareBar(identyfikator) {
    $('div.kwadrat').css("background","none");
    console.log(identyfikator + "" +"to jest identyfikator");
    $('div.slajd'+identyfikator).css("background","blue");

}

function rotacjaSlajd(){
    clearInterval(sliderClock);
    sliderClock =  setInterval(currentSlide, 5000);
}

function chooseCurrentSlide() {

       document.getElementById("welcome").style.background = "url('img/slider/slajd" + slideCounter + ".jpg')";
        document.getElementById("welcome").style.backgroundSize = "cover";


    hideZajawkaTxt ();
    showZajawkaTxt ();


    console.log(slideCounter + " " + "to jest obecny slajd");
}

function hideZajawkaTxt () {
    $('.zajwkaSlajd').hide();
}

function showZajawkaTxt () {
    $('.zajawkaHead'+slideCounter).show();
    $('.zajawkaTxt'+slideCounter).show();
}


function stworzSlajdKwadraty () {
    for (var i = 1; i <= slideQuantity; i++) {
        $('<div>').attr('class', "slajd" + i).addClass('kwadrat').appendTo('#sliderNavSquares');
    }

}

$('#moveForward').click(function() {
    clearInterval(sliderClock);
    rotacjaSlajd();
    currentSlide();
});

$('#moveBackward').click(function() {
    clearInterval(sliderClock);
    slideCounter -= 1;
    console.log(slideCounter + "po odjeciu");
    if (slideCounter<1){
        slideCounter = slideQuantity;
        currentSlideSquareBar(slideCounter);
        chooseCurrentSlide();
    } else {
        slideCounter -= 1;
        rotacjaSlajd();
        console.log(slideCounter + "do tylu");
        currentSlide();
    }
});

