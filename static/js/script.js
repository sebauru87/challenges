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