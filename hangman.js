/**
 * Created by jaWeber on 9/17/16.
 */

// JavaScript Document
var $ = function(id) {
    return document.getElementById(id);
};

// GLOBAL ARRAYS!!!
//declare and initialize array
var game = ["ARCHERY","BADMINTON","BASKETBALL","BOXING","CANOE","CYCLING","DIVING","EQUESTRIAN",
        "FENCING","FIELD-HOCKEY","GOLF","GYMNASTICS","HANDBALL","JUDO","PENTATHLON","ROWING",
        "RUGBY","SAILING","SHOOTING","SOCCER","SWIMMING","TABLE-TENNIS","TAEKWANDO","TENNIS",
        "TRACK&FIELD","TRAMPOLINE","TRIATHLON","VOLLEYBALL","WATER-POLO","WEIGHTLIFTING",
        "WRESTLING"];

//var game = ["JANUARY","FEBRUARY","JULY","AUGUST"];   // for testing
var figureImg = ["img10.png", "img09.png", "img08.png", "img07.png", "img06.png",
    "img05.png", "img04.png", "img03.png", "img02.png", "img01.png", "img00.png"];


// *****************************************************
// playgame function
//      Contains functions setup() and play() for playing 1 game (or round).
// *****************************************************
var playgame = function() {
    // variables global for this game (or round if you will)
    var choice = Math.floor(Math.random() * 4);
    var answer = game[choice];
    var myLength = answer.length;
    var display = [myLength];
    var win = myLength;
    var letters = answer.split('');
    var attemptsLeft = 10;
    var output="";
    var userLetter="";
    var imgSrc="images/img00.png";

    // *****************************************************
    var setup = function() {
        for (var i=0; i< answer.length; i++) {
            display[i] = "__ ";
            output = output + display[i];
        }
        document.getElementById("game").innerHTML = output;
        document.getElementById("hangimg").src = imgSrc;
        document.getElementById("guesstxt").innerHTML = "You can guess wrong 10 times!";
        output ="";
    };  // end of setup function

    // *****************************************************
    var play = function() {
        var correctGuess = false;                               // boolean set true if guess is correct
        output = "";                                            // initialize output string
        userLetter=$("letter").value;                           // place user guess (letter) into variable userLetter
        $("letter").value ="";                                  // reset user guess (letter)

        for (var c= 0; c< answer.length; c++) {                 // Loop thru answer checking for a match
            if (userLetter.toUpperCase() == letters[c]) {
                display[c] = userLetter.toUpperCase();          // Match - convert to uppercase
                correctGuess = true;                            // If we're in here, the guess is correct
                win--;                                          // decrement win counter
            }
            output = output + display[c] + " ";                 // add to output string
        }

        if (!correctGuess) {
            attemptsLeft--;                                     // Only update counter on incorrect guess
            imgSrc = "images/" + figureImg[attemptsLeft];       // Load appropriate image from array.

            // The following code does not use an array for images.  Just uses an index to construct the
            // appropriate file name. Easier in my opinion.  figureImg would be unnecessary.
            /*        imgIndex = Math.abs(attemptsLeft-10) + 1;
             if (imgIndex == 10) {
             imgSrc = "images/img"+imgIndex+".png";
             } else {
             imgSrc = "images/img0"+imgIndex+".png";
             }
             */
            $("hangimg").src = imgSrc;                          // repopulate the source for the page image.
        }

        document.getElementById("game").innerHTML = output;     // repopulate "game" with new output string
        output="";                                              // reset output string

        if (win < 1) {                                          // repopulate "guesstxt" with appropriate string.
            document.getElementById("guesstxt").innerHTML ="YOU WIN!!!";
        }
        else if (attemptsLeft < 1) {
            document.getElementById("guesstxt").innerHTML ="YOU LOSE!!!";
        }
        else {
            document.getElementById("guesstxt").innerHTML ="You can guess wrong " + attemptsLeft + " more times";
        }
    }; // end of play function

    // *****************************************************
    // code of playgame()
    // *****************************************************
    setup();
    $("guess").onclick = play;

};  // end of playgame() function

// *****************************************************
window.onload = function() {
    playgame();
    $("reset").onclick = playgame;
};