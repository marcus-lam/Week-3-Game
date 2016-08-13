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
    answerAry: ["OLIVER-HELDENS", "SHAUN-FRANK", "MALAA", "DEADMAU5", "BOUT"],
    hintAry: ["Future House Pioneer...", "Canadian House Mastermind...", "Hip-Hop House Heavyweight...", "EDM Poster Boy...", "Spinnin' Records Rising Talent..."],
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
        userGuess = "";
        this.dashVal = 0;
        this.guesses = 10;
        this.guessesSoFar = "";
        this.winCounter = 0;
        this.dashDiv = "";
        this.dashAry = [];
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

var addiction = new Audio("assets/sounds/addiction.mp3");
var gecko = new Audio("assets/sounds/gecko.mp3");
var loveMeMad = new Audio("assets/sounds/loveMeMad.mp3");
var oceanDrive = new Audio("assets/sounds/oceanDrive.mp3");
var stay = new Audio("assets/sounds/stay.mp3");

var imgNsound = function() {
    addiction.pause();
    gecko.pause();
    loveMeMad.pause();
    oceanDrive.pause();
    stay.pause();
    var i = document.getElementById("houseDJ");
        if (hangman.winCounter === 4) {
            i.innerHTML = "<img class='img-thumbnail' src='assets/images/bout.jpg' alt='Bout' width='320' height='320'>"
            loveMeMad.play();
        } else if (hangman.winCounter === 5) {
            i.innerHTML = "<img class='img-thumbnail' src='assets/images/malaa.jpg' alt='Malaa' width='320' height='320'>"
            addiction.play();
        } else if (hangman.winCounter === 8) {
            i.innerHTML = "<img class='img-thumbnail' src='assets/images/deadmau5.jpeg' alt='Deadmau5' width='320' height='320'>"
            stay.play();
        } else if (hangman.winCounter === 10) {
            i.innerHTML = "<img class='img-thumbnail' src='assets/images/frank.jpg' alt='Shaun Frank' width='320' height='320'>"
            oceanDrive.play();
        } else if (hangman.winCounter === 13) {
            i.innerHTML = "<img class='img-thumbnail' src='assets/images/heldens.jpg' alt='Oliver Heldens' width='320' height='320'>"
            gecko.play();
        } else {
            i.innerHTML = "<img class='img-thumbnail' src='assets/images/default.jpeg' alt='Default Img' width='320' height='320'>"
        }
};

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
                    imgNsound();
                    hangman.reset();
                } else if ((hangman.dashVal === 0) && (hangman.winCounter === hangman.dashAry.length)) {
                    hangman.wins++;
                    alert("You got it! The answer was " + hangman.dashAry.join('') + ". You currently have " + hangman.wins + " wins. On to the next one!");
                    imgNsound();
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
            imgNsound();
            hangman.reset();
        }
    }
};