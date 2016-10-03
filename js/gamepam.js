// var size = 10;
//
//
// $(document).ready(function () {
//
//     // Initialize
//
//
//     var $form = $('input.button');
//     $form.on('click', function (event) {
//         event.preventDefault();
//         $('.game-area').removeClass('game-area').addClass('game-start');
//
//
//         var $row, $cell, inc=1, incTwo=0;
//
//         for (var rowNum = 0; rowNum < size; rowNum++) {
//             $row = $("<tr id=" + incTwo  + "></tr>").appendTo('#game');
//             incTwo++;
//             for (var cellNum = 0; cellNum < size; cellNum++) {
//                 $cell = $("<td id=" + incTwo+ inc + "></td>").addClass('cell').appendTo($row);
//                 inc++;
//                 // var isBlack = rowNum % 2 ? cellNum % 2 : !(cellNum % 2);
//
//                 // if (isBlack) {
//                 //     $cell.addClass('black')
//                 //         .attr('data-color', 'jestem czarny!!');
//                 //
//                 // } else {
//                 //     $cell.addClass('white').attr('data-color', 'jestem bialy!!');
//                 // }
//
//
//             }
//         }
//
//
//         ///Adding img bus
//
// function moveBus() {
//
// }
//
//
//     });
//
//
//
// });
//
