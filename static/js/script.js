//challenge 1
function calculateDays() {
    var year = parseInt(prompt('What year were you born'));
    var dif = new Date().getFullYear() - year;
    var totalDays = dif * 365;
    $('#result1').append("You are "+totalDays+" days old");
}

function resetDays() {
    $('#result1').empty();
}