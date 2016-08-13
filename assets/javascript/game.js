var hangman = {
    wins: 0,
    losses: 0,
    guesses: 10,
    answer: "",
    hint: "",
    guessesSoFar: "",
    dashDiv: "",
    dashAry: [],
    dashVal: 0,
    winCounter: 0,
    answerAry: ["OLIVER-HELDENS", "SHAUN-FRANK", "MALAA", "DEADMAU5", "FEINT"],
    hintAry: ["Future House Pioneer...", "Canadian House Mastermind...", "Hip-Hop House Heavyweight...", "EDM Poster Boy...", "Not House, but personal DnB favorite..."],
    genAnswerHint: function() {
        var randomizer = Math.floor(Math.random() * 5);
        this.answer = this.answerAry[randomizer];
        this.hint = this.hintAry[randomizer];
    },
    genDashAry: function() {
        this.dashAry = this.answer.split("");
    },
    genDashDiv: function() {
        for (var i = 0; i < this.dashAry.length; i++) {
            if (this.dashAry[i] === "-") {
                this.dashDiv += "<span class='dash-letters'>" + " " + "-" + "</span>";
                this.dashVal++;
            } else {
                this.dashDiv += "<span class='dash-letters'>" + " " + "_" + "</span>";
            }
        }
    },
    update: function() {
        var html =
        "<br>" +
        "<h4>Hint: " + hangman.hint + "</h4>" +
        "<br>" +
        "<p>Wins: " + hangman.wins + "</p>" +
        "<p>Losses: " + hangman.losses + "</p>" +
        "<p>Number of Guesses Remaining: " + hangman.guesses + "</p>" +
        "<p>(Guesses only go down when you choose a wrong letter!)</p>" +
        "<p>Letters Already Guessed: " + hangman.guessesSoFar + "</p>" +
        "<br>";
        document.querySelector("#gamebox").innerHTML = html;
    },
    reset: function() {
        this.dashVal = 0;
        this.guesses = 10;
        this.guessesSoFar = "";
        this.winCounter = 0;
        this.dashDiv = "";
        this.genAnswerHint();
        this.genDashAry();
        this.genDashDiv();
        hangman.update();
        var post = this.dashDiv;
        document.querySelector("#dashAnswers").innerHTML = post;
    }
};

hangman.genAnswerHint();
hangman.genDashAry();
hangman.genDashDiv();

hangman.update();

var post = hangman.dashDiv;
document.querySelector("#dashAnswers").innerHTML = post;

var userGuess;

document.onkeyup = function(event) {
    var counter = 0;
    userGuess = String.fromCharCode(event.keyCode).toUpperCase();
    var fetch = document.getElementsByClassName("dash-letters");

    if (hangman.guessesSoFar.indexOf(userGuess) < 0) {
        for (var i = 0; i < hangman.dashAry.length; i++) {
            if (userGuess === hangman.dashAry[i]) {
                hangman.winCounter++;
                counter++;
                hangman.guessesSoFar += userGuess;
                fetch[i].innerHTML = userGuess;
                if ((hangman.dashVal === 1) && (hangman.winCounter === (hangman.dashAry.length - 1))) {
                    hangman.wins++;
                    alert("You got it! The answer was " + hangman.dashAry.join('') + ". You currently have " + hangman.wins + " wins. On to the next one!");
                    hangman.reset();
                } else if ((hangman.dashVal === 0) && (hangman.winCounter === hangman.dashAry.length)) {
                    hangman.wins++;
                    alert("You got it! The answer was " + hangman.dashAry.join('') + ". You currently have " + hangman.wins + " wins. On to the next one!");
                    hangman.reset();
                }
            }
        }
        if (counter === 0) {
            hangman.guesses = hangman.guesses - 1;
            hangman.guessesSoFar += userGuess;
            hangman.update();
        }
        counter = 0;

        hangman.update();
        if (hangman.guesses === 0) {
            hangman.losses++;
            alert("You've lost... one more time?");
            hangman.reset();
        }
    }
};