/**
 * Created by piotrszefler on 29.09.16.
 */

$("#join").submit(function(e) {
    e.preventDefault();
});

// $('input.button').click(function () {
//     $('#game').removeClass('inactive');
//     window.location = '#game';

    var boardSize = 10  ,
        $row;
    
    for (i = 0; i < boardSize; i++) {
        $row = $('<tr class="game-row">').appendTo('#board');

        for (j = 0; j < boardSize; j++) {
            $('<td class="game-cell">').appendTo($row)
        }
    }

     



// });

