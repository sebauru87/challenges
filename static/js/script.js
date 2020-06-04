//challenge 1
function calculateDays() {
    var year = parseInt(prompt('What year were you born'));
    var dif = new Date().getFullYear() - year;
    var totalDays = dif * 365;
    $('#result1').append("You are " + totalDays + " days old");
}

function resetDays() {
    $('#result1').empty();
}

//challenge 2
//https://api.thecatapi.com/api/images/get?format=src&type=gif&sizep=small
function generateCat() {
    $('#result2').append("<img src='https://api.thecatapi.com/api/images/get?format=src&type=gif&sizep=small'>");
}

//challenge 3
function rpsGame(picked) {
    //alert(picked.id);
    //alert(typeof(picked.id));
    var computer = randomComputer();
    $('#paper').removeAttr('onclick');
    $('#rock').removeAttr('onclick');
    $('#scissors').removeAttr('onclick');
    //console.log(computer);
    if (picked.id == 'rock') {
        $('#rock').css('box-shadow', '0px 10px 50px rgba(37, 50, 233, 1)');
        if (computer == 1) {
            $('#paper').remove();
            $('#scissors').remove();
            //alert('tie');
            $('#result3').append('<img src="static/img/rock.svg" alt="" height="150" width="150">');

            $('#result3').append('<h1 id="rpsT">Both picked rock. You TIE!</h1>');
        } else if (computer == 2) {
            $('#scissors').remove();
            //alert('you loose');
            $('#result3').append('<h1 id="rpsL">You Loose!</h1>');
        } else if (computer == 3) {
            //alert('you won');
            $('#paper').remove();
            $('#result3').append('<h1 id="rpsW">You Win!</h1>');
        }
    }
    if (picked.id == 'paper') {
        $('#paper').css('box-shadow', '0px 10px 50px rgba(37, 50, 233, 1)');
        $('#rock').remove();
        if (computer == 1) {
            //alert('you won');
            $('#scissors').remove();
            $('#result3').append('<img src="static/img/rock.svg" alt="" height="150" width="150">');
            $('#result3').append('<h1 id="rpsW">You Win!</h1>');
        } else if (computer == 2) {
            //alert('tie');
            $('#scissors').remove();
            $('#result3').append('<img src="static/img/paper.svg" alt="" height="150" width="150">');
            $('#result3').append('<h1 id="rpsT">Both picked paper. You TIE!</h1>');
        } else if (computer == 3) {
            //alert('you loose');
            $('#result3').append('<h1 id="rpsL">You Loose!</h1>');
        }
    }
    if (picked.id == 'scissors') {
        $('#scissors').css('box-shadow', '0px 10px 50px rgba(37, 50, 233, 1)');
        $('#rock').remove();
        $('#paper').remove();
        if (computer == 1) {
            //alert('you loose');
            $('#result3').append('<img src="static/img/rock.svg" alt="" height="150" width="150">');
            $('#result3').append('<h1 id="rpsL">You Loose!</h1>');
        } else if (computer == 2) {
            //alert('you win');
            $('#result3').append('<img src="static/img/paper.svg" alt="" height="150" width="150">');
            $('#result3').append('<h1 id="rpsW">You Win!</h1>');
        } else if (computer == 3) {
            //alert('tie');
            $('#result3').append('<img src="static/img/scissors.svg" alt="" height="150" width="150">');
            $('#result3').append('<h1 id="rpsT">Both picked scissors. You TIE!</h1>');
        }
    }

}

function randomComputer() {
    var computer = Math.floor(Math.random() * 3) + 1;
    return computer;
}

//challenge 4
var copyButtonsClass = [];
var allButtons = $('button');
for (let i = 0; i < allButtons.length; i++) {
    //alert(allButtons[i]);
    copyButtonsClass.push(allButtons[i].classList[1]);
}

function buttonColorChange(selected) {
    //alert(selected.value);
    changeColorBut(selected.value);
}

function changeColorBut(color) {
    $('button').css('background-color', color);
    if (color == 'reset') {
        $('button').removeAttr('style');
        $('button').removeClass();
        for (let i = 0; i < allButtons.length; i++) {
            allButtons[i].classList.add("btn", copyButtonsClass[i]);
        }
    } else if (color == 'random') {
        $('button').removeAttr('style');
        $('button').removeClass();
        for (let i = 0; i < allButtons.length; i++) {
            //.addClass("btn").addClass(randomColorBut());
            allButtons[i].classList.add("btn", randomColorBut());
        }

    }
}

function randomColorBut() {
    var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    //alert(choices[0]);
    //console.log(String(choices[0]));
    let randomNumber = Math.floor(Math.random() * 4);
    return choices[randomNumber];
}

// Challenge 5: Blackjack
let blackjackGame = {
    'you': {
        'scoreSpan': '#your-blackjack-score',
        'div': '#your-box',
        'score': 0
    },
    'dealer': {
        'scoreSpan': '#dealer-blackjack-score',
        'div': '#dealer-box',
        'score': 0
    },
    'isStand': false,
    'turnsOver': false,
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'cardsMap': {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'K': 10,
        'Q': 10,
        'J': 10,
        'A': [1, 11]
    },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A']
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

// we are gonna use event listeners
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        updateScore(card, YOU);
        showCard(card, YOU);
        showScore(YOU);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/img/${card}.png`;
        cardImage.id = 'cards';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame['isStand'] = true;
    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        updateScore(card, DEALER);
        showCard(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    showResult();
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-score').textContent = 0;
        document.querySelector('#dealer-blackjack-score').textContent = 0;

        document.querySelector('#your-blackjack-score').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-score').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = false;
    }
}

// show result on the top and update the score in the table
function showResult() {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {

        if (YOU['score'] <= 21) {

            // condition: higher score than dealer's or when dealer busts but you're 21 or under.
            if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
                blackjackGame['wins']++;
                document.querySelector('#wins').textContent = blackjackGame['wins'];
                message = 'You won!';
                messageColor = 'green';
                winSound.play();

            } else if (YOU['score'] < DEALER['score']) {
                blackjackGame['losses']++;
                document.querySelector('#losses').textContent = blackjackGame['losses'];
                message = 'You lost!';
                messageColor = 'red';
                lossSound.play();

            } else if (YOU['score'] === DEALER['score']) {
                blackjackGame['draws']++;
                document.querySelector('#draws').textContent = blackjackGame['draws'];
                message = 'You drew!';
                messageColor = 'black';
            }

            // condition: user busts but dealer doesn't
        } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
            blackjackGame['losses']++;
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();

            // condition: when DEALERh bust.
        } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
            blackjackGame['draws']++;
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}

//challenge 6 10 random api ppl
const URL = 'https://randomuser.me/api/?results=10';
fetch(URL)
    .then(
        response => response.json()
    )
    .then(data => {
        let authors = data.results;
        authors.forEach(person => {
            //console.log(person['name']['first']);
            let personImg = '<img src=' + person.picture.large + '>';
            let personP = '<p>' + person.name.first + ' ' + person.name.last + '</p>';
            $('#result6').append('<div>' + personImg + personP + '</div>');
            //console.log(person.name.first);
        });

    })