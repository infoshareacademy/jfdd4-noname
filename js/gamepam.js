

var t = [];  //ustawienie naszej tablicy jako zmienna globalna
// (definicja tablicy zawierającej wiersze)



function pokaz() {
    var text = "<table>";
    for (y=0; y<=15; y++) {
        text += "<tr>";  //nowy wiersz tabeli
        for (x=0; x<=15; x++) {
            text+= "<td><div>" + t[y][x]+ "</div></td>";
        }
        text+="</tr>"; //koniec wiersza tabeli
    }
    text += "</table>"; //koniec tabeli
    //pobranie div id=plansza i ustawienie zawartości

      $('#plansza').append(text);
    //
    // var elem = document.getElementById("plansza");
    // elem.innerHTML=text;
}

/* Funkcja start */

function start() {
    t=[];  // na początku czyścimy tablice
    for (var y=0;y<=15;y++) {  //wiersze od 0 do 8
        t[y]=[];
        for (var x=0;x<=15;x++) {  //kolumny od 0 do 8
            t[y][x]='X';     // - każde pole ma X
        }
    }
    pokaz();
}