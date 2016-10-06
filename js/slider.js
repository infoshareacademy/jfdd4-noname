/**
 * Created by kgodlewski on 04.10.16.
 */

var slideCounter =0;
var slideQuantity = 3;
var sliderClock = 0;


// slide rotation

function currentSlide() {
    slideCounter++;
    if (slideCounter > slideQuantity) {
        slideCounter = 1;
    }
    currentSlideSquareBar(slideCounter);
    console.log(slideCounter);
    chooseCurrentSlide();
}

function slideRotationInterval(){
    clearInterval(sliderClock);
    sliderClock =  setInterval(currentSlide, 5000);
}

function chooseCurrentSlide() {
    $('#sliderBackground').css({
        "background": "url('img/slider/slajd" + slideCounter + ".jpg') no-repeat center",
        "backgroundSize": "cover"
    });
    hideZajawkaTxt ();
    showZajawkaTxt ();
}

// nav

function createSquareBar () {
    for (var i = 1; i <= slideQuantity; i++) {
        $('<div>').attr('class', "slajd" + i).addClass('kwadrat').appendTo('#sliderNavSquares');
    }
}

function currentSlideSquareBar(identyfikator) {
    $('div.kwadrat').css("background","none");
    console.log(identyfikator + "" +"to jest identyfikator");
    $('div.slajd'+identyfikator).css("background","rgba(0, 0, 255, 0.5)");
}

$('.kwadrat').click(function() {
    currentSlide();
    console.log('click');
});

$('#moveForward').click(function() {
    clearInterval(sliderClock);
    slideRotationInterval();
    currentSlide();
});

$('#moveBackward').click(function() {
    clearInterval(sliderClock);
    slideCounter -= 1;
    if (slideCounter<1){
        slideCounter = slideQuantity;
        currentSlideSquareBar(slideCounter);
        chooseCurrentSlide();
    } else {
        slideCounter -= 1;
        slideRotationInterval();
        currentSlide();
    }
});

function hideZajawkaTxt () {
    $('.zajwkaSlajd').hide();
}

function showZajawkaTxt () {
    $('.zajawkaHead'+slideCounter).show();
    $('.zajawkaTxt'+slideCounter).show();
}

currentSlide();
slideRotationInterval();
createSquareBar();
currentSlideSquareBar(1);



